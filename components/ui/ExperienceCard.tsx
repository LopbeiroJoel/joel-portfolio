"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Experience } from "@/types";
import CompetencyGroups from "@/components/ui/CompetencyGroups";
export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  const { t } = useLocale();
  return (
    <article className={`card timeline-card${experience.groups?.length ? " grouped-timeline-card" : ""}`}>
      <p className="period">{t(experience.period)}</p>
      <div>
        <h3>{t(experience.role)}</h3>
        <p className="institution">{experience.company}</p>
        <p className="entry-summary">{t(experience.summary)}</p>
        {!experience.groups?.length && <>
        <h4 className="list-heading">{t("Compétences")}</h4>
        <ul className="detail-list">
          {experience.skills.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
        </>}
      </div>
      {!!experience.groups?.length && <CompetencyGroups groups={experience.groups} label="Compétences" />}
    </article>
  );
}
