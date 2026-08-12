// display.js - Lógica de exibição de detalhes

import { escapeHTML } from './utils.js';
import { stateData } from './data.js';
import { isFavorite } from './favorites.js';

const DEFAULT_COVER = 'https://via.placeholder.com/80x120?text=Sem+Capa'; // Placeholder para capas ausentes/inválidas

/**
 * Deriva um identificador estável (slug) de um item de mídia, usado para favoritos.
 * Prefere o ID do IMDb (ex.: tt0110912); sem ele, gera do título.
 * @param {object} item - O item de mídia.
 * @returns {string} O slug identificador.
 */
export function itemSlug(item) {
  const match = item.imdbLink && item.imdbLink.match(/tt\d+/);
  if (match) {
    return match[0];
  }
  return (item.title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Filtra uma lista de mídia conforme as opções de exibição.
 * @param {Array} media - A lista de itens.
 * @param {{type?: string, minRating?: number, favoritesOnly?: boolean}} options - Os filtros ativos.
 * @returns {Array} A lista filtrada.
 */
function filterMedia(media, options) {
  const { type = 'all', minRating = 0, favoritesOnly = false } = options;
  return media.filter(item => {
    if (type !== 'all' && item.type !== type) {
      return false;
    }
    if (minRating > 0) {
      const rating = parseFloat((item.rating || '').replace(',', '.'));
      if (Number.isNaN(rating) || rating < minRating) {
        return false;
      }
    }
    if (favoritesOnly && !isFavorite(itemSlug(item))) {
      return false;
    }
    return true;
  });
}

/**
 * Gera URLs para WebP e AVIF baseadas no caminho original da capa.
 * @param {string} coverPath - Caminho original da imagem (ex.: images/CA/lalaland.png)
 * @returns {{webp: string, avif: string}} URLs otimizadas
 */
function getOptimizedCoverUrls(coverPath) {
  if (!coverPath || typeof coverPath !== 'string') {
    return { webp: DEFAULT_COVER, avif: DEFAULT_COVER };
  }
  const basePath = coverPath.replace(/\.(png|jpg|jpeg)$/i, '');
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
  };
}

/**
 * Monta o elemento <li> de um item de mídia, incluindo capa, descrição, nota,
 * link do IMDb e botão de favorito.
 * @param {object} item - O item de mídia.
 * @returns {HTMLLIElement} O elemento pronto para ser anexado à lista.
 */
export function renderMediaItem(item) {
  const li = document.createElement('li');
  li.classList.add('media-item');

  const slug = itemSlug(item);
  const isFav = isFavorite(slug);
  const favButton = `<button type="button" class="fav-btn" data-slug="${escapeHTML(slug)}" aria-pressed="${isFav}" aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">${isFav ? '★' : '☆'}</button>`;

  // URLs otimizadas (WebP/AVIF) com fallback para original
  const { webp, avif } = getOptimizedCoverUrls(item.cover);
  const fallbackUrl =
    item.cover && typeof item.cover === 'string' ? escapeHTML(item.cover) : DEFAULT_COVER;

  let content = `
        <div class="media-header">
            ${favButton}
            <strong>${escapeHTML(item.type || 'Mídia Desconhecida')}:</strong> ${escapeHTML(item.title || 'Título Desconhecido')}
        </div>
        <div class="media-body">
    `;

  // Picture element com sources WebP/AVIF + fallback para original
  // fetchpriority="high" no primeiro item para LCP otimizado
  const isFirstItem = !document.querySelector('.media-item'); // heurística simples
  const fetchPriority = isFirstItem ? 'high' : 'auto';

  content += `
    <picture>
      <source type="image/avif" srcset="${escapeHTML(avif)}">
      <source type="image/webp" srcset="${escapeHTML(webp)}">
      <img
        src="${escapeHTML(fallbackUrl)}"
        alt="Capa de ${escapeHTML(item.title) || 'Filme/Série'}"
        class="media-cover"
        loading="lazy"
        width="80"
        height="120"
        fetchpriority="${fetchPriority}"
        onerror="this.onerror=null; this.src='${DEFAULT_COVER}';"
      >
    </picture>
  `;

  content += `
            <p class="media-description">${escapeHTML(item.description || 'Descrição não disponível.')}</p>
            <div class="media-info">
    `;

  if (item.rating && typeof item.rating === 'string') {
    content += `<span class="media-rating">Nota: ${escapeHTML(item.rating)}</span>`;
  }

  if (item.imdbLink && typeof item.imdbLink === 'string' && item.imdbLink.startsWith('http')) {
    content += `<a href="${escapeHTML(item.imdbLink)}" target="_blank" class="imdb-link">Ver no IMDb</a>`;
  }

  content += `
            </div>
        </div>
    `;

  li.innerHTML = content;
  return li;
}

/**
 * Exibe os detalhes de filmes e séries para um estado específico.
 * @param {string} stateId - O ID do estado.
 * @param {{type?: string, minRating?: number, favoritesOnly?: boolean}} [options] - Filtros de exibição.
 */
export function displayStateDetails(stateId, options = {}) {
  const mediaList = document.getElementById('media-list');
  const selectedStateTitle = document.getElementById('selected-state-title');
  const detailsContainer = document.getElementById('details-container');

  // View Transitions API: atribuir view-transition-name para animação
  detailsContainer.style.viewTransitionName = 'details-panel';
  mediaList.style.viewTransitionName = 'media-list';
  selectedStateTitle.style.viewTransitionName = 'media-item';

  mediaList.innerHTML = ''; // Limpa a lista anterior

  const data = stateData[stateId];

  if (data && data.media && data.media.length > 0) {
    selectedStateTitle.textContent = `${escapeHTML(data.name)}: Filmes e Séries`;

    const items = filterMedia(data.media, options);
    if (items.length === 0) {
      selectedStateTitle.textContent = `${escapeHTML(data.name)}: Nenhum título corresponde aos filtros`;
      mediaList.innerHTML = '<li class="media-item">Ajuste os filtros para ver mais títulos.</li>';
    } else {
      items.forEach((item, index) => {
        const li = renderMediaItem(item);
        li.style.viewTransitionName = `media-item-${index}`;
        mediaList.appendChild(li);
      });
    }
  } else {
    // Mensagem mais amigável para estados sem dados ou com dados de mídia inválidos
    const stateName = data ? escapeHTML(data.name) : stateId; // Tenta pegar o nome do estado, senão usa o ID
    selectedStateTitle.textContent = `${stateName}: Informações em breve!`;
    mediaList.innerHTML =
      '<li class="media-item">Ainda estamos explorando as obras que mostram a beleza e a cultura deste lugar. Volte em breve para novidades!</li>';
  }
}

/**
 * Inicializa Popover API para tooltips nos estados do mapa.
 * @param {SVGElement} mapElement - O elemento SVG do mapa.
 * @param {object} stateData - Dados dos estados.
 */
export function initStatePopovers(mapElement, stateData) {
  if (!('Popover' in HTMLElement.prototype)) {
    // Fallback: não suporta Popover API nativamente
    return;
  }

  const states = mapElement.querySelectorAll('.state');

  states.forEach(statePath => {
    const stateId = statePath.id;
    const data = stateData[stateId];

    if (data && data.media && data.media.length > 0) {
      // Cria elemento popover
      const popover = document.createElement('div');
      popover.popover = 'manual';
      popover.className = 'state-popover';
      popover.innerHTML = `
        <strong>${escapeHTML(data.name)}</strong>
        <span>${data.media.length} título${data.media.length !== 1 ? 's' : ''}</span>
      `;
      document.body.appendChild(popover);

      // Associa popover ao estado
      statePath.setAttribute('popovertarget', popover.id || `popover-${stateId}`);
      if (!popover.id) {
        popover.id = `popover-${stateId}`;
      }

      // Mostra no mouseenter
      statePath.addEventListener('mouseenter', () => {
        popover.showPopover();
        // Posiciona próximo ao cursor
        const rect = statePath.getBoundingClientRect();
        popover.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        popover.style.top = `${rect.top + window.scrollY - 10}px`;
        popover.style.transform = 'translateX(-50%) translateY(-100%)';
      });

      // Esconde no mouseleave
      statePath.addEventListener('mouseleave', () => {
        popover.hidePopover();
      });

      // Limpeza
      statePath.addEventListener('click', () => {
        popover.hidePopover();
      });
    }
  });
}
