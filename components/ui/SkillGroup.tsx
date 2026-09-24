import type { SkillCategory, SkillStage } from "@/types";

export default function SkillGroup({
  group,
  badge,
}: {
  group: SkillCategory;
  badge: SkillStage["badge"];
}) {
  return (
    <article className="card skill-card">
      <span className="skill-status">{badge}</span>
      <h4>{group.category}</h4>
      <ul className="skill-technologies">
        {group.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </article>
  );
}
