import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
export default function Projects() {
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
        <p className="empty-state">Mes projets seront ajoutés prochainement.</p>
      ) : (
        <div className="grid">
          {projects.map((project) => (
            <article className="card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
                  <a href={project.repositoryUrl}>
                    Code source de {project.title}
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl}>Voir {project.title}</a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
