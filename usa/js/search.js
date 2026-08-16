// search.js - Lógica de busca

import { stateData } from './data.js';
import {
  resetStateHighlights,
  getCurrentSelectedState,
  setCurrentSelectedState,
  getMapInstance,
} from './map-interactions.js';
import { setDisplayedState } from './filters.js';

let cachedStates = null; // Cache dos elementos .state do mapa
let debounceTimer = null;
const DEBOUNCE_MS = 300;

/**
 * Inicializa a funcionalidade de busca e seus event listeners.
 */
export function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  // Cacheia os elementos .state uma única vez (o mapa não muda após carregamento)
  const map = getMapInstance();
  if (map) {
    cachedStates = map.querySelectorAll('.state');
  }

  // Debounced search on input (auto-search as user types)
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    searchInput.classList.add('searching');
    debounceTimer = setTimeout(() => {
      performSearch();
      searchInput.classList.remove('searching');
    }, DEBOUNCE_MS);
  });

  // Explicit search on button click
  searchButton.addEventListener('click', performSearch);

  // Explicit search on Enter key
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      clearTimeout(debounceTimer);
      searchInput.classList.remove('searching');
      performSearch();
    }
  });

  // Clear search on Escape
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      clearTimeout(debounceTimer);
      searchInput.value = '';
      searchInput.classList.remove('searching');
      performSearch();
      searchInput.blur();
    }
  });
}

/**
 * Normaliza string: minúsculas, trim, remove acentos/diacríticos.
 * @param {string} str
 * @returns {string}
 */
function normalizeTerm(str) {
  return String(str).toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, ''); // remove acentos
}

/**
 * Obtém o termo de busca do campo de entrada, normalizado para comparação.
 * @returns {string} O termo normalizado.
 */
function getSearchTerm() {
  const searchInput = document.getElementById('search-input');
  return normalizeTerm(searchInput.value);
}

/**
 * Verifica se um estado corresponde ao termo de busca (por nome, título, descrição ou tipo de mídia).
 * @param {object} stateInfo - Os dados do estado em stateData.
 * @param {string} searchTerm - O termo de busca (já normalizado).
 * @returns {boolean} true se houver correspondência.
 */
export function stateMatches(stateInfo, searchTerm) {
  const term = normalizeTerm(searchTerm);
  const stateNameNorm = normalizeTerm(stateInfo.name);
  if (stateNameNorm.includes(term)) {
    return true;
  }

  if (stateInfo.media && Array.isArray(stateInfo.media)) {
    return stateInfo.media.some(
      mediaItem =>
        mediaItem &&
        mediaItem.title &&
        mediaItem.description &&
        mediaItem.type &&
        (normalizeTerm(mediaItem.title).includes(term) ||
          normalizeTerm(mediaItem.description).includes(term) ||
          normalizeTerm(mediaItem.type).includes(term))
    );
  }
  return false;
}

/**
 * Destaca no mapa todos os estados que correspondem ao termo de busca.
 * @param {string} searchTerm - O termo normalizado.
 * @returns {{ foundAny: boolean, exactMatch: boolean, firstMatchId: string|null }} Se algum estado foi encontrado, se houve correspondência exata, e o ID do primeiro match.
 */
function findAndHighlightStates(searchTerm) {
  const usaMap = getMapInstance();
  let foundAny = false;
  let exactMatch = false;
  let firstMatchId = null;

  for (const stateId in stateData) {
    const stateInfo = stateData[stateId];
    const stateElement = usaMap.getElementById(stateId);

    if (!stateInfo) {
      console.warn(`Dados para o estado "${stateId}" ausentes em stateData.`);
      continue;
    }
    if (!stateElement) {
      console.warn(`Elemento SVG para o estado "${stateId}" não encontrado no mapa.`);
      continue;
    }

    if (stateMatches(stateInfo, searchTerm)) {
      stateElement.classList.add('search-match');
      foundAny = true;

      // Guarda o primeiro match para seleção fallback
      if (firstMatchId === null) {
        firstMatchId = stateId;
      }

      // Correspondência exata por nome normalizado ou código: seleciona o estado e exibe os detalhes
      const stateNameNorm = normalizeTerm(stateInfo.name);
      if (stateNameNorm === searchTerm || stateId.toLowerCase() === searchTerm) {
        selectExactMatch(stateId, stateElement);
        exactMatch = true;
        firstMatchId = stateId;
        break;
      }
    }
  }

  return { foundAny, exactMatch, firstMatchId };
}

/**
 * Seleciona um estado com correspondência exata, exibe seus detalhes e rola até eles.
 * @param {string} stateId - O ID do estado no mapa.
 * @param {SVGPathElement} stateElement - O elemento <path> do estado.
 */
function selectExactMatch(stateId, stateElement) {
  const currentSelectedState = getCurrentSelectedState();
  if (currentSelectedState) {
    currentSelectedState.classList.remove('selected');
  }

  stateElement.classList.add('selected');
  setCurrentSelectedState(stateElement);
  setDisplayedState(stateId);
  document
    .getElementById('details-container')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Atualiza o painel de detalhes com a mensagem do resultado da busca.
 * @param {string} title - O texto do título do painel.
 * @param {string} message - O texto da lista de resultados.
 * @param {boolean} [isEmpty=false] - Se é um estado vazio (sem resultados).
 */
function setSearchMessage(title, message, isEmpty = false) {
  document.getElementById('selected-state-title').textContent = title;

  if (isEmpty) {
    document.getElementById('media-list').innerHTML = `
      <li class="media-item empty-state">
        <div class="empty-state-content">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p class="empty-message">${message}</p>
          <p class="empty-hint">Tente buscar por outro estado, filme ou série.</p>
        </div>
      </li>
    `;
  } else {
    document.getElementById('media-list').innerHTML = `<li class="media-item">${message}</li>`;
  }
}

/**
 * Executa a busca no mapa e atualiza a exibição.
 */
function performSearch() {
  // Usa cache de elementos .state (populado em initSearch)
  const states = cachedStates || getMapInstance()?.querySelectorAll('.state') || [];
  resetStateHighlights(states); // Limpa destaques e seleções anteriores

  const searchTerm = getSearchTerm();
  if (!searchTerm) {
    document.getElementById('selected-state-title').textContent =
      'Clique em um estado para ver os filmes e séries!';
    document.getElementById('media-list').innerHTML = '';
    return; // Sai se a busca estiver vazia
  }

  const { foundAny, exactMatch, firstMatchId } = findAndHighlightStates(searchTerm);
  if (exactMatch) {
    // selectExactMatch já foi chamado dentro de findAndHighlightStates
    return;
  }
  if (!exactMatch && foundAny && firstMatchId) {
    // Seleciona o primeiro match como fallback
    const usaMap = getMapInstance();
    const stateElement = usaMap.getElementById(firstMatchId);
    if (stateElement) {
      selectExactMatch(firstMatchId, stateElement);
      return;
    }
  }
  if (!exactMatch && foundAny) {
    setSearchMessage(
      `Resultados da busca por "${searchTerm}"`,
      'Estados destacados no mapa correspondem à sua busca.'
    );
  } else if (!exactMatch) {
    setSearchMessage(
      `Nenhum resultado encontrado para "${searchTerm}".`,
      'Nenhum estado, filme ou série corresponde à sua busca.',
      true // isEmpty = true para mostrar estado vazio estilizado
    );
  }
}
