import type { LecturaCalidadAire } from '~/types/sources'

/**
 * Normaliza un registro crudo del SIMAT al modelo interno LecturaCalidadAire.
 * Stub: sera implementado cuando se conecte al API de SIMAT.
 */
export function normalizeLectura(raw: Record<string, unknown>): LecturaCalidadAire {
  return {
    estacion: (raw['estacion'] || raw['station_name'] || '') as string,
    parametro: (raw['parametro'] || raw['parameter'] || '') as string,
    valor: Number(raw['valor'] || raw['value'] || 0),
    unidad: (raw['unidad'] || raw['unit'] || '') as string,
    fecha: (raw['fecha'] || raw['date'] || '') as string,
  }
}
