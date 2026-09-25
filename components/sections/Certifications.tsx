"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
export default function Certifications() {
  const { t } = useLocale();
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
            <span>{t(certification.name)}</span>
            {certification.status && (
              <span className="badge">{t(certification.status)}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
