// scripts/add-years.js — Adiciona campo year ao data.js
// Mapeamento título -> ano de lançamento/estreia

const YEAR_MAP = {
  // CA
  'La La Land': 2016,
  'Big Little Lies': 2017,
  'Pulp Fiction': 1994,
  'L.A. Confidential': 1997,
  'Era Uma Vez em Hollywood': 2019,
  'Os Donos da Rua': 1991,
  // NY
  'Taxi Driver': 1976,
  'Friends': 1994,
  'O Poderoso Chefão': 1972,
  'O Poderoso Chefão: Parte II': 1974,
  'Perdidos na Noite': 1969,
  'Um Dia de Cão': 1975,
  // TX
  'No Country for Old Men': 2007,
  'Friday Night Lights': 2006,
  'Apollo 13': 1995,
  // FL
  'Miami Vice': 2006,
  'Scarface': 1983,
  'Marley & Eu': 2008,
  'A Gaiola das Loucas': 1996,
  // AK
  'A Proposta': 2009,
  'Northern Exposure': 1990,
  // HI
  '50 First Dates': 2004,
  'Hawaii Five-0': 2010,
  // MA
  'Manchester à Beira-Mar': 2016,
  'A Rede Social': 2010,
  // MN
  'Fargo': 1996,
  'Juno': 2007,
  // MT
  'Yellowstone': 2018,
  '1883': 2021,
  // ND
  'Fargo': 2014,
  'Nomadland': 2020,
  // ID
  'Napoleão Dinamite': 2004,
  'My Own Private Idaho': 1991,
  // WA
  'Sintonia de Amor': 1993,
  'Grey\'s Anatomy': 2005,
  // AZ
  'Arizona Nunca Mais': 1987,
  'Tombstone': 1993,
  // CO
  'O Iluminado': 1980,
  'Encontro Explosivo': 2010,
  // NV
  'Se Beber, Não Case!': 2009,
  'CSI: Crime Scene Investigation': 2000,
  // NM
  'Breaking Bad': 2008,
  // OR
  'Os Goonies': 1985,
  'Portlandia': 2011,
  // UT
  '127 Horas': 2010,
  'Westworld': 2016,
  // WY
  'Brokeback Mountain': 2005,
  'Os Imperdoáveis': 1992,
  // AR
  'Mud': 2012,
  // IA
  'Campos dos Sonhos': 1989,
  'As Pontes de Madison': 1995,
  // KS
  'O Mágico de Oz': 1939,
  'Supernatural': 2005,
  // MO
  'Garota Exemplar': 2014,
  'Ozark': 2017,
  // NE
  'Nebraska': 2013,
  'As Sete Faces do Dr. Lao': 1964,
  // OK
  'Oklahoma!': 1955,
  'Twister': 1996,
  // SD
  'Deadwood': 2004,
  'Fargo': 1996,
  'O Voo do Dragão': 1990,
  // LA
  'Um Bonde Chamado Desejo': 1951,
  'True Detective (Temporada 1)': 2014,
  // CT
  'O Show de Truman': 1998,
  'Gilmore Girls': 2000,
  // NH
  'Jumanji': 1995,
  'O Resgate do Soldado Ryan': 1998,
  // RI
  'A Invenção de Hugo Cabret': 2011,
  'Irmãos Gêmeos': 1988,
  // VT
  'Um Hotel Bom Pra Cachorro': 2009,
  'Super Troopers': 2001,
  // AL
  'Forrest Gump: O Contador de Histórias': 1994,
  'Selma': 2014,
  // GA
  'Stranger Things': 2016,
  'The Walking Dead': 2010,
  // MS
  'Histórias Cruzadas': 2011,
  'Tempo de Matar': 1996,
  // SC
  'Diário de uma Paixão': 2004,
  // IL
  'Curtindo a Vida Adoidado': 1986,
  'Os Intocáveis': 1987,
  // IN
  'Hoosiers': 1986,
  'Parks and Recreation': 2009,
  // KY
  'Rain Man': 1988,
  'O Gambito da Rainha': 2020,
  // NC
  'One Tree Hill': 2003,
  'Jogos Vorazes': 2012,
  // OH
  'Vingadores: Os Vingadores': 2012,
  // TN
  'Walk the Line': 2005,
  'Nashville': 2012,
  // VA
  'Duelo de Titãs': 2000,
  'The Americans': 2013,
  // WI
  'Missão Madrinha de Casamento': 2011,
  'That \'70s Show': 1998,
  // WV
  'Missão Impossível III': 2006,
  'Os Indomáveis': 2003,
  // DE
  'Clube da Luta': 1999,
  'O Curioso Caso de Benjamin Button': 2008,
  // DC
  'House of Cards': 2013,
  'A Casa Branca': 2013,
  // MD
  'The Wire': 2002,
  'O Silêncio dos Inocentes': 1991,
  // NJ
  'The Sopranos': 1999,
  'Garden State': 2004,
  // PA
  'Rocky': 1976,
  'The Office': 2005,
  // ME
  'Um Sonho de Liberdade': 1994,
  'It: A Coisa': 2017,
  // MI
  'RoboCop': 1987,
  '8 Mile': 2002,
};

export { YEAR_MAP };