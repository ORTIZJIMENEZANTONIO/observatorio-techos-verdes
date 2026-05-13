import { test, expect } from '@playwright/test'

test.describe('Nueva IA — hubs Aprende, Investigación y subpáginas', () => {
  test('home renderiza las 4 puertas del audience gate', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Las 4 cards del AudienceGate son <NuxtLink> con href a su destino
    await expect(page.locator('a.fun-card-link[href="/aprende"]')).toBeVisible({ timeout: 10_000 })
    await expect(page.locator('a.fun-card-link[href="/mapa"]')).toBeVisible()
    await expect(page.locator('a.fun-card-link[href="/investigacion"]')).toBeVisible()
    await expect(page.locator('a.fun-card-link[href="/comunidad"]')).toBeVisible()
  })

  test('home muestra el banner académico Q1 (Cervantes-Nájera)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // DOI del paper Q1 presente en el banner
    await expect(page.getByText(/10\.1016\/j\.scs\.2025/i)).toBeVisible({ timeout: 10_000 })
    // Los KPIs del paper aparecen en el body (uno en cada idioma de label)
    await expect(page.getByText(/km².*zonas prioritarias/i).first()).toBeVisible()
    await expect(page.locator('dd', { hasText: '514,000' }).first()).toBeVisible()
  })

  test('/aprende carga con las 4 anclas funcionales', async ({ page }) => {
    await page.goto('/aprende')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /Conoce los techos verdes/i })).toBeVisible({ timeout: 10_000 })
    // Las secciones con anchors deben existir
    await expect(page.locator('#capas')).toHaveCount(1)
    await expect(page.locator('#tipologias')).toHaveCount(1)
    await expect(page.locator('#beneficios')).toHaveCount(1)
    await expect(page.locator('#caso-ciiemad')).toHaveCount(1)
    // 6 capas listadas
    await expect(page.getByRole('heading', { name: 'Vegetación' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Sustrato de crecimiento' })).toBeVisible()
  })

  test('/aprende muestra las 3 tipologías técnicas', async ({ page }) => {
    await page.goto('/aprende#tipologias')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /Extensivo \(TVLE\)/i })).toBeVisible({ timeout: 10_000 })
    await expect(page.getByRole('heading', { name: 'Semi-intensivo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Intensivo', exact: true })).toBeVisible()
  })

  test('/investigacion carga con marco CIIEMAD y secciones esperadas', async ({ page }) => {
    await page.goto('/investigacion')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /Marco académico del observatorio/i })).toBeVisible({ timeout: 10_000 })
    await expect(page.locator('#marco')).toHaveCount(1)
    await expect(page.locator('#publicaciones')).toHaveCount(1)
    await expect(page.locator('#metodologia')).toHaveCount(1)
    // Q1 destacada visible
    await expect(page.getByText(/Sustainable Cities and Society/i).first()).toBeVisible()
  })

  test('/investigacion/datos lista los 3 datasets descargables', async ({ page }) => {
    await page.goto('/investigacion/datos')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /Inventario de techos verdes/i })).toBeVisible({ timeout: 10_000 })
    await expect(page.getByRole('heading', { name: /Candidatos priorizados/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Indicadores por alcaldía/i })).toBeVisible()
    // 3 botones "Descargar CSV"
    const csvBtns = page.getByRole('button', { name: /Descargar CSV/i })
    await expect(csvBtns).toHaveCount(3)
  })

  test('/investigacion/datos dispara descarga al pulsar el botón CSV', async ({ page }) => {
    await page.goto('/investigacion/datos')
    await page.waitForLoadState('networkidle')
    const downloadPromise = page.waitForEvent('download', { timeout: 10_000 })
    await page.getByRole('button', { name: /Descargar CSV/i }).first().click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/observatorio-techos-verdes_inventario\.csv$/)
  })

  test('/investigacion/citar muestra APA + BibTeX copiables', async ({ page }) => {
    await page.goto('/investigacion/citar')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /Cómo citar el observatorio/i })).toBeVisible({ timeout: 10_000 })
    // Botones Copiar
    const copyBtns = page.getByRole('button', { name: /Copiar/i })
    expect(await copyBtns.count()).toBeGreaterThanOrEqual(4)
    // Las dos citas del observatorio (APA + BibTeX) deben aparecer
    await expect(page.getByText(/Cervantes-Nájera, A\. L\./i).first()).toBeVisible()
    await expect(page.getByText(/@misc/i)).toBeVisible()
  })

  test('header muestra los 4 grupos nuevos (Aprende/Explora/Investigación/Comunidad)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Botones de los dropdowns
    await expect(page.getByRole('button', { name: /^Aprende$/i })).toBeVisible({ timeout: 10_000 })
    await expect(page.getByRole('button', { name: /^Explora$/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Investigación$/i })).toBeVisible()
    // Comunidad es un link directo
    await expect(page.getByRole('link', { name: /^Comunidad$/i }).first()).toBeVisible()
  })

  test('admin/contenido lista las páginas nuevas (aprende, investigacion)', async ({ page }) => {
    await page.goto('/admin/contenido')
    // Como esta es SSR-disabled, esperamos al render del cliente
    await page.waitForLoadState('networkidle')
    const body = await page.content()
    // Las páginas aprende e investigacion deben aparecer en el listado
    expect(body).toMatch(/aprende/i)
    expect(body).toMatch(/investigaci/i)
  })
})
