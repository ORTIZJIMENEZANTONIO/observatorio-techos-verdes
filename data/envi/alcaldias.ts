/**
 * Datos ENVI por alcaldía — estadísticas zonales de índices espectrales.
 *
 * PLACEHOLDER: estos valores son estimaciones basadas en literatura y datos
 * SEDEMA/CONABIO. Serán reemplazados por datos reales cuando el pipeline
 * ENVI esté operativo (Sentinel-2 L2A + Landsat 8/9 → ENVI → zonal stats).
 *
 * Fuentes de calibración:
 * - LST: Cervantes Nájera (2025), Atlas de Riesgos CDMX
 * - NDVI: CONABIO, SEDEMA inventario de áreas verdes
 * - Precipitación: SMN/CONAGUA estaciones climatológicas CDMX
 */

import type { ENVIAlcaldiaData } from '~/types/remote-sensing'

function generarSerie(baseValues: Record<string, number>, fechaInicio: string, fechaFin: string) {
  const obs = []
  const start = new Date(fechaInicio)
  const end = new Date(fechaFin)
  const current = new Date(start)

  while (current <= end) {
    // Variación estacional: NDVI más alto en lluvias (jun-oct), LST más alto en secas (mar-may)
    const mes = current.getMonth()
    const esLluvias = mes >= 5 && mes <= 9
    const factorNDVI = esLluvias ? 1.12 : 0.88
    const factorLST = esLluvias ? 0.92 : 1.08

    obs.push({
      fecha: current.toISOString().split('T')[0],
      satelite: 'sentinel-2' as const,
      nubosidad: esLluvias ? 35 + Math.random() * 30 : 5 + Math.random() * 15,
      indices: {
        ndvi: +(baseValues.ndvi * factorNDVI * (0.95 + Math.random() * 0.1)).toFixed(4),
        evi: +(baseValues.evi * factorNDVI * (0.95 + Math.random() * 0.1)).toFixed(4),
        savi: +(baseValues.savi * factorNDVI * (0.95 + Math.random() * 0.1)).toFixed(4),
        ndwi: +(baseValues.ndwi * (esLluvias ? 1.15 : 0.85) * (0.95 + Math.random() * 0.1)).toFixed(4),
        lst: +(baseValues.lst * factorLST * (0.97 + Math.random() * 0.06)).toFixed(1),
      },
    })
    current.setMonth(current.getMonth() + 1)
  }
  return obs
}

function calcEstadistica(valores: number[]) {
  const sorted = [...valores].sort((a, b) => a - b)
  const n = sorted.length
  const mean = valores.reduce((s, v) => s + v, 0) / n
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]
  const stdDev = Math.sqrt(valores.reduce((s, v) => s + (v - mean) ** 2, 0) / n)
  // Tendencia lineal simple (unidades por año)
  const xs = valores.map((_, i) => i / 12) // meses → años
  const meanX = xs.reduce((s, x) => s + x, 0) / n
  const num = xs.reduce((s, x, i) => s + (x - meanX) * (valores[i] - mean), 0)
  const den = xs.reduce((s, x) => s + (x - meanX) ** 2, 0)
  const slope = den === 0 ? 0 : num / den
  const ssTot = valores.reduce((s, v) => s + (v - mean) ** 2, 0)
  const ssRes = valores.reduce((s, v, i) => s + (v - (mean + slope * (xs[i] - meanX))) ** 2, 0)
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot
  return { media: +mean.toFixed(4), mediana: +median.toFixed(4), desviacionEstandar: +stdDev.toFixed(4), min: sorted[0], max: sorted[n - 1], tendencia: +slope.toFixed(4), r2Tendencia: +r2.toFixed(4) }
}

function buildAlcaldiaData(alcaldia: string, base: Record<string, number>): ENVIAlcaldiaData {
  const serie = generarSerie(base, '2019-01-15', '2025-06-15')
  const ndviVals = serie.map(o => o.indices.ndvi)
  const eviVals = serie.map(o => o.indices.evi)
  const saviVals = serie.map(o => o.indices.savi)
  const ndwiVals = serie.map(o => o.indices.ndwi)
  const lstVals = serie.map(o => o.indices.lst)
  const ultimo = serie[serie.length - 1].indices

  return {
    alcaldia: alcaldia as any,
    fechaProcesamiento: '2025-06-20',
    actual: ultimo,
    historico: {
      ndvi: calcEstadistica(ndviVals),
      evi: calcEstadistica(eviVals),
      savi: calcEstadistica(saviVals),
      ndwi: calcEstadistica(ndwiVals),
      lst: calcEstadistica(lstVals),
    },
    serie: {
      observaciones: serie,
      estadisticas: {
        inicio: serie[0].fecha,
        fin: serie[serie.length - 1].fecha,
        totalObservaciones: serie.length,
        intervaloPromedioDias: 30,
      },
    },
    calidad: {
      porcentajePixelesValidos: 92,
      resolucionEspacialM: 10,
      sistemaCoordenadasEPSG: 32614,
      metodoAtmosferico: 'L2A_Sen2Cor',
      metodoLST: 'single_channel',
    },
  }
}

// Valores base por alcaldía calibrados con datos SEDEMA, CONABIO, Atlas de Riesgos
const baseData: Record<string, Record<string, number>> = {
  'Álvaro Obregón':     { ndvi: 0.28, evi: 0.22, savi: 0.25, ndwi: -0.15, lst: 34.2 },
  'Azcapotzalco':       { ndvi: 0.12, evi: 0.09, savi: 0.10, ndwi: -0.28, lst: 37.8 },
  'Benito Juárez':      { ndvi: 0.14, evi: 0.11, savi: 0.12, ndwi: -0.25, lst: 36.5 },
  'Coyoacán':           { ndvi: 0.32, evi: 0.26, savi: 0.29, ndwi: -0.12, lst: 33.1 },
  'Cuajimalpa':         { ndvi: 0.52, evi: 0.42, savi: 0.46, ndwi: -0.02, lst: 28.4 },
  'Cuauhtémoc':         { ndvi: 0.08, evi: 0.06, savi: 0.07, ndwi: -0.32, lst: 39.1 },
  'Gustavo A. Madero':  { ndvi: 0.18, evi: 0.14, savi: 0.16, ndwi: -0.22, lst: 36.8 },
  'Iztacalco':          { ndvi: 0.10, evi: 0.08, savi: 0.09, ndwi: -0.30, lst: 38.2 },
  'Iztapalapa':         { ndvi: 0.11, evi: 0.08, savi: 0.09, ndwi: -0.29, lst: 38.5 },
  'Magdalena Contreras': { ndvi: 0.48, evi: 0.38, savi: 0.42, ndwi: -0.05, lst: 29.2 },
  'Miguel Hidalgo':     { ndvi: 0.22, evi: 0.17, savi: 0.19, ndwi: -0.18, lst: 35.4 },
  'Milpa Alta':         { ndvi: 0.58, evi: 0.47, savi: 0.52, ndwi: 0.02, lst: 26.8 },
  'Tláhuac':            { ndvi: 0.25, evi: 0.20, savi: 0.22, ndwi: -0.10, lst: 34.8 },
  'Tlalpan':            { ndvi: 0.45, evi: 0.36, savi: 0.40, ndwi: -0.04, lst: 30.1 },
  'Venustiano Carranza': { ndvi: 0.09, evi: 0.07, savi: 0.08, ndwi: -0.31, lst: 38.8 },
  'Xochimilco':         { ndvi: 0.38, evi: 0.30, savi: 0.34, ndwi: 0.05, lst: 31.5 },
}

export const enviAlcaldias: ENVIAlcaldiaData[] = Object.entries(baseData)
  .map(([alc, base]) => buildAlcaldiaData(alc, base))
