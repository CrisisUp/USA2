import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = path.resolve(__dirname, '..', 'usa', 'index.html');

let dom;

beforeAll(() => {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'https://localhost/',
  });
});

afterAll(() => {
  dom.window.close();
});

describe('DOM (index.html)', () => {
  it('carrega o index.html', () => {
    expect(html()).toContain('Explorando os EUA');
  });

  it('tem todos os elementos essenciais', () => {
    expect(el('#map-container')).toBeTruthy();
    expect(el('#details-container')).toBeTruthy();
    expect(el('#selected-state-title')).toBeTruthy();
    expect(el('#media-list')).toBeTruthy();
    expect(el('#search-input')).toBeTruthy();
    expect(el('#search-button')).toBeTruthy();
    expect(el('#type-filter')).toBeTruthy();
    expect(el('#min-rating')).toBeTruthy();
    expect(el('#surprise-button')).toBeTruthy();
  });

  it('carrega os módulos JS como ES modules', () => {
    const scripts = [...dom.window.document.querySelectorAll('script[type="module"]')];
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    const src = scripts[0].getAttribute('src') || '';
    expect(src).toBe('js/main.js');
  });

  it('tem um manifest PWA', () => {
    const link = dom.window.document.querySelector('link[rel="manifest"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toContain('manifest');
  });
});

// helpers
function html() {
  return dom.window.document.documentElement.outerHTML;
}
function el(sel) {
  return dom.window.document.querySelector(sel);
}
