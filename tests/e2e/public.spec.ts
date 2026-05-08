import { test, expect } from '@playwright/test'

test.describe('Sitio publico — smoke (techos-verdes)', () => {
  test('home carga, favicon presente, titulo correcto', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Techos Verdes/i)
    const faviconResponse = await page.request.get('/favicon.svg')
    expect(faviconResponse.ok()).toBe(true)
    expect(faviconResponse.headers()['content-type']).toMatch(/svg/i)
  })

  test('inventario carga el catalogo', async ({ page }) => {
    await page.goto('/inventario')
    await page.waitForLoadState('networkidle')
    const headings = page.getByRole('heading')
    await expect(headings.first()).toBeVisible({ timeout: 10_000 })
  })

  test('mapa monta el contenedor leaflet', async ({ page }) => {
    await page.goto('/mapa')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.leaflet-container').first()).toBeVisible({ timeout: 15_000 })
  })

  test('aptitud (AHP) carga sin error', async ({ page }) => {
    await page.goto('/aptitud')
    await page.waitForLoadState('networkidle')
    const main = page.getByRole('main').or(page.locator('main')).first()
    await expect(main).toBeVisible({ timeout: 10_000 })
  })

  test('navegacion a /metodologia AHP funciona', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const link = page.getByRole('link', { name: /Metodolog[ií]a/i }).first()
    await expect(link).toBeVisible()
  })
})
