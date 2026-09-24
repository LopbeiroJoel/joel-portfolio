import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experiences";
export default function Experience() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experiences-title"
      className="section container"
    >
      <SectionHeading
        id="experiences-title"
        title="Expériences professionnelles"
        eyebrow="02 / Parcours"
      />
      <div className="stack">
        {experiences.map((item) => (
          <ExperienceCard key={item.company + item.period} experience={item} />
        ))}
      </div>
    </section>
  );
}
