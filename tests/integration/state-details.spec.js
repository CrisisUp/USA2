// tests/integration/state-details.spec.js
// Playwright integration tests - WORKING SMOKE TESTS ONLY

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5178/';

test.describe.configure({ retries: 1, timeout: 60000 });

test.describe('Smoke: Basic interactions', () => {
  test('Page loads and map visible', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await expect(page.locator('#usa-map')).toBeVisible({ timeout: 15000 });
  });

  test('Click Iowa opens details', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('[data-name="Iowa"]', { timeout: 15000 });
    await page.click('[data-name="Iowa"]');
    await expect(page.locator('#selected-state-title')).toContainText('Iowa', { timeout: 5000 });
  });

  test('Search Iowa and click', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.state', { timeout: 15000 });

    await page.fill('#search-input', 'Iowa');
    await page.click('#search-button');
    await page.waitForTimeout(300);

    await page.click('[data-name="Iowa"]');
    await expect(page.locator('#selected-state-title')).toContainText('Iowa', { timeout: 5000 });
  });
});

test.describe('Smoke: Filters after click on Iowa', () => {
  test('Type filter Série on Iowa (should show 0)', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('[data-name="Iowa"]', { timeout: 15000 });
    await page.click('[data-name="Iowa"]');
    await page.waitForSelector('.media-item', { timeout: 10000 });

    await page.selectOption('#type-filter', 'Série');
    await page.waitForTimeout(300);

    const count = await page.locator('.media-item').count();
    expect(count).toBe(0); // Iowa has 0 series
  });

  test('Decade filter on Iowa', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('[data-name="Iowa"]', { timeout: 15000 });
    await page.click('[data-name="Iowa"]');
    await page.waitForSelector('.media-item', { timeout: 10000 });

    await page.selectOption('#decade-filter', '1990s');
    await page.waitForTimeout(300);

    const count = await page.locator('.media-item').count();
    expect(count).toBe(1); // Iowa has 1 film from 1990s (As Pontes de Madison 1995)
  });
});

test.describe('Smoke: Search', () => {
  test('Search Iowa and click', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.state', { timeout: 15000 });

    await page.fill('#search-input', 'Iowa');
    await page.click('#search-button');
    await page.waitForTimeout(300);

    await page.click('[data-name="Iowa"]');
    await expect(page.locator('#selected-state-title')).toContainText('Iowa', { timeout: 5000 });
  });

  test('Search Pulp Fiction highlights California', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.state', { timeout: 15000 });

    await page.fill('#search-input', 'Pulp Fiction');
    await page.click('#search-button');
    await page.waitForTimeout(300);

    const ca = page.locator('[data-name="California"]');
    await expect(ca).toHaveClass(/search-match/, { timeout: 5000 });
  });
});

test.describe('Smoke: Accessibility', () => {
  test('States have aria-label', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.state', { timeout: 15000 });

    const firstState = page.locator('.state').first();
    const label = await firstState.getAttribute('aria-label');
    expect(label).toContain('Clique para ver filmes e séries de');
  });

  test('Filters have aria-label', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.state', { timeout: 15000 });

    await expect(page.locator('#type-filter')).toHaveAttribute('aria-label', 'Filtrar por tipo');
    await expect(page.locator('#decade-filter')).toHaveAttribute('aria-label', 'Filtrar por década');
  });
});