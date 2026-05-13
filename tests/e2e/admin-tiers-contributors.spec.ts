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
  // Stub backend para que el FAKE_TOKEN no dispare 401→logout
  await page.route('**/observatory/techos-verdes/admin/**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: {}, items: [] }),
    })
  })

  await page.goto('/')
  await page.evaluate(({ token, admin }) => {
    localStorage.setItem('obs_token', token)
    localStorage.setItem('obs_admin', admin)
    localStorage.removeItem('obs-techos-tiers')
    localStorage.removeItem('obs-techos-contributors')
  }, { token: FAKE_TOKEN, admin: FAKE_ADMIN })
})

test.describe('Admin · Tiers (techos-verdes)', () => {
  test('lista los 5 modos default adaptados a techos verdes', async ({ page }) => {
    await page.goto('/admin/tiers')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: 'Aprendiz', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Reportador', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Caracterizador', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Especialista', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Operador', exact: true })).toBeVisible()
  })
})

test.describe('Admin · Contributors (techos-verdes)', () => {
  test('lista contribuyentes seed (CIIEMAD-IPN, SEDEMA)', async ({ page }) => {
    await page.goto('/admin/contributors')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /CIIEMAD-IPN/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /SEDEMA/i })).toBeVisible()
  })

  test('crear nuevo contribuyente con role arquitecto', async ({ page }) => {
    await page.goto('/admin/contributors')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /Nuevo contribuyente/i }).click()
    // Los <label> del modal no tienen for/id; localizamos por posición:
    // input 1 = Nombre, input 2 = Handle, select 1 = Rol.
    const modal = page.locator('div.fixed.inset-0').filter({ hasText: 'Nuevo contribuyente' })
    await modal.locator('input').nth(0).fill('Arq. Pedro Solís')
    await modal.locator('input').nth(1).fill('pedro-solis')
    await modal.locator('select').first().selectOption('arquitecto')
    await page.getByRole('button', { name: 'Guardar' }).click()
    await expect(page.getByRole('heading', { name: 'Arq. Pedro Solís' })).toBeVisible()
  })
})
