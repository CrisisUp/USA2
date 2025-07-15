// search.js - Lógica de busca

import { escapeHTML } from './utils.js';
import { stateData } from './data.js';
// Importa funções de map-interactions diretamente, pois elas agora são exportadas no nível superior
import { resetStateHighlights, getCurrentSelectedState, setCurrentSelectedState } from './map-interactions.js'; 
import { displayStateDetails } from './display.js';

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
    
    // Pega a lista de estados para passar para resetStateHighlights
    const states = usaMapInstance.querySelectorAll('.state');
    resetStateHighlights(states); // Chama resetStateHighlights com a lista de estados


    if (!searchTerm) {
        document.getElementById('selected-state-title').textContent = `Clique em um estado para ver os filmes e séries!`;
        document.getElementById('media-list').innerHTML = '';
        return; // Sai se a busca estiver vazia
    }

    let foundAny = false;

    for (const stateId in stateData) {
        const stateInfo = stateData[stateId];
        const stateElement = usaMapInstance.getElementById(stateId);

        if (!stateInfo) {
            console.warn(`Dados para o estado "${stateId}" ausentes em stateData.`);
            continue;
        }
        if (!stateElement) {
            console.warn(`Elemento SVG para o estado "${stateId}" não encontrado no mapa.`);
            continue;
        }

        const stateNameLower = stateInfo.name.toLowerCase();
        let stateMatchesSearch = false;

        if (stateNameLower.includes(searchTerm)) {
            stateMatchesSearch = true;
        }

        if (!stateMatchesSearch && stateInfo.media && Array.isArray(stateInfo.media)) {
            stateInfo.media.forEach(mediaItem => {
                if (mediaItem && mediaItem.title && mediaItem.description && mediaItem.type) {
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
                const currentSelectedState = getCurrentSelectedState();
                if (currentSelectedState) {
                    currentSelectedState.classList.remove('selected');
                }
                stateElement.classList.add('selected');
                setCurrentSelectedState(stateElement); // Atualiza o estado selecionado via função exportada
                displayStateDetails(stateId); 
                document.getElementById('details-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
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