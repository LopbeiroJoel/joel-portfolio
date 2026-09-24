import type { Education } from "@/types";
export default function EducationCard({ education }: { education: Education }) {
  return (
    <article className="card timeline-card">
      <p className="period">{education.period}</p>
      <div>
        {education.status && <p className="badge status">{education.status}</p>}
        <h3>{education.degree}</h3>
        <p className="institution">{education.institution}</p>
        <div className="entry-summary">
          {education.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {education.details.length > 0 && (
          <>
            <h4 className="list-heading">
              {education.status
                ? "Compétences et technologies qui seront abordées"
                : "Compétences"}
            </h4>
            <ul className="detail-list">
              {education.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
