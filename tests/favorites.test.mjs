import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getFavorites, toggleFavorite, isFavorite } from '../usa/js/favorites.js';

const STORAGE_KEY = 'usa-map-favorites';

// Mock localStorage
const mockStorage = new Map();
const localStorageMock = {
  getItem: vi.fn(key => mockStorage.get(key) || null),
  setItem: vi.fn((key, value) => mockStorage.set(key, value)),
  removeItem: vi.fn(key => mockStorage.delete(key)),
  clear: vi.fn(() => mockStorage.clear()),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('favorites', () => {
  beforeEach(() => {
    mockStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockStorage.clear();
  });

  describe('getFavorites', () => {
    it('returns empty array when nothing stored', () => {
      expect(getFavorites()).toEqual([]);
    });

    it('returns parsed array from localStorage', () => {
      mockStorage.set(STORAGE_KEY, JSON.stringify(['tt0110912', 'tt0068646']));
      expect(getFavorites()).toEqual(['tt0110912', 'tt0068646']);
    });

    it('returns empty array for invalid JSON', () => {
      mockStorage.set(STORAGE_KEY, 'not valid json');
      expect(getFavorites()).toEqual([]);
    });

    it('returns empty array for non-array JSON', () => {
      mockStorage.set(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
      expect(getFavorites()).toEqual([]);
    });

    it('handles localStorage unavailable gracefully', () => {
      const original = global.localStorage;
      global.localStorage = undefined;
      expect(getFavorites()).toEqual([]);
      global.localStorage = original;
    });
  });

  describe('toggleFavorite', () => {
    it('adds slug when not present', () => {
      const result = toggleFavorite('tt0110912');
      expect(result).toBe(true);
      expect(getFavorites()).toContain('tt0110912');
    });

    it('removes slug when already present', () => {
      mockStorage.set(STORAGE_KEY, JSON.stringify(['tt0110912']));
      const result = toggleFavorite('tt0110912');
      expect(result).toBe(false);
      expect(getFavorites()).not.toContain('tt0110912');
    });

    it('persists to localStorage', () => {
      toggleFavorite('tt0110912');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(['tt0110912'])
      );
    });

    it('handles multiple toggles', () => {
      toggleFavorite('tt0110912');
      toggleFavorite('tt0068646');
      expect(getFavorites()).toEqual(['tt0110912', 'tt0068646']);
      toggleFavorite('tt0110912');
      expect(getFavorites()).toEqual(['tt0068646']);
    });

    it('handles localStorage setItem error gracefully', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('Quota exceeded');
      });
      expect(() => toggleFavorite('tt0110912')).not.toThrow();
    });
  });

  describe('isFavorite', () => {
    it('returns false for empty favorites', () => {
      expect(isFavorite('tt0110912')).toBe(false);
    });

    it('returns true when slug is in favorites', () => {
      mockStorage.set(STORAGE_KEY, JSON.stringify(['tt0110912', 'tt0068646']));
      expect(isFavorite('tt0110912')).toBe(true);
      expect(isFavorite('tt0068646')).toBe(true);
    });

    it('returns false when slug not in favorites', () => {
      mockStorage.set(STORAGE_KEY, JSON.stringify(['tt0110912']));
      expect(isFavorite('tt0068646')).toBe(false);
    });
  });
});
