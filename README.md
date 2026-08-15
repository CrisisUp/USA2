# 🗺️ Mapa Interativo dos EUA: Uma Jornada Cinematográfica por Estado

![CI](https://github.com/CrisisUp/USA2/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)
![ESLint](https://img.shields.io/badge/lint-eslint-4B32C3.svg)
![Prettier](https://img.shields.io/badge/formatter-prettier-F7B93E.svg)
![Vitest](https://img.shields.io/badge/test-vitest-6E9F18.svg)

Este projeto é um **mapa interativo dos Estados Unidos** que permite ao usuário clicar em cada estado para descobrir uma curadoria de filmes e séries cujas paisagens, ruas ou edifícios são retratados naquele local. O objetivo é proporcionar uma experiência visual e informativa, unindo geografia e cultura pop.

Construído com tecnologias web fundamentais, o projeto prioriza a **performance**, a **experiência do usuário (UX)** e a **acessibilidade**, garantindo que a navegação seja intuitiva e inclusiva.

---

## ✨ Funcionalidades em Destaque

* **Mapa Interativo Dinâmico:** Navegue por um mapa visualmente atraente dos EUA, onde cada estado é clicável e reage ao `hover`.
* **Visualização por Estado:** Ao clicar em um estado, um painel abaixo do mapa exibe uma lista de filmes e séries associados a ele, incluindo:
  * **Capa do Filme/Série:** Uma imagem visual para cada título.
  * **Nota de Avaliação:** Uma nota clara para referência rápida.
  * **Link para o IMDb:** Acesso direto à página do título no IMDb para mais informações.
* **Efeitos Visuais:**
  * **Hover:** Os estados mudam de cor e aumentam sutilmente ao passar o mouse, indicando interatividade.
  * **Seleção:** O estado clicado muda de cor para indicar a seleção ativa.
  * **Animações:** A área de detalhes e os itens de mídia aparecem com animações suaves.
* **Barra de Pesquisa:** Permite buscar estados ou filmes/séries pelo nome, destacando os resultados no mapa.
* **Responsividade Completa:** O layout do site se adapta a diferentes tamanhos de tela, desde desktops grandes até dispositivos móveis.
* **Acessibilidade (A11y) Integrada:**
  * **Navegação por Teclado:** Todos os estados são focáveis via `Tab` e ativáveis por `Enter` ou `Espaço`.
  * **Foco Visual Claro:** Um contorno de destaque visível indica o estado atualmente focado pelo teclado.
  * **Compatibilidade com Leitores de Tela:** Uso de `aria-label` e estrutura semântica para melhor compreensão por tecnologias assistivas.
* **Robustez no Tratamento de Erros:** O JavaScript inclui validações para dados de mídia (capas, links) e mensagens de erro visíveis, prevenindo quebras e informando o usuário.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi meticulosamente construído utilizando apenas as tecnologias front-end essenciais, focando na performance e na modularidade:

* **HTML5:** A espinha dorsal do projeto, definindo a estrutura e o conteúdo da página.
* **CSS3:** Responsável por toda a estilização, layout responsivo, cores personalizadas para cada estado e animações fluidas.
* **JavaScript (ES6+):** O motor interativo do site, manipulando o DOM, gerenciando eventos, implementando a lógica de busca e orquestrando o carregamento de dados.
* **SVG (Scalable Vector Graphics):** Utilizado para o mapa dos EUA, oferecendo escalabilidade perfeita, interatividade precisa por estado e um arquivo leve.

---

## 🚀 Como Configurar e Rodar o Projeto

Para explorar este mapa interativo em seu ambiente local, siga as instruções abaixo:

### Pré-requisitos

* Um navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).
* Um editor de código (recomendado: [Visual Studio Code](https://code.visualstudio.com/)).
* **Git** instalado em sua máquina ([Download Git](https://git-scm.com/downloads)).
* **Opcional, mas recomendado:** Um servidor web local para evitar problemas de [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS) ao carregar arquivos (ex: Live Server para VS Code, `http-server` via Node.js, ou `python -m http.server`).

### Passos

1. **Clone o Repositório:**
    Abra seu terminal ou prompt de comando e execute o seguinte comando para clonar o projeto do GitHub:

    ```bash
    git clone [https://github.com/CrisisUp/USA2.git](https://github.com/CrisisUp/USA2.git)
    ```

    (Se você já tem o projeto, pule esta etapa e certifique-se de que sua pasta local está atualizada via `git pull origin main`.)

2. **Navegue até a Pasta do Projeto:**
    Acesse o diretório raiz do projeto recém-clonado:

    ```bash
    cd USA2
    ```

3. **Verifique a Estrutura de Arquivos:**
    A pasta do projeto deve estar organizada da seguinte forma, o que é crucial para o funcionamento dos caminhos relativos:

    ```text
    USA2/
    ├── usa/                  # Todo o site fica aqui (não há index.html na raiz)
    │   ├── index.html        # Página principal do site
    │   ├── css/              # Contém os arquivos CSS modularizados
    │   │   ├── animations.css
    │   │   ├── base.css
    │   │   ├── components.css
    │   │   ├── layout.css
    │   │   ├── map.css
    │   │   └── responsive.css
    │   ├── js/               # Contém os arquivos JavaScript modularizados
    │   │   ├── data.js       # Os dados dos filmes e séries por estado
    │   │   ├── display.js
    │   │   ├── main.js       # O script principal que orquestra os demais
    │   │   ├── map-interactions.js
    │   │   ├── search.js
    │   │   └── utils.js
    │   ├── images/           # Capas locais (100% offline, sem CDN externo)
    │   │   ├── CA/
    │   │   │   ├── biglittlelies.png
    │   │   │   ├── lalaland.png
    │   │   │   └── pulpfiction.png
    │   │   └── ... (subpastas dos estados com suas capas)
    │   └── usa-map.svg       # O arquivo do mapa SVG dos Estados Unidos
    └── README.md
    ```

4. **Inicie o Servidor Local (Recomendado):**
    * **Com Live Server (VS Code):** Abra a pasta `USA2` no VS Code. Clique com o botão direito no arquivo `usa/index.html` e selecione "Open with Live Server". Seu navegador abrirá automaticamente o site.
    * **Com Python:** Na pasta `USA2`, execute `python -m http.server 8000 --directory usa` (ou navegue até `usa/` e rode `python -m http.server`).
    * **Com Node.js `http-server`:** Instale globalmente (`npm install -g http-server`) e, na pasta `usa/`, execute `http-server`.
    * Após iniciar o servidor, abra seu navegador e navegue para o endereço fornecido (ex: `http://localhost:8000`).

---

## 🎨 Personalização e Expansão

Este projeto foi desenhado para ser facilmente personalizável e expansível:

* **Conteúdo `js/data.js`:** A principal área para expansão! Adicione mais filmes e séries para cada estado, incluindo `cover` (URLs de imagem), `rating` e `imdbLink`.
* **Estilo Visual:** Modifique as cores, fontes, sombras e outros estilos nos arquivos `.css` para criar uma estética única. Experimente diferentes paletas para o mapa em `map.css`.
* **Funcionalidades:**
  * Adicione filtros por gênero, ano de lançamento, etc.
  * Implemente a exibição de mais detalhes ao passar o mouse sobre os itens de mídia na lista.
  * As capas são **arquivos locais** em `usa/images/` — o site funciona 100% offline, sem depender de CDN ou API de filmes.
* **Acessibilidade:** Continue testando com ferramentas como o [Lighthouse](https://developers.google.com/web/tools/lighthouse) no Chrome para identificar e corrigir quaisquer outras questões de acessibilidade.

---

## 🤝 Contribuição

Contribuições, sugestões e relatórios de bugs são muito bem-vindos! Se você encontrar um problema ou tiver uma ideia para melhorar o projeto, por favor, sinta-se à vontade para abrir uma [Issue](https://github.com/CrisisUp/USA2/issues) ou enviar um [Pull Request](https://github.com/CrisisUp/USA2/pulls) no repositório do GitHub.

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](https://opensource.org/licenses/MIT).

---

## 📞 Contato

Para dúvidas ou sugestões, você pode entrar em contato com o autor via [GitHub](https://github.com/CrisisUp).
