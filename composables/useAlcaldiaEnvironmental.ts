import { indicesBioticos } from '~/data/mock-indices-bioticos'
import { indicadoresHidricos } from '~/data/mock-indicadores-hidricos'

export type MetricaBiotica = 'indiceBiodiversidad' | 'coberturaVegetal' | 'riquezaEspecies' | 'indiceShannonWiener' | 'indiceSimpson'
export type MetricaHidrica = 'captacionPluvial' | 'precipitacionMediaAnual' | 'eficienciaRetencion' | 'escorrentiaEvitada'
export type MetricaAmbiental = MetricaBiotica | MetricaHidrica

export interface MetricaConfig {
  key: MetricaAmbiental
  label: string
  unidad: string
  grupo: 'biotico' | 'hidrico'
  colorScale: 'green' | 'blue'
}

export const metricasAmbientales: MetricaConfig[] = [
  { key: 'indiceBiodiversidad', label: 'Indice de biodiversidad', unidad: '0-100', grupo: 'biotico', colorScale: 'green' },
  { key: 'coberturaVegetal', label: 'Cobertura vegetal', unidad: '%', grupo: 'biotico', colorScale: 'green' },
  { key: 'riquezaEspecies', label: 'Riqueza de especies', unidad: 'spp', grupo: 'biotico', colorScale: 'green' },
  { key: 'indiceShannonWiener', label: "Shannon H'", unidad: 'H\'', grupo: 'biotico', colorScale: 'green' },
  { key: 'indiceSimpson', label: 'Simpson 1-D', unidad: '1-D', grupo: 'biotico', colorScale: 'green' },
  { key: 'captacionPluvial', label: 'Captacion pluvial', unidad: 'L/m\u00B2/a\u00F1o', grupo: 'hidrico', colorScale: 'blue' },
  { key: 'precipitacionMediaAnual', label: 'Precipitacion media anual', unidad: 'mm/a\u00F1o', grupo: 'hidrico', colorScale: 'blue' },
  { key: 'eficienciaRetencion', label: 'Eficiencia de retencion', unidad: '%', grupo: 'hidrico', colorScale: 'blue' },
  { key: 'escorrentiaEvitada', label: 'Escorrentia evitada', unidad: 'L/a\u00F1o', grupo: 'hidrico', colorScale: 'blue' },
]

/**
 * Proveedor de datos ambientales por alcaldia para coropletas del mapa.
 */
export function useAlcaldiaEnvironmental() {
  const bioticaKeys: MetricaBiotica[] = ['indiceBiodiversidad', 'coberturaVegetal', 'riquezaEspecies', 'indiceShannonWiener', 'indiceSimpson']
  const hidricaKeys: MetricaHidrica[] = ['captacionPluvial', 'precipitacionMediaAnual', 'eficienciaRetencion', 'escorrentiaEvitada']

  /** Obtiene valores crudos por alcaldia para una metrica */
  function getAlcaldiaMetric(metricKey: MetricaAmbiental): Map<string, number> {
    const result = new Map<string, number>()

    if ((bioticaKeys as string[]).includes(metricKey)) {
      indicesBioticos.forEach(b => {
        const val = b[metricKey as MetricaBiotica]
        if (typeof val === 'number') {
          result.set(b.alcaldia, val)
        }
      })
    } else if ((hidricaKeys as string[]).includes(metricKey)) {
      indicadoresHidricos.forEach(h => {
        const val = h[metricKey as MetricaHidrica]
        if (typeof val === 'number') {
          result.set(h.alcaldia, val)
        }
      })
    }

    return result
  }

  /** Obtiene valores normalizados (0-100) por alcaldia para coropleta */
  function getAlcaldiaMetricNormalized(metricKey: MetricaAmbiental): Map<string, number> {
    const raw = getAlcaldiaMetric(metricKey)
    if (raw.size === 0) return raw

    let min = Infinity
    let max = -Infinity
    raw.forEach(v => {
      if (v < min) min = v
      if (v > max) max = v
    })

    const range = max - min
    if (range === 0) {
      const result = new Map<string, number>()
      raw.forEach((_, k) => result.set(k, 50))
      return result
    }

    const result = new Map<string, number>()
    raw.forEach((v, k) => {
      result.set(k, ((v - min) / range) * 100)
    })
    return result
  }

  /** Obtiene configuracion de una metrica */
  function getMetricConfig(metricKey: MetricaAmbiental): MetricaConfig | undefined {
    return metricasAmbientales.find(m => m.key === metricKey)
  }

  /** Estadisticas basicas de una metrica */
  function getMetricStats(metricKey: MetricaAmbiental): { promedio: number; min: number; max: number } {
    const raw = getAlcaldiaMetric(metricKey)
    if (raw.size === 0) return { promedio: 0, min: 0, max: 0 }

    let sum = 0
    let min = Infinity
    let max = -Infinity
    raw.forEach(v => {
      sum += v
      if (v < min) min = v
      if (v > max) max = v
    })

    return {
      promedio: sum / raw.size,
      min,
      max,
    }
  }

  return {
    getAlcaldiaMetric,
    getAlcaldiaMetricNormalized,
    getMetricConfig,
    getMetricStats,
  }
}
