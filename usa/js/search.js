// search.js - Lógica de busca

import { escapeHTML } from './utils.js';
import { stateData } from './data.js';
import { resetStateHighlights, getCurrentSelectedState } from './map-interactions.js'; // Importa funções de mapa
import { displayStateDetails } from './display.js'; // Importa função de display

let usaMapInstance = null; // Para guardar a referência do mapa aqui também

/**
 * Inicializa a funcionalidade de busca e seus event listeners.
 * @param {SVGElement} mapElement - O elemento SVG do mapa.
 */
export function initSearch(mapElement) {
    usaMapInstance = mapElement; // Guarda a referência do mapa
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Executa a busca no mapa e atualiza a exibição.
 */
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = escapeHTML(searchInput.value.toLowerCase().trim());
    
    // Assegura que resetStateHighlights seja chamado com a lista de estados correta
    const states = usaMapInstance.querySelectorAll('.state'); // Pega a lista de estados para resetar
    resetStateHighlights(states); 

    if (!searchTerm) {
        document.getElementById('selected-state-title').textContent = `Clique em um estado para ver os filmes e séries!`;
        document.getElementById('media-list').innerHTML = '';
        return; // Sai se a busca estiver vazia
    }

    let foundAny = false;

    // Iterar por todos os estados para buscar por nome ou conteúdo de mídia
    for (const stateId in stateData) {
        const stateInfo = stateData[stateId];
        const stateElement = usaMapInstance.getElementById(stateId); // Pega o elemento <path> do estado

        // Verificações de robustez:
        if (!stateInfo) {
            console.warn(`Dados para o estado "${stateId}" ausentes em stateData.`);
            continue; // Pula para o próximo estado se os dados não existirem
        }
        if (!stateElement) {
            console.warn(`Elemento SVG para o estado "${stateId}" não encontrado no mapa.`);
            continue; // Pula para o próximo estado se o elemento SVG não existir
        }


        const stateNameLower = stateInfo.name.toLowerCase();
        let stateMatchesSearch = false;

        // Busca por nome do estado
        if (stateNameLower.includes(searchTerm)) {
            stateMatchesSearch = true;
        }

        // Busca por filmes/séries no estado
        if (!stateMatchesSearch && stateInfo.media && Array.isArray(stateInfo.media)) { // Garante que .media existe e é um array
            stateInfo.media.forEach(mediaItem => {
                if (mediaItem && mediaItem.title && mediaItem.description && mediaItem.type) { // Validação básica do item de mídia
                    if (mediaItem.title.toLowerCase().includes(searchTerm) ||
                        mediaItem.description.toLowerCase().includes(searchTerm) ||
                        mediaItem.type.toLowerCase().includes(searchTerm)) {
                        stateMatchesSearch = true;
                    }
                }
            });
        }

        if (stateMatchesSearch) {
            stateElement.style.outline = '3px solid #ffcc00';
            stateElement.style.strokeWidth = '2px';
            stateElement.style.stroke = '#ffcc00';
            foundAny = true;

            if (stateNameLower === searchTerm || stateId.toLowerCase() === searchTerm) {
                const currentSelectedState = getCurrentSelectedState(); // Pega o estado selecionado atual
                if (currentSelectedState) {
                    currentSelectedState.classList.remove('selected');
                }
                stateElement.classList.add('selected');
                displayStateDetails(stateId); 
                document.getElementById('details-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                return; // Sai após encontrar e selecionar um estado exato
            }
        }
    }

    if (foundAny) {
        document.getElementById('selected-state-title').textContent = `Resultados da busca por "${searchTerm}"`;
        document.getElementById('media-list').innerHTML = '<li class="media-item">Estados destacados no mapa correspondem à sua busca.</li>';
    } else {
        document.getElementById('selected-state-title').textContent = `Nenhum resultado encontrado para "${searchTerm}".`;
        document.getElementById('media-list').innerHTML = '<li class="media-item">Tente uma busca diferente.</li>';
    }
}