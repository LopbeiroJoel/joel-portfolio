"use client";

import { useId, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import CompetencyVisual from "@/components/ui/CompetencyVisual";
import type { CompetencyGroup } from "@/types";

const hoverQuery = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";

function Group({ group }: { group: CompetencyGroup }) {
  const { t } = useLocale();
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hovered || pinned;

  return (
    <div className="competency-group" data-expanded={expanded}
      onPointerLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setPinned(false);
          setHovered(false);
          button.current?.focus({ preventScroll: true });
        }
      }}>
      <h4 className="competency-group-heading">
        <button ref={button} type="button" className="competency-group-trigger"
          aria-expanded={expanded} aria-controls={`${id}-details`}
          id={`${id}-trigger`}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse" && window.matchMedia(hoverQuery).matches) {
              setHovered(true);
            }
          }}
          onClick={() => {
            setPinned(!expanded);
            setHovered(false);
          }}>
          <CompetencyVisual visual={group.visual} />
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
          <span className="competency-hint-hover">{t("* Survolez chaque visuel pour découvrir le détail")}</span>
          <span className="competency-hint-tap">{t("* Appuyez sur chaque visuel pour découvrir le détail")}</span>
        </p>
      </div>
      <div className="competency-groups-grid" data-columns={groups.length}>
        {groups.map(group => <Group key={group.id} group={group} />)}
      </div>
    </div>
  );
}
