import type { Locale } from "@/lib/i18n";

export const skillsFocus: Record<Locale, {
  title: string; period: string; introduction: string;
  goals: { title: string; purpose: string; technologies: string }[];
}> = {
  fr: {
    title: "Mon cap : Big Data & IA",
    period: "Spécialisation à venir · 2027–2029",
    introduction: "Je vois la Data et l’IA comme des domaines d’avenir. Je souhaite m’y spécialiser après la Pré-MSc et continuer à me former pour rester à jour sur les outils et les pratiques du métier.",
    goals: [
      { title: "Travailler les données", purpose: "Apprendre à récupérer, organiser et traiter de gros volumes de données.", technologies: "Hadoop · Apache Spark · Data Streaming" },
      { title: "Créer des applications avec l’IA", purpose: "Comprendre les modèles et savoir les utiliser dans un vrai projet.", technologies: "Machine Learning · NLP · LLM · Fine-Tuning" },
      { title: "Déployer les projets", purpose: "Mettre les applications en ligne, les tester et les maintenir dans la durée.", technologies: "Cloud · CI/CD · AI Integration · AI Deployment" },
    ],
  },
  en: {
    title: "My direction: Big Data & AI",
    period: "Future specialisation · 2027–2029",
    introduction: "I see Data and AI as fields with a strong future. After my Pré-MSc, I would like to specialise in them and keep learning to stay up to date with the tools and practices used in the field.",
    goals: [
      { title: "Work with data", purpose: "Learn to collect, organise and process large volumes of data.", technologies: "Hadoop · Apache Spark · Data Streaming" },
      { title: "Build applications with AI", purpose: "Understand models and learn how to use them in a real project.", technologies: "Machine Learning · NLP · LLM · Fine-Tuning" },
      { title: "Deploy projects", purpose: "Get applications online, test them and maintain them over time.", technologies: "Cloud · CI/CD · AI Integration · AI Deployment" },
    ],
  },
  pt: {
    title: "O meu rumo: Big Data e IA",
    period: "Especialização futura · 2027–2029",
    introduction: "Vejo os dados e a IA como áreas de futuro. Depois da Pré-MSc, quero especializar-me nestas áreas e continuar a formar-me para acompanhar as ferramentas e as práticas da profissão.",
    goals: [
      { title: "Trabalhar os dados", purpose: "Aprender a recolher, organizar e processar grandes volumes de dados.", technologies: "Hadoop · Apache Spark · Data Streaming" },
      { title: "Criar aplicações com IA", purpose: "Compreender os modelos e aprender a utilizá-los num projeto real.", technologies: "Machine Learning · NLP · LLM · Fine-Tuning" },
      { title: "Colocar os projetos online", purpose: "Disponibilizar as aplicações online, testá-las e mantê-las ao longo do tempo.", technologies: "Cloud · CI/CD · AI Integration · AI Deployment" },
    ],
  },
};
