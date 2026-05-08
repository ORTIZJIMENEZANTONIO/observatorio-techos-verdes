import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTiersStore } from '~/stores/tiers'
import { tiersDefaults } from '~/data/tiers-defaults'

describe('Tiers Store (techos-verdes)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  describe('initialization', () => {
    it('loads defaults when localStorage is empty', () => {
      const store = useTiersStore()
      expect(store.items.length).toBe(tiersDefaults.length)
    })

    it('exposes 5 visible tiers sorted by sortOrder', () => {
      const store = useTiersStore()
      expect(store.visibleTiers.length).toBe(5)
      const orders = store.visibleTiers.map(t => t.sortOrder)
      const sorted = [...orders].sort((a, b) => a - b)
      expect(orders).toEqual(sorted)
    })

    it('default slugs cover the 5 modes adapted to techos-verdes', () => {
      const store = useTiersStore()
      const slugs = store.items.map(t => t.slug)
      expect(slugs).toContain('aprendiz')
      expect(slugs).toContain('reportador')
      expect(slugs).toContain('caracterizador')
      expect(slugs).toContain('especialista')
      expect(slugs).toContain('operador')
    })
  })

  describe('tierForScore', () => {
    it('returns "aprendiz" for low scores (0-19)', () => {
      const store = useTiersStore()
      expect(store.tierForScore(0)).toBe('aprendiz')
      expect(store.tierForScore(19)).toBe('aprendiz')
    })

    it('returns "reportador" between 20 and 99', () => {
      const store = useTiersStore()
      expect(store.tierForScore(20)).toBe('reportador')
      expect(store.tierForScore(99)).toBe('reportador')
    })

    it('returns "operador" for 1000+ (no upper bound)', () => {
      const store = useTiersStore()
      expect(store.tierForScore(1000)).toBe('operador')
      expect(store.tierForScore(99999)).toBe('operador')
    })
  })

  describe('CRUD', () => {
    it('addTier creates a new tier with auto-generated id', () => {
      const store = useTiersStore()
      const before = store.items.length
      const created = store.addTier({
        slug: 'embajador',
        label: 'Embajador',
        minScore: 2000,
        maxScore: null,
        color: 'primary',
        sortOrder: 6,
        visible: true,
        archived: false,
      })
      expect(created.id).toBeGreaterThan(0)
      expect(store.items.length).toBe(before + 1)
    })

    it('deleteTier soft-deletes', () => {
      const store = useTiersStore()
      const t = store.getTier('reportador')!
      store.deleteTier(t.id!)
      expect(store.items.find(x => x.id === t.id)!.archived).toBe(true)
    })
  })

  describe('persistence', () => {
    it('saves changes to localStorage with techos-specific key', () => {
      const store = useTiersStore()
      store.updateTier(store.getTier('aprendiz')!.id!, { label: 'Modificado' })
      const raw = localStorage.getItem('obs-techos-tiers')
      expect(raw).toBeTruthy()
    })
  })
})
