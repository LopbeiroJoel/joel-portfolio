import type { Locale } from "@/lib/i18n";

type Step = { message: string; action: string; target: string };
export const readerGuide: Record<Locale, Record<string, Step>> = {
  "fr": {
    "home": {
      "message": "Je vous présente le parcours de Joel, ses compétences et ses projets.",
      "action": "Découvrir son profil",
      "target": "about"
    },
    "about": {
      "message": "Ici, le lien entre son expérience en gestion et son projet en informatique.",
      "action": "Voir ses expériences",
      "target": "experience"
    },
    "experience": {
      "message": "Ses postes et les compétences acquises en entreprise. Les cartes donnent les détails.",
      "action": "Découvrir sa formation",
      "target": "education"
    },
    "education": {
      "message": "Les étapes de sa formation. La spécialisation à venir est indiquée à part.",
      "action": "Voir son cap Data & IA",
      "target": "skills"
    },
    "skills": {
      "message": "Ses compétences en trois étapes : acquises, en cours et à venir.",
      "action": "Ouvrir les trois étapes",
      "target": "skills-overview"
    },
    "skillsComplete": {
      "message": "Les trois étapes sont réunies ici. Voyons maintenant un projet concret.",
      "action": "Découvrir MercaSport",
      "target": "projects"
    },
    "projects": {
      "message": "MercaSport montre son travail et les compétences qu’il a mises en pratique.",
      "action": "Voir les trois étapes",
      "target": "skills-overview"
    },
    "projectsComplete": {
      "message": "MercaSport montre son travail et les compétences qu’il a mises en pratique.",
      "action": "Voir ses langues",
      "target": "languages"
    },
    "languages": {
      "message": "Les langues qu’il parle et leurs niveaux, pour situer sa communication.",
      "action": "Voir les certifications",
      "target": "certifications-title"
    },
    "certifications": {
      "message": "Ses certifications et leur statut : obtenues ou en préparation.",
      "action": "Découvrir ses centres d’intérêt",
      "target": "interests-title"
    },
    "interests": {
      "message": "Ses loisirs et son engagement associatif, pour mieux le connaître.",
      "action": "Passer au contact",
      "target": "contact"
    },
    "contact": {
      "message": "Pour échanger avec Joel : ses coordonnées et un formulaire de contact.",
      "action": "Écrire un message",
      "target": "contact-name"
    }
  },
  "en": {
    "home": {
      "message": "Let me show you Joel’s background, skills and projects.",
      "action": "Discover his profile",
      "target": "about"
    },
    "about": {
      "message": "How his experience in business connects with his plans in software development.",
      "action": "View his experience",
      "target": "experience"
    },
    "experience": {
      "message": "His roles and the skills gained at work. Open the cards for details.",
      "action": "Explore his education",
      "target": "education"
    },
    "education": {
      "message": "The stages of his education. His future specialisation is shown separately.",
      "action": "See his Data & AI direction",
      "target": "skills"
    },
    "skills": {
      "message": "His skills in three stages: acquired, in progress and planned.",
      "action": "Open the three stages",
      "target": "skills-overview"
    },
    "skillsComplete": {
      "message": "All three stages are gathered here. Let’s look at a practical project.",
      "action": "Discover MercaSport",
      "target": "projects"
    },
    "projects": {
      "message": "MercaSport shows his work and the skills he has put into practice.",
      "action": "View the three stages",
      "target": "skills-overview"
    },
    "projectsComplete": {
      "message": "MercaSport shows his work and the skills he has put into practice.",
      "action": "View his languages",
      "target": "languages"
    },
    "languages": {
      "message": "The languages he speaks and his proficiency levels.",
      "action": "View certifications",
      "target": "certifications-title"
    },
    "certifications": {
      "message": "His certifications and their status: obtained or in preparation.",
      "action": "Discover his interests",
      "target": "interests-title"
    },
    "interests": {
      "message": "His interests and community involvement, to get to know him better.",
      "action": "Go to contact",
      "target": "contact"
    },
    "contact": {
      "message": "To get in touch with Joel: his contact details and a message form.",
      "action": "Write a message",
      "target": "contact-name"
    }
  },
  "pt": {
    "home": {
      "message": "Vou apresentar o percurso, as competências e os projetos do Joel.",
      "action": "Conhecer o perfil",
      "target": "about"
    },
    "about": {
      "message": "A ligação entre a sua experiência em gestão e o seu projeto em informática.",
      "action": "Ver a sua experiência",
      "target": "experience"
    },
    "experience": {
      "message": "As suas funções e as competências adquiridas em empresa. Abra os cartões para ver os detalhes.",
      "action": "Conhecer a sua formação",
      "target": "education"
    },
    "education": {
      "message": "As etapas da sua formação. A especialização futura está indicada à parte.",
      "action": "Ver o seu rumo em Dados e IA",
      "target": "skills"
    },
    "skills": {
      "message": "As competências em três etapas: adquiridas, em curso e futuras.",
      "action": "Abrir as três etapas",
      "target": "skills-overview"
    },
    "skillsComplete": {
      "message": "As três etapas estão reunidas aqui. Vejamos agora um projeto concreto.",
      "action": "Conhecer a MercaSport",
      "target": "projects"
    },
    "projects": {
      "message": "A MercaSport mostra o seu trabalho e as competências que aplicou na prática.",
      "action": "Ver as três etapas",
      "target": "skills-overview"
    },
    "projectsComplete": {
      "message": "A MercaSport mostra o seu trabalho e as competências que aplicou na prática.",
      "action": "Ver os seus idiomas",
      "target": "languages"
    },
    "languages": {
      "message": "Os idiomas que fala e os respetivos níveis de domínio.",
      "action": "Ver as certificações",
      "target": "certifications-title"
    },
    "certifications": {
      "message": "As suas certificações e o seu estado: obtidas ou em preparação.",
      "action": "Conhecer os seus interesses",
      "target": "interests-title"
    },
    "interests": {
      "message": "Os seus interesses e o envolvimento associativo, para o conhecer melhor.",
      "action": "Ir para o contacto",
      "target": "contact"
    },
    "contact": {
      "message": "Para falar com o Joel: os seus contactos e um formulário de mensagem.",
      "action": "Escrever uma mensagem",
      "target": "contact-name"
    }
  }
};

export function followGuide(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;
  if (target instanceof HTMLDetailsElement) target.open = true;
  const destination = target instanceof HTMLDetailsElement ? target.querySelector("summary") : target;
  if (!destination) return;
  if (!destination.matches("input, textarea, button, a, summary") && !destination.hasAttribute("tabindex")) {
    destination.setAttribute("tabindex", "-1");
  }
  const guideNote = target.closest(".skills-journey")?.previousElementSibling;
  const scrollTarget = guideNote?.matches(".jose-guide-note") ? guideNote : destination;
  scrollTarget.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  if (destination instanceof HTMLElement) destination.focus({ preventScroll: true });
}
