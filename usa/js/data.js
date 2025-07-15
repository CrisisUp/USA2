// data.js - Dados dos estados e suas mídias

export const stateData = {
    "CA": { name: "Califórnia", media: [

        { type: "Filme", title: "La La Land", description: "Um musical romântico que celebra a magia e os desafios de Los Angeles, com Ryan Gosling e Emma Stone.", cover: "images/California/lalaland.png", rating: "8.0/10", imdbLink: "https://www.imdb.com/title/tt3783958/" }, 
        
        { type: "Série", title: "Big Little Lies", description: "Drama investigativo ambientado na rica comunidade costeira de Monterey, explorando segredos e mentiras.", cover: "images/California/biglittlelies.png", rating: "8.5/10", imdbLink: "https://www.imdb.com/title/tt3920596/" }, 
        
        { type: "Filme", title: "Pulp Fiction", description: "Um clássico cult de Quentin Tarantino com múltiplas linhas narrativas interligadas em Los Angeles.", cover: "images/California/pulpfiction.png", rating: "8.9/10", imdbLink: "https://www.imdb.com/title/tt0110912/" }] },

    "NY": { name: "Nova Iorque", media: [

        { type: "Filme", title: "Taxi Driver", description: "Um veterano do Vietnã se torna taxista em Nova Iorque, mergulhando na depravação da cidade e planejando a violência.", cover: "images/New-York/taxi-driver.png", rating: "8.2/10", imdbLink: "https://www.imdb.com/title/tt0075314/" }, 
        
        { type: "Série", title: "Friends", description: "A vida e os amores de seis amigos que vivem em Manhattan, explorando amizade, carreira e desafios diários.", cover: "images/New-York/friends.png", rating: "8.9/10", imdbLink: "https://www.imdb.com/title/tt0108778/" }, 
        
        { type: "Filme", title: "O Poderoso Chefão", description: "A saga da família Corleone, uma poderosa máfia italiana em Nova Iorque, com foco em poder, lealdade e traição.", cover: "images/New-York/o-poderoso-chefao.png", rating: "9.2/10", imdbLink: "https://www.imdb.com/title/tt0068646/" }] },

    "TX": { name: "Texas", media: [

        { type: "Filme", title: "No Country for Old Men", description: "Um caçador encontra uma mala cheia de dinheiro no deserto do Texas, desencadeando uma perseguição brutal.", cover: "https://image.tmdb.org/t/p/w500/oHwSg2uC1rNqY9oP5YF30N4S7R0.jpg", rating: "8.2/10", imdbLink: "https://www.imdb.com/title/tt0477080/" }, 

        { type: "Série", title: "Friday Night Lights", description: "Drama realista sobre a vida de um time de futebol americano escolar e a comunidade de Dillon, Texas.", cover: "https://image.tmdb.org/t/p/w500/q3UvS1K8uB5oY9J5M7X5zJ7R7eP.jpg", rating: "8.7/10", imdbLink: "https://www.imdb.com/title/tt0758745/" }] },

    "FL": { name: "Flórida", media: [

        { type: "Filme", title: "Miami Vice", description: "Dois detetives da narcóticos em Miami trabalham disfarçados para combater o crime organizado.", cover: "https://image.tmdb.org/t/p/w500/40qM242s04Xo2T2m2wS8oJ6d3tG.jpg", rating: "6.0/10", imdbLink: "https://www.imdb.com/title/tt0473582/" }, 

        { type: "Filme", title: "Scarface", description: "A ascensão e queda de Tony Montana, um imigrante cubano que se torna um poderoso chefão das drogas em Miami.", cover: "https://image.tmdb.org/t/p/w500/qYgOaVv1dD0i0r6y3qR3c0y62yB.jpg", rating: "8.3/10", imdbLink: "https://www.imdb.com/title/tt0086250/" }] },

    "AK": { name: "Alaska", media: [

        { type: "Filme", title: "A Proposta", description: "Uma editora de livros canadense força seu assistente a se casar com ela para evitar a deportação, mas as coisas mudam em uma viagem ao Alasca.", cover: "https://image.tmdb.org/t/p/w500/g0eJk2D3c03xH4t6V2jK6u2y9b0.jpg", rating: "6.7/10", imdbLink: "https://www.imdb.com/title/tt1142977/" }, 
        
        { type: "Série", title: "Northern Exposure", description: "Um jovem médico de Nova York é forçado a praticar medicina em uma pequena cidade remota no Alasca.", cover: "https://image.tmdb.org/t/p/w500/x5zZ0y4f6t5j0d9y2b3x3k6y9v5.jpg", rating: "8.3/10", imdbLink: "https://www.imdb.com/title/tt0098904/" }] },

    "HI": { name: "Havaí", media: [
        { type: "Filme", title: "50 First Dates", description: "Um veterinário se apaixona por uma mulher com amnésia anterógrada, tendo que fazê-la se apaixonar por ele todos os dias.", cover: "images/Havai/como-se-fosse-a-primeira-vez.png", rating: "6.8/10", imdbLink: "https://www.imdb.com/title/tt0343660/" }, 

        { type: "Série", title: "Hawaii Five-0", description: "Uma força-tarefa de elite combate o crime nas paradisíacas ilhas do Havaí.", cover: "images/Havai/havai-five-0.png", rating: "7.4/10", imdbLink: "https://www.imdb.com/title/tt1600194/" }] },

    "MA": { name: "Massachusetts", media: [

        { type: "Filme", title: "Manchester à Beira-Mar", description: "Um zelador tem que cuidar de seu sobrinho adolescente após a morte do pai.", cover: "https://image.tmdb.org/t/p/w500/k0Y5P2y0o5L6o7y5s8d8e8x8t8u.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt4034228/" }, 

        { type: "Filme", title: "A Rede Social", description: "A história da fundação do Facebook por Mark Zuckerberg, em Harvard.", cover: "https://image.tmdb.org/t/p/w500/oKgk8rP3d6w7u7w2s4d4e4x4f4g.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt1285016/" }] },

    "MN": { name: "Minnesota", media: [

        { type: "Filme", title: "Fargo", description: "Uma esposa é sequestrada e seu marido tenta negociar o resgate, mas as coisas não saem como planejado.", cover: "images/Minnesota/fargo.png", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0116282/" }, 

        { type: "Filme", title: "Juno", description: "Uma adolescente grávida toma uma decisão incomum sobre o futuro de seu bebê.", cover: "images/Minnesota/juno.png", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt0460780/" }] },

    "MT": { name: "Montana", media: [

        { type: "Série", title: "Yellowstone", description: "A saga da família Dutton, proprietários da maior fazenda dos EUA, lutando para manter suas terras.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "8.7/10", imdbLink: "https://www.imdb.com/title/tt4236770/" }, 

        { type: "Filme", title: "Nada é por acaso", description: "Um homem tenta reconstruir sua vida em Montana após um evento trágico.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "6.5/10", imdbLink: "https://www.imdb.com/title/tt0437435/" }] },

    "ND": { name: "Dakota do Norte", media: [

        { type: "Filme", title: "Fargo", description: "Um filme e série com a mesma premissa de crime e humor negro, ambientados no frio Dakota do Norte.", cover: "https://image.tmdb.org/t/p/w500/oP3y9j2e1k6l9m8n7h6j5i4u3v2.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0116282/" }, 

        { type: "Filme", title: "Nomadland", description: "Uma mulher idosa embarca em uma jornada pelas vastas paisagens da América, incluindo partes de Dakota do Norte, após perder tudo na recessão.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "7.3/10", imdbLink: "https://www.imdb.com/title/tt9770150/" }] },

    "ID": { name: "Idaho", media: [

        { type: "Filme", title: "Napoleão Dinamite", description: "Um nerd socialmente desajeitado tenta ajudar seu amigo a vencer as eleições estudantis.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "6.9/10", imdbLink: "https://www.imdb.com/title/tt0359345/" }, 

        { type: "Filme", title: "My Own Private Idaho", description: "Dois amigos, um deles narcoléptico, embarcam em uma jornada para encontrar a mãe do primeiro.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "7.3/10", imdbLink: "https://www.imdb.com/title/tt0102494/" }] },

    "WA": { name: "Washington", media: [

        { type: "Filme", title: "Sintonia de Amor", description: "Um menino deseja uma nova esposa para seu pai, e uma jornalista responde ao seu pedido.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "6.8/10", imdbLink: "https://www.imdb.com/title/tt0108160/" }, 

        { type: "Série", title: "Grey's Anatomy", description: "Drama médico centrado na vida de cirurgiões residentes e atendentes em Seattle.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.6/10", imdbLink: "https://www.imdb.com/title/tt0413573/" }] },

    "AZ": { name: "Arizona", media: [

        { type: "Filme", title: "Arizona Nunca Mais", description: "Um ex-presidiário e uma policial se casam e roubam um bebê.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.3/10", imdbLink: "https://www.imdb.com/title/tt0093822/" }, 
        
        { type: "Filme", title: "Tombstone", description: "Wyatt Earp e seus irmãos se mudam para Tombstone, Arizona, onde confrontam foras da lei.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0108358/" }] },

    "CO": { name: "Colorado", media: [

        { type: "Filme", title: "O Iluminado", description: "Um escritor aceita um emprego como zelador de inverno em um hotel isolado, que tem um passado sombrio.", cover: "https://image.tmdb.org/t/p/w500/k0Y5P2y0o5L6o7y5s8d8e8x8t8u.jpg", rating: "8.4/10", imdbLink: "https://www.imdb.com/title/tt0081505/" }, 

        { type: "Filme", title: "Encontro Explosivo", description: "Uma mulher é arrastada para o mundo de um agente secreto, que a leva em uma fuga global.", cover: "https://image.tmdb.org/t/p/w500/oKgk8rP3d6w7u7w2s4d4e4x4f4g.jpg", rating: "6.3/10", imdbLink: "https://www.imdb.com/title/tt1013721/" }] },

    "NV": { name: "Nevada", media: [

        { type: "Filme", title: "Se Beber, Não Case!", description: "Quatro amigos viajam para Las Vegas para uma despedida de solteiro que dá muito errado.", cover: "images/Nevada/se-beber-nao-case.png", rating: "7.7/10", imdbLink: "https://www.imdb.com/title/tt1119646/" }, 

        { type: "Série", title: "CSI: Crime Scene Investigation", description: "Uma equipe de cientistas forenses resolve crimes em Las Vegas usando tecnologia avançada.", cover: "images/Nevada/csi-investigacao-criminal.png", rating: "7.7/10", imdbLink: "https://www.imdb.com/pt/title/tt0247082/" }] },

    "NM": { name: "Novo México", media: [

        { type: "Série", title: "Breaking Bad", description: "Um professor de química do ensino médio diagnosticado com câncer começa a fabricar metanfetamina para garantir o futuro de sua família.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "9.5/10", imdbLink: "https://www.imdb.com/title/tt0903747/" }, 

        { type: "Filme", title: "Onde os Fracos Não Têm Vez", description: "Um caçador de antílopes se depara com um massacre e uma mala cheia de dinheiro no deserto do Texas/Novo México.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0477080/" }] },

    "OR": { name: "Oregon", media: [

        { type: "Filme", title: "Os Goonies", description: "Um grupo de crianças encontra um mapa do tesouro e embarca em uma aventura para salvar suas casas.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.7/10", imdbLink: "https://www.imdb.com/title/tt0089218/" }, 

        { type: "Série", title: "Portlandia", description: "Uma série de comédia de esquetes que satiriza a cultura peculiar de Portland, Oregon.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.9/10", imdbLink: "https://www.imdb.com/title/tt1702444/" }] },

    "UT": { name: "Utah", media: [

        { type: "Filme", title: "127 Horas", description: "A história real de um alpinista que fica preso sob uma rocha em um cânion remoto de Utah.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt1542344/" }, 

        { type: "Série", title: "Westworld", description: "Um parque temático futurista populado por 'anfitriões' androides, onde os visitantes podem viver suas fantasias, com paisagens que remetem a Utah.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "8.5/10", imdbLink: "https://www.imdb.com/title/tt0475784/" }] },

    "WY": { name: "Wyoming", media: [

        { type: "Filme", title: "Brokeback Mountain", description: "A complexa história de amor entre dois cowboys no Wyoming rural.", cover: "images/Wyoming/o-segredo-de-brokeback-mountain.png", rating: "7.7/10", imdbLink: "https://www.imdb.com/title/tt0388795/" }, 

        { type: "Filme", title: "Os Imperdoáveis", description: "Um pistoleiro aposentado é forçado a pegar em armas novamente no Velho Oeste, com locações que remetem ao Wyoming.", cover: "images/Wyoming/os-imperdoaveis.png", rating: "8.2/10", imdbLink: "https://www.imdb.com/title/tt0105695/" }] },

    "AR": { name: "Arkansas", media: [

        { type: "Filme", title: "Mud", description: "Dois meninos descobrem um fugitivo em uma ilha no rio Arkansas e o ajudam a escapar.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "7.4/10", imdbLink: "https://www.imdb.com/title/tt1935179/" }, 
        
        { type: "Filme", title: "Um Sonho de Liberdade", description: "Um homem é condenado injustamente e passa décadas na prisão. Embora ambientado no Maine (fictício), a atmosfera lembra algumas áreas rurais do Sul.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "9.3/10", imdbLink: "https://www.imdb.com/title/tt0111161/" }] },

    "IA": { name: "Iowa", media: [

        { type: "Filme", title: "Campos dos Sonhos", description: "Um fazendeiro de Iowa constrói um campo de beisebol em seu milharal, atraindo lendas do esporte.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt0097356/" }, 

        { type: "Filme", title: "As Pontes de Madison", description: "Um fotógrafo da National Geographic se envolve em um romance com uma dona de casa em Iowa.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.6/10", imdbLink: "https://www.imdb.com/title/tt0112579/" }] },

    "KS": { name: "Kansas", media: [

        { type: "Filme", title: "O Mágico de Oz", description: "Uma garota do Kansas é levada por um tornado para uma terra mágica onde busca ajuda para voltar para casa.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0032138/" }, 

        { type: "Série", title: "Supernatural", description: "Dois irmãos caçam demônios e outras criaturas sobrenaturais pelos Estados Unidos, com raízes em Lawrence, Kansas.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.4/10", imdbLink: "https://www.imdb.com/title/tt0460681/" }] },

    "MO": { name: "Missouri", media: [

        { type: "Filme", title: "Garota Exemplar", description: "Um homem se torna o principal suspeito no desaparecimento de sua esposa no Missouri.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt2267998/" }, 

        { type: "Série", title: "Ozark", description: "Uma família de lavadores de dinheiro de Chicago é forçada a se mudar para os lagos Ozark, no Missouri.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "8.5/10", imdbLink: "https://www.imdb.com/title/tt5071412/" }] },

    "NE": { name: "Nebraska", media: [

        { type: "Filme", title: "Nebraska", description: "Um idoso alcoólatra acredita ter ganhado na loteria e viaja com o filho para receber o prêmio no Nebraska.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "7.7/10", imdbLink: "https://www.imdb.com/title/tt1821549/" }, 

        { type: "Filme", title: "As Sete Faces do Dr. Lao", description: "Um misterioso showman com poderes mágicos visita uma cidade do Velho Oeste no Nebraska.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "7.0/10", imdbLink: "https://www.imdb.com/title/tt0058037/" }] },

    "OK": { name: "Oklahoma", media: [

        { type: "Filme", title: "Oklahoma!", description: "Um clássico musical sobre romance e rivalidade em Oklahoma no início do século XX.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.2/10", imdbLink: "https://www.imdb.com/title/tt0048445/" },

        { type: "Filme", title: "Twister", description: "Cientistas buscam tornados em Oklahoma para testar um novo dispositivo de previsão.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "6.4/10", imdbLink: "https://www.imdb.com/title/tt0117998/" }] },

    "SD": { name: "Dakota do Sul", media: [

        { type: "Série", title: "Deadwood", description: "Um drama de faroeste que retrata a vida em uma cidade sem lei nas Colinas Negras de Dakota do Sul.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "8.6/10", imdbLink: "https://www.imdb.com/title/tt0349909/" }, 

        { type: "Filme", title: "O Voo do Dragão", description: "Um piloto tenta provar a existência de dragões, com uma parte da história se passando em Dakota do Sul.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "6.3/10", imdbLink: "https://www.imdb.com/title/tt0097241/" }] },

    "LA": { name: "Louisiana", media: [

        { type: "Filme", title: "Um Bonde Chamado Desejo", description: "Um clássico drama adaptado de Tennessee Williams, ambientado na Nova Orleans da Louisiana.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.9/10", imdbLink: "https://www.imdb.com/title/tt0045322/" }, 

        { type: "Série", title: "True Detective (Temporada 1)", description: "Dois detetives rastreiam um serial killer ao longo de 17 anos na Louisiana, em um drama criminal complexo.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "8.9/10", imdbLink: "https://www.imdb.com/title/tt2356777/" }] },

    "CT": { name: "Connecticut", media: [

        { type: "Filme", title: "O Show de Truman", description: "Um homem descobre que toda a sua vida é um reality show televisionado, ambientado em uma cidade fictícia inspirada em Connecticut.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "8.2/10", imdbLink: "https://www.imdb.com/title/tt0120382/" },

        { type: "Série", title: "Gilmore Girls", description: "A relação entre uma mãe solteira e sua filha em uma charmosa cidade fictícia de Connecticut.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "8.2/10", imdbLink: "https://www.imdb.com/title/tt0201889/" }] },

    "NH": { name: "Nova Hampshire", media: [

        { type: "Filme", title: "Jumanji", description: "Duas crianças libertam um homem preso em um jogo de tabuleiro mágico por décadas, ambientado na fictícia Brantford, Nova Hampshire.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "7.0/10", imdbLink: "https://www.imdb.com/title/tt0113497/" }, 

        { type: "Filme", title: "O Resgate do Soldado Ryan", description: "O início e o fim do épico da Segunda Guerra Mundial se passam com o veterano em Nova Hampshire.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "8.6/10", imdbLink: "https://www.imdb.com/title/tt0120815/" }] },

    "RI": { name: "Rhode Island", media: [

        { type: "Filme", title: "A Invenção de Hugo Cabret", description: "Um órfão que vive em uma estação de trem em Paris é levado a uma aventura, com cenas iniciais que remetem a Rhode Island.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt0970179/" }, 

        { type: "Filme", title: "Irmãos Gêmeos", description: "Dois irmãos muito diferentes, separados no nascimento, se reencontram em Rhode Island.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "6.0/10", imdbLink: "https://www.imdb.com/title/tt0096320/" }] },

    "VT": { name: "Vermont", media: [

        { type: "Filme", title: "Um Hotel Bom Pra Cachorro", description: "Duas crianças órfãs abrigam cachorros de rua em um hotel abandonado, com cenas filmadas em Vermont.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "6.4/10", imdbLink: "https://www.imdb.com/title/tt0785108/" }, 

        { type: "Filme", title: "Super Troopers", description: "Policias rodoviários peculiares de Vermont tentam salvar seus empregos.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.1/10", imdbLink: "https://www.imdb.com/title/tt0232509/" }] },

    "AL": { name: "Alabama", media: [

        { type: "Filme", title: "Forrest Gump: O Contador de Histórias", description: "A vida de um homem simples do Alabama que vivencia e influencia eventos históricos importantes.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "8.8/10", imdbLink: "https://www.imdb.com/title/tt0109830/" }, 

        { type: "Filme", title: "Selma", description: "A marcha liderada por Martin Luther King Jr. de Selma a Montgomery, Alabama, pela igualdade de direitos.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt1020072/" }] },

    "GA": { name: "Geórgia", media: [

        { type: "Série", title: "Stranger Things", description: "Um grupo de crianças em uma cidade de Indiana se depara com forças sobrenaturais, filmado principalmente na Geórgia.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "8.7/10", imdbLink: "https://www.imdb.com/title/tt4574334/" }, 

        { type: "Série", title: "The Walking Dead", description: "Sobreviventes de um apocalipse zumbi lutam para sobreviver, com grande parte da série filmada na Geórgia.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt1520211/" }] },

    "MS": { name: "Mississippi", media: [

        { type: "Filme", title: "Histórias Cruzadas", description: "Jovens aspirantes a escritores e empregadas negras formam um vínculo improvável no Mississippi dos anos 60.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt1454029/" }, 

        { type: "Filme", title: "Tempo de Matar", description: "Um advogado defende um homem negro que assassinou os estupradores de sua filha, no Mississippi.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt0117913/" }] },

    "SC": { name: "Carolina do Sul", media: [

        { type: "Filme", title: "Diário de uma Paixão", description: "Um romance épico que se desenrola na Carolina do Sul durante o século XX.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0332280/" }, 

        { type: "Filme", title: "Forrest Gump: O Contador de Histórias", description: "Partes da infância de Forrest e seu serviço militar são ligadas à Carolina do Sul.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.8/10", imdbLink: "https://www.imdb.com/title/tt0109830/" }] },

    "IL": { name: "Illinois", media: [

        { type: "Filme", title: "Curtindo a Vida Adoidado", description: "Um estudante do ensino médio em Chicago simula estar doente para passar um dia de aventura na cidade.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0091042/" }, 

        { type: "Filme", title: "Os Intocáveis", description: "Um agente federal forma uma equipe para derrubar Al Capone durante a Proibição em Chicago, Illinois.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "7.9/10", imdbLink: "https://www.imdb.com/title/tt0094226/" }] },

    "IN": { name: "Indiana", media: [

        { type: "Filme", title: "Hoosiers", description: "Um treinador com um passado problemático lidera um pequeno time de basquete do ensino médio de Indiana a um campeonato estadual.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt0091217/" }, 

        { type: "Série", title: "Parks and Recreation", description: "Uma funcionária otimista do departamento de parques tenta melhorar sua pequena cidade fictícia de Pawnee, Indiana.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "8.6/10", imdbLink: "https://www.imdb.com/title/tt1266020/" }] },

    "KY": { name: "Kentucky", media: [

        { type: "Filme", title: "Rain Man", description: "Um homem egoísta descobre que tem um irmão autista, e a jornada deles os leva por Kentucky.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "8.0/10", imdbLink: "https://www.imdb.com/title/tt0095953/" }, 

        { type: "Filme", title: "O Gambito da Rainha", description: "Uma órfã prodígio do xadrez, de Kentucky, luta contra o vício enquanto busca o estrelato mundial.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "8.6/10", imdbLink: "https://www.imdb.com/title/tt10048342/" }] },

    "NC": { name: "Carolina do Norte", media: [

        { type: "Série", title: "One Tree Hill", description: "A vida de dois meio-irmãos e seus amigos no ensino médio e na vida adulta em uma pequena cidade da Carolina do Norte.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "7.7/10", imdbLink: "https://www.imdb.com/title/tt0368598/" }, 

        { type: "Filme", title: "Jogos Vorazes", description: "Adolescentes são forçados a lutar até a morte em um evento televisivo, com muitas cenas filmadas na Carolina do Norte.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.2/10", imdbLink: "https://www.imdb.com/title/tt1392170/" }] },

    "OH": { name: "Ohio", media: [

        { type: "Filme", title: "Um Sonho de Liberdade", description: "Condenado injustamente, Andy Dufresne passa décadas na prisão de Shawshank, um local que remete a prisões em Ohio.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "9.3/10", imdbLink: "https://www.imdb.com/title/tt0111161/" }, 

        { type: "Filme", title: "Vingadores: Os Vingadores", description: "Super-heróis se unem para salvar a Terra de uma invasão alienígena, com a batalha final ocorrendo em Cleveland, Ohio.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.0/10", imdbLink: "https://www.imdb.com/title/tt0848228/" }] },

    "TN": { name: "Tennessee", media: [

        { type: "Filme", title: "Walk the Line", description: "Biografia de Johnny Cash, mostrando sua ascensão e desafios, com fortes laços com o cenário musical do Tennessee.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0358273/" }, 

        { type: "Série", title: "Nashville", description: "Drama musical que segue a vida de estrelas da música country em Nashville, Tennessee.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "7.5/10", imdbLink: "https://www.imdb.com/title/tt2279188/" }] },

    "VA": { name: "Virgínia", media: [

        { type: "Filme", title: "Duelo de Titãs", description: "Um drama esportivo baseado na história real de um time de futebol americano escolar integrado racialmente na Virgínia.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0210945/" }, 

        { type: "Série", title: "The Americans", description: "Espiões da KGB disfarçados de casal americano vivem no subúrbio de Washington D.C., com muitas cenas na Virgínia.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "8.4/10", imdbLink: "https://www.imdb.com/title/tt2149175/" }] },

    "WI": { name: "Wisconsin", media: [

        { type: "Filme", title: "Missão Madrinha de Casamento", description: "Uma dama de honra em apuros tenta navegar pelas tradições do casamento e um amor improvável, com algumas cenas em Wisconsin.", cover: "images/Wisconsin/missao-madrinha-de-casamento.png", rating: "6.8/10", imdbLink: "https://www.imdb.com/title/tt1478338/" }, 

        { type: "Série", title: "That '70s Show", description: "A vida de um grupo de adolescentes nos anos 70 em uma pequena cidade fictícia de Wisconsin.", cover: "images/Wisconsin/that-70s-show.png", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0165598/" }] },

    "WV": { name: "Virgínia Ocidental", media: [

        { type: "Filme", title: "Missão Impossível III", description: "Ethan Hunt é forçado a voltar à ativa para enfrentar um traficante de armas. Cenas de ação foram filmadas na Virgínia Ocidental.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "6.9/10", imdbLink: "https://www.imdb.com/title/tt0317917/" }, 

        { type: "Filme", title: "Os Indomáveis", description: "Um rancheiro e seu time enfrentam um barão do gado no Velho Oeste, com cenários que remetem às montanhas da Virgínia Ocidental.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "7.3/10", imdbLink: "https://www.imdb.com/title/tt0468689/" }] },

    "DE": { name: "Delaware", media: [

        { type: "Filme", title: "Clube da Luta", description: "Um homem insone e um vendedor de sabonetes formam um clube da luta. O autor do livro é de Delaware, embora o filme não seja ambientado lá.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.8/10", imdbLink: "https://www.imdb.com/title/tt0137523/" }, 

        { type: "Filme", title: "O Curioso Caso de Benjamin Button", description: "A vida de um homem que nasce velho e rejuvenesce ao longo do tempo, com conexões a Wilmington, Delaware.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "7.8/10", imdbLink: "https://www.imdb.com/title/tt0818955/" }] },

    "DC": { name: "Distrito de Columbia", media: [

        { type: "Série", title: "House of Cards", description: "Um congressista inescrupuloso e sua esposa buscam poder em Washington D.C.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "8.7/10", imdbLink: "https://www.imdb.com/title/tt1856010/" }, 

        { type: "Filme", title: "A Casa Branca", description: "Um guarda do Capitólio deve proteger o Presidente durante um ataque à Casa Branca, em D.C.", cover: "https://image.tmdb.org/t/p/w500/q1w2e3r4t5y6u7i8o9p0q1r2s3t.jpg", rating: "6.3/10", imdbLink: "https://www.imdb.com/title/tt2302828/" }] },

    "MD": { name: "Maryland", media: [

        { type: "Série", title: "The Wire", description: "Um olhar detalhado sobre o tráfico de drogas em Baltimore, Maryland, sob a perspectiva de traficantes e policiais.", cover: "https://image.tmdb.org/t/p/w500/p0t5w6x4s1t3u2v1d2c1b2a1s0s.jpg", rating: "9.3/10", imdbLink: "https://www.imdb.com/title/tt0306764/" }, 

        { type: "Filme", title: "O Silêncio dos Inocentes", description: "Uma jovem agente do FBI busca a ajuda de um assassino em série canibal para capturar outro serial killer, com locações em Maryland.", cover: "https://image.tmdb.org/t/p/w500/r0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "8.6/10", imdbLink: "https://www.imdb.com/title/tt0102926/" }] },

    "NJ": { name: "Nova Jersey", media: [

        { type: "Série", title: "The Sopranos", description: "A vida de um chefe da máfia de Nova Jersey que tenta equilibrar sua vida familiar com seus negócios criminosos.", cover: "https://image.tmdb.org/t/p/w500/s1t2u3v4w5x6y7z8a9b0c1d2e3f.jpg", rating: "9.2/10", imdbLink: "https://www.imdb.com/title/tt0141842/" }, 

        { type: "Filme", title: "Garden State", description: "Um ator retorna à sua cidade natal em Nova Jersey para o funeral de sua mãe e redescobre a si mesmo.", cover: "https://image.tmdb.org/t/p/w500/t0x1y2z3a4b5c6d7e8f9g0h1i2j.jpg", rating: "7.4/10", imdbLink: "https://www.imdb.com/title/tt0333766/" }] },

    "PA": { name: "Pensilvânia", media: [

        { type: "Filme", title: "Rocky", description: "Um boxeador azarão da Filadélfia, Pensilvânia, tem a chance de lutar pelo título mundial.", cover: "https://image.tmdb.org/t/p/w500/v0w1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "8.1/10", imdbLink: "https://www.imdb.com/title/tt0075148/" },
        
        { type: "Série", title: "The Office", description: "O dia a dia de funcionários de uma empresa de papel em Scranton, Pensilvânia, no formato de mockumentary.", cover: "https://image.tmdb.org/t/p/w500/y0z1x2y3z4a5b6c7d8e9f0g1h2i.jpg", rating: "9.0/10", imdbLink: "https://www.imdb.com/title/tt0386676/" }] },

    "ME": { name: "Maine", media: [

        { type: "Filme", title: "Um Sonho de Liberdade", description: "Um homem é condenado injustamente e passa décadas na prisão de Shawshank, no Maine.", cover: "https://image.tmdb.org/t/p/w500/a1b2c3d4e5f6g7h8i9j0k1l2m3n.jpg", rating: "9.3/10", imdbLink: "https://www.imdb.com/title/tt0111161/" }, 

        { type: "Filme", title: "It: A Coisa", description: "Crianças em uma pequena cidade do Maine são aterrorizadas por uma entidade maligna que se manifesta como um palhaço.", cover: "https://image.tmdb.org/t/p/w500/s3bQY9y4d3g6h7i8j9k0l1m2n3p.jpg", rating: "7.3/10", imdbLink: "https://www.imdb.com/title/tt1396484/" }] }
};