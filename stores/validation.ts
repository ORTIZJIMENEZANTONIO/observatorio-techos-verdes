import { defineStore } from 'pinia'
import { fetchValidationRecords } from '~/services/repositories/validation-repository'
import type { ValidationRecord, NivelConfianza, WithSourceMeta, ValidationRecordExtended, SourceMeta, RoofAnalysisResult } from '~/types'

// ── localStorage persistence for visible/archivado overrides ──
const VR_STORAGE_KEY = 'obs-techos-verdes-validation-overrides'

function loadOverrides(): Record<number, { visible?: boolean; archivado?: boolean }> {
  if (typeof localStorage === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(VR_STORAGE_KEY) || '{}') } catch { return {} }
}

function saveOverrides(overrides: Record<number, { visible?: boolean; archivado?: boolean }>) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(VR_STORAGE_KEY, JSON.stringify(overrides))
}

function applyOverrides<T extends { id: number }>(items: T[]): T[] {
  const ov = loadOverrides()
  return items.map(item => { const o = ov[item.id]; return o ? { ...item, ...o } : item })
}

// ---------------------------------------------------------------------------
// Store state shape
// ---------------------------------------------------------------------------
interface ValidationState {
  records: WithSourceMeta<ValidationRecordExtended>[]
  currentRecord: ValidationRecord | null
  filterEstado: ValidationRecord['estado'] | null
  loading: boolean
}

// ---------------------------------------------------------------------------
// Store definition
// ---------------------------------------------------------------------------
export const useValidationStore = defineStore('validation', {
  state: (): ValidationState => ({
    records: [],
    currentRecord: null,
    filterEstado: null,
    loading: false,
  }),

  getters: {
    /** Public records (exclude archived/hidden) */
    publicRecords(state): WithSourceMeta<ValidationRecordExtended>[] {
      return state.records.filter(r => !r.archivado && r.visible !== false)
    },

    /** Number of records still awaiting human review. */
    pendingCount(state): number {
      return state.records.filter((r) => r.estado === 'pendiente').length
    },

    /** Records filtered by the current estado filter (public only). */
    filteredRecords(state): WithSourceMeta<ValidationRecordExtended>[] {
      return state.records.filter((r) => {
        if (r.archivado) return false
        if (r.visible === false) return false
        if (state.filterEstado && r.estado !== state.filterEstado) return false
        return true
      })
    },

    /** Breakdown of records by confianza level. */
    statsByConfianza(state): Record<NivelConfianza, { total: number; confirmados: number; rechazados: number; pendientes: number }> {
      const levels: NivelConfianza[] = ['alta', 'media', 'baja']
      const result = {} as Record<
        NivelConfianza,
        { total: number; confirmados: number; rechazados: number; pendientes: number }
      >
      for (const nivel of levels) {
        const subset = state.records.filter((r) => r.confianza === nivel)
        result[nivel] = {
          total: subset.length,
          confirmados: subset.filter((r) => r.estado === 'confirmado').length,
          rechazados: subset.filter((r) => r.estado === 'rechazado').length,
          pendientes: subset.filter((r) => r.estado === 'pendiente').length,
        }
      }
      return result
    },
  },

  actions: {
    /** Load data from the repository (official-first, mock fallback). */
    async loadRecords(): Promise<void> {
      this.loading = true
      try {
        const dataMode = (typeof useRuntimeConfig !== 'undefined' ? useRuntimeConfig().public.dataMode : 'mock') as string
        this.records = applyOverrides(await fetchValidationRecords(dataMode))
      } finally {
        this.loading = false
      }
    },

    /** Replace records (from backend) with overrides applied. */
    setRecords(items: any[]): void {
      this.records = applyOverrides(items)
    },

    /** Update a record and persist visible/archivado to localStorage. */
    updateRecord(id: number, data: Partial<ValidationRecord>): void {
      const idx = this.records.findIndex(r => r.id === id)
      if (idx === -1) return
      this.records[idx] = { ...this.records[idx], ...data } as any
      if ('visible' in data || 'archivado' in data) {
        const overrides = loadOverrides()
        overrides[id] = { ...overrides[id], ...(data.visible !== undefined ? { visible: data.visible } : {}), ...(data.archivado !== undefined ? { archivado: data.archivado } : {}) }
        saveOverrides(overrides)
      }
    },

    confirmRecord(id: number, reviewer: string): void {
      const record = this.records.find((r) => r.id === id)
      if (!record) return
      record.estado = 'confirmado'
      record.revisadoPor = reviewer
      record.fechaRevision = new Date().toISOString().slice(0, 10)
    },

    rejectRecord(id: number, reviewer: string): void {
      const record = this.records.find((r) => r.id === id)
      if (!record) return
      record.estado = 'rechazado'
      record.revisadoPor = reviewer
      record.fechaRevision = new Date().toISOString().slice(0, 10)
    },

    markIndeterminate(id: number, reviewer: string): void {
      const record = this.records.find((r) => r.id === id)
      if (!record) return
      record.estado = 'indeterminado'
      record.revisadoPor = reviewer
      record.fechaRevision = new Date().toISOString().slice(0, 10)
    },

    setFilterEstado(estado: ValidationRecord['estado'] | null): void {
      this.filterEstado = estado
    },

    setCurrentRecord(record: ValidationRecord | null): void {
      this.currentRecord = record
    },

    addAIRecord(analysis: RoofAnalysisResult, buildingName: string): WithSourceMeta<ValidationRecordExtended> {
      const maxId = this.records.reduce((max, r) => Math.max(max, r.id), 0)
      const aiSource: SourceMeta = {
        sourceType: 'derivado',
        sourceName: 'Calculado',
        lastUpdated: new Date().toISOString().slice(0, 10),
        confidenceLevel: analysis.porcentajeConfianza / 100,
        validationStatus: 'sin_verificar',
      }
      const newRecord: WithSourceMeta<ValidationRecordExtended> = {
        id: maxId + 1,
        candidatoId: 0,
        nombre: buildingName || 'Imagen subida por usuario',
        imagen: '',
        prediccion: analysis.prediccion,
        confianza: analysis.confianza,
        porcentajeConfianza: analysis.porcentajeConfianza,
        estado: 'pendiente',
        origenDeteccion: 'ia_automatica',
        _source: aiSource,
      }
      this.records.unshift(newRecord)
      return newRecord
    },
  },
})
