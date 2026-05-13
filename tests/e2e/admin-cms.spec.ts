import { test, expect } from '@playwright/test'

// Admin de prueba para saltar el login (igual que admin-manual.spec.ts)
const FAKE_TOKEN = 'e2e-fake-token'
const FAKE_ADMIN = JSON.stringify({
  id: 'e2e-1',
  email: 'e2e@test.com',
  name: 'E2E Tester',
  observatories: ['techos-verdes'],
  role: 'superadmin',
  permissions: [
    'manage_users', 'manage_cms', 'manage_roofs', 'manage_candidates',
    'manage_validations', 'manage_prospectos', 'manage_tiers', 'manage_contributors',
  ],
})

async function loginAsFakeAdmin(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.evaluate(({ token, admin }) => {
    localStorage.setItem('obs_token', token)
    localStorage.setItem('obs_admin', admin)
  }, { token: FAKE_TOKEN, admin: FAKE_ADMIN })
}

test.describe('Admin · CMS — listado de páginas editables', () => {
  test('/admin/contenido lista las páginas con sus secciones', async ({ page }) => {
    await loginAsFakeAdmin(page)
    await page.goto('/admin/contenido')
    await page.waitForLoadState('networkidle')

    // Verifica que las páginas principales están listadas
    const body = await page.locator('body').innerText()
    expect(body).toMatch(/Inicio/i)
    expect(body).toMatch(/Sobre el observatorio/i)
    expect(body).toMatch(/Metodología/i)
    expect(body).toMatch(/Agenda 2030/i)
    expect(body).toMatch(/Comunidad/i)
    expect(body).toMatch(/Pie de página/i)
  })

  test('home declara las nuevas secciones editables en el catálogo', async ({ page }) => {
    await loginAsFakeAdmin(page)
    await page.goto('/admin/contenido')
    await page.waitForLoadState('networkidle')

    // El catálogo declara "11 secciones" para el home: hero, sectionTitles,
    // features, steps, datosCuriosos, mapTeaser, techoVerdeIntro, respaldo,
    // audienceGate, academicHighlight, cta.
    // ciiemadShowcase/ciiemadPubs/ciiemadKpis se retiraron del catálogo
    // (consolidados en /aprende#caso-ciiemad).
    const body = await page.locator('body').innerText()
    expect(body).toMatch(/11 secciones/)
  })
})

test.describe('Público · CMS sirve contenido sin backend (fallback a defaults)', () => {
  test('home renderiza con los defaults aunque el backend de CMS no responda', async ({ page }) => {
    // Bloqueamos las requests al backend de CMS para forzar el fallback.
    await page.route('**/observatory/techos-verdes/cms/**', route => route.abort())

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // El hero del default debe aparecer (título del observatorio)
    const heading = await page.getByRole('heading', { name: /Techos Verdes/i }).first()
    await expect(heading).toBeVisible({ timeout: 10_000 })

    const body = await page.locator('body').innerText()

    // Bloques nuevos del home — todos vienen desde defaults
    expect(body).toMatch(/CIIEMAD/i) // ciiemadShowcase
    expect(body).toMatch(/Cervantes/i) // citas de la investigación
    expect(body).toMatch(/Sabías que|Aire acondicionado natural/i) // datosCuriosos
  })

  test('sobre renderiza principios desde defaults', async ({ page }) => {
    await page.route('**/observatory/techos-verdes/cms/**', route => route.abort())
    await page.goto('/sobre')
    await page.waitForLoadState('networkidle')

    const body = await page.locator('body').innerText()
    // Los 4 hints únicos de los principios (cards de Transparencia, Rigor, etc.)
    expect(body).toMatch(/Datos abiertos/i)
    expect(body).toMatch(/Investigación/i)
    expect(body).toMatch(/Para todas|Accesibilidad/i)
  })

  test('agenda-2030 renderiza servicios ecosistémicos desde defaults', async ({ page }) => {
    await page.route('**/observatory/techos-verdes/cms/**', route => route.abort())
    await page.goto('/agenda-2030')
    await page.waitForLoadState('networkidle')

    const body = await page.locator('body').innerText()
    // Las 4 siglas MEA 2003 + el nombre completo de los servicios
    expect(body).toMatch(/SC|Servicios culturales/i)
    expect(body).toMatch(/SR|Servicios regulatorios/i)
    expect(body).toMatch(/SA|Servicios de aprovisionamiento/i)
    expect(body).toMatch(/SS|Servicios de soporte/i)
  })

  test('comunidad renderiza los 3 pasos desde defaults', async ({ page }) => {
    await page.route('**/observatory/techos-verdes/cms/**', route => route.abort())
    await page.goto('/comunidad')
    await page.waitForLoadState('networkidle')

    const body = await page.locator('body').innerText()
    expect(body).toMatch(/Identifica una azotea/i)
    expect(body).toMatch(/Documenta y envía/i)
    expect(body).toMatch(/El equipo valida/i)
  })

  test('metodologia renderiza limitations desde defaults', async ({ page }) => {
    await page.route('**/observatory/techos-verdes/cms/**', route => route.abort())
    await page.goto('/metodologia')
    await page.waitForLoadState('networkidle')

    const body = await page.locator('body').innerText()
    // Una de las limitaciones documentadas en el default
    expect(body).toMatch(/calidad del aire corresponden a promedios anuales/i)
  })
})
