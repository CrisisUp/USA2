// filters.js - Filtros, favoritos e "surpreenda-me"

import { stateData } from './data.js';
import { displayStateDetails } from './display.js';
import { toggleFavorite } from './favorites.js';

let currentStateId = null; // Estado cujos detalhes estão exibidos

/**
 * Lê os filtros ativos do DOM.
 * @returns {{type: string, minRating: number, favoritesOnly: boolean}} Filtros atuais.
 */
export function getActiveFilters() {
  return {
    type: document.getElementById('type-filter').value,
    minRating: parseInt(document.getElementById('min-rating').value, 10) || 0,
    favoritesOnly: document.getElementById('favorites-filter').value.trim() !== '',
  };
}

/**
 * Aplica os filtros atuais ao estado que está sendo exibido.
 */
export function applyFilters() {
  if (currentStateId) {
    displayStateDetails(currentStateId, getActiveFilters());
  }
}

/**
 * Atualiza o estado exibido e re-renderiza com os filtros.
 * @param {string} stateId - O ID do estado selecionado.
 */
export function setDisplayedState(stateId) {
  currentStateId = stateId;
  applyFilters();
}

/**
 * Sorteia um título aleatório de um estado e o exibe.
 */
export function surpriseMe() {
  const randomStateId = getRandomStateIdWithMedia();
  if (!randomStateId) {
    return;
  }
  setDisplayedState(randomStateId);
  document
    .getElementById('details-container')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Escolhe um estado que tenha mídia (evita estados sem títulos).
 * @returns {string | null} ID de um estado com conteúdo.
 */
function getRandomStateIdWithMedia() {
  const stateIds = Object.keys(stateData).filter(
    id => stateData[id] && stateData[id].media && stateData[id].media.length > 0
  );
  if (stateIds.length === 0) {
    return null;
  }
  return stateIds[Math.floor(Math.random() * stateIds.length)];
}

/**
 * Inicializa os controles de filtros, favoritos e o botão "surpreenda-me".
 */
export function initFilters() {
  const typeFilter = document.getElementById('type-filter');
  const minRating = document.getElementById('min-rating');
  const favoritesFilter = document.getElementById('favorites-filter');
  const surpriseButton = document.getElementById('surprise-button');

  [typeFilter, minRating, favoritesFilter].forEach(el => {
    el.addEventListener('change', applyFilters);
  });
  favoritesFilter.addEventListener('input', applyFilters);

  surpriseButton.addEventListener('click', surpriseMe);

  // Delegação de clique: qualquer botão de favorito nos itens de mídia
  document.getElementById('media-list').addEventListener('click', event => {
    const favBtn = event.target.closest('.fav-btn');
    if (!favBtn) {
      return;
    }
    const slug = favBtn.dataset.slug;
    const isNowFav = toggleFavorite(slug);
    favBtn.textContent = isNowFav ? '★' : '☆';
    favBtn.setAttribute('aria-pressed', String(isNowFav));
    favBtn.setAttribute(
      'aria-label',
      isNowFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
    );
  });
}
