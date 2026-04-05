import { computed } from 'vue'
import { useRoofsStore } from '~/stores/roofs'
import { useValidationStore } from '~/stores/validation'
import type { Alcaldia, TipoEdificio, NivelConfianza } from '~/types'

/**
 * Composable that derives computed statistics from the roofs and validation
 * stores.  All returned values are reactive -- they update automatically
 * whenever the underlying store data changes.
 */
export function useStats() {
  const roofsStore = useRoofsStore()
  const validationStore = useValidationStore()

  // -------------------------------------------------------------------------
  // Top-level counts
  // -------------------------------------------------------------------------

  /** Total number of registered (existing) green roofs. */
  const totalExistentes = computed<number>(() => roofsStore.greenRoofs.length)

  /** Total number of candidate roofs. */
  const totalCandidatos = computed<number>(() => roofsStore.candidateRoofs.length)

  /** Sum of superficie (m2) across all existing green roofs. */
  const totalSuperficie = computed<number>(() =>
    roofsStore.greenRoofs.reduce((sum, r) => sum + r.superficie, 0),
  )

  /** Sum of superficie (m2) across all candidate roofs. */
  const totalSuperficieCandidatos = computed<number>(() =>
    roofsStore.candidateRoofs.reduce((sum, r) => sum + r.superficie, 0),
  )

  // -------------------------------------------------------------------------
  // Grouped breakdowns
  // -------------------------------------------------------------------------

  /** Green roofs grouped by alcaldia with count and total superficie. */
  const roofsByAlcaldia = computed<Record<string, { count: number; superficie: number }>>(() => {
    const map: Record<string, { count: number; superficie: number }> = {}
    for (const roof of roofsStore.greenRoofs) {
      if (!map[roof.alcaldia]) {
        map[roof.alcaldia] = { count: 0, superficie: 0 }
      }
      map[roof.alcaldia].count++
      map[roof.alcaldia].superficie += roof.superficie
    }
    return map
  })

  /** All roofs (green + candidates) grouped by tipo de edificio. */
  const roofsByType = computed<
    Record<string, { existentes: number; candidatos: number }>
  >(() => {
    const map: Record<string, { existentes: number; candidatos: number }> = {}

    for (const roof of roofsStore.greenRoofs) {
      if (!map[roof.tipoEdificio]) map[roof.tipoEdificio] = { existentes: 0, candidatos: 0 }
      map[roof.tipoEdificio].existentes++
    }
    for (const roof of roofsStore.candidateRoofs) {
      if (!map[roof.tipoEdificio]) map[roof.tipoEdificio] = { existentes: 0, candidatos: 0 }
      map[roof.tipoEdificio].candidatos++
    }

    return map
  })

  // -------------------------------------------------------------------------
  // Candidate scoring
  // -------------------------------------------------------------------------

  /** Average aptitude score across all candidate roofs. */
  const avgScore = computed<number>(() => {
    const candidates = roofsStore.candidateRoofs
    if (candidates.length === 0) return 0
    const sum = candidates.reduce((acc, c) => acc + c.scoreAptitud, 0)
    return Math.round((sum / candidates.length) * 10) / 10
  })

  /** Distribution of candidates by score tier (alto/medio/bajo). */
  const scoreDistribution = computed<{
    alto: number
    medio: number
    bajo: number
  }>(() => {
    let alto = 0
    let medio = 0
    let bajo = 0

    for (const c of roofsStore.candidateRoofs) {
      if (c.scoreAptitud >= 80) alto++
      else if (c.scoreAptitud >= 60) medio++
      else bajo++
    }

    return { alto, medio, bajo }
  })

  // -------------------------------------------------------------------------
  // Validation statistics
  // -------------------------------------------------------------------------

  /** Distribution of validation records by confianza level. */
  const distributionByConfianza = computed<
    Record<NivelConfianza, number>
  >(() => {
    const dist: Record<NivelConfianza, number> = { alta: 0, media: 0, baja: 0 }
    for (const r of validationStore.records) {
      dist[r.confianza]++
    }
    return dist
  })

  /** Validation accuracy rate: confirmed / (confirmed + rejected). */
  const validationAccuracy = computed<number>(() => {
    const confirmed = validationStore.records.filter(
      (r) => r.estado === 'confirmado',
    ).length
    const rejected = validationStore.records.filter(
      (r) => r.estado === 'rechazado',
    ).length
    const total = confirmed + rejected
    if (total === 0) return 0
    return Math.round((confirmed / total) * 1000) / 10
  })

  /** Number of distinct alcaldias that have at least one green roof. */
  const alcaldiasCubiertas = computed<number>(() => {
    const unique = new Set<Alcaldia>(roofsStore.greenRoofs.map((r) => r.alcaldia))
    return unique.size
  })

  return {
    // Counts
    totalExistentes,
    totalCandidatos,
    totalSuperficie,
    totalSuperficieCandidatos,

    // Breakdowns
    roofsByAlcaldia,
    roofsByType,

    // Scoring
    avgScore,
    scoreDistribution,

    // Validation
    distributionByConfianza,
    validationAccuracy,

    // Coverage
    alcaldiasCubiertas,
  }
}
