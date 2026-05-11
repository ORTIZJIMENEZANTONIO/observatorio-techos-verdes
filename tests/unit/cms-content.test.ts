/**
 * Tests del helper interpolateCmsText y la cobertura general del CMS.
 *
 * El store useCmsStore depende de Nuxt's auto-imports (useRuntimeConfig,
 * $fetch, reactive, etc.), por lo que sus tests unitarios viven dentro de
 * @nuxt/test-utils. Aquí cubrimos el helper puro + smoke-test sobre la
 * estructura de defaults.
 */
import { describe, it, expect } from 'vitest'
import { interpolateCmsText } from '~/composables/useCmsContent'
import { cmsDefaults, cmsPageCatalog } from '~/data/cms-defaults'

describe('interpolateCmsText', () => {
  it('reemplaza placeholders {key} con los valores pasados', () => {
    expect(interpolateCmsText('Hay {count} techos verdes', { count: 57 })).toBe(
      'Hay 57 techos verdes',
    )
  })

  it('reemplaza múltiples placeholders', () => {
    expect(
      interpolateCmsText('{count} de {total} alcaldías', { count: 14, total: 16 }),
    ).toBe('14 de 16 alcaldías')
  })

  it('reemplaza placeholders sin valor con cadena vacía', () => {
    expect(interpolateCmsText('Hola {nombre}', {})).toBe('Hola ')
  })

  it('null/undefined → cadena vacía', () => {
    expect(interpolateCmsText(null, { x: 1 })).toBe('')
    expect(interpolateCmsText(undefined, { x: 1 })).toBe('')
  })

  it('texto sin placeholders se devuelve igual', () => {
    expect(interpolateCmsText('Texto plano sin variables', { x: 1 })).toBe(
      'Texto plano sin variables',
    )
  })

  it('placeholders con números, strings, null y undefined', () => {
    expect(
      interpolateCmsText('{a}-{b}-{c}-{d}', {
        a: 1,
        b: 'texto',
        c: null,
        d: undefined,
      }),
    ).toBe('1-texto--')
  })
})

describe('CMS coverage — todas las páginas públicas son editables', () => {
  // Páginas públicas (sin /admin/*) que requieren al menos un hero editable.
  const publicPages = [
    'home',
    'sobre',
    'metodologia',
    'indicadores',
    'inventario',
    'candidatos',
    'mapa',
    'aptitud',
    'agenda-2030',
    'comunidad',
    'referencias',
    'footer',
  ]

  it.each(publicPages)('%s tiene defaults registrados', (page) => {
    expect(cmsDefaults[page], `falta defaults para página ${page}`).toBeDefined()
  })

  it.each(publicPages.filter(p => p !== 'footer'))('%s tiene hero editable', (page) => {
    expect(cmsDefaults[page]?.hero, `falta ${page}.hero`).toBeDefined()
    expect(Array.isArray(cmsDefaults[page].hero)).toBe(true)
  })

  it('toda página del catálogo está mapeada en defaults', () => {
    for (const meta of cmsPageCatalog) {
      expect(cmsDefaults[meta.slug], `catálogo declara ${meta.slug} pero no hay defaults`).toBeDefined()
    }
  })

  it('toda sección declarada en catálogo tiene defaults', () => {
    for (const meta of cmsPageCatalog) {
      for (const section of meta.sections) {
        expect(
          cmsDefaults[meta.slug][section.key],
          `${meta.slug}.${section.key} declarado en catálogo pero sin defaults`,
        ).toBeDefined()
      }
    }
  })
})
