/**
 * Composable para consultar índices espectrales desde ENVI/Sentinel Hub.
 *
 * Flujo: componente → useRemoteSensing → POST /api/envi/indices → ENVI Server | Sentinel Hub | local
 *
 * Uso:
 * ```vue
 * const { indices, serie, loading, error, fuente, calidad, fetchIndices } = useRemoteSensing()
 * await fetchIndices({ lat: 19.43, lng: -99.15, alcaldia: 'Cuauhtémoc' })
 * ```
 */

import type { IndicesEspectrales } from '~/types/remote-sensing'

export interface RemoteSensingQuery {
  lat: number
  lng: number
  alcaldia?: string
  radio?: number
  fechaInicio?: string
  fechaFin?: string
  indices?: string[]
}

interface SeriePoint {
  fecha: string
  indices: Record<string, number>
}

interface RemoteSensingResult {
  fuente: 'envi_server' | 'sentinel_hub' | 'datos_locales'
  indices: IndicesEspectrales
  serie?: SeriePoint[]
  calidad: {
    confianza: number
    resolucionM: number
    metodo: string
  }
  timestamp: string
}

export function useRemoteSensing() {
  const indices = ref<IndicesEspectrales | null>(null)
  const serie = ref<SeriePoint[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const fuente = ref<'google_earth_engine' | 'sentinel_hub' | 'datos_locales' | null>(null)
  const calidad = ref<RemoteSensingResult['calidad'] | null>(null)

  async function fetchIndices(query: RemoteSensingQuery) {
    loading.value = true
    error.value = null

    try {
      const result = await $fetch<RemoteSensingResult>('/api/envi/indices', {
        method: 'POST',
        body: query,
      })

      indices.value = result.indices as IndicesEspectrales
      serie.value = result.serie || []
      fuente.value = result.fuente
      calidad.value = result.calidad
    }
    catch (e: any) {
      error.value = e?.data?.statusMessage || e?.message || 'Error al consultar índices espectrales'
      indices.value = null
      serie.value = []
    }
    finally {
      loading.value = false
    }
  }

  /** Label legible de la fuente de datos */
  const fuenteLabel = computed(() => {
    switch (fuente.value) {
      case 'google_earth_engine': return 'Google Earth Engine (gratis)'
      case 'sentinel_hub': return 'Sentinel Hub (Copernicus)'
      case 'datos_locales': return 'Datos locales (placeholder)'
      default: return 'Sin datos'
    }
  })

  /** Color del badge de confianza */
  const confianzaColor = computed(() => {
    const c = calidad.value?.confianza ?? 0
    if (c >= 0.85) return 'text-eco'
    if (c >= 0.70) return 'text-accent'
    return 'text-alert'
  })

  return {
    indices,
    serie,
    loading,
    error,
    fuente,
    fuenteLabel,
    calidad,
    confianzaColor,
    fetchIndices,
  }
}
