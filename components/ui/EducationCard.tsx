"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Education } from "@/types";
import CompetencyGroups from "@/components/ui/CompetencyGroups";
const accentedInstitutions = new Set([
  "EPITECH Strasbourg",
  "ESGM Pro Format / Pigier Mulhouse",
  "Université de Strasbourg",
]);

export default function EducationCard({ education }: { education: Education }) {
  const { t } = useLocale();
  return (
    <article className={`card timeline-card${education.groups?.length ? " grouped-timeline-card" : ""}`}>
      <p className="period">{t(education.period)}</p>
      <div>
        {education.status && <p className="badge status">{t(education.status)}</p>}
        <h3>{t(education.degree)}</h3>
        <p className={`institution${accentedInstitutions.has(education.institution) ? " institution--accent" : ""}`}>{education.institution}</p>
        <div className="entry-summary">
          {education.description.map((paragraph) => (
            <p key={paragraph}>{t(paragraph)}</p>
          ))}
        </div>
        {!education.groups?.length && education.details.length > 0 && (
          <>
            <h4 className="list-heading">
              {t(education.status
                ? "Compétences et technologies qui seront abordées"
                : "Compétences")}
            </h4>
            <ul className="detail-list">
              {education.details.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      {!!education.groups?.length && <CompetencyGroups groups={education.groups}
        label={education.status ? "Compétences et technologies qui seront abordées" : "Compétences"} />}
    </article>
  );
}
