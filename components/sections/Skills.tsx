import SectionHeading from "@/components/ui/SectionHeading";
import SkillsJourney from "@/components/ui/SkillsJourney";

export default function Skills() {
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-title" className="section container">
      <SectionHeading id="skills-title" title="Compétences" />
      <SkillsJourney />
    </section>
  );
}
