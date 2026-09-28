import type { Locale } from "@/lib/i18n";

type JourneyCopy = {
  intro: string;
  hint: string;
  slider: string;
  stages: [string, string, string];
  periods: [string, string, string];
  titles: [string, string, string];
  descriptions: [string, string, string];
  domains: string;
  hover: string;
  note: string;
  overview: string;
  shortNames: string[][];
};

export const journeyCopy: Record<Locale, JourneyCopy> = {
  fr: {
    intro: "Ce que je sais faire. Ce que je développe. Là où je veux aller.",
    hint: "Glissez pour explorer mon évolution",
    slider: "Explorer mon parcours de compétences",
    stages: ["Acquis", "En développement", "Spécialisation future"],
    periods: ["Aujourd’hui", "Pré-MSc · 2026–2027", "Big Data & IA · 2027–2029"],
    titles: ["Compétences acquises", "Compétences en cours de développement", "Big Data & Intelligence Artificielle"],
    descriptions: [
      "Les compétences déjà acquises, organisées par domaine.",
      "Les domaines que j’approfondis en Pré-MSc, en cours d’acquisition et de validation.",
      "Mon objectif pour 2027–2029 : une spécialisation future. Ces compétences restent à développer dans ce cadre.",
    ],
    domains: "Domaines explorés",
    hover: "Survolez ou sélectionnez un domaine pour le repérer dans le parcours.",
    note: "Un parcours d’apprentissage, sans mesure chiffrée de maîtrise.",
    overview: "Voir toutes les étapes et leurs compétences",
    shortNames: [["Software", "Web", "Data & IA", "Cloud", "DevOps", "Sécurité"], ["Software avancé", "Systèmes", "Cloud & IA", "Projets"], ["Big Data", "Machine Learning", "NLP & IA générative", "Infrastructure", "Visualisation", "MLOps", "Sécurité & éthique"]],
  },
  en: {
    intro: "What I can do. What I’m developing. Where I want to go.",
    hint: "Drag to explore my journey",
    slider: "Explore my skills journey",
    stages: ["Acquired", "In development", "Future specialisation"],
    periods: ["Today", "Pré-MSc · 2026–2027", "Big Data & AI · 2027–2029"],
    titles: ["Acquired skills", "Skills in development", "Big Data & Artificial Intelligence"],
    descriptions: [
      "Skills already acquired, organised by domain.",
      "Areas I am developing during my Pré-MSc, with learning and validation still in progress.",
      "My goal for 2027–2029: a future specialisation. These skills are still to be developed as part of that programme.",
    ],
    domains: "Explore the domains",
    hover: "Hover over or select a domain to locate it in the journey.",
    note: "A learning journey, without numerical proficiency ratings.",
    overview: "View every stage and its skills",
    shortNames: [["Software", "Web", "Data & AI", "Cloud", "DevOps", "Security"], ["Advanced software", "Systems", "Cloud & AI", "Projects"], ["Big Data", "Machine Learning", "NLP & generative AI", "Infrastructure", "Visualisation", "MLOps", "Security & ethics"]],
  },
  pt: {
    intro: "O que sei fazer. O que estou a desenvolver. Onde quero chegar.",
    hint: "Arraste para explorar o meu percurso",
    slider: "Explorar o meu percurso de competências",
    stages: ["Adquiridas", "Em desenvolvimento", "Especialização futura"],
    periods: ["Hoje", "Pré-MSc · 2026–2027", "Big Data e IA · 2027–2029"],
    titles: ["Competências adquiridas", "Competências em desenvolvimento", "Big Data e Inteligência Artificial"],
    descriptions: [
      "As competências já adquiridas, organizadas por área.",
      "Áreas que estou a aprofundar no Pré-MSc, ainda em fase de aquisição e validação.",
      "O meu objetivo para 2027–2029: uma especialização futura. Estas competências serão desenvolvidas no âmbito dessa formação.",
    ],
    domains: "Explorar as áreas",
    hover: "Passe o cursor ou selecione uma área para a localizar no percurso.",
    note: "Um percurso de aprendizagem, sem avaliações numéricas de domínio.",
    overview: "Ver todas as etapas e as respetivas competências",
    shortNames: [["Software", "Web", "Dados e IA", "Cloud", "DevOps", "Segurança"], ["Software avançado", "Sistemas", "Cloud e IA", "Projetos"], ["Big Data", "Machine Learning", "NLP e IA generativa", "Infraestruturas", "Visualização", "MLOps", "Segurança e ética"]],
  },
};

// Positions organise domains, not proficiency. Each column is one learning stage.
export function journeyNode(stage: number, index: number, count: number) {
  return { x: 30 + stage * 270, y: 72 + index * (270 / Math.max(1, count - 1)) };
}

export function journeyStage(position: number) {
  return position < 25 ? 0 : position < 75 ? 1 : 2;
}
