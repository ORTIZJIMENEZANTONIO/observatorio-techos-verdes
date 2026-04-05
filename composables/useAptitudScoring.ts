import { indicesBioticos } from '~/data/mock-indices-bioticos'
import { indicadoresHidricos } from '~/data/mock-indicadores-hidricos'
import { aptitudPesos } from '~/data/aptitud-pesos'
import type { CandidateRoof, Alcaldia } from '~/types'

/**
 * Motor de calculo de aptitud territorial con 11 variables.
 * Resuelve el lookup alcaldia → datos ambientales para enriquecer el modelo.
 */
export function useAptitudScoring() {
  // Lookup maps: datos ambientales por alcaldia
  const bioMap = new Map(indicesBioticos.map(b => [b.alcaldia, b]))
  const hydMap = new Map(indicadoresHidricos.map(h => [h.alcaldia, h]))

  // Toggle entre modelo original (8 var) y modelo ambiental (11 var)
  const useEnhanced = ref(false)

  // Rangos de normalizacion calibrados con datos mock
  const ranges: Record<string, { min: number; max: number }> = {
    lst: { min: 25, max: 42 },
    areaUrbanizada: { min: 30, max: 100 },
    poblacion: { min: 500, max: 25000 },
    ndvi: { min: 0.05, max: 0.65 },
    densidadVial: { min: 2, max: 25 },
    o3: { min: 20, max: 80 },
    co: { min: 0.3, max: 3.5 },
    no2: { min: 8, max: 55 },
    indiceBiodiversidad: { min: 30, max: 90 },
    coberturaVegetal: { min: 40, max: 95 },
    captacionPluvial: { min: 14, max: 26 },
  }

  // Variables INVERSAS: bajo raw = alta aptitud (zona con deficit → mas necesidad)
  const inverseVars = new Set(['ndvi', 'indiceBiodiversidad', 'coberturaVegetal', 'captacionPluvial'])

  /** Normaliza un valor crudo a escala 0-100 */
  function normalize(key: string, raw: number): number {
    const r = ranges[key]
    if (!r) return 50
    const clamped = Math.max(r.min, Math.min(r.max, raw))
    let norm = ((clamped - r.min) / (r.max - r.min)) * 100
    if (inverseVars.has(key)) {
      norm = 100 - norm
    }
    return norm
  }

  /** Obtiene los pesos segun el modo (8 o 11 variables) */
  function getWeights(): Map<string, number> {
    const map = new Map<string, number>()
    const pesosToUse = useEnhanced.value ? aptitudPesos : aptitudPesos.filter(p => !['indiceBiodiversidad', 'coberturaVegetal', 'captacionPluvial'].includes(p.codigo))
    pesosToUse.forEach(p => map.set(p.codigo, p.peso / 100))
    return map
  }

  /** Calcula score de aptitud para un candidato (0-100) */
  function computeScore(candidate: CandidateRoof): number {
    const weights = getWeights()
    const bio = bioMap.get(candidate.alcaldia as Alcaldia)
    const hyd = hydMap.get(candidate.alcaldia as Alcaldia)

    // Variables base (8 originales)
    const values: Record<string, number> = {
      lst: candidate.variables.lst,
      areaUrbanizada: candidate.variables.areaUrbanizada,
      poblacion: candidate.variables.poblacion,
      ndvi: candidate.variables.ndvi,
      densidadVial: candidate.variables.densidadVial,
      o3: candidate.variables.o3,
      co: candidate.variables.co,
      no2: candidate.variables.no2,
    }

    // Agregar variables ambientales si modo enhanced
    if (useEnhanced.value) {
      values.indiceBiodiversidad = bio?.indiceBiodiversidad ?? 50
      values.coberturaVegetal = bio?.coberturaVegetal ?? 50
      values.captacionPluvial = hyd?.captacionPluvial ?? 18
    }

    let score = 0
    weights.forEach((weight, key) => {
      const raw = values[key]
      if (raw !== undefined) {
        score += normalize(key, raw) * weight
      }
    })

    return Math.round(Math.max(0, Math.min(100, score)))
  }

  /** Recalcula scores para un array de candidatos */
  function recalculateAll(candidates: CandidateRoof[]): Map<number, number> {
    const result = new Map<number, number>()
    candidates.forEach(c => {
      result.set(c.id, computeScore(c))
    })
    return result
  }

  return {
    useEnhanced,
    computeScore,
    recalculateAll,
    normalize,
  }
}
