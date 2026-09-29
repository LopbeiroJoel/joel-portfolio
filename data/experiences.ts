import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    role: "Assistant comptable — Alternance",
    company: "CRIT Direction Régionale Est",
    period: "Août 2024 – Août 2026",
    summary:
      "Pendant deux années d’alternance, j’ai participé au suivi et au traitement des opérations comptables de la Direction Régionale Est. Cette expérience m’a permis de développer une approche rigoureuse de la donnée financière, tout en travaillant sur l’amélioration des outils, l’automatisation de certaines tâches et la fiabilisation des processus internes.",
    skills: [
      "Comptabilité clients",
      "Saisie et intégration comptable",
      "Rapprochements bancaires",
      "Suivi et contrôle des flux financiers",
      "Analyse de données financières",
      "Organisation et structuration des données",
      "Automatisation de traitements",
      "Excel avancé",
      "Tableaux de suivi et reporting",
      "Paramétrage et amélioration d’un PGI",
      "Contrôle de cohérence des données",
      "Fiabilisation des informations financières",
      "Respect des procédures et des délais",
    ],
    groups: [
      {
        id: "crit-finance",
        title: "Gestion Comptable et Financière",
        visual: "safe",
        skills: [
          "Comptabilité clients",
          "Saisie et intégration comptable",
          "Rapprochements bancaires",
          "Suivi et contrôle des flux financiers",
        ],
      },
      {
        id: "crit-data",
        title: "Analyse et Fiabilisation des Données",
        visual: "microscope",
        skills: [
          "Analyse de données financières",
          "Organisation et structuration des données",
          "Contrôle de cohérence des données",
          "Fiabilisation des informations financières",
        ],
      },
      {
        id: "crit-tools",
        title: "Optimisation des Processus et Outils de Gestion",
        visual: "toolbox",
        skills: [
          "Excel avancé",
          "Tableaux de suivi et reporting",
          "Automatisation de traitements",
          "Paramétrage et amélioration d’un PGI",
          "Respect des procédures et des délais",
        ],
      },
    ],
  },
  {
    role: "Croupier — Job étudiant",
    company: "Casino Barrière Blotzheim",
    period: "Juin 2022 – Septembre 2023",
    summary:
      "En parallèle de mes études, j’ai travaillé comme croupier au Casino Barrière de Blotzheim. Cette expérience m’a appris à évoluer dans un environnement exigeant, où la précision, la réactivité et le respect strict des procédures sont essentiels. Elle m’a également permis de développer mon aisance relationnelle, ma capacité de décision et ma gestion des responsabilités financières.",
    skills: [
      "Gestion des opérations de jeu",
      "Gestion des flux financiers",
      "Respect des procédures réglementaires",
      "Analyse rapide",
      "Gestion du risque",
      "Prise de décision",
      "Relation client",
      "Communication",
      "Adaptabilité",
      "Confidentialité",
      "Responsabilité financière",
      "Réactivité opérationnelle",
    ],
    groups: [
      {
        id: "casino-operations",
        title: "Pilotage Opérationnel et Relation Client",
        visual: "cards",
        skills: [
          "Gestion des opérations de jeu",
          "Réactivité opérationnelle",
          "Analyse rapide",
          "Prise de décision",
          "Relation client",
          "Communication",
          "Adaptabilité",
        ],
      },
      {
        id: "casino-risk",
        title: "Gestion des Risques et Conformité",
        visual: "shield",
        skills: [
          "Gestion des flux financiers",
          "Gestion du risque",
          "Respect des procédures réglementaires",
          "Responsabilité financière",
          "Confidentialité",
        ],
      },
    ],
  },
];
