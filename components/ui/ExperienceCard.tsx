import type { Experience } from "@/types";
export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <article className="card timeline-card">
      <p className="period">{experience.period}</p>
      <div>
        <h3>{experience.role}</h3>
        <p className="institution">{experience.company}</p>
        <p className="entry-summary">{experience.summary}</p>
        <h4 className="list-heading">Compétences</h4>
        <ul className="detail-list">
          {experience.skills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
