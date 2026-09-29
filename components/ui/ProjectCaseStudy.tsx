"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Project } from "@/types";

const hoverQuery = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";
const interfaceCopy = {
  fr: {
    hover: "* Survolez le projet pour découvrir sa présentation complète.",
    tap: "* Appuyez sur le projet pour découvrir sa présentation complète.",
    phone: "* Appuyez pour voir le projet en détail.",
    open: "Afficher la présentation complète de",
    close: "Réduire",
    visit: "Voir le projet",
    source: "Code source",
  },
  en: {
    hover: "* Hover over the project to explore the full story.",
    tap: "* Tap the project to explore the full story.",
    phone: "* Tap to explore the project in detail.",
    open: "Explore the full story of",
    close: "Show less",
    visit: "View project",
    source: "Source code",
  },
  pt: {
    hover: "* Passe o cursor sobre o projeto para conhecer a apresentação completa.",
    tap: "* Toque no projeto para conhecer a apresentação completa.",
    phone: "* Toque para explorar o projeto em detalhe.",
    open: "Ver a apresentação completa de",
    close: "Recolher",
    visit: "Ver projeto",
    source: "Código-fonte",
  },
};

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const { locale } = useLocale();
  const content = project.content[locale];
  const copy = interfaceCopy[locale];
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const expanded = hovered || pinned;
  const detailsId = `${project.id}-details`;

  useEffect(() => {
    const media = window.matchMedia(hoverQuery);
    const onChange = () => setHovered(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function close(returnFocus = false) {
    setPinned(false);
    setHovered(false);
    if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
  }

  function open() {
    setPinned(true);
  }

  return (
    <article className="project-case" data-expanded={expanded}
      aria-labelledby={`${project.id}-title`}
      style={{ "--project-accent": project.accentColor } as CSSProperties}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia(hoverQuery).matches) {
          setHovered(true);
        }
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={(event) => {
        if (!expanded && !window.matchMedia(hoverQuery).matches && !(event.target as Element).closest("button, a") && !window.getSelection()?.toString()) open();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) { event.preventDefault(); close(true); }
      }}>
      <div className="project-case-media">
        <div className="project-case-frame">
          <Image src={project.image.src} alt={project.image.alt[locale]}
            width={project.image.width} height={project.image.height}
            sizes="(min-width: 1100px) 440px, (min-width: 700px) 560px, calc(100vw - 80px)"
            className="project-case-image" />
        </div>
      </div>
      <div className="project-case-content">
        <h3 id={`${project.id}-title`} className="project-case-title">{project.title}<span className="accent">.</span></h3>
        <div className="project-case-summary project-case-fold" aria-hidden={expanded} inert={expanded}>
          <div>{content.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <button ref={toggleRef} type="button" className="project-case-toggle"
          aria-expanded={expanded} aria-controls={detailsId}
          aria-label={expanded ? `${copy.close} ${project.title}` : `${copy.open} ${project.title}`}
          onClick={() => expanded ? close() : open()}>
          {expanded ? <>{copy.close}<span aria-hidden="true">−</span></> : <>
            <span className="project-help-hover">{copy.hover}</span>
            <span className="project-help-tap">{copy.tap}</span>
            <span className="project-help-phone">{copy.phone}</span>
            <span aria-hidden="true">+</span>
          </>}
        </button>
        <div id={detailsId} className="project-case-details project-case-fold" aria-hidden={!expanded} inert={!expanded}>
          <div>
            <p className="project-case-intro">{content.intro}</p>
            {content.sections.map((section) => <div className="project-case-topic" key={section.title}>
              <h4>{section.title}</h4>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>)}
            <p className="project-case-conclusion">{content.conclusion}</p>
            <button type="button" className="project-case-close" onClick={() => close(true)}>{copy.close}<span aria-hidden="true">↑</span></button>
          </div>
        </div>
        {Boolean(project.technologies?.length) && <ul className="project-case-technologies" aria-label="Technologies">
          {project.technologies!.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>}
        {(project.demoUrl || project.repositoryUrl) && <div className="project-case-links">
          {project.demoUrl && <a href={project.demoUrl}>{copy.visit}<span aria-hidden="true">↗</span></a>}
          {project.repositoryUrl && <a href={project.repositoryUrl}>{copy.source}<span aria-hidden="true">↗</span></a>}
        </div>}
      </div>
    </article>
  );
}
