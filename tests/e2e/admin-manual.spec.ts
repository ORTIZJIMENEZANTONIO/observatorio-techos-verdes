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
    await expect(page.getByText(/Saaty/i)).toBeVisible()
    await expect(page.getByText(/Carga estructural/i)).toBeVisible()
  })

  test('Glosario muestra TVLE y AHP', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Glosario de siglas' }).click()
    await expect(page.getByText('Techo Verde Ligero Extensivo')).toBeVisible()
    await expect(page.getByText(/Analytic Hierarchy Process/i)).toBeVisible()
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
