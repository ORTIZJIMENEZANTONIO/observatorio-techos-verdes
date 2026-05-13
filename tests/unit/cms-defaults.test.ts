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

  // ─── Cobertura completa de las nuevas secciones editables ───

  it('home tiene todas las secciones nuevas (steps, datosCuriosos, respaldo, etc.)', () => {
    const home = cmsDefaults.home
    expect(home).toBeDefined()
    const required = [
      'hero',
      'features',
      'cta',
      'sectionTitles',
      'steps',
      'datosCuriosos',
      'mapTeaser',
      'techoVerdeIntro',
      // ciiemadShowcase, ciiemadPubs, ciiemadKpis fueron consolidados en
      // /aprende#caso-ciiemad. Los defaults siguen en cmsDefaults para
      // compatibilidad con backend ya sembrado, pero el catalog los oculta.
      'respaldo',
    ]
    for (const key of required) {
      expect(home[key], `falta home.${key}`).toBeDefined()
      expect(Array.isArray(home[key])).toBe(true)
    }
  })

  it('home.features tiene 3 cards con shape fun-card (icono+color+to únicos)', () => {
    // Regresión: cuando los campos eran `icon/accent/linkTo` (legacy), las 3
    // cards renderizaban con el mismo color e icono porque el template
    // (`funPaths(feature.icono)`, `funStyle(feature.color)`, `:to="feature.to"`)
    // recibía undefined. El shape DEBE usar los nombres del patrón fun-card.
    const features = cmsDefaults.home.features as any[]
    expect(features.length).toBe(3)
    const iconos = new Set<string>()
    const colores = new Set<string>()
    const tos = new Set<string>()
    for (const f of features) {
      expect(f.title, 'falta title').toBeTruthy()
      expect(f.description, 'falta description').toBeTruthy()
      expect(f.icono, `falta icono en "${f.title}" — el template usa funPaths(feature.icono)`).toBeTruthy()
      expect(f.color, `falta color en "${f.title}" — el template usa funStyle(feature.color)`).toBeTruthy()
      expect(f.to, `falta to en "${f.title}" — NuxtLink :to`).toMatch(/^\//)
      iconos.add(f.icono)
      colores.add(f.color)
      tos.add(f.to)
    }
    // Cada card debe ser visualmente diferenciable
    expect(iconos.size, 'iconos repetidos entre cards').toBe(features.length)
    expect(colores.size, 'colores repetidos entre cards').toBe(features.length)
    expect(tos.size, 'destinos repetidos entre cards').toBe(features.length)
  })

  it('home.steps tiene 4 pasos con icono semántico', () => {
    const steps = cmsDefaults.home.steps as any[]
    expect(steps.length).toBe(4)
    for (const s of steps) {
      expect(s.title).toBeTruthy()
      expect(s.description).toBeTruthy()
      expect(s.icono).toBeTruthy()
    }
  })

  it('home.datosCuriosos tiene 3 cards con icon + color', () => {
    const datos = cmsDefaults.home.datosCuriosos as any[]
    expect(datos.length).toBe(3)
    for (const d of datos) {
      expect(d.titulo).toBeTruthy()
      expect(d.texto).toBeTruthy()
      expect(d.color).toBeTruthy()
    }
  })

  it('home.ciiemadPubs tiene 3 publicaciones con year + type + title', () => {
    const pubs = cmsDefaults.home.ciiemadPubs as any[]
    expect(pubs.length).toBe(3)
    for (const p of pubs) {
      expect(p.year).toBeTruthy()
      expect(p.type).toBeTruthy()
      expect(p.title).toBeTruthy()
    }
  })

  it('sobre tiene secciones nuevas: principles, dimensiones, findings', () => {
    const sobre = cmsDefaults.sobre
    expect(sobre.principles).toBeDefined()
    expect(sobre.dimensiones).toBeDefined()
    expect(sobre.findings).toBeDefined()
    expect((sobre.principles as any[]).length).toBe(4)
    expect((sobre.dimensiones as any[]).length).toBe(3)
    expect((sobre.findings as any[]).length).toBe(4)
  })

  it('agenda-2030 tiene servicios ecosistémicos MEA', () => {
    const agenda = cmsDefaults['agenda-2030']
    expect(agenda.servicios).toBeDefined()
    expect((agenda.servicios as any[]).length).toBe(4)
    const siglas = (agenda.servicios as any[]).map(s => s.sigla)
    expect(siglas).toEqual(['SC', 'SR', 'SA', 'SS'])
  })

  it('comunidad tiene los 3 pasos para participar', () => {
    const comunidad = cmsDefaults.comunidad
    expect(comunidad.pasos).toBeDefined()
    const pasos = comunidad.pasos as any[]
    expect(pasos.length).toBe(3)
    expect(pasos[0].n).toBe(1)
    expect(pasos[2].n).toBe(3)
  })

  it('metodologia tiene limitations array (honestidad del modelo)', () => {
    const met = cmsDefaults.metodologia
    expect(met.limitations).toBeDefined()
    const lims = met.limitations as any[]
    expect(lims.length).toBeGreaterThanOrEqual(5)
    for (const l of lims) expect(l.text).toBeTruthy()
  })

  it('no quedan referencias UI a IA (validación manual provisional)', () => {
    // El slug "ia-validacion" sigue existiendo como página orfanada (sin links),
    // por lo que se permite en metadatos. Lo que NO debe aparecer es copy
    // promocional de IA en hero/feature/cta visibles al usuario.
    const hero = JSON.stringify(cmsDefaults['ia-validacion']?.hero || [])
    expect(/Inteligencia Artificial/i.test(hero)).toBe(false)

    const home = JSON.stringify(cmsDefaults.home)
    expect(/Validación con IA/i.test(home)).toBe(false)
    expect(/Inteligencia Artificial/i.test(home)).toBe(false)

    // Footer quickLinks no debe enlazar a /ia-validacion
    const quickLinks = (cmsDefaults.footer.quickLinks as any[]).map(l => l.to)
    expect(quickLinks).not.toContain('/ia-validacion')
  })

  it('cmsPageCatalog declara las secciones nuevas del home', () => {
    const homePage = cmsPageCatalog.find(p => p.slug === 'home')
    expect(homePage).toBeDefined()
    const keys = homePage!.sections.map(s => s.key)
    expect(keys).toContain('steps')
    expect(keys).toContain('datosCuriosos')
    expect(keys).toContain('respaldo')
    // ciiemadShowcase ya NO se expone en admin: el bloque se consolidó en
    // /aprende#caso-ciiemad. Esta aserción negativa documenta la decisión.
    expect(keys).not.toContain('ciiemadShowcase')
  })

  it('cmsPageCatalog declara las secciones nuevas de sobre', () => {
    const sobrePage = cmsPageCatalog.find(p => p.slug === 'sobre')
    expect(sobrePage).toBeDefined()
    const keys = sobrePage!.sections.map(s => s.key)
    expect(keys).toContain('principles')
    expect(keys).toContain('dimensiones')
    expect(keys).toContain('findings')
  })

  // ─── Fase 2 — Audience Gate + Academic Highlight ───

  it('home.audienceGate tiene 4 puertas con shape válido', () => {
    const gates = cmsDefaults.home.audienceGate as any[]
    expect(gates, 'home.audienceGate no existe').toBeDefined()
    expect(gates.length).toBe(4)
    const titles = gates.map(g => g.title)
    // Debe haber una puerta por cada audiencia + comunidad
    expect(titles).toEqual(expect.arrayContaining(['Aprende', 'Comunidad']))
    for (const g of gates) {
      expect(g.tag).toBeTruthy()
      expect(g.title).toBeTruthy()
      expect(g.description).toBeTruthy()
      expect(g.to, `to inválido en "${g.title}"`).toMatch(/^\//)
      expect(g.ctaLabel).toBeTruthy()
      expect(g.icono).toBeTruthy()
      expect(g.color).toBeTruthy()
    }
  })

  it('home.audienceGate apunta a las 4 secciones IA correctas', () => {
    const gates = cmsDefaults.home.audienceGate as any[]
    const destinos = new Set(gates.map(g => g.to))
    expect(destinos.has('/aprende')).toBe(true)
    expect(destinos.has('/investigacion')).toBe(true)
    expect(destinos.has('/comunidad')).toBe(true)
  })

  it('home.academicHighlight tiene el paper Q1 Cervantes-Nájera con DOI y KPIs', () => {
    const hl = cmsDefaults.home.academicHighlight?.[0] as any
    expect(hl, 'home.academicHighlight no existe').toBeTruthy()
    expect(hl.titulo).toMatch(/green rooftops|techos verdes/i)
    expect(hl.autores).toMatch(/Cervantes/i)
    expect(hl.venue).toMatch(/Sustainable Cities/i)
    expect(hl.doi).toMatch(/^10\./)
    // 3 KPIs visibles en el banner
    expect(hl.kpi1Value).toBeTruthy()
    expect(hl.kpi2Value).toBeTruthy()
    expect(hl.kpi3Value).toBeTruthy()
    expect(hl.ctaTo).toMatch(/^\/investigacion/)
  })

  // ─── Fase 3 — Hubs Aprende e Investigación ───

  it('catalog incluye los hubs /aprende e /investigacion', () => {
    const slugs = cmsPageCatalog.map(p => p.slug)
    expect(slugs).toContain('aprende')
    expect(slugs).toContain('investigacion')
  })

  it('aprende tiene todas las secciones del hub (capas, tipologías, beneficios, caso)', () => {
    const ap = cmsDefaults.aprende
    expect(ap).toBeDefined()
    for (const key of ['hero', 'intro', 'capas', 'tipologias', 'beneficios', 'casoIntro', 'casoCiiemad', 'cta']) {
      expect(ap[key], `falta aprende.${key}`).toBeDefined()
    }
    expect((ap.capas as any[]).length).toBe(6) // las 6 capas
    expect((ap.tipologias as any[]).length).toBe(3) // ext / semi / int
    expect((ap.beneficios as any[]).length).toBe(4)
    expect((ap.casoCiiemad as any[]).length).toBeGreaterThanOrEqual(6)
  })

  it('aprende.capas están numeradas 1-6 con nombre y función', () => {
    const capas = cmsDefaults.aprende.capas as any[]
    const nums = capas.map(c => c.num).sort()
    expect(nums).toEqual([1, 2, 3, 4, 5, 6])
    for (const c of capas) {
      expect(c.nombre).toBeTruthy()
      expect(c.funcion).toBeTruthy()
      expect(c.color).toBeTruthy()
    }
  })

  it('aprende.tipologias incluye extensivo, semi-intensivo, intensivo', () => {
    const tipos = cmsDefaults.aprende.tipologias as any[]
    const slugs = tipos.map(t => t.slug).sort()
    expect(slugs).toEqual(['extensivo', 'intensivo', 'semi-intensivo'])
    for (const t of tipos) {
      expect(t.pesoSaturado).toBeTruthy()
      expect(t.sustrato).toBeTruthy()
      expect(t.vegetacion).toBeTruthy()
      expect(t.mantenimiento).toBeTruthy()
      expect(t.icono).toBeTruthy()
    }
  })

  it('investigacion tiene todas las secciones académicas', () => {
    const inv = cmsDefaults.investigacion
    expect(inv).toBeDefined()
    for (const key of ['hero', 'marco', 'equipo', 'publicaciones', 'metodologia', 'pesosAhp', 'datos', 'citar']) {
      expect(inv[key], `falta investigacion.${key}`).toBeDefined()
    }
  })

  it('investigacion.publicaciones incluye Q1 SCS 2025 marcado como destacada', () => {
    const pubs = cmsDefaults.investigacion.publicaciones as any[]
    expect(pubs.length).toBeGreaterThanOrEqual(4)
    const destacadas = pubs.filter(p => p.destacada)
    expect(destacadas.length).toBeGreaterThanOrEqual(1)
    const q1 = pubs.find(p => p.tipo === 'Artículo Q1')
    expect(q1, 'no hay Artículo Q1 en publicaciones').toBeTruthy()
    expect(q1.doi).toBeTruthy()
    expect(q1.anio).toBe('2025')
    expect(q1.autores).toMatch(/Cervantes/i)
  })

  it('investigacion.pesosAhp suma ~100% sobre 8 variables', () => {
    const pesos = cmsDefaults.investigacion.pesosAhp as any[]
    expect(pesos.length).toBe(8)
    const total = pesos.reduce((acc, p) => acc + parseFloat(String(p.peso).replace(/[^\d.]/g, '')), 0)
    expect(total).toBeGreaterThanOrEqual(99)
    expect(total).toBeLessThanOrEqual(101)
  })

  it('investigacion.citar tiene formato APA y BibTeX', () => {
    const citar = cmsDefaults.investigacion.citar?.[0] as any
    expect(citar.apa).toBeTruthy()
    expect(citar.apa).toMatch(/Cervantes-N[áa]jera/)
    expect(citar.bibtex).toBeTruthy()
    expect(citar.bibtex).toMatch(/@misc|@article/)
  })

  it('investigacion.datos tiene 3 datasets (inventario, candidatos, indicadores)', () => {
    const ds = cmsDefaults.investigacion.datos as any[]
    expect(ds.length).toBeGreaterThanOrEqual(3)
    const slugs = ds.map(d => d.slug)
    expect(slugs).toEqual(expect.arrayContaining(['inventario', 'candidatos', 'indicadores']))
  })

  it('aprende e investigacion declaran sus secciones en cmsPageCatalog', () => {
    const ap = cmsPageCatalog.find(p => p.slug === 'aprende')!
    const inv = cmsPageCatalog.find(p => p.slug === 'investigacion')!
    const apKeys = ap.sections.map(s => s.key)
    const invKeys = inv.sections.map(s => s.key)
    expect(apKeys).toEqual(expect.arrayContaining(['hero', 'intro', 'capas', 'tipologias', 'beneficios', 'casoCiiemad']))
    expect(invKeys).toEqual(expect.arrayContaining(['hero', 'marco', 'equipo', 'publicaciones', 'pesosAhp', 'datos', 'citar']))
  })

  it('cmsPageCatalog declara audienceGate y academicHighlight en home', () => {
    const homePage = cmsPageCatalog.find(p => p.slug === 'home')!
    const keys = homePage.sections.map(s => s.key)
    expect(keys).toContain('audienceGate')
    expect(keys).toContain('academicHighlight')
  })
})
