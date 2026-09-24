import type { SkillCategory, SkillStage } from "@/types";

export default function SkillGroup({
  group,
  badge,
}: {
  group: SkillCategory;
  badge: SkillStage["badge"];
}) {
  return (
    <details className="card skill-card skill-disclosure">
      <summary>
        <div className="skill-summary-heading">
          <span className="skill-status">{badge}</span>
          <h4>{group.category}</h4>
        </div>
        <span className="skill-preview">{group.skills.slice(0, 2).join(" · ")}</span>
        <span className="skill-toggle">
          <span className="skill-toggle-closed">Voir les {group.skills.length} compétences</span>
          <span className="skill-toggle-open">Réduire le détail</span>
          <span className="skill-toggle-icon" aria-hidden="true">+</span>
        </span>
      </summary>
      <ul className="skill-technologies skill-details" aria-label={`Toutes les compétences : ${group.category}`}>
        {group.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </details>
  );
}
