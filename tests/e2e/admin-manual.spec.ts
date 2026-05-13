import { test, expect } from '@playwright/test'

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

test.beforeEach(async ({ page }) => {
  // Stub admin API endpoints — el FAKE_TOKEN no es válido contra cercu-backend
  // y un 401 dispararía auth.logout() → redirect a /admin/login.
  await page.route('**/observatory/techos-verdes/admin/**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          greenRoofs: 57,
          candidates: 60,
          validations: 30,
          prospectsPending: 0,
          ahpHigh: 12,
          prospectsTotal: 0,
          prospectsApproved: 0,
          cmsSections: 56,
          candidatesByEstatus: {},
          validationsByEstado: {},
          greenRoofsByTipo: {},
          ahpBuckets: { alto: 0, medio: 0, bajo: 0 },
        },
        items: [],
      }),
    })
  })

  await page.goto('/')
  await page.evaluate(({ token, admin }) => {
    localStorage.setItem('obs_token', token)
    localStorage.setItem('obs_admin', admin)
  }, { token: FAKE_TOKEN, admin: FAKE_ADMIN })
})

test.describe('Admin · Manual del observatorio (techos-verdes)', () => {
  test('aparece en el dashboard', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: 'Manual del observatorio' })).toBeVisible()
  })

  test('todas las 10 secciones son accesibles', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    const sections = [
      '¿Qué es este observatorio?',
      'Flujo de los datos',
      'Percepción remota e índices',
      'Detector de candidatos OSM',
      'AHP — Modelo multicriterio',
      'Validación visual con IA',
      'Tipologías de techo verde',
      'Tracking de uso',
      'Glosario de siglas',
      'Limitaciones honestas',
    ]
    for (const label of sections) {
      const button = page.getByRole('button', { name: label })
      await expect(button).toBeVisible()
    }
  })

  test('AHP section explica las 8 variables', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'AHP — Modelo multicriterio' }).click()
    // Scopear al párrafo del Manual (no al tooltip global del dashboard)
    await expect(page.getByText(/AHP \(Analytic Hierarchy Process\) es un método/i)).toBeVisible()
    await expect(page.getByText(/¿el edificio soporta el peso/i)).toBeVisible()
  })

  test('Glosario muestra TVLE y AHP', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Glosario de siglas' }).click()
    // Las definiciones del glosario son <dd> únicas (no aparecen en tooltips)
    await expect(page.getByText('Techo Verde Ligero Extensivo (sustrato 5–15 cm).')).toBeVisible()
    await expect(page.getByText(/Analytic Hierarchy Process\. Saaty/i)).toBeVisible()
  })
})

test.describe('Admin · Sidebar — nuevos items', () => {
  test('aparece "Modos de participación"', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('link', { name: /Modos de participación/i })).toBeVisible()
  })

  test('aparece "Contribuyentes"', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('link', { name: /Contribuyentes/i })).toBeVisible()
  })
})
