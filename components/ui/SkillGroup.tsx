"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { SkillCategory, SkillStage } from "@/types";

export default function SkillGroup({
  group,
  badge,
}: {
  group: SkillCategory;
  badge: SkillStage["badge"];
}) {
  const { t } = useLocale();
  return (
    <details className="card skill-card skill-disclosure">
      <summary>
        <div className="skill-summary-heading">
          <span className="skill-status">{t(badge)}</span>
          <h4>{t(group.category)}</h4>
        </div>
        <span className="skill-preview">{group.skills.slice(0, 2).map(t).join(" · ")}</span>
        <span className="skill-toggle">
          <span className="skill-toggle-closed">{t("Voir les {count} compétences").replace("{count}", String(group.skills.length))}</span>
          <span className="skill-toggle-open">{t("Réduire le détail")}</span>
          <span className="skill-toggle-icon" aria-hidden="true">+</span>
        </span>
      </summary>
      <ul className="skill-technologies skill-details" aria-label={t("Toutes les compétences : ") + t(group.category)}>
        {group.skills.map((skill) => (
          <li key={skill}>{t(skill)}</li>
        ))}
      </ul>
    </details>
  );
}
