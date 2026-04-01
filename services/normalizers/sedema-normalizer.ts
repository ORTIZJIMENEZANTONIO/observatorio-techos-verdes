import type { CapaTerritorial } from '~/types/sources'

/**
 * Normaliza un feature GeoJSON de SEDEMA al modelo interno CapaTerritorial.
 * Stub: sera implementado cuando se conecte al portal de datos de SEDEMA.
 */
export function normalizeAreaVerde(rawFeature: Record<string, unknown>): CapaTerritorial {
  const props = (rawFeature['properties'] || {}) as Record<string, unknown>
  return {
    id: String(props['ID'] || props['id'] || ''),
    nombre: String(props['NOMBRE'] || props['nombre'] || ''),
    tipo: String(props['TIPO'] || props['tipo'] || 'area_verde'),
    propiedades: props,
  }
}
