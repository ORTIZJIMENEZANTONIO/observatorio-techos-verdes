import type { EstadoTecho, EstatusCandidato, NivelConfianza } from '~/types'

/**
 * Map configuration composable for Leaflet-based map components.
 * Provides marker colours, layer styles, tile config, and defaults
 * for the Observatorio de Techos Verdes CDMX interactive map.
 */
export function useMapConfig() {
  // ---------------------------------------------------------------------------
  // Defaults
  // ---------------------------------------------------------------------------
  const defaultCenter: [number, number] = [19.4326, -99.1332]
  const defaultZoom = 11

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tileAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  // ---------------------------------------------------------------------------
  // Marker colours by EstadoTecho
  // ---------------------------------------------------------------------------
  const estadoColors: Record<EstadoTecho, string> = {
    activo: '#16A34A',          // green-600
    en_mantenimiento: '#F59E0B', // amber-500
    inactivo: '#9CA3AF',        // gray-400
    nuevo: '#3B82F6',           // blue-500
  }

  // ---------------------------------------------------------------------------
  // Marker colours by EstatusCandidato
  // ---------------------------------------------------------------------------
  const estatusCandidatoColors: Record<EstatusCandidato, string> = {
    candidato: '#8B5CF6',             // violet-500
    validado_visualmente: '#06B6D4',  // cyan-500
    factibilidad_pendiente: '#F97316', // orange-500
    piloto: '#3B82F6',                // blue-500
    implementado: '#16A34A',          // green-600
  }

  // ---------------------------------------------------------------------------
  // Marker colours by NivelConfianza
  // ---------------------------------------------------------------------------
  const confianzaColors: Record<NivelConfianza, string> = {
    alta: '#16A34A',
    media: '#F59E0B',
    baja: '#EF4444',
  }

  // ---------------------------------------------------------------------------
  // Layer styles for the thematic layers
  // ---------------------------------------------------------------------------
  interface LayerStyle {
    color: string
    weight: number
    opacity: number
    fillColor: string
    fillOpacity: number
  }

  const layerStyles: Record<string, LayerStyle> = {
    existentes: {
      color: '#16A34A',
      weight: 2,
      opacity: 0.8,
      fillColor: '#16A34A',
      fillOpacity: 0.3,
    },
    candidatos: {
      color: '#8B5CF6',
      weight: 2,
      opacity: 0.8,
      fillColor: '#8B5CF6',
      fillOpacity: 0.3,
    },
    aptitud: {
      color: '#F59E0B',
      weight: 2,
      opacity: 0.8,
      fillColor: '#F59E0B',
      fillOpacity: 0.3,
    },
  }

  // ---------------------------------------------------------------------------
  // Score-based colour for aptitud heatmap / marker fill
  // ---------------------------------------------------------------------------
  function getScoreColor(score: number): string {
    if (score >= 80) return '#16A34A'       // green-600
    if (score >= 60) return '#F59E0B'       // amber-500
    if (score >= 40) return '#F97316'       // orange-500
    return '#EF4444'                        // red-500
  }

  // ---------------------------------------------------------------------------
  // Composite helper: pick the right marker colour depending on data type
  // ---------------------------------------------------------------------------
  function getMarkerColor(
    type: 'green_roof' | 'candidate',
    status: EstadoTecho | EstatusCandidato,
  ): string {
    if (type === 'green_roof') {
      return estadoColors[status as EstadoTecho] ?? '#6B7280'
    }
    return estatusCandidatoColors[status as EstatusCandidato] ?? '#6B7280'
  }

  // ---------------------------------------------------------------------------
  // Composite helper: get the style for a given layer name
  // ---------------------------------------------------------------------------
  function getLayerStyle(layer: string): LayerStyle {
    return (
      layerStyles[layer] ?? {
        color: '#6B7280',
        weight: 1,
        opacity: 0.6,
        fillColor: '#6B7280',
        fillOpacity: 0.2,
      }
    )
  }

  return {
    defaultCenter,
    defaultZoom,
    tileUrl,
    tileAttribution,
    estadoColors,
    estatusCandidatoColors,
    confianzaColors,
    getScoreColor,
    getMarkerColor,
    getLayerStyle,
  }
}
