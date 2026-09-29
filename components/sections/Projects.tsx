import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCaseStudy from "@/components/ui/ProjectCaseStudy";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="section container">
      <SectionHeading id="projects-title" title="Projets" />
      <div className="project-case-list">
        {projects.map((project) => <ProjectCaseStudy key={project.id} project={project} />)}
      </div>
    </section>
  );
}
