import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useContributorsStore } from '~/stores/contributors'
import { contributorsDefaults } from '~/data/tiers-defaults'

describe('Contributors Store (techos-verdes)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('loads defaults', () => {
    const store = useContributorsStore()
    expect(store.items.length).toBe(contributorsDefaults.length)
  })

  it('addContributor creates with techos-specific role', () => {
    const store = useContributorsStore()
    const before = store.items.length
    const created = store.addContributor({
      displayName: 'Arq. Ana López',
      handle: 'ana-lopez',
      role: 'arquitecto',
    })
    expect(created.id).toBeGreaterThan(0)
    expect(store.items.length).toBe(before + 1)
    expect(created.tier).toBe('aprendiz')
    expect(created.role).toBe('arquitecto')
  })

  it('respects all 8 techos-verdes roles', () => {
    const store = useContributorsStore()
    const roles: Array<'ciudadano' | 'propietario' | 'arquitecto' | 'ingeniero' | 'empresa' | 'gobierno' | 'ong' | 'academia'> = [
      'ciudadano', 'propietario', 'arquitecto', 'ingeniero',
      'empresa', 'gobierno', 'ong', 'academia',
    ]
    roles.forEach((role, i) => {
      const c = store.addContributor({
        displayName: `Test ${role}`,
        handle: `test-${role}-${i}`,
        role,
      })
      expect(c.role).toBe(role)
    })
  })

  it('filters by role', () => {
    const store = useContributorsStore()
    store.filterRole = 'gobierno'
    expect(store.filtered.every(c => c.role === 'gobierno')).toBe(true)
    expect(store.filtered.length).toBeGreaterThan(0)
  })

  it('filters by tier "operador" returns institucionales', () => {
    const store = useContributorsStore()
    store.filterTier = 'operador'
    expect(store.filtered.every(c => c.tier === 'operador')).toBe(true)
  })

  it('clearFilters resets', () => {
    const store = useContributorsStore()
    store.search = 'foo'
    store.filterRole = 'arquitecto'
    store.clearFilters()
    expect(store.search).toBe('')
    expect(store.filterRole).toBe('all')
  })
})
