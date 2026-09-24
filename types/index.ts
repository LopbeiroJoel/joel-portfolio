export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
  skills: string[];
};
export type Education = {
  degree: string;
  institution: string;
  period: string;
  description: string[];
  details: string[];
  status?: string;
};
export type SkillCategory = { category: string; skills: string[] };
export type Project = {
  title: string;
  description: string;
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
