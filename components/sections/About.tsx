"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import AboutJourney from "@/components/ui/AboutJourney";
import type { Locale } from "@/lib/i18n";

const bioAccents: Record<Locale, readonly string[]> = {
  fr: ["EPITECH Strasbourg", "Pré-MSc", "développement informatique", "Big Data", "Intelligence Artificielle"],
  en: ["EPITECH Strasbourg", "Pré-MSc", "software development", "Big Data", "Artificial Intelligence"],
  pt: ["EPITECH Strasbourg", "Pré-MSc", "desenvolvimento de software", "Big Data", "Inteligência Artificial"],
};

function highlightBio(text: string, locale: Locale) {
  const terms = bioAccents[locale];
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, index) => terms.includes(part)
    ? <span className="bio-accent" key={index}>{part}</span>
    : part);
}

export default function About() {
  const { t, locale } = useLocale();
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="section container"
    >
      <SectionHeading id="about-title" title="À propos" />
      <div className="about-with-journey">
      <div className="prose about-prose">
        <p>{t("Mon parcours s’est construit autour de la gestion, de la finance et désormais des nouvelles technologies.")}</p>
        <p>{highlightBio(t("Après des études en Administration Économique et Sociale, puis en Comptabilité et Gestion, j’ai choisi de donner une nouvelle orientation à mon parcours en intégrant le parcours Master of Science d’EPITECH Strasbourg, avec une première année de Pré-MSc consacrée au développement informatique et à l’acquisition de solides bases techniques."), locale)}</p>
        <p>{highlightBio(t("Cette formation constitue la première étape de mon projet : poursuivre ensuite en Master of Science Big Data & Intelligence Artificielle de 2027 à 2029, afin de me spécialiser dans la data, l’intelligence artificielle et le développement de solutions technologiques appliquées aux enjeux des entreprises."), locale)}</p>
        <p>{t("À terme, je souhaite mettre à profit cette double compétence, à la fois métier et technique, pour concevoir des solutions intelligentes capables d’automatiser, d’optimiser et de transformer les processus existants.")}</p>
      </div>
      <AboutJourney />
      </div>
    </section>
  );
}
