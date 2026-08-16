import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#usa-map', { state: 'visible', timeout: 10000 });
  });

  test('touch targets meet 44x44px minimum (WCAG 2.5.5) - mobile only', async ({ page, browserName }) => {
    // Skip on desktop - touch targets only apply to mobile
    const isDesktop = browserName === 'chromium' && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Mobile') && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Tablet');
    if (isDesktop) {
      test.skip();
      return;
    }

    const touchTargets = [
      '.map-mode-btn',
      '#search-button',
      '#surprise-button',
      '#filters select',
      '#filters input[type="text"]',
      '.fav-btn',
      '#search-input',
    ];

    for (const selector of touchTargets) {
      const elements = await page.locator(selector).all();
      for (const el of elements) {
        const box = await el.boundingBox();
        if (box) {
          // Allow 1px tolerance for rounding
          expect(box.height).toBeGreaterThanOrEqual(43);
          expect(box.width).toBeGreaterThanOrEqual(43);
        }
      }
    }
  });

  test('no axe critical/serious violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = results.violations.filter(v =>
      ['critical', 'serious'].includes(v.impact)
    );

    if (violations.length > 0) {
      console.warn('A11y violations:', JSON.stringify(
        violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        })), null, 2
      ));
    }
    expect(violations.length).toBe(0);
  });

  test('color contrast passes on mobile', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    const violations = results.violations.filter(v =>
      ['critical', 'serious'].includes(v.impact)
    );
    // Filter out known false positives from SVG map
    const relevantViolations = violations.filter(v =>
      !v.id.includes('svg') && !v.id.includes('map')
    );
    expect(relevantViolations.length).toBe(0);
  });

  test('map states have accessible labels', async ({ page }) => {
    const states = await page.locator('.state').all();
    expect(states.length).toBeGreaterThan(0);

    for (const state of states) {
      const ariaLabel = await state.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.length).toBeGreaterThan(5);
    }
  });

  test('search input has accessible label', async ({ page }) => {
    const ariaLabel = await page.locator('#search-input').getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('filter controls have accessible labels', async ({ page }) => {
    const typeLabel = await page.locator('#type-filter').getAttribute('aria-label');
    expect(typeLabel).toBeTruthy();

    const ratingLabel = await page.locator('#min-rating').getAttribute('aria-label');
    expect(ratingLabel).toBeTruthy();

    const favoritesLabel = await page.locator('#favorites-filter').getAttribute('aria-label');
    expect(favoritesLabel).toBeTruthy();
  });

  test('states are keyboard focusable', async ({ page }) => {
    const firstState = page.locator('.state').first();
    await firstState.focus();
    const isFocused = await firstState.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('images have alt text', async ({ page, browserName }) => {
    // Skip on desktop if no state selected by default
    const isDesktop = browserName === 'chromium' && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Mobile') && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Tablet');
    if (isDesktop) {
      test.skip();
      return;
    }

    // Trigger a state selection to load media items
    await page.locator('#CA').click();
    await expect(page.locator('.media-item')).toHaveCountGreaterThan(0);

    const images = await page.locator('img.media-cover').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('external links have target blank', async ({ page, browserName }) => {
    // Skip on desktop if no state selected by default
    const isDesktop = browserName === 'chromium' && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Mobile') && !process.env.PLAYWRIGHT_TEST_PROJECT?.includes('Tablet');
    if (isDesktop) {
      test.skip();
      return;
    }

    await page.locator('#CA').click();
    await expect(page.locator('.media-item')).toHaveCountGreaterThan(0);

    const imdbLinks = await page.locator('.imdb-link').all();
    for (const link of imdbLinks) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});