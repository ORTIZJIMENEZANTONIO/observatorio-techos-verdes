/**
 * POST /api/envi/indices
 *
 * Consulta índices espectrales (NDVI, EVI, SAVI, NDWI, LST) para una
 * ubicación o área de la CDMX.
 *
 * Cadena de fuentes (prioridad):
 *   1. Google Earth Engine (gratis para investigación)
 *   2. Sentinel Hub (gratis tier básico, 30k req/mes)
 *   3. Datos locales calibrados (fallback sin conexión)
 *
 * Body: { lat, lng, alcaldia?, radio?, fechaInicio?, fechaFin? }
 * Response: { fuente, indices, serie?, calidad, timestamp }
 */

import { enviAlcaldias } from '~/data/envi/alcaldias'

interface IndicesRequest {
  lat: number
  lng: number
  alcaldia?: string
  radio?: number          // metros (default: 500)
  fechaInicio?: string    // ISO date
  fechaFin?: string       // ISO date
}

interface IndicesResponse {
  fuente: 'google_earth_engine' | 'sentinel_hub' | 'datos_locales'
  indices: {
    ndvi: number | null
    evi: number | null
    savi: number | null
    ndwi: number | null
    lst: number | null
  }
  serie?: Array<{ fecha: string; indices: Record<string, number> }>
  calidad: {
    confianza: number
    resolucionM: number
    metodo: string
  }
  timestamp: string
}

// ── Google Earth Engine (REST API, gratis para investigación) ─────────────────
// Docs: https://developers.google.com/earth-engine/reference/rest
// Auth: Service Account con acceso a Earth Engine
//   1. Crear proyecto en Google Cloud Console
//   2. Habilitar Earth Engine API
//   3. Crear Service Account y descargar JSON key
//   4. Registrar el SA en earthengine.google.com (signup for research)
//   5. Generar access token con la key

async function getGEEAccessToken(config: { serviceAccountKey: string }): Promise<string | null> {
  if (!config.serviceAccountKey) return null

  try {
    // El service account key es un JSON con client_email y private_key
    const key = JSON.parse(config.serviceAccountKey)

    // Crear JWT para obtener access token
    // Header: { alg: RS256, typ: JWT }
    // Payload: { iss: client_email, scope: ee, aud: token_uri, iat, exp }
    const now = Math.floor(Date.now() / 1000)
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
      iss: key.client_email,
      scope: 'https://www.googleapis.com/auth/earthengine',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }))

    // Firmar con la private key (requiere crypto nativo de Node)
    const { createSign } = await import('node:crypto')
    const sign = createSign('RSA-SHA256')
    sign.update(`${header}.${payload}`)
    const signature = sign.sign(key.private_key, 'base64url')

    const jwt = `${header}.${payload}.${signature}`

    // Intercambiar JWT por access token
    const tokenRes = await $fetch<any>('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    })

    return tokenRes?.access_token || null
  }
  catch (error) {
    console.warn('[GEE] Error obteniendo token:', (error as Error).message)
    return null
  }
}

async function queryGoogleEarthEngine(config: { serviceAccountKey: string; projectId: string }, req: IndicesRequest): Promise<IndicesResponse | null> {
  if (!config.serviceAccountKey || !config.projectId) return null

  const token = await getGEEAccessToken(config)
  if (!token) return null

  try {
    const fechaFin = req.fechaFin || new Date().toISOString().split('T')[0]
    const fechaInicio = req.fechaInicio || (() => { const d = new Date(); d.setFullYear(d.getFullYear() - 1); return d.toISOString().split('T')[0] })()
    const radio = req.radio || 500

    // Earth Engine REST API: computePixels o computeFeatures
    // Usamos la REST API v1 para ejecutar un cómputo
    const expression = {
      // Definir el punto de interés como geometría
      functionInvocationValue: {
        functionName: 'Image.reduceRegion',
        arguments: {
          image: {
            functionInvocationValue: {
              functionName: 'Image.select',
              arguments: {
                input: {
                  functionInvocationValue: {
                    functionName: 'ImageCollection.median',
                    arguments: {
                      collection: {
                        functionInvocationValue: {
                          functionName: 'ImageCollection.filterDate',
                          arguments: {
                            collection: {
                              functionInvocationValue: {
                                functionName: 'ImageCollection.filterBounds',
                                arguments: {
                                  collection: { constantValue: 'COPERNICUS/S2_SR_HARMONIZED' },
                                  geometry: {
                                    functionInvocationValue: {
                                      functionName: 'Geometry.Point',
                                      arguments: {
                                        coordinates: { constantValue: [req.lng, req.lat] },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            start: { constantValue: fechaInicio },
                            end: { constantValue: fechaFin },
                          },
                        },
                      },
                    },
                  },
                },
                bandSelectors: { constantValue: ['B2', 'B3', 'B4', 'B8'] },
              },
            },
          },
          reducer: { constantValue: 'mean' },
          geometry: {
            functionInvocationValue: {
              functionName: 'Geometry.Point.buffer',
              arguments: {
                point: {
                  functionInvocationValue: {
                    functionName: 'Geometry.Point',
                    arguments: { coordinates: { constantValue: [req.lng, req.lat] } },
                  },
                },
                distance: { constantValue: radio },
              },
            },
          },
          scale: { constantValue: 10 },
        },
      },
    }

    // Alternativa más simple: usar el endpoint computeValue
    // que ejecuta código Earth Engine serializado
    const computeRes = await $fetch<any>(
      `https://earthengine.googleapis.com/v1/projects/${config.projectId}/value:compute`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: { expression },
        timeout: 60000,
      },
    )

    if (computeRes?.result) {
      const r = computeRes.result
      const nir = (r.B8 || 0) / 10000
      const red = (r.B4 || 0) / 10000
      const blue = (r.B2 || 0) / 10000
      const green = (r.B3 || 0) / 10000

      const ndvi = nir + red > 0 ? (nir - red) / (nir + red) : 0
      const evi = 2.5 * (nir - red) / (nir + 6 * red - 7.5 * blue + 1)
      const savi = ((nir - red) / (nir + red + 0.5)) * 1.5
      const ndwi = green + nir > 0 ? (green - nir) / (green + nir) : 0

      return {
        fuente: 'google_earth_engine',
        indices: {
          ndvi: +ndvi.toFixed(4),
          evi: +evi.toFixed(4),
          savi: +savi.toFixed(4),
          ndwi: +ndwi.toFixed(4),
          lst: null, // LST requiere colección Landsat aparte
        },
        calidad: {
          confianza: 0.93,
          resolucionM: 10,
          metodo: `Google Earth Engine + Sentinel-2 SR Harmonized (${fechaInicio} a ${fechaFin})`,
        },
        timestamp: new Date().toISOString(),
      }
    }

    // Intentar LST con Landsat
    // (simplificado — en producción sería otra llamada con LANDSAT/LC08/C02/T1_L2)

    return null
  }
  catch (error) {
    console.warn('[GEE] Error en consulta:', (error as Error).message)
    return null
  }
}

// ── Sentinel Hub (fallback gratuito, 30k req/mes) ────────────────────────────

async function querySentinelHub(config: { clientId: string; clientSecret: string }, req: IndicesRequest): Promise<IndicesResponse | null> {
  if (!config.clientId || !config.clientSecret) return null

  try {
    const tokenRes = await $fetch<any>('https://services.sentinel-hub.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${config.clientId}&client_secret=${config.clientSecret}`,
    })

    const token = tokenRes.access_token
    if (!token) return null

    const fechaFin = req.fechaFin || new Date().toISOString().split('T')[0]
    const fechaInicio = req.fechaInicio || (() => { const d = new Date(); d.setMonth(d.getMonth() - 1); return d.toISOString().split('T')[0] })()

    const evalscript = `
//VERSION=3
function setup() {
  return {
    input: [{ bands: ["B02","B03","B04","B08","SCL"], units: "DN" }],
    output: [
      { id: "ndvi", bands: 1, sampleType: "FLOAT32" },
      { id: "evi", bands: 1, sampleType: "FLOAT32" },
      { id: "savi", bands: 1, sampleType: "FLOAT32" },
      { id: "ndwi", bands: 1, sampleType: "FLOAT32" }
    ]
  }
}
function evaluatePixel(s) {
  let scl = s.SCL
  if (scl === 3 || scl === 8 || scl === 9 || scl === 10) return { ndvi: [NaN], evi: [NaN], savi: [NaN], ndwi: [NaN] }
  let nir = s.B08 / 10000
  let red = s.B04 / 10000
  let blue = s.B02 / 10000
  let green = s.B03 / 10000
  return {
    ndvi: [(nir - red) / (nir + red + 0.0001)],
    evi: [2.5 * (nir - red) / (nir + 6*red - 7.5*blue + 1)],
    savi: [((nir - red) / (nir + red + 0.5)) * 1.5],
    ndwi: [(green - nir) / (green + nir + 0.0001)]
  }
}`

    const statRes = await $fetch<any>('https://services.sentinel-hub.com/api/v1/statistics', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {
        input: {
          data: [{ type: 'sentinel-2-l2a', dataFilter: { timeRange: { from: `${fechaInicio}T00:00:00Z`, to: `${fechaFin}T23:59:59Z` }, maxCloudCoverage: 20 } }],
          bounds: {
            geometry: { type: 'Point', coordinates: [req.lng, req.lat] },
            properties: { crs: 'http://www.opengis.net/def/crs/EPSG/0/4326' },
          },
        },
        aggregation: {
          timeRange: { from: `${fechaInicio}T00:00:00Z`, to: `${fechaFin}T23:59:59Z` },
          aggregationInterval: { of: 'P1M' },
          evalscript,
          resx: 10,
          resy: 10,
        },
      },
      timeout: 30000,
    })

    if (statRes?.data?.[0]?.outputs) {
      const latest = statRes.data[statRes.data.length - 1].outputs
      return {
        fuente: 'sentinel_hub',
        indices: {
          ndvi: latest.ndvi?.bands?.B0?.stats?.mean ?? null,
          evi: latest.evi?.bands?.B0?.stats?.mean ?? null,
          savi: latest.savi?.bands?.B0?.stats?.mean ?? null,
          ndwi: latest.ndwi?.bands?.B0?.stats?.mean ?? null,
          lst: null,
        },
        serie: statRes.data.map((d: any) => ({
          fecha: d.interval.from.split('T')[0],
          indices: {
            ndvi: d.outputs.ndvi?.bands?.B0?.stats?.mean ?? 0,
            evi: d.outputs.evi?.bands?.B0?.stats?.mean ?? 0,
            savi: d.outputs.savi?.bands?.B0?.stats?.mean ?? 0,
            ndwi: d.outputs.ndwi?.bands?.B0?.stats?.mean ?? 0,
          },
        })),
        calidad: {
          confianza: 0.90,
          resolucionM: 10,
          metodo: 'Sentinel Hub Statistical API + Sentinel-2 L2A',
        },
        timestamp: new Date().toISOString(),
      }
    }
    return null
  }
  catch (error) {
    console.warn('[Sentinel Hub] No disponible:', (error as Error).message)
    return null
  }
}

// ── Datos locales (fallback sin conexión) ────────────────────────────────────

function queryLocalData(req: IndicesRequest): IndicesResponse {
  const alcaldia = req.alcaldia || findNearestAlcaldia(req.lat, req.lng)
  const data = enviAlcaldias.find(d => d.alcaldia === alcaldia)

  if (data) {
    return {
      fuente: 'datos_locales',
      indices: data.actual,
      serie: data.serie.observaciones.map(o => ({
        fecha: o.fecha,
        indices: o.indices as any,
      })),
      calidad: {
        confianza: 0.75,
        resolucionM: 10,
        metodo: 'Datos placeholder calibrados (SEDEMA/CONABIO). Configurar GEE o Sentinel Hub para mayor precisión.',
      },
      timestamp: new Date().toISOString(),
    }
  }

  return {
    fuente: 'datos_locales',
    indices: { ndvi: null, evi: null, savi: null, ndwi: null, lst: null },
    calidad: { confianza: 0, resolucionM: 0, metodo: 'Sin datos disponibles' },
    timestamp: new Date().toISOString(),
  }
}

function findNearestAlcaldia(lat: number, lng: number): string {
  const centroids: Record<string, [number, number]> = {
    'Álvaro Obregón': [19.3577, -99.2260],
    'Azcapotzalco': [19.4869, -99.1838],
    'Benito Juárez': [19.3724, -99.1614],
    'Coyoacán': [19.3500, -99.1620],
    'Cuajimalpa': [19.3590, -99.2910],
    'Cuauhtémoc': [19.4285, -99.1507],
    'Gustavo A. Madero': [19.4748, -99.1133],
    'Iztacalco': [19.3952, -99.0975],
    'Iztapalapa': [19.3558, -99.0520],
    'Magdalena Contreras': [19.3200, -99.2440],
    'Miguel Hidalgo': [19.4145, -99.1935],
    'Milpa Alta': [19.1926, -99.0231],
    'Tláhuac': [19.2869, -99.0048],
    'Tlalpan': [19.2965, -99.1680],
    'Venustiano Carranza': [19.4253, -99.1075],
    'Xochimilco': [19.2618, -99.1040],
  }
  let nearest = 'Cuauhtémoc'
  let minDist = Infinity
  for (const [name, [clat, clng]] of Object.entries(centroids)) {
    const d = (lat - clat) ** 2 + (lng - clng) ** 2
    if (d < minDist) { minDist = d; nearest = name }
  }
  return nearest
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
  const body = await readBody<IndicesRequest>(event)

  if (!body?.lat || !body?.lng) {
    throw createError({ statusCode: 400, statusMessage: 'Se requieren lat y lng' })
  }

  const config = useRuntimeConfig()

  // 1. Google Earth Engine (gratis para investigación)
  const geeResult = await queryGoogleEarthEngine(
    { serviceAccountKey: config.geeServiceAccountKey, projectId: config.geeProjectId },
    body,
  )
  if (geeResult) return geeResult

  // 2. Sentinel Hub (gratis tier básico)
  const shResult = await querySentinelHub(
    { clientId: config.sentinelHubClientId, clientSecret: config.sentinelHubClientSecret },
    body,
  )
  if (shResult) return shResult

  // 3. Datos locales (fallback sin conexión)
  return queryLocalData(body)
})
