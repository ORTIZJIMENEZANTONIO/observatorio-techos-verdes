import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCmsStore } from '~/stores/cms'
import { cmsDefaults } from '~/data/cms-defaults'

describe('CMS Store (techos-verdes)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('getSection — fallback automático a defaults', () => {
    it('devuelve el array de defaults cuando no se hidrató', () => {
      const store = useCmsStore()
      const features = store.getSection('home', 'features')
      expect(Array.isArray(features)).toBe(true)
      expect(features.length).toBeGreaterThan(0)
    })

    it('devuelve array vacío cuando la página/sección no existe ni en defaults', () => {
      const store = useCmsStore()
      const ghost = store.getSection('pagina-inexistente', 'whatever')
      expect(ghost).toEqual([])
    })

    it('prefiere el contenido seteado por setSection sobre los defaults', () => {
      const store = useCmsStore()
      const fresh = [{ title: 'Personalizado', desc: 'X' }]
      store.setSection('home', 'features', fresh as any)
      expect(store.getSection('home', 'features')).toEqual(fresh)
    })
  })

  describe('getOne — atajo para secciones de un solo item', () => {
    it('devuelve el primer item del array', () => {
      const store = useCmsStore()
      const hero = store.getOne<{ titleLine1?: string }>('home', 'hero')
      expect(hero).toBeTruthy()
      expect(hero!.titleLine1).toBeTruthy()
    })

    it('devuelve null si la sección está vacía', () => {
      const store = useCmsStore()
      store.setSection('home', 'hero', [])
      expect(store.getOne('home', 'hero')).toBeNull()
    })
  })

  describe('initPage — hidrata defaults sin sobreescribir', () => {
    it('clona los defaults al estado interno', () => {
      const store = useCmsStore()
      store.initPage('home')
      const home = store.sections.home
      expect(home).toBeDefined()
      expect(home.hero).toEqual(cmsDefaults.home.hero)
      // Es una copia, no referencia
      expect(home.hero).not.toBe(cmsDefaults.home.hero)
    })

    it('no sobreescribe contenido ya seteado por setSection', () => {
      const store = useCmsStore()
      const customized = [{ titleLine1: 'Personalizado' }]
      store.setSection('home', 'hero', customized as any)
      store.initPage('home')
      expect(store.sections.home.hero).toEqual(customized)
    })

    it('no hace nada para páginas sin defaults', () => {
      const store = useCmsStore()
      store.initPage('ghost-page')
      expect(store.sections['ghost-page']).toBeUndefined()
    })
  })

  describe('invalidatePage — fuerza refetch', () => {
    it('marca la página como no-fetcheada', () => {
      const store = useCmsStore()
      store.fetchedPages['home'] = true
      store.invalidatePage('home')
      expect(store.fetchedPages.home).toBe(false)
    })
  })

  describe('cobertura — todas las secciones nuevas son leíbles', () => {
    it.each([
      ['home', 'sectionTitles'],
      ['home', 'steps'],
      ['home', 'datosCuriosos'],
      ['home', 'mapTeaser'],
      ['home', 'techoVerdeIntro'],
      ['home', 'ciiemadShowcase'],
      ['home', 'ciiemadPubs'],
      ['home', 'ciiemadKpis'],
      ['home', 'respaldo'],
      ['sobre', 'principles'],
      ['sobre', 'dimensiones'],
      ['sobre', 'findings'],
      ['metodologia', 'limitations'],
      ['agenda-2030', 'servicios'],
      ['comunidad', 'pasos'],
    ])('%s.%s devuelve un array no vacío', (page, key) => {
      const store = useCmsStore()
      const items = store.getSection(page, key)
      expect(Array.isArray(items)).toBe(true)
      expect(items.length).toBeGreaterThan(0)
    })
  })
})
