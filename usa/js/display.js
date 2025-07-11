// display.js - Lógica de exibição de detalhes

// Importa a função de escapeHTML
import { escapeHTML } from './utils.js';
import { stateData } from './data.js'; // Importa stateData

/**
 * Exibe os detalhes de filmes e séries para um estado específico.
 * @param {string} stateId - O ID do estado.
 */
export function displayStateDetails(stateId) {
    const mediaList = document.getElementById('media-list');
    const selectedStateTitle = document.getElementById('selected-state-title');

    // Remover a classe 'show' para reiniciar a animação
    document.getElementById('details-container').classList.remove('show');
    
    mediaList.innerHTML = ''; // Limpa a lista anterior

    const data = stateData[stateId];

    // Verifica se há dados para o estado E se a lista de mídia existe e não está vazia
    if (data && data.media && data.media.length > 0) { 
        selectedStateTitle.textContent = `${escapeHTML(data.name)}: Filmes e Séries`;
        data.media.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('media-item');

            let itemContent = `
                <div class="media-header">
                    <strong>${escapeHTML(item.type || 'Mídia Desconhecida')}:</strong> ${escapeHTML(item.title || 'Título Desconhecido')}
                </div>
                <div class="media-body">
            `;

            // Validação e adição da capa
            const defaultCover = "https://placeholder.com/80x120?text=Sem+Capa"; // Placeholder para capas ausentes/inválidas
            const coverUrl = (item.cover && typeof item.cover === 'string' && item.cover.startsWith('http')) ? escapeHTML(item.cover) : defaultCover;
            itemContent += `<img src="${coverUrl}" alt="Capa de ${escapeHTML(item.title) || 'Filme/Série'}" class="media-cover" loading="lazy">`;


            itemContent += `
                    <p class="media-description">${escapeHTML(item.description || 'Descrição não disponível.')}</p>
                    <div class="media-info">
            `;

            // Adiciona a nota se houver
            if (item.rating && typeof item.rating === 'string') {
                itemContent += `<span class="media-rating">Nota: ${escapeHTML(item.rating)}</span>`;
            }

            // Adiciona o link do IMDb se houver
            if (item.imdbLink && typeof item.imdbLink === 'string' && item.imdbLink.startsWith('http')) {
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
        // Mensagem mais amigável para estados sem dados ou com dados de mídia inválidos
        const stateName = data ? escapeHTML(data.name) : stateId; // Tenta pegar o nome do estado, senão usa o ID
        selectedStateTitle.textContent = `${stateName}: Informações em breve!`;
        mediaList.innerHTML = '<li class="media-item">Ainda estamos explorando as obras que mostram a beleza e a cultura deste lugar. Volte em breve para novidades!</li>';
    }

    // Adiciona a classe 'show' após um pequeno delay para permitir a animação
    setTimeout(() => {
        document.getElementById('details-container').classList.add('show');
    }, 50);
}