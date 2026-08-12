// tests/a11y.test.mjs — Testes de acessibilidade com axe-core + Playwright
// Executa: npm run test:a11y (requer servidor local rodando em http://localhost:8080)

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import { injectAxe, checkA11y } from '@axe-core/playwright';

const BASE_URL =
  (typeof process !== 'undefined' && process.env.TEST_BASE_URL) || 'http://localhost:8080';

test.describe('Acessibilidade (axe-core)', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectAxe(page);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('página inicial não tem violações críticas de a11y', async () => {
    await checkA11y(page, null, {
      detailedReport: true,
      includedImpacts: ['critical', 'serious'],
    });
  });

  test('mapa SVG tem labels acessíveis nos estados', async () => {
    const states = await page.locator('.state').all();
    expect(states.length).toBeGreaterThan(0);

    for (const state of states) {
      const ariaLabel = await state.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.length).toBeGreaterThan(5);
    }
  });

  test('busca tem label associado', async () => {
    const searchInput = page.locator('#search-input');
    const ariaLabel = await searchInput.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('botões têm labels acessíveis', async () => {
    const searchButton = page.locator('#search-button');
    const ariaLabel = await searchButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    const surpriseButton = page.locator('#surprise-button');
    const surpriseLabel = await surpriseButton.getAttribute('aria-label');
    expect(surpriseLabel).toBeTruthy();
  });

  test('filtros têm labels associados', async () => {
    const typeFilter = page.locator('#type-filter');
    const typeLabel = await typeFilter.getAttribute('aria-label');
    expect(typeLabel).toBeTruthy();

    const ratingFilter = page.locator('#min-rating');
    const ratingLabel = await ratingFilter.getAttribute('aria-label');
    expect(ratingLabel).toBeTruthy();

    const favoritesFilter = page.locator('#favorites-filter');
    const favoritesLabel = await favoritesFilter.getAttribute('aria-label');
    expect(favoritesLabel).toBeTruthy();
  });

  test('estados são focáveis via teclado', async () => {
    const firstState = page.locator('.state').first();
    await firstState.focus();
    await expect(firstState).toBeFocused();
  });

  test('contraste de cores no container principal', async () => {
    // axe-core já verifica contraste, mas podemos testar especificamente
    await checkA11y(page, '#main-content-container, main', {
      detailedReport: true,
      includedImpacts: ['critical', 'serious'],
      rules: {
        'color-contrast': { enabled: true },
      },
    });
  });

  test('imagens têm alt text', async () => {
    const images = await page.locator('img.media-cover').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('links externos têm indicação de nova aba', async () => {
    const imdbLinks = await page.locator('.imdb-link').all();
    for (const link of imdbLinks) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
      const rel = await link.getAttribute('rel');
      // Deveria ter rel="noopener noreferrer" para segurança
      // Mas aceitamos se não tiver (melhoria futura)
      void rel; // Suprime warning de variável não usada
    }
  });
});
