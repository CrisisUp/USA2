import { test, expect } from '@playwright/test';

test.describe('Search - Mobile Touch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#usa-map', { state: 'visible', timeout: 10000 });
  });

  test('search with accent-insensitive term selects state', async ({ page }) => {
    await page.locator('#search-input').fill('sao paulo');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toContainText('São Paulo');
    await expect(page.locator('#SP')).toHaveClass(/selected/);
  });

  test('search with uppercase term works', async ({ page }) => {
    await page.locator('#search-input').fill('NOVA');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toContainText('Nova Iorque');
    await expect(page.locator('#NY')).toHaveClass(/selected/);
  });

  test('partial match selects first result', async ({ page }) => {
    // "cal" should match California first
    await page.locator('#search-input').fill('cal');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toContainText('Califórnia');
    await expect(page.locator('#CA')).toHaveClass(/selected/);
  });

  test('search by film title works', async ({ page }) => {
    await page.locator('#search-input').fill('godfather');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toContainText('Nova Iorque');
    await expect(page.locator('#NY')).toHaveClass(/selected/);
  });

  test('search by series title works', async ({ page }) => {
    await page.locator('#search-input').fill('friends');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toContainText('Nova Iorque');
    await expect(page.locator('#NY')).toHaveClass(/selected/);
  });

  test('search by media type works', async ({ page }) => {
    await page.locator('#search-input').fill('série');
    await page.keyboard.press('Enter');

    // Should find a state with series
    await expect(page.locator('.media-item')).toHaveCountGreaterThan(0);
  });

  test('empty search resets to initial state', async ({ page }) => {
    await page.locator('#search-input').fill('cal');
    await page.keyboard.press('Enter');
    await expect(page.locator('#selected-state-title')).toContainText('Califórnia');

    await page.locator('#search-input').fill('');
    await page.keyboard.press('Enter');

    await expect(page.locator('#selected-state-title')).toHaveText('Clique em um estado para ver os filmes e séries!');
    await expect(page.locator('.media-item')).toHaveCount(0);
  });

  test('escape key clears search', async ({ page }) => {
    await page.locator('#search-input').fill('california');
    await page.keyboard.press('Escape');

    await expect(page.locator('#search-input')).toHaveValue('');
    await expect(page.locator('#selected-state-title')).toHaveText('Clique em um estado para ver os filmes e séries!');
  });

  test('search button click works', async ({ page }) => {
    await page.locator('#search-input').fill('texas');
    await page.locator('#search-button').click();

    await expect(page.locator('#selected-state-title')).toContainText('Texas');
    await expect(page.locator('#TX')).toHaveClass(/selected/);
  });

  test('debounced search highlights matches on map', async ({ page }) => {
    await page.locator('#search-input').fill('cal');

    // Wait for debounce
    await page.waitForTimeout(400);

    // Both CA and other states with "cal" should be highlighted
    const highlighted = await page.locator('.state.search-match').count();
    expect(highlighted).toBeGreaterThan(0);
  });
});