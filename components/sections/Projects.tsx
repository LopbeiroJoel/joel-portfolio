"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
export default function Projects() {
  const { t } = useLocale();
  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-title"
      className="section container"
    >
      <SectionHeading
        id="projects-title"
        title="Projets"
        eyebrow="05 / Réalisations"
      />
      {projects.length === 0 ? (
        <p className="empty-state">{t("Mes projets seront ajoutés prochainement.")}</p>
      ) : (
        <div className="grid">
          {projects.map((project) => (
            <article className="card" key={project.title}>
              <h3>{t(project.title)}</h3>
              <p>{t(project.description)}</p>
              {project.technologies && (
                <ul className="badges">
                  {project.technologies.map((tech) => (
                    <li className="badge" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              <div className="actions">
                {project.repositoryUrl && (
                  <a href={project.repositoryUrl}>{t("Code source de ")}{t(project.title)}
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl}>{t("Voir ")}{t(project.title)}</a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
