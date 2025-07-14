// main.js - Ponto de entrada principal do aplicativo

// Importa os módulos necessários
import { initMapInteractions } from './map-interactions.js'; // Interações do mapa
import { initSearch } from './search.js'; // Lógica de busca
import { displayStateDetails } from './display.js'; // Lógica de exibição de detalhes
import { stateData } from './data.js'; // Dados (necessário para o initMapInteractions e outras funções que dependem dele)
import { resetStateHighlights } from './map-interactions.js'; // Importa a função resetStateHighlights


document.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.getElementById('map-container');
    const mapLoadingMessage = document.getElementById('map-loading-message');
    let usaMap = null; // A referência ao elemento SVG do mapa

    // Carrega o SVG do mapa
    try {
        const response = await fetch('usa-map.svg');
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const svgText = await response.text();
        mapContainer.innerHTML = svgText;

        mapLoadingMessage.style.display = 'none'; // Esconde a mensagem de carregamento

        usaMap = document.getElementById('usa-map');
        if (!usaMap) {
            console.error("Elemento SVG com ID 'usa-map' não encontrado após carregamento. Verifique o conteúdo do seu arquivo SVG e certifique-se que o ID é 'usa-map'.");
            mapContainer.innerHTML = '<p style="color: red;">Erro: O mapa não pôde ser processado. Verifique o console para mais detalhes.</p>';
            return;
        }

        // Inicializa as interações do mapa, passando as dependências
        // Passamos usaMap, stateData, displayStateDetails e resetStateHighlights para o módulo
        // O initMapInteractions usará usaMap, stateData diretamente e chamará displayStateDetails e resetStateHighlights
        initMapInteractions(usaMap, stateData, displayStateDetails, (statesList) => resetStateHighlights(statesList));
        
        // Inicializa a funcionalidade de busca, passando usaMap
        initSearch(usaMap);

    } catch (error) {
        console.error('Erro na inicialização ou carregamento do mapa:', error);
        mapLoadingMessage.textContent = 'Ocorreu um erro ao carregar o mapa. Por favor, tente novamente mais tarde.';
        mapLoadingMessage.style.color = 'red';
    }
});