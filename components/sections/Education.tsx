import SectionHeading from "@/components/ui/SectionHeading";
import EducationCard from "@/components/ui/EducationCard";
import { education } from "@/data/education";
export default function Education() {
  return (
    <section
      id="education"
      tabIndex={-1}
      aria-labelledby="education-title"
      className="section container"
    >
      <SectionHeading
        id="education-title"
        title="Formation"
        eyebrow="03 / Études"
      />
      <div className="stack">
        {education.map((item) => (
          <EducationCard key={item.degree + item.period} education={item} />
        ))}
      </div>
    </section>
  );
}
