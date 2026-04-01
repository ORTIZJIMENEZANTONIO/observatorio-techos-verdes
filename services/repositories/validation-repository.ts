import type { WithSourceMeta, ValidationRecordExtended } from '~/types'
import { getMockValidations } from '~/services/sources/mock-source'

export async function fetchValidationRecords(
  dataMode: string,
): Promise<WithSourceMeta<ValidationRecordExtended>[]> {
  if (dataMode === 'official') {
    try {
      // TODO: Implementar adaptador oficial para registros de validación
      console.warn('[validation-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.')
    } catch (e) {
      console.warn('[validation-repository] Error en fuente oficial, fallback a mock:', e)
    }
  }
  return getMockValidations()
}
