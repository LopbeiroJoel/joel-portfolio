"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Experience } from "@/types";
export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  const { t } = useLocale();
  return (
    <article className="card timeline-card">
      <p className="period">{t(experience.period)}</p>
      <div>
        <h3>{t(experience.role)}</h3>
        <p className="institution">{experience.company}</p>
        <p className="entry-summary">{t(experience.summary)}</p>
        <h4 className="list-heading">{t("Compétences")}</h4>
        <ul className="detail-list">
          {experience.skills.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
