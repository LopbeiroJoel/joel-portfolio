"use client";

import { useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCaseStudy from "@/components/ui/ProjectCaseStudy";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { projects } from "@/data/projects";

const restoreCopy = { fr: "Restaurer les projets", en: "Restore projects", pt: "Restaurar os projetos" };

export default function Projects() {
  const { locale } = useLocale();
  const [hidden, setHidden] = useState<string[]>([]);
  const restoreRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  function hide(id: string) {
    setHidden(ids => [...ids, id]);
    requestAnimationFrame(() => restoreRef.current?.focus({ preventScroll: true }));
  }

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="section container">
      <div ref={headingRef} tabIndex={-1}><SectionHeading id="projects-title" title="Projets" /></div>
      {hidden.length > 0 && <button ref={restoreRef} type="button" className="project-case-restore" onClick={() => {
        setHidden([]);
        headingRef.current?.focus({ preventScroll: true });
      }}>{restoreCopy[locale]}<span aria-hidden="true">↺</span></button>}
      <div className="project-case-list">
        {projects.filter(project => !hidden.includes(project.id)).map(project =>
          <ProjectCaseStudy key={project.id} project={project} onHide={() => hide(project.id)} />)}
      </div>
    </section>
  );
}
