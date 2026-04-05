import { defineStore } from 'pinia'
import { fetchGreenRoofs, fetchCandidates } from '~/services/repositories/roofs-repository'
import type {
  GreenRoof,
  CandidateRoof,
  Alcaldia,
  TipoEdificio,
  TipoTechoVerde,
  EstadoTecho,
  WithSourceMeta,
  GreenRoofExtended,
  CandidateRoofExtended,
} from '~/types'

// ---------------------------------------------------------------------------
// Filter state shape
// ---------------------------------------------------------------------------
interface RoofFilters {
  alcaldia: Alcaldia | null
  tipoEdificio: TipoEdificio | null
  tipoTechoVerde: TipoTechoVerde | null
  estado: EstadoTecho | null
  search: string
}

// ---------------------------------------------------------------------------
// Store state shape
// ---------------------------------------------------------------------------
interface RoofState {
  greenRoofs: WithSourceMeta<GreenRoofExtended>[]
  candidateRoofs: WithSourceMeta<CandidateRoofExtended>[]
  selectedRoof: GreenRoof | CandidateRoof | null
  filters: RoofFilters
  loading: boolean
}

// ---------------------------------------------------------------------------
// Store definition
// ---------------------------------------------------------------------------
export const useRoofsStore = defineStore('roofs', {
  state: (): RoofState => ({
    greenRoofs: [],
    candidateRoofs: [],
    selectedRoof: null,
    filters: {
      alcaldia: null,
      tipoEdificio: null,
      tipoTechoVerde: null,
      estado: null,
      search: '',
    },
    loading: false,
  }),

  getters: {
    /**
     * Green roofs filtered by the current filter criteria.
     */
    filteredGreenRoofs(state): WithSourceMeta<GreenRoofExtended>[] {
      return state.greenRoofs.filter((roof) => {
        if (state.filters.alcaldia && roof.alcaldia !== state.filters.alcaldia) return false
        if (state.filters.tipoEdificio && roof.tipoEdificio !== state.filters.tipoEdificio)
          return false
        if (state.filters.tipoTechoVerde && roof.tipoTechoVerde !== state.filters.tipoTechoVerde)
          return false
        if (state.filters.estado && roof.estado !== state.filters.estado) return false
        if (state.filters.search) {
          const q = state.filters.search.toLowerCase()
          const haystack = `${roof.nombre} ${roof.direccion} ${roof.alcaldia}`.toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      })
    },

    /**
     * Candidate roofs filtered by the current filter criteria.
     */
    filteredCandidates(state): WithSourceMeta<CandidateRoofExtended>[] {
      return state.candidateRoofs.filter((roof) => {
        if (state.filters.alcaldia && roof.alcaldia !== state.filters.alcaldia) return false
        if (state.filters.tipoEdificio && roof.tipoEdificio !== state.filters.tipoEdificio)
          return false
        if (state.filters.search) {
          const q = state.filters.search.toLowerCase()
          const haystack = `${roof.nombre} ${roof.direccion} ${roof.alcaldia}`.toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      })
    },

    /**
     * Group green roofs by alcaldia with counts and total superficie.
     */
    roofsByAlcaldia(state): Record<string, { count: number; superficie: number }> {
      const map: Record<string, { count: number; superficie: number }> = {}
      for (const roof of state.greenRoofs) {
        if (!map[roof.alcaldia]) {
          map[roof.alcaldia] = { count: 0, superficie: 0 }
        }
        map[roof.alcaldia].count++
        map[roof.alcaldia].superficie += roof.superficie
      }
      return map
    },

    /**
     * Total superficie (m2) across all green roofs.
     */
    totalSuperficie(state): number {
      return state.greenRoofs.reduce((sum, r) => sum + r.superficie, 0)
    },

    /**
     * Aggregated stats for quick dashboard consumption.
     */
    stats(state): {
      totalExistentes: number
      totalCandidatos: number
      totalSuperficie: number
      activos: number
      enMantenimiento: number
      inactivos: number
      nuevos: number
    } {
      const activos = state.greenRoofs.filter((r) => r.estado === 'activo').length
      const enMantenimiento = state.greenRoofs.filter(
        (r) => r.estado === 'en_mantenimiento',
      ).length
      const inactivos = state.greenRoofs.filter((r) => r.estado === 'inactivo').length
      const nuevos = state.greenRoofs.filter((r) => r.estado === 'nuevo').length

      return {
        totalExistentes: state.greenRoofs.length,
        totalCandidatos: state.candidateRoofs.length,
        totalSuperficie: state.greenRoofs.reduce((s, r) => s + r.superficie, 0),
        activos,
        enMantenimiento,
        inactivos,
        nuevos,
      }
    },
  },

  actions: {
    /**
     * Load data from the repository (official-first, mock fallback).
     */
    async loadRoofs(): Promise<void> {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const dataMode = config.public.dataMode as string
        const [roofs, candidates] = await Promise.all([
          fetchGreenRoofs(dataMode),
          fetchCandidates(dataMode),
        ])
        this.greenRoofs = roofs
        this.candidateRoofs = candidates
      } finally {
        this.loading = false
      }
    },

    /**
     * Set a single filter value. Pass `null` to clear that filter.
     */
    setFilter<K extends keyof RoofFilters>(key: K, value: RoofFilters[K]): void {
      this.filters[key] = value
    },

    /**
     * Reset all filters to their default (empty) state.
     */
    clearFilters(): void {
      this.filters = {
        alcaldia: null,
        tipoEdificio: null,
        tipoTechoVerde: null,
        estado: null,
        search: '',
      }
    },

    /**
     * Select a roof (green or candidate) for detail view / map highlight.
     */
    selectRoof(roof: GreenRoof | CandidateRoof | null): void {
      this.selectedRoof = roof
    },
  },
})
