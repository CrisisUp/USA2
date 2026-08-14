import { describe, it, expect } from 'vitest';
import { itemSlug, filterMedia, getOptimizedCoverUrls } from '../usa/js/display.js';

describe('display', () => {
  describe('itemSlug', () => {
    it('extracts IMDb ID from imdbLink', () => {
      const item = { imdbLink: 'https://www.imdb.com/title/tt0110912/' };
      expect(itemSlug(item)).toBe('tt0110912');
    });

    it('generates slug from title when no imdbLink', () => {
      const item = { title: 'The Shawshank Redemption' };
      expect(itemSlug(item)).toBe('the-shawshank-redemption');
    });

    it('normalizes accents in title', () => {
      const item = { title: 'São Paulo' };
      expect(itemSlug(item)).toBe('sao-paulo');
    });

    it('handles special characters in title', () => {
      const item = { title: 'O Brother, Where Art Thou?' };
      expect(itemSlug(item)).toBe('o-brother-where-art-thou');
    });

    it('returns empty string for missing title', () => {
      expect(itemSlug({})).toBe('');
      expect(itemSlug({ title: null })).toBe('');
    });

    it('prefers imdbLink over title', () => {
      const item = {
        imdbLink: 'https://www.imdb.com/title/tt9999999/',
        title: 'Different Title',
      };
      expect(itemSlug(item)).toBe('tt9999999');
    });
  });

  describe('filterMedia', () => {
    const mockMedia = [
      {
        title: 'Movie 1',
        type: 'Filme',
        rating: '9.3/10',
        imdbLink: 'https://www.imdb.com/title/tt1/',
      },
      {
        title: 'Series 1',
        type: 'Série',
        rating: '8.7/10',
        imdbLink: 'https://www.imdb.com/title/tt2/',
      },
      {
        title: 'Movie 2',
        type: 'Filme',
        rating: '7.5/10',
        imdbLink: 'https://www.imdb.com/title/tt3/',
      },
      {
        title: 'Series 2',
        type: 'Série',
        rating: '9.0/10',
        imdbLink: 'https://www.imdb.com/title/tt4/',
      },
    ];

    it('returns all items when no filters', () => {
      expect(filterMedia(mockMedia, {})).toHaveLength(4);
    });

    it('filters by type Filme', () => {
      const result = filterMedia(mockMedia, { type: 'Filme' });
      expect(result).toHaveLength(2);
      expect(result.every(m => m.type === 'Filme')).toBe(true);
    });

    it('filters by type Série', () => {
      const result = filterMedia(mockMedia, { type: 'Série' });
      expect(result).toHaveLength(2);
      expect(result.every(m => m.type === 'Série')).toBe(true);
    });

    it('filters by minRating', () => {
      const result = filterMedia(mockMedia, { minRating: 8.5 });
      expect(result).toHaveLength(3);
      expect(result.every(m => parseFloat(m.rating) >= 8.5)).toBe(true);
    });

    it('filters by minRating (matches 9.0 and 9.3)', () => {
      const result = filterMedia(mockMedia, { minRating: 9 });
      expect(result).toHaveLength(2);
      expect(result.map(m => m.rating).sort()).toEqual(['9.0/10', '9.3/10']);
    });

    it('filters by favoritesOnly', () => {
      const result = filterMedia(mockMedia, { favoritesOnly: true });
      expect(result).toHaveLength(0); // none are favorites in test
    });

    it('combines multiple filters', () => {
      const result = filterMedia(mockMedia, { type: 'Filme', minRating: 8 });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Movie 1');
    });

    it('returns empty array when no matches', () => {
      const result = filterMedia(mockMedia, { type: 'Filme', minRating: 10 });
      expect(result).toHaveLength(0);
    });
  });

  describe('getOptimizedCoverUrls', () => {
    it('returns webp and avif URLs for png cover', () => {
      const result = getOptimizedCoverUrls('images/CA/movie.png');
      expect(result.webp).toBe('images/CA/movie.webp');
      expect(result.avif).toBe('images/CA/movie.avif');
    });

    it('returns webp and avif URLs for jpg cover', () => {
      const result = getOptimizedCoverUrls('images/NY/series.jpg');
      expect(result.webp).toBe('images/NY/series.webp');
      expect(result.avif).toBe('images/NY/series.avif');
    });

    it('returns webp and avif URLs for jpeg cover', () => {
      const result = getOptimizedCoverUrls('images/TX/film.jpeg');
      expect(result.webp).toBe('images/TX/film.webp');
      expect(result.avif).toBe('images/TX/film.avif');
    });

    it('returns placeholder for empty cover', () => {
      const result = getOptimizedCoverUrls('');
      expect(result.webp).toContain('via.placeholder.com');
      expect(result.avif).toContain('via.placeholder.com');
    });

    it('returns placeholder for null cover', () => {
      const result = getOptimizedCoverUrls(null);
      expect(result.webp).toContain('via.placeholder.com');
      expect(result.avif).toContain('via.placeholder.com');
    });

    it('returns placeholder for undefined cover', () => {
      const result = getOptimizedCoverUrls(undefined);
      expect(result.webp).toContain('via.placeholder.com');
      expect(result.avif).toContain('via.placeholder.com');
    });

    it('handles case insensitive extensions', () => {
      const result = getOptimizedCoverUrls('images/CA/MOVIE.PNG');
      expect(result.webp).toBe('images/CA/MOVIE.webp');
      expect(result.avif).toBe('images/CA/MOVIE.avif');
    });
  });
});
