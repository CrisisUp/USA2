import { stateData } from './data.js';

// Função para escapar caracteres HTML para segurança (previne XSS básico)
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

let originalParents = new Map(); // Para armazenar o pai original de cada estado

document.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.getElementById('map-container');
    const mapLoadingMessage = document.getElementById('map-loading-message'); // Referência para a mensagem
    const selectedStateTitle = document.getElementById('selected-state-title');
    const mediaList = document.getElementById('media-list');
    let usaMap = null;

    // --- Lógica de Pesquisa ---
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 1. Carrega o SVG do mapa dos EUA de um arquivo separado
    try {
        const response = await fetch('usa-map.svg'); // Garanta que 'usa-map.svg' está na mesma pasta
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const svgText = await response.text();
        mapContainer.innerHTML = svgText; // Injeta o SVG no container

        // Esconde a mensagem de carregamento após o mapa ser injetado
        mapLoadingMessage.style.display = 'none';

        usaMap = document.getElementById('usa-map');
        if (!usaMap) {
            console.error("Elemento SVG com ID 'usa-map' não encontrado após carregamento. Verifique o conteúdo do seu arquivo SVG e certifique-se que o ID é 'usa-map'.");
            mapContainer.innerHTML = '<p style="color: red;">Erro: O mapa não pôde ser processado. Verifique o console para mais detalhes.</p>';
            return;
        }

        // 2. Dados de Filmes e Séries por Estado
        

        let currentSelectedState = null;

        // Função para resetar estilos de estados antes de uma nova busca
        function resetStateHighlights() {
            states.forEach(statePath => {
                statePath.style.outline = '';
                statePath.style.strokeWidth = '';
                statePath.style.stroke = '';

                // Voltar o estado para sua posição original no DOM
                if (originalParents.has(statePath)) {
                    const { parent, nextSibling } = originalParents.get(statePath);
                    if (nextSibling) {
                        parent.insertBefore(statePath, nextSibling);
                    } else {
                        parent.appendChild(statePath);
                    }
                    originalParents.delete(statePath);
                }
            });
        }

        searchButton.addEventListener('click', () => {
            performSearch();
        });

        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = escapeHTML(searchInput.value.toLowerCase().trim()); // Termo de busca
            resetStateHighlights(); // Limpa destaques de buscas anteriores

            if (!searchTerm) {
                selectedStateTitle.textContent = `Clique em um estado para ver os filmes e séries!`;
                mediaList.innerHTML = '';
                return; // Sai se a busca estiver vazia
            }

            let foundAny = false;

            // Iterar por todos os estados para buscar por nome ou conteúdo de mídia
            for (const stateId in stateData) {
                const stateInfo = stateData[stateId];
                const stateElement = usaMap.getElementById(stateId); // Pega o elemento <path> do estado

                if (stateElement) { // Verifica se o elemento do estado existe no mapa
                    const stateNameLower = stateInfo.name.toLowerCase();
                    let stateMatchesSearch = false;

                    // Busca por nome do estado
                    if (stateNameLower.includes(searchTerm)) {
                        stateMatchesSearch = true;
                    }

                    // Busca por filmes/séries no estado
                    if (!stateMatchesSearch && stateInfo.media) {
                        stateInfo.media.forEach(mediaItem => {
                            if (mediaItem.title.toLowerCase().includes(searchTerm) ||
                                mediaItem.description.toLowerCase().includes(searchTerm) ||
                                mediaItem.type.toLowerCase().includes(searchTerm)) {
                                stateMatchesSearch = true;
                            }
                        });
                    }

                    if (stateMatchesSearch) {
                        // Destaca o estado no mapa
                        stateElement.style.outline = '3px solid #ffcc00'; // Dourado para destaque
                        stateElement.style.strokeWidth = '2px'; // Contorno mais grosso
                        stateElement.style.stroke = '#ffcc00'; // Cor do contorno de destaque
                        foundAny = true;

                        // Se for uma busca por um estado específico, selecione-o e mostre os detalhes
                        if (stateNameLower === searchTerm || stateId.toLowerCase() === searchTerm) {
                            // Simular clique no estado para mostrar detalhes
                            if (currentSelectedState) {
                                currentSelectedState.classList.remove('selected');
                            }
                            stateElement.classList.add('selected');
                            currentSelectedState = stateElement;
                            displayStateDetails(stateId);
                            document.getElementById('details-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                            return; // Sair após encontrar e selecionar um estado exato
                        }
                    }
                }
            }

            // Se a busca encontrar algo, mas não um estado exato para selecionar,
            // apenas exibe uma mensagem de resultados ou reseta se nada for encontrado
            if (foundAny) {
                selectedStateTitle.textContent = `Resultados da busca por "${searchTerm}"`;
                mediaList.innerHTML = '<li class="media-item">Estados destacados no mapa correspondem à sua busca.</li>';
            } else {
                selectedStateTitle.textContent = `Nenhum resultado encontrado para "${searchTerm}".`;
                mediaList.innerHTML = '<li class="media-item">Tente uma busca diferente.</li>';
            }
        }


        // 3. Adiciona Event Listeners aos Estados
        const states = usaMap.querySelectorAll('.state');
        states.forEach(statePath => {
            statePath.setAttribute('tabindex', '0');
            statePath.setAttribute('aria-label', `Clique para ver filmes e séries de ${stateData[statePath.id]?.name || statePath.id}`);

            // Evento de mouse enter (hover)
            statePath.addEventListener('mouseenter', () => {
                // Guarda a posição original antes de mover, apenas se ainda não foi movido
                if (!originalParents.has(statePath)) {
                    originalParents.set(statePath, {
                        parent: statePath.parentNode,
                        nextSibling: statePath.nextSibling // Elemento que vem depois, para reinserir corretamente
                    });
                }
                // Move o elemento para o final da lista de filhos do seu pai, trazendo-o para frente
                statePath.parentNode.appendChild(statePath);
            });

            // Evento de mouse leave (des-hover)
            statePath.addEventListener('mouseleave', () => {
                // Só move de volta se não estiver selecionado (clicado)
                if (statePath !== currentSelectedState) {
                    // Voltar o estado para sua posição original no DOM
                    if (originalParents.has(statePath)) {
                        const { parent, nextSibling } = originalParents.get(statePath);
                        if (nextSibling) {
                            parent.insertBefore(statePath, nextSibling);
                        } else {
                            parent.appendChild(statePath);
                        }
                        originalParents.delete(statePath);
                    }
                }
            });

            statePath.addEventListener('click', () => {
                resetStateHighlights(); // Limpa destaques e reseta a posição dos não-selecionados

                const stateId = statePath.id;

                // Ao clicar, garante que o estado selecionado fique na frente
                if (!originalParents.has(statePath)) { // Evita guardar novamente se já estiver em hover
                    originalParents.set(statePath, {
                        parent: statePath.parentNode,
                        nextSibling: statePath.nextSibling
                    });
                }
                statePath.parentNode.appendChild(statePath); // Move o selecionado para a frente

                if (currentSelectedState) {
                    // Ao mudar de seleção, move o estado anteriormente selecionado de volta
                    if (originalParents.has(currentSelectedState)) {
                        const { parent, nextSibling } = originalParents.get(currentSelectedState);
                        if (nextSibling) {
                            parent.insertBefore(currentSelectedState, nextSibling);
                        } else {
                            parent.appendChild(currentSelectedState);
                        }
                        originalParents.delete(currentSelectedState);
                    }
                    currentSelectedState.classList.remove('selected');
                }

                statePath.classList.add('selected');
                currentSelectedState = statePath;

                displayStateDetails(stateId);

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
        });

        // 4. Função para exibir os detalhes do estado
        function displayStateDetails(stateId) {
            const data = stateData[stateId];
            // Remover a classe 'show' para reiniciar a animação
            document.getElementById('details-container').classList.remove('show');

            mediaList.innerHTML = '';

            if (data && data.media.length > 0) { // Verifica se há dados E se a lista de mídia não está vazia
                selectedStateTitle.textContent = `${escapeHTML(data.name)}: Filmes e Séries`;
                data.media.forEach(item => {
                    const li = document.createElement('li');
                    li.classList.add('media-item');

                    let itemContent = `
                                <div class="media-header">
                                    <strong>${escapeHTML(item.type)}:</strong> ${escapeHTML(item.title)}
                                </div>
                                <div class="media-body">
                            `;

                    // Adiciona a capa se houver URL
                    if (item.cover) {
                        itemContent += `<img src="${escapeHTML(item.cover)}" alt="Capa de ${escapeHTML(item.title)}" class="media-cover">`;
                    }

                    itemContent += `
                                    <p class="media-description">${escapeHTML(item.description)}</p>
                                    <div class="media-info">
                            `;

                    // Adiciona a nota se houver
                    if (item.rating) {
                        itemContent += `<span class="media-rating">Nota: ${escapeHTML(item.rating)}</span>`;
                    }

                    // Adiciona o link do IMDb se houver
                    if (item.imdbLink) {
                        itemContent += `<a href="${escapeHTML(item.imdbLink)}" target="_blank" class="imdb-link">Ver no IMDb</a>`;
                    }

                    itemContent += `
                                    </div>
                                </div>
                            `;

                    li.innerHTML = itemContent;
                    mediaList.appendChild(li);
                });
            } else {
                const stateName = stateData[stateId]?.name || stateId; // Tenta pegar o nome do estado ou usa o ID
                selectedStateTitle.textContent = `${escapeHTML(stateName)}: Informações em breve!`;
                mediaList.innerHTML = '<li class="media-item">Ainda estamos explorando as obras que mostram a beleza e a cultura deste lugar. Volte em breve para novidades!</li>';
            }

            // Adiciona a classe 'show' após um pequeno delay para permitir a animação
            setTimeout(() => {
                document.getElementById('details-container').classList.add('show');
            }, 50); // Pequeno delay de 50ms para garantir que a classe 'show' seja aplicada após o render.
        }

    } catch (error) {
        console.error('Erro ao carregar o SVG do mapa:', error);
        mapLoadingMessage.textContent = 'Não foi possível carregar o mapa. Verifique o console para mais detalhes.';
        mapLoadingMessage.style.color = 'red';
    }
});