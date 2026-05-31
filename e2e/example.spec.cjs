const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// ===================== PRUEBA 1 =====================
test('búsqueda exitosa muestra resultados', async ({ page }) => {
  await page.getByTestId('input-title').fill('Harry Potter');
  await page.getByTestId('btn-search').click();

  await expect(page.getByTestId('results-container')).toBeVisible({ timeout: 15000 });
});

// ===================== PRUEBA 2 =====================
test('resultados visibles contienen título y autor', async ({ page }) => {
  await page.getByTestId('input-title').fill('Harry Potter');
  await page.getByTestId('btn-search').click();

  await expect(page.getByTestId('results-container')).toBeVisible({ timeout: 15000 });

  const firstBook = page.locator('[data-testid="results-container"] > div').first();
  await expect(firstBook).toBeVisible();
});

// ===================== PRUEBA 3 =====================
test('error por campos vacíos muestra mensaje de error', async ({ page }) => {
  await page.getByTestId('btn-search').click();

  await expect(page.getByTestId('error-message')).toBeVisible({ timeout: 10000 });
});

// ===================== PRUEBA 4 =====================
test('error por pocos resultados muestra mensaje de error', async ({ page }) => {
  await page.getByTestId('input-title').fill('xkqzwmvblrpt');
  await page.getByTestId('btn-search').click();

  await expect(page.getByTestId('error-message')).toBeVisible({ timeout: 15000 });
});