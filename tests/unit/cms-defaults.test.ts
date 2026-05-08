import { describe, it, expect } from 'vitest'
import { cmsDefaults, cmsPageCatalog } from '~/data/cms-defaults'

describe('CMS Defaults (techos-verdes)', () => {
  it('catalog covers all expected pages including new contributors', () => {
    const slugs = cmsPageCatalog.map(p => p.slug)
    expect(slugs).toContain('home')
    expect(slugs).toContain('sobre')
    expect(slugs).toContain('metodologia')
    expect(slugs).toContain('indicadores')
    expect(slugs).toContain('inventario')
    expect(slugs).toContain('candidatos')
    expect(slugs).toContain('mapa')
    expect(slugs).toContain('aptitud')
    expect(slugs).toContain('ia-validacion')
    expect(slugs).toContain('contributors')
    expect(slugs).toContain('footer')
  })

  it('every catalog page has corresponding defaults', () => {
    for (const page of cmsPageCatalog) {
      expect(cmsDefaults[page.slug], `falta página ${page.slug} en defaults`).toBeDefined()
      // Cada section declarada debe tener su array
      for (const section of page.sections) {
        expect(
          cmsDefaults[page.slug][section.key],
          `${page.slug}/${section.key} sin defaults`,
        ).toBeDefined()
      }
    }
  })

  it('every section is a non-empty array', () => {
    for (const [slug, sections] of Object.entries(cmsDefaults)) {
      for (const [key, items] of Object.entries(sections)) {
        expect(Array.isArray(items), `${slug}/${key} no es array`).toBe(true)
        expect(items.length, `${slug}/${key} array vacío`).toBeGreaterThan(0)
      }
    }
  })

  it('contributors hero has title + subtitle', () => {
    const hero = cmsDefaults.contributors?.hero?.[0] as any
    expect(hero?.title).toBeTruthy()
    expect(hero?.subtitle).toBeTruthy()
  })

  it('home.hero está editable con campos esperados (eyebrow, titles, subtitle, CTAs)', () => {
    const hero = cmsDefaults.home?.hero?.[0] as any
    expect(hero).toBeTruthy()
    expect(hero.eyebrow).toBeTruthy()
    expect(hero.titleLine1 ?? hero.title).toBeTruthy()
    expect(hero.subtitle).toBeTruthy()
    expect(hero.primaryLabel).toBeTruthy()
    expect(hero.primaryTo).toMatch(/^\//)
    expect(hero.secondaryLabel).toBeTruthy()
  })

  it('footer.quickLinks usa "to" para rutas internas', () => {
    const links = cmsDefaults.footer?.quickLinks as any[]
    expect(links).toBeDefined()
    for (const l of links) {
      expect(l.to).toMatch(/^\//)
    }
  })
})
