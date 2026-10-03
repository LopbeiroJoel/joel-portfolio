"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import WindowControls from "@/components/ui/WindowControls";
import type { CompetencyGroup } from "@/types";

const hoverQuery = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";

function Group({ group }: { group: CompetencyGroup }) {
  const { t } = useLocale();
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const suppressHover = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hovered || pinned;

  useEffect(() => {
    const media = window.matchMedia(hoverQuery);
    const onChange = () => {
      setHovered(false);
      suppressHover.current = false;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function close() {
    suppressHover.current = true;
    setPinned(false);
    setHovered(false);
  }

  function open() {
    suppressHover.current = false;
    setPinned(true);
  }

  function toggle() {
    if (expanded) close();
    else open();
  }

  return (
    <div className="competency-group" data-expanded={expanded}
      onPointerMove={(event) => {
        if (!suppressHover.current && event.pointerType === "mouse" && window.matchMedia(hoverQuery).matches) {
          setHovered(true);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        suppressHover.current = false;
      }}
      onClick={(event) => {
        if (!(event.target as Element).closest("button, a") && !window.getSelection()?.toString()) toggle();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close();
          button.current?.focus({ preventScroll: true });
        }
      }}>
      <div className="competency-window-toolbar">
        <WindowControls targetLabel={t(group.title)} onClose={close} onMinimize={close}
          onExpand={open} expanded={expanded} controlsId={`${id}-details`} />
      </div>
      <h4 className="competency-group-heading">
        <button ref={button} type="button" className="competency-group-trigger"
          aria-expanded={expanded} aria-controls={`${id}-details`}
          id={`${id}-trigger`}
          onClick={toggle}>
          <span className="competency-group-title">{t(group.title)}</span>
          <span className="competency-group-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      </h4>
      <div className="competency-group-detail" id={`${id}-details`}
        role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!expanded} inert={!expanded}>
        <div className="competency-group-clip">
          <ul className="competency-group-list">
            {group.skills.map(skill => <li key={skill}>{t(skill)}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CompetencyGroups({ groups, label }: { groups: CompetencyGroup[]; label: string }) {
  const { t } = useLocale();
  return (
    <div className="competency-groups">
      <div className="competency-groups-intro">
        <p className="competency-groups-label">{t(label)}</p>
        <p className="competency-groups-hint">
          <span className="competency-hint-hover">{t("* Survolez une fenêtre pour explorer les compétences associées.")}</span>
          <span className="competency-hint-tap">{t("* Appuyez sur une fenêtre pour explorer les compétences associées.")}</span>
        </p>
      </div>
      <div className="competency-groups-grid" data-columns={groups.length}>
        {groups.map(group => <Group key={group.id} group={group} />)}
      </div>
    </div>
  );
}
