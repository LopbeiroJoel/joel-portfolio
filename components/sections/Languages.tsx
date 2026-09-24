import SectionHeading from "@/components/ui/SectionHeading";
import LanguageCard from "@/components/ui/LanguageCard";
import { languages } from "@/data/languages";

export default function Languages() {
  return (
    <section
      id="languages"
      aria-labelledby="languages-title"
      className="section container"
    >
      <SectionHeading
        id="languages-title"
        title="Langues"
        eyebrow="06 / Communication"
      />
      <div className="languages-cards">
        {languages.map((language) => (
          <LanguageCard key={language.code} language={language} />
        ))}
      </div>
    </section>
  );
}
