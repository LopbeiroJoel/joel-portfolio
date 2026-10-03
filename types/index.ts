export type GroupVisual =
  | "safe"
  | "microscope"
  | "toolbox"
  | "cards"
  | "shield"
  | "factory"
  | "control"
  | "blocks"
  | "servers"
  | "drafting"
  | "finance"
  | "law";

export type CompetencyGroup = {
  id: string;
  title: string;
  visual: GroupVisual;
  skills: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
  skills: string[];
  groups?: CompetencyGroup[];
};
export type Education = {
  degree: string;
  institution: string;
  period: string;
  description: string[];
  details: string[];
  status?: string;
  groups?: CompetencyGroup[];
};
export type SkillCategory = { category: string; skills: string[] };
export type Project = {
  id: string;
  title: string;
  status?: Record<"fr" | "en" | "pt", string>;
  image: {
    src: string;
    alt: Record<"fr" | "en" | "pt", string>;
    width: number;
    height: number;
  };
  accentColor: string;
  content: Record<
    "fr" | "en" | "pt",
    {
      summary: string[];
      intro: string;
      sections: { title: string; paragraphs: string[] }[];
      conclusion: string;
    }
  >;
  technologies?: string[];
  repositoryUrl?: string;
  demoUrl?: string;
};
export type Language = {
  name: string;
  level: string;
  code: "FR" | "PT" | "EN" | "ES";
  badge: "NATIF" | "B2";
  greeting: string;
  locale: string;
};
export type Certification = { name: string; status?: "En cours" };
export type Interest = { name: string; description: string };

export type SkillStage = {
  id: "acquired" | "in-progress" | "upcoming";
  title: string;
  badge: "ACQUIS" | "EN COURS" | "À VENIR";
  description: string;
  categories: SkillCategory[];
};
