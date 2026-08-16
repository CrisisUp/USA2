import { test, expect } from '@playwright/test';

test.describe('Popover - Mobile Touch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#usa-map', { state: 'visible', timeout: 10000 });
  });

  test('popover element exists for states with data', async ({ page }) => {
    // Check that popover elements are created for states with data
    const popovers = page.locator('.state-popover');
    await expect(popovers.first()).toBeAttached();
  });

  test('popover shows state name and stats when opened via click', async ({ page }) => {
    // Use click instead of tap for more reliable triggering in headless
    await page.locator('#CA').click();

    // Check popover content via direct DOM query
    const popover = page.locator('.state-popover').first();
    await expect(popover.locator('strong')).toContainText('Califórnia');
    await expect(popover.locator('.popover-stats')).toContainText('🎬');
    await expect(popover.locator('.popover-stats')).toContainText('📺');
  });

  test('popover shows top rated item', async ({ page }) => {
    await page.locator('#CA').click();

    const popover = page.locator('.state-popover').first();
    await expect(popover.locator('.popover-top-title')).toBeVisible();
    await expect(popover.locator('.popover-top-type')).toBeVisible();
  });

  test('popover toggles on click', async ({ page }) => {
    await page.locator('#CA').click();
    const popover = page.locator('.state-popover').first();
    await expect(popover).toBeVisible();

    // Click again to toggle off
    await page.locator('#CA').click();
    await expect(popover).not.toBeVisible();
  });

  test('popover closes when clicking another state', async ({ page }) => {
    await page.locator('#CA').click();
    const popoverCA = page.locator('.state-popover').first();
    await expect(popoverCA).toBeVisible();

    await page.locator('#NY').click();
    await expect(popoverCA).not.toBeVisible();
  });

  test('popover closes when clicking outside map', async ({ page }) => {
    await page.locator('#CA').click();
    const popover = page.locator('.state-popover').first();
    await expect(popover).toBeVisible();

    // Click on body outside map
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await expect(popover).not.toBeVisible();
  });
});