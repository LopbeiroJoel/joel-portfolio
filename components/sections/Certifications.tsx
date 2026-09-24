import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
export default function Certifications() {
  return (
    <section
      aria-labelledby="certifications-title"
      className="section container"
    >
      <SectionHeading
        id="certifications-title"
        title="Certifications"
        eyebrow="07 / Apprentissage"
      />
      <ul className="certification-list">
        {certifications.map((certification) => (
          <li key={certification.name}>
            <span>{certification.name}</span>
            {certification.status && (
              <span className="badge">{certification.status}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
