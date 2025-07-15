// map-interactions.js - Lógica de interação do mapa SVG

// Variáveis que precisam ser acessadas e modificadas por outras funções neste módulo
let usaMapInstance = null;
let currentSelectedState = null;
const originalParents = new Map(); // Para armazenar o pai original de cada estado para a animação

/**
 * Reseta os estilos de destaque dos estados e os retorna às suas posições originais no DOM.
 * @param {NodeListOf<SVGPathElement>|HTMLCollectionOf<SVGPathElement>} statesList - A lista de elementos <path> dos estados a serem resetados.
 */
export function resetStateHighlights(statesList) {
    // Garante que statesList é um array iterável e usa a instância do mapa se statesList não for fornecido diretamente
    const statesToReset = Array.from(statesList || (usaMapInstance ? usaMapInstance.querySelectorAll('.state') : [])); 

    statesToReset.forEach(statePath => {
        statePath.style.outline = ''; // Remove outline temporário de busca
        statePath.style.strokeWidth = ''; // Volta ao stroke padrão (definido no CSS)
        statePath.style.stroke = ''; // Volta ao stroke padrão (definido no CSS)

        if (originalParents.has(statePath)) {
            const { parent, nextSibling } = originalParents.get(statePath);
            if (parent && parent.contains(statePath)) { // Verifica se o pai ainda existe e contém o elemento
                if (nextSibling && parent.contains(nextSibling)) { // Verifica se o nextSibling ainda é um filho válido
                    parent.insertBefore(statePath, nextSibling);
                } else {
                    parent.appendChild(statePath); // Caso contrário, adiciona ao final (seguro)
                }
            }
            originalParents.delete(statePath);
        }
    });
}


/**
 * Inicializa os event listeners para as interações do mapa (hover, click, teclado).
 * @param {SVGElement} mapElement - O elemento SVG do mapa.
 * @param {object} stateData - O objeto com os dados de filmes/séries por estado.
 * @param {function} displayDetailsFunction - Função para exibir os detalhes do estado.
 */
export function initMapInteractions(mapElement, stateData, displayDetailsFunction) {
    usaMapInstance = mapElement; // Atribui o elemento do mapa para uso interno do módulo

    const states = usaMapInstance.querySelectorAll('.state'); // Captura a lista inicial de estados

    states.forEach(statePath => {
        statePath.setAttribute('tabindex', '0');
        statePath.setAttribute('aria-label', `Clique para ver filmes e séries de ${stateData[statePath.id]?.name || statePath.id}`);

        // Evento de mouse enter (hover)
        statePath.addEventListener('mouseenter', () => {
            if (!originalParents.has(statePath)) {
                originalParents.set(statePath, {
                    parent: statePath.parentNode,
                    nextSibling: statePath.nextSibling
                });
            }
            statePath.parentNode.appendChild(statePath);
        });

        // Evento de mouse leave (des-hover)
        statePath.addEventListener('mouseleave', () => {
            if (statePath !== currentSelectedState) {
                if (originalParents.has(statePath)) {
                    const { parent, nextSibling } = originalParents.get(statePath);
                    if (parent && parent.contains(statePath)) {
                        if (nextSibling && parent.contains(nextSibling)) {
                            parent.insertBefore(statePath, nextSibling);
                        } else {
                            parent.appendChild(statePath);
                        }
                    }
                    originalParents.delete(statePath);
                }
            }
        });

        statePath.addEventListener('click', () => {
            // resetStateHighlights(states); // Esta chamada foi movida para fora de map-interactions

            const stateId = statePath.id;

            // Ao clicar, garante que o estado selecionado fique na frente
            if (!originalParents.has(statePath)) {
                originalParents.set(statePath, {
                    parent: statePath.parentNode,
                    nextSibling: statePath.nextSibling
                });
            }
            statePath.parentNode.appendChild(statePath);

            // Remove a seleção do estado anterior, se houver
            if (currentSelectedState && currentSelectedState !== statePath) {
                if (originalParents.has(currentSelectedState)) {
                    const { parent, nextSibling } = originalParents.get(currentSelectedState);
                    if (parent && parent.contains(currentSelectedState)) {
                        if (nextSibling && parent.contains(nextSibling)) {
                            parent.insertBefore(currentSelectedState, nextSibling);
                        } else {
                            parent.appendChild(currentSelectedState);
                        }
                    }
                    originalParents.delete(currentSelectedState);
                }
                currentSelectedState.classList.remove('selected');
            }

            statePath.classList.add('selected');
            currentSelectedState = statePath; // Atualiza o estado selecionado

            displayDetailsFunction(stateId); // Chama a função de display do outro módulo

            document.getElementById('details-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        statePath.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                statePath.click();
            }
        });
    }); // Fim do forEach para states
} // Fim da função initMapInteractions


/**
 * Obtém o estado atualmente selecionado.
 * @returns {SVGPathElement | null} O elemento do estado selecionado ou null.
 */
export function getCurrentSelectedState() {
    return currentSelectedState;
}

/**
 * Define o estado atualmente selecionado (útil para uso externo, como busca).
 * @param {SVGPathElement | null} stateElement - O elemento do estado a ser definido como selecionado.
 */
export function setCurrentSelectedState(stateElement) {
    currentSelectedState = stateElement;
}