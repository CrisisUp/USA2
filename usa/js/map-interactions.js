// map-interactions.js - Lógica de interação do mapa SVG

// Variáveis que precisam ser acessadas e modificadas por outras funções neste módulo
let usaMapInstance = null;
let currentSelectedState = null;
const originalParents = new Map(); // Para armazenar o pai original de cada estado para a animação

/**
 * Define a referência do mapa SVG, compartilhada entre os módulos.
 * @param {SVGElement} mapElement - O elemento SVG do mapa.
 */
export function setMapInstance(mapElement) {
  usaMapInstance = mapElement;
}

/**
 * Obtém a referência atual do mapa SVG.
 * @returns {SVGElement | null} O elemento SVG do mapa ou null.
 */
export function getMapInstance() {
  return usaMapInstance;
}

/**
 * Move um estado para o final do seu pai, trazendo-o para "a frente" dos demais
 * (necessário para o efeito de zoom no hover e na seleção).
 * @param {SVGPathElement} statePath - O elemento <path> do estado.
 */
function bringToFront(statePath) {
  if (!originalParents.has(statePath)) {
    originalParents.set(statePath, {
      parent: statePath.parentNode,
      nextSibling: statePath.nextSibling,
    });
  }
  statePath.parentNode.appendChild(statePath);
}

/**
 * Restaura um estado à sua posição original no DOM, desfazendo o bringToFront.
 * @param {SVGPathElement} statePath - O elemento <path> do estado.
 */
function restoreOriginalPosition(statePath) {
  if (!originalParents.has(statePath)) {
    return; // Nada a restaurar
  }
  const { parent, nextSibling } = originalParents.get(statePath);
  if (parent && parent.contains(statePath)) {
    // Verifica se o pai ainda existe e contém o elemento
    if (nextSibling && parent.contains(nextSibling)) {
      // Verifica se o nextSibling ainda é um filho válido
      parent.insertBefore(statePath, nextSibling);
    } else {
      parent.appendChild(statePath); // Caso contrário, adiciona ao final (seguro)
    }
  }
  originalParents.delete(statePath);
}

/**
 * Reseta os estilos de destaque dos estados e os retorna às suas posições originais no DOM.
 * @param {NodeListOf<SVGPathElement>|HTMLCollectionOf<SVGPathElement>} statesList - A lista de elementos <path> dos estados a serem resetados.
 */
export function resetStateHighlights(statesList) {
  // Garante que statesList é um array iterável e usa a instância do mapa se statesList não for fornecido diretamente
  const statesToReset = Array.from(
    statesList || getMapInstance()?.querySelectorAll('.state') || []
  );

  statesToReset.forEach(statePath => {
    statePath.style.outline = ''; // Remove outline temporário de busca
    statePath.style.strokeWidth = ''; // Volta ao stroke padrão (definido no CSS)
    statePath.style.stroke = ''; // Volta ao stroke padrão (definido no CSS)

    restoreOriginalPosition(statePath);
  });
}

/**
 * Inicializa os event listeners para as interações do mapa (hover, click, teclado).
 * @param {SVGElement} mapElement - O elemento SVG do mapa.
 * @param {object} stateData - O objeto com os dados de filmes/séries por estado.
 * @param {function} displayDetailsFunction - Função para exibir os detalhes do estado.
 */
export function initMapInteractions(mapElement, stateData, displayDetailsFunction) {
  setMapInstance(mapElement); // Atribui o elemento do mapa para uso interno do módulo

  const states = usaMapInstance.querySelectorAll('.state'); // Captura a lista inicial de estados

  states.forEach(statePath => {
    statePath.setAttribute('tabindex', '0');
    statePath.setAttribute('role', 'img'); // Permite aria-label em <path> SVG
    statePath.setAttribute(
      'aria-label',
      `Clique para ver filmes e séries de ${stateData[statePath.id]?.name || statePath.id}`
    );

    // Adiciona <title> nativo SVG para melhor suporte a leitores de tela
    if (!statePath.querySelector('title')) {
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = stateData[statePath.id]?.name || statePath.id;
      statePath.appendChild(title);
    }

    // Evento de mouse enter (hover)
    statePath.addEventListener('mouseenter', () => {
      bringToFront(statePath);
    });

    // Evento de mouse leave (des-hover)
    statePath.addEventListener('mouseleave', () => {
      if (statePath !== currentSelectedState) {
        restoreOriginalPosition(statePath);
      }
    });

    statePath.addEventListener('click', () => {
      const stateId = statePath.id;
      console.log('[DEBUG] map-interactions: click on state', { stateId, displayDetailsFunction: displayDetailsFunction.name });

      // Ao clicar, garante que o estado selecionado fique na frente
      bringToFront(statePath);

      // Remove a seleção do estado anterior, se houver
      if (currentSelectedState && currentSelectedState !== statePath) {
        restoreOriginalPosition(currentSelectedState);
        currentSelectedState.classList.remove('selected');
      }

      statePath.classList.add('selected');
      currentSelectedState = statePath; // Atualiza o estado selecionado

      // View Transitions API para transição suave do painel de detalhes
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          console.log('[DEBUG] map-interactions: calling displayDetailsFunction', { stateId });
          displayDetailsFunction(stateId);
          document.getElementById('details-container').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      } else {
        console.log('[DEBUG] map-interactions: calling displayDetailsFunction (no VT)', { stateId });
        displayDetailsFunction(stateId);
        document.getElementById('details-container').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });

    statePath.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        statePath.click();
      }
    });
  });
}

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
