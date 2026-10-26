import type { Interest } from "@/types";

export const interests: Interest[] = [
  {
    name: "Poker",
    description: "Ancien joueur au TOP SHARK ACADEMY POKER",
    details: ["Joueur indépendant, je participe à des tournois de loisir et à des compétitions plus exigeantes."],
  },
  {
    name: "Sport",
    description: "",
    sections: [
      { title: "Football", description: "Ancien pratiquant en loisir, je suis avec passion le football professionnel, son actualité et les matchs locaux." },
      { title: "Arts martiaux mixtes", description: "Grade vert obtenu après plusieurs années de pratique en loisir." },
    ],
  },
  {
    name: "Bénévolat",
    description: "Médecins Sans Frontières",
    details: ["Engagement solidaire en tant que militant et donateur de l’association."],
  },
];
