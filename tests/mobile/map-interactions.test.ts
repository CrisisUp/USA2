import { test, expect } from '@playwright/test';

test.describe('Map Interactions - Mobile Touch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for map to load
    await page.waitForSelector('#usa-map', { state: 'visible', timeout: 10000 });
  });

  test('click on state selects it and shows details', async ({ page }) => {
    // Click on California (more reliable than tap in headless)
    await page.locator('#CA').click();

    // Check details panel updates
    await expect(page.locator('#selected-state-title')).toContainText('Califórnia');
    await expect(page.locator('.media-item')).toHaveCountGreaterThan(0);
  });

  test('click on state highlights it on map', async ({ page }) => {
    await page.locator('#CA').click();
    await expect(page.locator('#CA')).toHaveClass(/selected/);
  });

  test('click different state changes selection', async ({ page }) => {
    await page.locator('#CA').click();
    await expect(page.locator('#selected-state-title')).toContainText('Califórnia');

    await page.locator('#NY').click();
    await expect(page.locator('#selected-state-title')).toContainText('Nova Iorque');
    await expect(page.locator('#CA')).not.toHaveClass(/selected/);
    await expect(page.locator('#NY')).toHaveClass(/selected/);
  });

  test('search input works with touch keyboard', async ({ page }) => {
    // Focus search input
    await page.locator('#search-input').click();
    await page.locator('#search-input').fill('nova');

    // Press Enter on virtual keyboard
    await page.keyboard.press('Enter');

    // Should select Nova Iorque
    await expect(page.locator('#selected-state-title')).toContainText('Nova Iorque');
  });

  test('map mode toggle works on click', async ({ page }) => {
    // Click series mode button
    await page.locator('#mode-series').click();

    await expect(page.locator('#mode-series')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#mode-filmes')).toHaveAttribute('aria-pressed', 'false');

    // Check some states changed color (mode-series applies)
    const seriesStates = await page.locator('.state.mode-series').count();
    expect(seriesStates).toBeGreaterThan(0);
  });

  test('surprise me button works on click', async ({ page }) => {
    await page.locator('#surprise-button').click();

    // Should have selected some state and show details
    await expect(page.locator('.media-item')).toHaveCountGreaterThan(0);
    const title = await page.locator('#selected-state-title').textContent();
    expect(title).not.toBe('Clique em um estado para ver os filmes e séries!');
  });
});