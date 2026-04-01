import type { WithSourceMeta, LecturaCalidadAire } from '~/types'
import { getMockAirQuality } from '~/services/sources/mock-source'

export async function fetchCurrentAirQuality(
  dataMode: string,
): Promise<WithSourceMeta<LecturaCalidadAire>[]> {
  if (dataMode === 'official') {
    try {
      // TODO: Implementar adaptador SIMAT para datos en tiempo real
      console.warn('[air-quality-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.')
    } catch (e) {
      console.warn('[air-quality-repository] Error en fuente oficial, fallback a mock:', e)
    }
  }
  return getMockAirQuality()
}
