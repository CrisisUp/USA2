import { describe, it, expect } from 'vitest';
import { stateData } from '../usa/js/data.js';
import { itemSlug } from '../usa/js/display.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USA_DIR = path.resolve(__dirname, '..', 'usa');

const RATING_RE = /^[\d.,]+\/10$/;
const IMDB_RE = /^https:\/\/www\.imdb\.com\/title\/tt\d+\/$/;
const COVER_RE = /^images\/[A-Z]{2}\/[A-Za-z0-9._-]+\.(png|jpg|jpeg|webp|svg)$/;

/** @type {{name: string, media: Array}[]} */
const allItems = Object.values(stateData).flatMap((state) => state.media);

describe('catálogo', () => {
  it('tem 51 estados', () => {
    expect(Object.keys(stateData).length).toBe(51);
  });

  it('não tem estados sem mídia', () => {
    const empty = Object.entries(stateData)
      .filter(([, s]) => !Array.isArray(s.media) || s.media.length === 0)
      .map(([id]) => id);
    expect(empty).toEqual([]);
  });

  it('todos os itens têm título, tipo válido, rating e link IMDb', () => {
    for (const item of allItems) {
      expect(item.title, 'título ausente').toBeTruthy();
      expect(['Filme', 'Série'], `tipo inválido em "${item.title}"`).toContain(item.type);
      expect(item.rating, `rating ausente em "${item.title}"`).toBeTruthy();
      expect(item.rating, `rating fora do padrão em "${item.title}"`).toMatch(RATING_RE);
      expect(item.imdbLink, `imdbLink ausente em "${item.title}"`).toBeTruthy();
      expect(item.imdbLink, `imdbLink inválido em "${item.title}"`).toMatch(IMDB_RE);
    }
  });

  it('tem o total esperado de itens e itemSlug é único (sem duplicados)', () => {
    expect(allItems.length).toBeGreaterThanOrEqual(100);
    const seen = new Set();
    for (const item of allItems) {
      const slug = itemSlug(item);
      expect(seen.has(slug), `slug duplicado "${slug}" (${item.title})`).toBe(false);
      seen.add(slug);
    }
  });

  it('covers (quando presentes) referenciam imagens existentes no disco', () => {
    for (const item of allItems) {
      if (!item.cover) continue; // sem poster livre → placeholder no display.js
      expect(item.cover, `cover fora do padrão em "${item.title}"`).toMatch(COVER_RE);
      const file = path.resolve(USA_DIR, item.cover);
      expect(fs.existsSync(file), `arquivo não encontrado: ${item.cover} ("${item.title}")`).toBe(true);
    }
  });

  it('Nova Iorque e Texas têm pelo menos 3 itens cada', () => {
    expect(stateData.NY.media.length).toBeGreaterThanOrEqual(3);
    expect(stateData.TX.media.length).toBeGreaterThanOrEqual(3);
  });
});
