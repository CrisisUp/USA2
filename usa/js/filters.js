// filters.js - Filtros, favoritos e "surpreenda-me"

import { stateData } from './data.js';
import { displayStateDetails } from './display.js';
import { toggleFavorite } from './favorites.js';
import { getMapInstance } from './map-interactions.js';

let currentStateId = null; // Estado cujos detalhes estão exibidos
let currentMapMode = 'filmes'; // 'filmes' | 'series'

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
 * Calcula a contagem de filmes e séries por estado.
 * @returns {Map<string, {filmes: number, series: number, total: number}>}
 */
export function calculateMediaCounts() {
  const counts = new Map();
  // Evita shadowing do import `stateData` — usa nome diferente no loop
  for (const [stateId, state] of Object.entries(stateData)) {
    if (state.media) {
      const filmes = state.media.filter(m => m.type === 'Filme').length;
      const series = state.media.filter(m => m.type === 'Série').length;
      counts.set(stateId, { filmes, series, total: filmes + series });
    } else {
      counts.set(stateId, { filmes: 0, series: 0, total: 0 });
    }
  }
  return counts;
}

/**
 * Aplica o modo de visualização do mapa (filmes vs séries).
 * @param {string} mode - 'filmes' ou 'series'
 */
export function applyMapMode(mode) {
  const usaMap = getMapInstance();
  if (!usaMap) return;

  const counts = calculateMediaCounts();
  const states = usaMap.querySelectorAll('.state');

  states.forEach(statePath => {
    const stateId = statePath.id;
    const count = counts.get(stateId);

    // Remove classes anteriores
    statePath.classList.remove('mode-filmes', 'mode-series', 'mode-neutral');

    if (!count || count.total === 0) {
      statePath.classList.add('mode-neutral');
      return;
    }

    if (mode === 'filmes') {
      if (count.filmes > count.series) {
        statePath.classList.add('mode-filmes');
      } else if (count.series > count.filmes) {
        statePath.classList.add('mode-series');
      } else {
        statePath.classList.add('mode-neutral');
      }
    } else if (mode === 'series') {
      if (count.series > count.filmes) {
        statePath.classList.add('mode-series');
      } else if (count.filmes > count.series) {
        statePath.classList.add('mode-filmes');
      } else {
        statePath.classList.add('mode-neutral');
      }
    }
  });

  currentMapMode = mode;

  // Atualiza botões (guarda contra execução antes do DOM estar pronto)
  const filmesBtn = document.getElementById('mode-filmes');
  const seriesBtn = document.getElementById('mode-series');
  if (!filmesBtn || !seriesBtn) {
    return; // Botões ainda não existem no DOM
  }
  filmesBtn.classList.toggle('active', mode === 'filmes');
  filmesBtn.setAttribute('aria-pressed', mode === 'filmes');
  seriesBtn.classList.toggle('active', mode === 'series');
  seriesBtn.setAttribute('aria-pressed', mode === 'series');
}

/**
 * Inicializa o toggle de modo do mapa (Filmes vs Séries).
 */
function initMapModeToggle() {
  const filmesBtn = document.getElementById('mode-filmes');
  const seriesBtn = document.getElementById('mode-series');

  if (!filmesBtn || !seriesBtn) return;

  filmesBtn.addEventListener('click', () => applyMapMode('filmes'));
  seriesBtn.addEventListener('click', () => applyMapMode('series'));
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

  // Inicializa toggle de modo do mapa
  initMapModeToggle();

  // Aplica modo inicial após mapa carregar
  setTimeout(() => applyMapMode(currentMapMode), 100);
}
