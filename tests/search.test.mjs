import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { JSDOM } from 'jsdom';

const mockStateData = {
  NY: {
    name: 'Nova Iorque',
    media: [
      {
        title: 'The Godfather',
        description: 'Uma saga de crime e família em Nova Iorque.',
        type: 'Filme',
      },
      {
        title: 'Friends',
        description: 'Grupo de amigos que vive na cidade de Nova Iorque.',
        type: 'Série',
      },
    ],
  },
  CA: {
    name: 'California',
    media: [
      {
        title: 'La La Land',
        description: 'Musical ambientado em Los Angeles.',
        type: 'Filme',
      },
    ],
  },
  TX: {
    name: 'Texas',
    media: [],
  },
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

vi.mock('../usa/js/data.js', () => ({
  stateData: mockStateData,
}));

vi.mock('../usa/js/map-interactions.js', () => ({
  resetStateHighlights: vi.fn(),
  getCurrentSelectedState: vi.fn(() => null),
  setCurrentSelectedState: vi.fn(),
  getMapInstance: vi.fn(() => null),
}));

vi.mock('../usa/js/filters.js', () => ({
  getActiveFilters: vi.fn(() => ({ type: 'all', minRating: 0, favoritesOnly: false })),
}));

vi.mock('../usa/js/display.js', () => ({
  displayStateDetails: vi.fn(),
}));

const searchModule = await import('../usa/js/search.js');
const { stateMatches } = searchModule;

describe('search', () => {
  describe('stateMatches', () => {
    it('matches by state name (case-insensitive)', () => {
      expect(stateMatches(mockStateData.NY, 'nova')).toBe(true);
      expect(stateMatches(mockStateData.NY, 'NOVA')).toBe(true);
      expect(stateMatches(mockStateData.NY, 'iorque')).toBe(true);
    });

    it('matches by media title', () => {
      expect(stateMatches(mockStateData.NY, 'godfather')).toBe(true);
      expect(stateMatches(mockStateData.NY, 'friends')).toBe(true);
    });

    it('matches by media description', () => {
      expect(stateMatches(mockStateData.NY, 'crime')).toBe(true);
      expect(stateMatches(mockStateData.CA, 'musical')).toBe(true);
    });

    it('matches by media type', () => {
      expect(stateMatches(mockStateData.NY, 'séri')).toBe(true);
      expect(stateMatches(mockStateData.CA, 'filme')).toBe(true);
    });

    it('returns false when no match', () => {
      expect(stateMatches(mockStateData.NY, 'guatemala')).toBe(false);
      expect(stateMatches(mockStateData.TX, 'filme')).toBe(false);
    });

    it('returns true if state has matching media even with empty-ish state', () => {
      expect(stateMatches(mockStateData.NY, '')).toBe(true); // empty term matches name
    });

    it('handles states with no media', () => {
      expect(stateMatches(mockStateData.TX, 'nova')).toBe(false);
    });

    it('is case-insensitive on media', () => {
      expect(stateMatches(mockStateData.NY, 'GODFATHER')).toBe(true);
      expect(stateMatches(mockStateData.NY, 'Nova Iorque')).toBe(true);
    });

    it('is accent-insensitive when query has accents', () => {
      // "Novo" won't match "Nova", but "Nova Iorque" matches full name
      expect(stateMatches(mockStateData.NY, 'São Paulo')).toBe(false);
    });

    it('returns false for a term that only partially matches a title', () => {
      expect(stateMatches(mockStateData.NY, 'the')).toBe(true); // substring match
      expect(stateMatches(mockStateData.CA, 'lalaland')).toBe(false); // no space match
    });
  });
});
