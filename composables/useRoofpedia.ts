// useRoofpedia — helpers para el módulo admin de Roofpedia.
//
// Contiene:
//   - lista canónica de alcaldías analizadas (las que tienen assets en
//     /public/roofpedia/{slug}/)
//   - estimación de costo via Overpass (cuenta buildings) + tile math z19 +
//     pricing Mapbox actual.

export interface RoofpediaAlcaldia {
  /** slug URL-safe (lowercase, sin acentos) usado en /public/roofpedia/{slug}/ */
  slug: string
  /** Nombre canónico (igual al de cdmx-alcaldias.geojson) */
  nombre: string
  /** ¿Tiene index.html + composites en /public/roofpedia/{slug}/ ? */
  analizada: boolean
  /** Fecha del análisis (cuando aplica) */
  fechaAnalisis?: string
  /** Cantidad de detecciones del CNN (cuando aplica) */
  deteccionesCnn?: number
}

// Lista canónica — añadir aquí cuando se procese una nueva alcaldía y se
// copien los assets a /public/roofpedia/{slug}/.
export const ROOFPEDIA_ALCALDIAS: RoofpediaAlcaldia[] = [
  { slug: 'alvaro-obregon',           nombre: 'Álvaro Obregón',           analizada: false },
  { slug: 'azcapotzalco',             nombre: 'Azcapotzalco',             analizada: false },
  { slug: 'benito-juarez',            nombre: 'Benito Juárez',            analizada: false },
  { slug: 'coyoacan',                 nombre: 'Coyoacán',                 analizada: false },
  { slug: 'cuajimalpa-de-morelos',    nombre: 'Cuajimalpa de Morelos',    analizada: false },
  { slug: 'cuauhtemoc',               nombre: 'Cuauhtémoc',               analizada: false },
  { slug: 'gustavo-a-madero',         nombre: 'Gustavo A. Madero',        analizada: false },
  { slug: 'iztacalco',                nombre: 'Iztacalco',                analizada: false },
  { slug: 'iztapalapa',               nombre: 'Iztapalapa',               analizada: true, fechaAnalisis: '2026-04-15', deteccionesCnn: 210 },
  { slug: 'la-magdalena-contreras',   nombre: 'La Magdalena Contreras',   analizada: false },
  { slug: 'miguel-hidalgo',           nombre: 'Miguel Hidalgo',           analizada: false },
  { slug: 'milpa-alta',               nombre: 'Milpa Alta',               analizada: false },
  { slug: 'tlahuac',                  nombre: 'Tláhuac',                  analizada: false },
  { slug: 'tlalpan',                  nombre: 'Tlalpan',                  analizada: false },
  { slug: 'venustiano-carranza',      nombre: 'Venustiano Carranza',      analizada: false },
  { slug: 'xochimilco',               nombre: 'Xochimilco',               analizada: false },
]

// Mapbox pricing actualizado may 2026:
// - Free tier: 50,000 raster tile requests/mes
// - Tier 1 (50k-500k): $0.30 USD / 1k requests
// - Tier 2 (500k-1M):  $0.20 USD / 1k requests
// Fuente: https://www.mapbox.com/pricing
//
// Para estimación conservadora asumimos que la alcaldía consume todo el free
// tier del mes (otros usos en otras tools) y todos los tiles caen en tier 1.
export const MAPBOX_PRICING_USD_PER_1K = 0.30
export const MAPBOX_FREE_TIER_TILES = 50000

export interface CostEstimate {
  /** Edificios detectados via Overpass */
  buildings: number
  /** Tiles únicos z19 estimados (cada building cubre ~1.5-2 tiles) */
  tiles: number
  /** USD estimados de Mapbox (tras free tier) */
  costoUsd: number
  /** Minutos aproximados de procesamiento (CPU/GPU) */
  tiempoMinutos: { cpu: number; gpu: number }
  /** Bytes aproximados de descarga (256x256 PNG ~50KB c/u) */
  bytesAprox: number
}

/**
 * Estima el costo de procesar una alcaldía con Roofpedia.
 *
 * Pasos:
 * 1. Query Overpass por edificios dentro del polígono de la alcaldía
 * 2. Aproxima tiles z19: cada building cubre ~1.7 tiles en promedio (cuadro 30m)
 * 3. Aplica pricing Mapbox sobre tiles - free tier
 * 4. Tiempo: 0.3s/tile en CPU, 0.05s/tile en GPU (estimación basada en
 *    benchmarks Roofpedia sobre U-Net ResNet34 256x256)
 */
export async function estimarCostoAlcaldia(
  alcaldiaNombre: string,
): Promise<CostEstimate> {
  // Cargar polígono de la alcaldía desde el geojson público
  const geojson = await $fetch<any>('/geojson/cdmx-alcaldias.geojson')
  const feat = geojson.features.find((f: any) => {
    const n = String(f.properties?.nombre ?? '').toLowerCase()
    return n === alcaldiaNombre.toLowerCase()
  })
  if (!feat) {
    throw new Error(`Alcaldía "${alcaldiaNombre}" no encontrada en cdmx-alcaldias.geojson`)
  }

  // Bbox del polígono (Overpass solo soporta bbox)
  const coords = feat.geometry.type === 'Polygon'
    ? feat.geometry.coordinates[0]
    : feat.geometry.coordinates.flat(2)
  let minLng = 180, minLat = 90, maxLng = -180, maxLat = -90
  for (const [lng, lat] of coords) {
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  // Query Overpass: solo cuenta buildings (out count;)
  const query = `[out:json][timeout:60];(way["building"](${minLat},${minLng},${maxLat},${maxLng});relation["building"](${minLat},${minLng},${maxLat},${maxLng}););out count;`
  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query)
  const res = await $fetch<any>(url)
  const buildings = Number(res?.elements?.[0]?.tags?.total ?? 0)

  // ~1.7 tiles únicos por building a z19 (heurística empírica del scan de
  // Iztapalapa: ~125k buildings → ~210k tiles únicos)
  const tiles = Math.round(buildings * 1.7)

  // Costo Mapbox post free-tier
  const tilesTrasFree = Math.max(0, tiles - MAPBOX_FREE_TIER_TILES)
  const costoUsd = Number(((tilesTrasFree / 1000) * MAPBOX_PRICING_USD_PER_1K).toFixed(2))

  // Tiempo: depende del hardware. CPU x86 modesto ~0.3s/tile, GPU CUDA ~0.05s
  const tiempoMinutos = {
    cpu: Math.round((tiles * 0.3) / 60),
    gpu: Math.round((tiles * 0.05) / 60),
  }

  // Bytes: cada tile PNG 256x256 ~50KB
  const bytesAprox = tiles * 50_000

  return { buildings, tiles, costoUsd, tiempoMinutos, bytesAprox }
}

/** Formatea bytes como MB/GB legibles. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000_000) return (bytes / 1_000_000_000).toFixed(1) + ' GB'
  if (bytes >= 1_000_000) return (bytes / 1_000_000).toFixed(0) + ' MB'
  if (bytes >= 1_000) return (bytes / 1_000).toFixed(0) + ' KB'
  return bytes + ' B'
}
