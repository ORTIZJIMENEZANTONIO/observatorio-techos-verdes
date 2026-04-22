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

// ── localStorage persistence for visible/archivado overrides ──
const GR_STORAGE_KEY = 'obs-techos-verdes-overrides'
const CR_STORAGE_KEY = 'obs-techos-verdes-candidates-overrides'

function loadOverrides(key: string): Record<number, { visible?: boolean; archivado?: boolean }> {
  if (typeof localStorage === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} }
}

function saveOverrides(key: string, overrides: Record<number, { visible?: boolean; archivado?: boolean }>) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, JSON.stringify(overrides))
}

function applyOverrides<T extends { id: number }>(items: T[], key: string): T[] {
  const overrides = loadOverrides(key)
  return items.map(item => {
    const ov = overrides[item.id]
    return ov ? { ...item, ...ov } : item
  })
}

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
    /** Public green roofs (exclude archived/hidden) */
    publicGreenRoofs(state): WithSourceMeta<GreenRoofExtended>[] {
      return state.greenRoofs.filter(r => !r.archivado && r.visible !== false)
    },

    /** Public candidates (exclude archived/hidden) */
    publicCandidateRoofs(state): WithSourceMeta<CandidateRoofExtended>[] {
      return state.candidateRoofs.filter(r => !r.archivado && r.visible !== false)
    },

    /** Green roofs filtered by the current filter criteria (public only). */
    filteredGreenRoofs(state): WithSourceMeta<GreenRoofExtended>[] {
      return state.greenRoofs.filter((roof) => {
        if (roof.archivado) return false
        if (roof.visible === false) return false
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

    /** Candidate roofs filtered by the current filter criteria (public only). */
    filteredCandidates(state): WithSourceMeta<CandidateRoofExtended>[] {
      return state.candidateRoofs.filter((roof) => {
        if (roof.archivado) return false
        if (roof.visible === false) return false
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

    /** Group public green roofs by alcaldia */
    roofsByAlcaldia(): Record<string, { count: number; superficie: number }> {
      const map: Record<string, { count: number; superficie: number }> = {}
      for (const roof of this.publicGreenRoofs) {
        if (!map[roof.alcaldia]) {
          map[roof.alcaldia] = { count: 0, superficie: 0 }
        }
        map[roof.alcaldia].count++
        map[roof.alcaldia].superficie += roof.superficie
      }
      return map
    },

    /** Total superficie (m2) across public green roofs. */
    totalSuperficie(): number {
      return this.publicGreenRoofs.reduce((sum: number, r: any) => sum + r.superficie, 0)
    },

    /** Aggregated stats — public counts for dashboard. */
    stats(): {
      totalExistentes: number
      totalCandidatos: number
      totalSuperficie: number
      activos: number
      enMantenimiento: number
      inactivos: number
      nuevos: number
    } {
      const pub = this.publicGreenRoofs
      return {
        totalExistentes: pub.length,
        totalCandidatos: this.publicCandidateRoofs.length,
        totalSuperficie: pub.reduce((s: number, r: any) => s + r.superficie, 0),
        activos: pub.filter((r: any) => r.estado === 'activo').length,
        enMantenimiento: pub.filter((r: any) => r.estado === 'en_mantenimiento').length,
        inactivos: pub.filter((r: any) => r.estado === 'inactivo').length,
        nuevos: pub.filter((r: any) => r.estado === 'nuevo').length,
      }
    },
  },

  actions: {
    /** Load data from the repository (official-first, mock fallback). */
    async loadRoofs(): Promise<void> {
      this.loading = true
      try {
        const dataMode = (typeof useRuntimeConfig !== 'undefined' ? useRuntimeConfig().public.dataMode : 'mock') as string
        const [roofs, candidates] = await Promise.all([
          fetchGreenRoofs(dataMode),
          fetchCandidates(dataMode),
        ])
        this.greenRoofs = applyOverrides(roofs, GR_STORAGE_KEY)
        this.candidateRoofs = applyOverrides(candidates, CR_STORAGE_KEY)
      } finally {
        this.loading = false
      }
    },

    /** Replace green roofs (from backend) with overrides applied. */
    setGreenRoofs(items: any[]): void {
      this.greenRoofs = applyOverrides(items, GR_STORAGE_KEY)
    },

    /** Replace candidates (from backend) with overrides applied. */
    setCandidateRoofs(items: any[]): void {
      this.candidateRoofs = applyOverrides(items, CR_STORAGE_KEY)
    },

    /** Update a green roof and persist visible/archivado to localStorage. */
    updateGreenRoof(id: number, data: Partial<GreenRoof>): void {
      const idx = this.greenRoofs.findIndex(r => r.id === id)
      if (idx === -1) return
      this.greenRoofs[idx] = { ...this.greenRoofs[idx], ...data } as any
      if ('visible' in data || 'archivado' in data) {
        const overrides = loadOverrides(GR_STORAGE_KEY)
        overrides[id] = { ...overrides[id], ...(data.visible !== undefined ? { visible: data.visible } : {}), ...(data.archivado !== undefined ? { archivado: data.archivado } : {}) }
        saveOverrides(GR_STORAGE_KEY, overrides)
      }
    },

    /** Update a candidate and persist visible/archivado to localStorage. */
    updateCandidate(id: number, data: Partial<CandidateRoof>): void {
      const idx = this.candidateRoofs.findIndex(r => r.id === id)
      if (idx === -1) return
      this.candidateRoofs[idx] = { ...this.candidateRoofs[idx], ...data } as any
      if ('visible' in data || 'archivado' in data) {
        const overrides = loadOverrides(CR_STORAGE_KEY)
        overrides[id] = { ...overrides[id], ...(data.visible !== undefined ? { visible: data.visible } : {}), ...(data.archivado !== undefined ? { archivado: data.archivado } : {}) }
        saveOverrides(CR_STORAGE_KEY, overrides)
      }
    },

    setFilter<K extends keyof RoofFilters>(key: K, value: RoofFilters[K]): void {
      this.filters[key] = value
    },

    clearFilters(): void {
      this.filters = {
        alcaldia: null,
        tipoEdificio: null,
        tipoTechoVerde: null,
        estado: null,
        search: '',
      }
    },

    selectRoof(roof: GreenRoof | CandidateRoof | null): void {
      this.selectedRoof = roof
    },
  },
})
