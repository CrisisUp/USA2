import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock stateData BEFORE importing filters
const mockStateData = {
  CA: { media: [{ type: 'Filme' }, { type: 'Filme' }, { type: 'Série' }] },
  NY: { media: [{ type: 'Série' }, { type: 'Série' }] },
  TX: { media: [] },
  FL: { media: [{ type: 'Filme' }] },
};

// Mock DOM elements for getActiveFilters
const createMockFiltersDOM = () => {
  document.body.innerHTML = `
    <select id="type-filter"><option value="all" selected>Todos</option><option value="Filme">Filmes</option><option value="Série">Séries</option></select>
    <select id="min-rating"><option value="0" selected>Qualquer</option><option value="7">7+</option><option value="8">8+</option></select>
    <input type="text" id="favorites-filter" value="" />
    <select id="decade-filter"><option value="all" selected>Todas</option><option value="1990s">1990s</option></select>
    <button id="mode-filmes" class="map-mode-btn"></button>
    <button id="mode-series" class="map-mode-btn"></button>
    <div id="media-list"></div>
    <div id="details-container"></div>
    <h2 id="selected-state-title"></h2>
  `;
};

let dom;

beforeAll(() => {
  dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;
  global.window = dom.window;
});

afterAll(() => {
  dom.window.close();
  delete global.document;
  delete global.window;
});

// Mock modules that depend on DOM
vi.mock('../usa/js/data.js', () => ({
  stateData: mockStateData,
}));

// Import after mocks are set up
const { calculateMediaCounts, getActiveFilters } = await import('../usa/js/filters.js');

describe('filters', () => {
  beforeEach(() => {
    createMockFiltersDOM();
    vi.resetModules();
  });

  describe('calculateMediaCounts', () => {
    it('calculates filmes, series, and total per state', () => {
      const counts = calculateMediaCounts();
      expect(counts.get('CA')).toEqual({ filmes: 2, series: 1, total: 3 });
      expect(counts.get('NY')).toEqual({ filmes: 0, series: 2, total: 2 });
      expect(counts.get('TX')).toEqual({ filmes: 0, series: 0, total: 0 });
      expect(counts.get('FL')).toEqual({ filmes: 1, series: 0, total: 1 });
    });

    it('returns Map with all states from stateData', () => {
      const counts = calculateMediaCounts();
      expect(counts.size).toBe(Object.keys(mockStateData).length);
    });
  });

  describe('getActiveFilters', () => {
    it('returns default filters when nothing selected', () => {
      const filters = getActiveFilters();
      expect(filters.type).toBe('all');
      expect(filters.minRating).toBe(0);
      expect(filters.favoritesOnly).toBe(false);
    });

    it('reads type filter value', () => {
      document.getElementById('type-filter').value = 'Filme';
      const filters = getActiveFilters();
      expect(filters.type).toBe('Filme');
    });

    it('reads minRating filter value', () => {
      document.getElementById('min-rating').value = '8';
      const filters = getActiveFilters();
      expect(filters.minRating).toBe(8);
    });

    it('returns true for favoritesOnly when input has value', () => {
      document.getElementById('favorites-filter').value = 'my-favorite';
      const filters = getActiveFilters();
      expect(filters.favoritesOnly).toBe(true);
    });

    it('trims favorites-filter value', () => {
      document.getElementById('favorites-filter').value = '  ';
      const filters = getActiveFilters();
      expect(filters.favoritesOnly).toBe(false);
    });
  });
});
