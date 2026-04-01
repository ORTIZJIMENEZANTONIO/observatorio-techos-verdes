import type {
  WithSourceMeta,
  GreenRoofExtended,
  CandidateRoofExtended,
} from '~/types'
import { getMockGreenRoofs, getMockCandidates } from '~/services/sources/mock-source'

export async function fetchGreenRoofs(
  dataMode: string,
): Promise<WithSourceMeta<GreenRoofExtended>[]> {
  if (dataMode === 'official') {
    try {
      // TODO: Implementar adaptador oficial SEDEMA/SIGCDMX
      console.warn('[roofs-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.')
    } catch (e) {
      console.warn('[roofs-repository] Error en fuente oficial, fallback a mock:', e)
    }
  }
  return getMockGreenRoofs()
}

export async function fetchCandidates(
  dataMode: string,
): Promise<WithSourceMeta<CandidateRoofExtended>[]> {
  if (dataMode === 'official') {
    try {
      // TODO: Implementar adaptador oficial SIGCDMX + enriquecimiento catastral
      console.warn('[roofs-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.')
    } catch (e) {
      console.warn('[roofs-repository] Error en fuente oficial, fallback a mock:', e)
    }
  }
  return getMockCandidates()
}
