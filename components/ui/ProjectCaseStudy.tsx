"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import WindowControls from "@/components/ui/WindowControls";
import type { Project } from "@/types";

const copy = {
  fr: { detail: "Voir le détail", normal: "Vue standard", visit: "Voir le projet", source: "Code source" },
  en: { detail: "View details", normal: "Standard view", visit: "View project", source: "Source code" },
  pt: { detail: "Ver os detalhes", normal: "Vista padrão", visit: "Ver projeto", source: "Código-fonte" },
};
type View = "compact" | "normal" | "expanded";

export default function ProjectCaseStudy({ project, onHide }: { project: Project; onHide: () => void }) {
  const { locale } = useLocale();
  const content = project.content[locale];
  const labels = copy[locale];
  const [view, setView] = useState<View>("normal");
  const [highlighted, setHighlighted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const expanded = view === "expanded";
  const detailsId = `${project.id}-details`;

  function normal(returnFocus = false) {
    setView("normal");
    if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
  }

  return (
    <article className="project-case" data-view={view} data-highlighted={highlighted}
      aria-labelledby={`${project.id}-title`}
      style={{ "--project-accent": project.accentColor } as CSSProperties}
      onClick={(event) => {
        if (!(event.target as Element).closest("button, a") && !window.getSelection()?.toString()) {
          setHighlighted(value => !value);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHighlighted(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); setHighlighted(false); normal(true); }
      }}>
      <div className="project-case-toolbar">
        <WindowControls targetLabel={project.title} onClose={onHide}
          onMinimize={() => setView("compact")} onExpand={() => setView("expanded")}
          expanded={expanded} controlsId={detailsId} />
        <span className="project-case-toolbar-title" aria-hidden="true">{project.title}</span>
      </div>
      <div className="project-case-body">
        <div className="project-case-media">
          <div className="project-case-frame">
            <Image src={project.image.src} alt={project.image.alt[locale]}
              width={project.image.width} height={project.image.height}
              sizes={view === "compact" ? "64px" : expanded ? "(min-width: 900px) 380px, (min-width: 600px) 440px, calc(100vw - 80px)" : "220px"}
              className="project-case-image" />
          </div>
        </div>
        <div className="project-case-content">
          <h3 id={`${project.id}-title`} className="project-case-title">{project.title}<span className="accent">.</span></h3>
          {project.status && <p className="project-case-status">{project.status[locale]}</p>}
          {view === "normal" && <div className="project-case-summary"><p>{content.summary[0]}</p></div>}
          <button ref={toggleRef} type="button" className="project-case-toggle"
            aria-expanded={expanded} aria-controls={detailsId}
            aria-label={`${view === "normal" ? labels.detail : labels.normal} — ${project.title}`}
            onClick={() => view === "normal" ? setView("expanded") : normal()}>
            {view === "normal" ? labels.detail : labels.normal}<span aria-hidden="true">{view === "normal" ? "+" : "−"}</span>
          </button>
          <div id={detailsId} className="project-case-details" hidden={!expanded}>
            <p className="project-case-intro">{content.intro}</p>
            {content.sections.map(section => <div className="project-case-topic" key={section.title}>
              <h4>{section.title}</h4>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>)}
            {content.conclusion && <p className="project-case-conclusion">{content.conclusion}</p>}
            {Boolean(project.technologies?.length) && <ul className="project-case-technologies" aria-label="Technologies">
              {project.technologies!.map(technology => <li key={technology}>{technology}</li>)}
            </ul>}
            {(project.demoUrl || project.repositoryUrl) && <div className="project-case-links">
              {project.demoUrl && <a href={project.demoUrl}>{labels.visit}<span aria-hidden="true">↗</span></a>}
              {project.repositoryUrl && <a href={project.repositoryUrl}>{labels.source}<span aria-hidden="true">↗</span></a>}
            </div>}
            <button type="button" className="project-case-close" onClick={() => normal(true)}>{labels.normal}<span aria-hidden="true">↑</span></button>
          </div>
        </div>
      </div>
    </article>
  );
}
