// favorites.js - Favoritos persistidos em localStorage

const STORAGE_KEY = 'usa-map-favorites';

/**
 * Retorna a lista de favoritos (array de slugs de títulos).
 * @returns {string[]} Lista de slugs favoritos.
 */
export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Alterna o favorito de um slug na lista persistida.
 * @param {string} slug - O slug identificador do título.
 * @returns {boolean} true se agora está favoritado, false caso contrário.
 */
export function toggleFavorite(slug) {
  const favorites = getFavorites();
  const index = favorites.indexOf(slug);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(slug);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // localStorage indisponível (modo privado/quota) — ignora silenciosamente
  }
  return index < 0;
}

/**
 * Verifica se um slug está favoritado.
 * @param {string} slug - O slug identificador do título.
 * @returns {boolean} true se favoritado.
 */
export function isFavorite(slug) {
  return getFavorites().includes(slug);
}
