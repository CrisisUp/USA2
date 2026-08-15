import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  itemSlug,
  filterMedia,
  getOptimizedCoverUrls,
  renderMediaItem,
} from '../usa/js/display.js';

describe('display', () => {
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
        year: 1994,
      },
      {
        title: 'Series 1',
        type: 'Série',
        rating: '8.7/10',
        imdbLink: 'https://www.imdb.com/title/tt2/',
        year: 2017,
      },
      {
        title: 'Movie 2',
        type: 'Filme',
        rating: '7.5/10',
        imdbLink: 'https://www.imdb.com/title/tt3/',
        year: 1999,
      },
      {
        title: 'Series 2',
        type: 'Série',
        rating: '9.0/10',
        imdbLink: 'https://www.imdb.com/title/tt4/',
        year: 2020,
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

    // Decade filter tests
    it('filters by decade 1990s', () => {
      const result = filterMedia(mockMedia, { decade: '1990s' });
      expect(result).toHaveLength(2);
      expect(result.every(m => m.year >= 1990 && m.year <= 1999)).toBe(true);
      expect(result.map(m => m.title).sort()).toEqual(['Movie 1', 'Movie 2']);
    });

    it('filters by decade 2010s', () => {
      const result = filterMedia(mockMedia, { decade: '2010s' });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Series 1');
      expect(result[0].year).toBe(2017);
    });

    it('filters by decade 2020s', () => {
      const result = filterMedia(mockMedia, { decade: '2020s' });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Series 2');
      expect(result[0].year).toBe(2020);
    });

    it('returns all when decade is all', () => {
      const result = filterMedia(mockMedia, { decade: 'all' });
      expect(result).toHaveLength(4);
    });

    it('combines decade with type filter', () => {
      const result = filterMedia(mockMedia, { type: 'Filme', decade: '1990s' });
      expect(result).toHaveLength(2);
      expect(result.every(m => m.type === 'Filme' && m.year >= 1990 && m.year <= 1999)).toBe(true);
    });

    it('combines decade with minRating', () => {
      const result = filterMedia(mockMedia, { decade: '1990s', minRating: 9 });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Movie 1');
      expect(result[0].year).toBe(1994);
    });

    it('returns empty for decade with no matches', () => {
      const result = filterMedia(mockMedia, { decade: '1980s' });
      expect(result).toHaveLength(0);
    });

    it('includes items without year when filtering by decade (graceful fallback)', () => {
      // Items without year are included (treated as matching any decade)
      const mediaWithoutYear = [
        { title: 'No Year', type: 'Filme', rating: '8.0/10', imdbLink: 'https://www.imdb.com/title/tt1/' },
        { title: 'Has Year', type: 'Filme', rating: '9.0/10', imdbLink: 'https://www.imdb.com/title/tt2/', year: 1995 },
      ];
      const result = filterMedia(mediaWithoutYear, { decade: '1990s' });
      expect(result).toHaveLength(2); // both included - no-year items match any decade
      expect(result.map(m => m.title)).toContain('No Year');
      expect(result.map(m => m.title)).toContain('Has Year');
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
      expect(result.webp).toContain('data:image/svg+xml;base64');
      expect(result.avif).toContain('data:image/svg+xml;base64');
    });

    it('returns placeholder for null cover', () => {
      const result = getOptimizedCoverUrls(null);
      expect(result.webp).toContain('data:image/svg+xml;base64');
      expect(result.avif).toContain('data:image/svg+xml;base64');
    });

    it('returns placeholder for undefined cover', () => {
      const result = getOptimizedCoverUrls(undefined);
      expect(result.webp).toContain('data:image/svg+xml;base64');
      expect(result.avif).toContain('data:image/svg+xml;base64');
    });

    it('handles case insensitive extensions', () => {
      const result = getOptimizedCoverUrls('images/CA/MOVIE.PNG');
      expect(result.webp).toBe('images/CA/MOVIE.webp');
      expect(result.avif).toBe('images/CA/MOVIE.avif');
    });
  });

  describe('renderMediaItem', () => {
    const mockItem = {
      title: 'Test Movie',
      type: 'Filme',
      rating: '9.0/10',
      description: 'A great movie.',
      imdbLink: 'https://www.imdb.com/title/tt1234567/',
      cover: 'images/CA/test-movie.png',
    };

    it('creates an li with media-item class', () => {
      const li = renderMediaItem(mockItem);
      expect(li.tagName).toBe('LI');
      expect(li.classList.contains('media-item')).toBe(true);
    });

    it('generates picture element with avif and webp sources', () => {
      const li = renderMediaItem(mockItem);
      const picture = li.querySelector('picture');
      expect(picture).toBeTruthy();

      const avifSource = picture.querySelector('source[type="image/avif"]');
      expect(avifSource).toBeTruthy();
      expect(avifSource.getAttribute('srcset')).toContain('.avif');

      const webpSource = picture.querySelector('source[type="image/webp"]');
      expect(webpSource).toBeTruthy();
      expect(webpSource.getAttribute('srcset')).toContain('.webp');
    });

    it('img has correct src, alt, loading, width, height', () => {
      const li = renderMediaItem(mockItem);
      const img = li.querySelector('img.media-cover');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toContain('images/CA/test-movie.png');
      expect(img.getAttribute('alt')).toBe('Capa de Test Movie');
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('width')).toBe('80');
      expect(img.getAttribute('height')).toBe('120');
    });

    it('img has onerror handler pointing to placeholder', () => {
      const li = renderMediaItem(mockItem);
      const img = li.querySelector('img.media-cover');
      const onerror = img.getAttribute('onerror');
      expect(onerror).toContain('data:image/svg+xml;base64');
      expect(onerror).toContain('this.onerror=null');
    });

    it('includes fav button with correct aria attributes', () => {
      const li = renderMediaItem(mockItem);
      const favBtn = li.querySelector('.fav-btn');
      expect(favBtn).toBeTruthy();
      expect(favBtn.getAttribute('aria-pressed')).toBe('false');
      expect(favBtn.getAttribute('aria-label')).toBe('Adicionar aos favoritos');
      expect(favBtn.textContent).toBe('☆');
    });

    it('includes IMDb link with target="_blank"', () => {
      const li = renderMediaItem(mockItem);
      const imdbLink = li.querySelector('.imdb-link');
      expect(imdbLink).toBeTruthy();
      expect(imdbLink.getAttribute('href')).toBe('https://www.imdb.com/title/tt1234567/');
      expect(imdbLink.getAttribute('target')).toBe('_blank');
      expect(imdbLink.textContent).toBe('Ver no IMDb');
    });

    it('shows rating span', () => {
      const li = renderMediaItem(mockItem);
      const rating = li.querySelector('.media-rating');
      expect(rating).toBeTruthy();
      expect(rating.textContent).toBe('Nota: 9.0/10');
    });

    it('uses placeholder when cover is missing', () => {
      const itemNoCover = { ...mockItem, cover: null };
      const li = renderMediaItem(itemNoCover);
      const img = li.querySelector('img.media-cover');
      expect(img.getAttribute('src')).toContain('data:image/svg+xml;base64');
    });

    it('escapes HTML in title and description (XSS prevention)', () => {
      const itemXSS = {
        ...mockItem,
        title: '<script>alert(1)</script>',
        description: '"onmouseover="xss',
      };
      const li = renderMediaItem(itemXSS);
      // innerHTML should have escaped entities (< > "), not raw tags/attrs
      const headerHtml = li.querySelector('.media-header').innerHTML;
      expect(headerHtml).not.toContain('<script>'); // raw <script> not present
      const descHtml = li.querySelector('.media-description').innerHTML;
      expect(descHtml).toContain('"'); // quotes escaped
    });
  });
});
