import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "mercasport",
    title: "MercaSport",
    image: {
      src: "/images/projects/mercasport.png",
      alt: {
        fr: "Identité visuelle de MercaSport sur fond vert : Le mercato du football amateur.",
        en: "MercaSport visual identity on a green background: the amateur football transfer market.",
        pt: "Identidade visual da MercaSport sobre fundo verde: o mercado de transferências do futebol amador.",
      },
      width: 1254,
      height: 1254,
    },
    accentColor: "#126333",
    content: {
      fr: {
        summary: [
          "MercaSport est une plateforme que j’ai conçue et développée pour faciliter la mise en relation entre clubs, entraîneurs et joueurs de football amateur.",
          "Les clubs peuvent publier des recherches par poste et profil, permettant aux entraîneurs, même avec peu de réseau, de trouver plus facilement les joueurs dont ils ont besoin. De leur côté, les joueurs peuvent découvrir des clubs et des opportunités qui correspondent à leurs attentes et leurs ambitions.",
          "L’objectif : rendre le mercato amateur plus simple, accessible et efficace.",
        ],
        intro:
          "MercaSport est une application que j’ai conçue et développée pour faciliter la mise en relation entre les joueurs, les entraîneurs et les clubs de football amateur.",
        sections: [
          {
            title: "Publication d’offres",
            paragraphs: [
              "L’objectif est de créer un véritable marché du recrutement pour le football amateur, où chaque club peut publier ses besoins : poste recherché, profil du joueur, niveau attendu, objectifs sportifs, mais également les différents avantages proposés. Ces avantages peuvent être financiers, liés aux infrastructures du club, à l’accompagnement du joueur ou à d’autres conditions proposées par le club.",
            ],
          },
          {
            title: "Profils joueurs",
            paragraphs: [
              "Du côté des joueurs, MercaSport permet de parcourir librement les offres publiées par les clubs et de rechercher celles qui correspondent à leurs attentes. Un joueur peut également publier son propre profil pour indiquer publiquement qu’il recherche un club, ou simplement consulter les opportunités de manière plus discrète.",
            ],
          },
          {
            title: "Messagerie directe",
            paragraphs: [
              "La plateforme intègre également une messagerie directe, permettant aux entraîneurs et aux joueurs intéressés d’échanger et d’entrer facilement en contact.",
            ],
          },
          {
            title: "Recrutement amateur",
            paragraphs: [
              "MercaSport répond notamment à une problématique très présente dans le football amateur : le recrutement dépend encore énormément du réseau personnel. Un entraîneur avec peu de contacts peut passer à côté de nombreux profils intéressants, tandis qu’un joueur peut avoir des difficultés à trouver un club correspondant réellement à ses ambitions et à ses critères.",
            ],
          },
          {
            title: "Calendriers & sondages",
            paragraphs: [
              "L’application permet de créer des calendriers de matchs et d’entraînements, ainsi que des sondages pour faciliter l’organisation de l’équipe.",
            ],
          },
          {
            title: "Préparation & suivi des matchs",
            paragraphs: [
              "Les entraîneurs peuvent préparer des fiches de match, ajouter des notes sur les joueurs pour chaque rencontre et créer des compositions d’équipe avec les photos des joueurs.",
            ],
          },
          {
            title: "Data & statistiques",
            paragraphs: [
              "Enfin, MercaSport intègre une dimension data et statistiques. Les clubs comme les joueurs peuvent disposer de données plus ou moins avancées sur leurs performances et leur activité. Plusieurs formules d’abonnement permettent d’accéder à différents niveaux d’analyse, avec la possibilité pour MercaSport de produire directement certaines statistiques et données avancées.",
            ],
          },
        ],
        conclusion:
          "Toutes ces fonctionnalités sont réunies dans une interface simple, claire et facile à prendre en main, pensée pour les entraîneurs et les joueurs de tous âges.",
      },
      en: {
        summary: [
          "MercaSport is a platform I designed and developed to connect amateur football clubs, coaches and players.",
          "Clubs can advertise the positions and player profiles they are looking for, helping coaches find the players they need, even with a limited network. Players, in turn, can discover clubs and opportunities that match their expectations and ambitions.",
          "The aim: to make the amateur transfer market simpler, more accessible and more effective.",
        ],
        intro:
          "MercaSport is an application I designed and developed to connect amateur football players, coaches and clubs.",
        sections: [
          {
            title: "Club opportunities",
            paragraphs: [
              "The aim is to create a dedicated recruitment marketplace for amateur football, where each club can publish its requirements: the position to fill, the player profile, the expected standard and sporting objectives, as well as the benefits on offer. These may include financial benefits, club facilities, player support or other conditions offered by the club.",
            ],
          },
          {
            title: "Player profiles",
            paragraphs: [
              "For players, MercaSport makes it possible to freely browse opportunities posted by clubs and find those that match their expectations. Players can also publish their own profile to make it publicly known that they are looking for a club, or simply explore opportunities more discreetly.",
            ],
          },
          {
            title: "Direct messaging",
            paragraphs: [
              "The platform also includes direct messaging, making it easy for coaches and interested players to get in touch and start a conversation.",
            ],
          },
          {
            title: "Amateur recruitment",
            paragraphs: [
              "MercaSport addresses a widespread challenge in amateur football: recruitment still relies heavily on personal networks. A coach with few contacts may miss out on many promising players, while a player may struggle to find a club that truly matches their ambitions and criteria.",
            ],
          },
          {
            title: "Calendars & polls",
            paragraphs: [
              "The application lets teams create match and training calendars, as well as polls to make team organisation easier.",
            ],
          },
          {
            title: "Match preparation & player notes",
            paragraphs: [
              "Coaches can prepare match sheets, add notes on players for each match and create team lineups featuring player photos.",
            ],
          },
          {
            title: "Data & statistics",
            paragraphs: [
              "MercaSport also includes a data and statistics dimension. Both clubs and players can access varying levels of data on their performance and activity. Several subscription plans provide access to different levels of analysis, with MercaSport also able to produce certain statistics and advanced data directly.",
            ],
          },
        ],
        conclusion:
          "All these features come together in a simple, clear and easy-to-use interface, designed for coaches and players of all ages.",
      },
      pt: {
        summary: [
          "A MercaSport é uma plataforma que concebi e desenvolvi para facilitar o contacto entre clubes, treinadores e jogadores de futebol amador.",
          "Os clubes podem publicar anúncios de recrutamento por posição e perfil, permitindo aos treinadores encontrar mais facilmente os jogadores de que precisam, mesmo com uma rede de contactos reduzida. Por sua vez, os jogadores podem descobrir clubes e oportunidades que correspondam às suas expectativas e ambições.",
          "O objetivo: tornar o mercado de transferências amador mais simples, acessível e eficaz.",
        ],
        intro:
          "A MercaSport é uma aplicação que concebi e desenvolvi para facilitar o contacto entre jogadores, treinadores e clubes de futebol amador.",
        sections: [
          {
            title: "Publicação de oportunidades",
            paragraphs: [
              "O objetivo é criar um verdadeiro mercado de recrutamento para o futebol amador, onde cada clube possa publicar as suas necessidades: posição a preencher, perfil do jogador, nível esperado e objetivos desportivos, bem como as vantagens oferecidas. Estas podem ser financeiras, estar relacionadas com as infraestruturas do clube, com o acompanhamento do jogador ou com outras condições propostas pelo clube.",
            ],
          },
          {
            title: "Perfis de jogadores",
            paragraphs: [
              "Para os jogadores, a MercaSport permite consultar livremente as oportunidades publicadas pelos clubes e procurar aquelas que correspondam às suas expectativas. Um jogador pode também publicar o seu próprio perfil para indicar publicamente que procura um clube, ou simplesmente explorar as oportunidades de forma mais discreta.",
            ],
          },
          {
            title: "Mensagens diretas",
            paragraphs: [
              "A plataforma integra também um sistema de mensagens diretas, permitindo que treinadores e jogadores interessados comuniquem e entrem facilmente em contacto.",
            ],
          },
          {
            title: "Recrutamento amador",
            paragraphs: [
              "A MercaSport responde, em particular, a um problema muito presente no futebol amador: o recrutamento continua a depender fortemente da rede de contactos pessoais. Um treinador com poucos contactos pode deixar escapar muitos perfis interessantes, enquanto um jogador pode ter dificuldade em encontrar um clube que corresponda verdadeiramente às suas ambições e aos seus critérios.",
            ],
          },
          {
            title: "Calendários e sondagens",
            paragraphs: [
              "A aplicação permite criar calendários de jogos e treinos, bem como sondagens para facilitar a organização da equipa.",
            ],
          },
          {
            title: "Preparação e acompanhamento dos jogos",
            paragraphs: [
              "Os treinadores podem preparar fichas de jogo, acrescentar notas sobre os jogadores em cada partida e criar formações da equipa com as fotografias dos jogadores.",
            ],
          },
          {
            title: "Dados e estatísticas",
            paragraphs: [
              "Por fim, a MercaSport integra uma dimensão de dados e estatísticas. Tanto os clubes como os jogadores podem dispor de dados mais ou menos avançados sobre o seu desempenho e a sua atividade. Vários planos de subscrição dão acesso a diferentes níveis de análise, com a possibilidade de a MercaSport produzir diretamente determinadas estatísticas e dados avançados.",
            ],
          },
        ],
        conclusion:
          "Todas estas funcionalidades estão reunidas numa interface simples, clara e fácil de utilizar, pensada para treinadores e jogadores de todas as idades.",
      },
    },
  },
];
