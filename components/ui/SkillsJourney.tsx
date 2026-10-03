"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { skillStages } from "@/data/skills";
import { journeyCopy, journeyNode, journeyStage } from "@/lib/skills-journey";

export default function SkillsJourney() {
  const { locale, t } = useLocale();
  const copy = journeyCopy[locale];
  const [position, setPosition] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [previewNode, setPreviewNode] = useState<string | null>(null);
  const highlighted = previewNode ?? selectedNode;
  const dragging = useRef(false);
  const id = useId().replace(/:/g, "");
  const activeStage = journeyStage(position);
  const selected = skillStages[activeStage];
  const cursorX = 30 + position * 5.4;
  const nodeId = (stage: number, category: number) => `${stage}-${category}`;

  function explore(value: number) {
    setPosition(Math.max(0, Math.min(100, value)));
    setSelectedNode(null);
    setPreviewNode(null);
  }

  function drag(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    explore(((event.clientX - bounds.left) / bounds.width * 600 - 30) / 5.4);
  }

  function selectNode(stage: number, index: number) {
    setPosition(stage * 50);
    setSelectedNode(nodeId(stage, index));
  }

  return (
    <div className="skills-journey">
      <div className="sj-heading">
        <label className="sj-instruction" htmlFor={`${id}-slider`}>
          <span aria-hidden="true">↔</span> {copy.hint}
        </label>
      </div>
      <div className="sj-layout">
        <div className="sj-chart-column">
          <div className="sj-stages" role="group" aria-label={t("Progression des compétences")}>
            {skillStages.map((stage, index) => (
              <button key={stage.id} type="button" onClick={() => explore(index * 50)} aria-pressed={activeStage === index}>
                <span>{copy.stages[index]}</span>
                <small>{copy.periods[index]}</small>
              </button>
            ))}
          </div>
          <div className="sj-plot">
            <div className="sj-range-wrap">
              <input id={`${id}-slider`} className="sj-range" type="range" min="0" max="100" step="0.1"
                value={position} onChange={(event) => explore(Number(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault(); explore(position + (event.key === "ArrowRight" ? 5 : -5));
                  }
                }}
                aria-label={copy.slider} aria-valuetext={`${copy.stages[activeStage]} — ${copy.periods[activeStage]}`}
                aria-describedby={`${id}-hint`} aria-controls={`${id}-panel`} />
            </div>
            <svg className="sj-graph" viewBox="0 0 600 385" role="group" aria-label={copy.slider}
              onPointerDown={(event) => { if (event.button !== 0) return; dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); drag(event); }}
              onPointerMove={(event) => { if (dragging.current) drag(event); }}
              onPointerUp={(event) => { dragging.current = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
              onPointerCancel={() => { dragging.current = false; }} onLostPointerCapture={() => { dragging.current = false; }}>
              <defs><clipPath id={`${id}-reveal`}><rect width={cursorX} height="385" /></clipPath></defs>
              <g aria-hidden="true">
                {[30, 165, 300, 435, 570].map((x) => <line key={x} className="sj-guide" x1={x} x2={x} y1="15" y2="370" />)}
                {[72, 162, 252, 342].map((y) => <line key={y} className="sj-guide sj-guide-horizontal" x1="30" x2="570" y1={y} y2={y} />)}
                {/* Shared stage connections convey time, not scores or prerequisites. */}
                {[0, 1].map((stageIndex) => skillStages[stageIndex].categories.map((group, index) => {
                  const start = journeyNode(stageIndex, index, skillStages[stageIndex].categories.length);
                  const end = { x: start.x + 270, y: 207 };
                  const path = `M ${start.x} ${start.y} C ${start.x + 95} ${start.y}, ${end.x - 95} ${end.y}, ${end.x} ${end.y}`;
                  const active = highlighted === nodeId(stageIndex, index);
                  return <g key={`${stageIndex}-${group.category}`} className={active ? "sj-connection is-highlighted" : "sj-connection"}>
                    <path className="sj-path-base" d={path} />
                    <path className="sj-path-revealed" d={path} clipPath={`url(#${id}-reveal)`} />
                  </g>;
                }))}
                {skillStages[2].categories.map((group, index) => {
                  const end = journeyNode(2, index, skillStages[2].categories.length);
                  const path = `M 300 207 C 395 207, 475 ${end.y}, 570 ${end.y}`;
                  return <g key={group.category} className={highlighted === nodeId(2, index) ? "sj-connection is-highlighted" : "sj-connection"}>
                    <path className="sj-path-base sj-path-future" d={path} />
                    <path className="sj-path-revealed sj-path-future" d={path} clipPath={`url(#${id}-reveal)`} />
                  </g>;
                })}
                <line className="sj-cursor" x1={cursorX} x2={cursorX} y1="0" y2="370" />
                <circle className="sj-cursor-foot" cx={cursorX} cy="370" r="3" />
              </g>
              {skillStages.map((stage, stageIndex) => stage.categories.map((group, index) => {
                const point = journeyNode(stageIndex, index, stage.categories.length);
                const key = nodeId(stageIndex, index);
                const active = highlighted === key;
                const opacity = stageIndex === 0 ? 1 : Math.min(1, 0.28 + Math.max(0, position - (stageIndex - 1) * 50) / 50 * 0.72);
                return <g key={key} className={`sj-node${active ? " is-highlighted" : ""}${stageIndex === 2 ? " is-future" : ""}`}
                  style={{ opacity: active ? 1 : opacity }} role="button" tabIndex={0} aria-pressed={selectedNode === key}
                  aria-label={`${t(group.category)} — ${copy.stages[stageIndex]}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => selectNode(stageIndex, index)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectNode(stageIndex, index); } }}
                  onMouseEnter={() => setPreviewNode(key)} onMouseLeave={() => setPreviewNode(null)}
                  onFocus={() => setPreviewNode(key)} onBlur={() => setPreviewNode(null)}>
                  <rect className="sj-node-target" x={point.x - 20} y={point.y - 20} width="40" height="40" rx="12" />
                  <circle className="sj-node-halo" cx={point.x} cy={point.y} r="11" />
                  <circle className="sj-node-dot" cx={point.x} cy={point.y} r="4" />
                  <text x={point.x + (stageIndex === 0 ? 14 : stageIndex === 2 ? -14 : 0)} y={point.y + (stageIndex === 1 ? 22 : 4)} textAnchor={stageIndex === 0 ? "start" : stageIndex === 2 ? "end" : "middle"}>{copy.shortNames[stageIndex][index]}</text>
                </g>;
              }))}
            </svg>
          </div>
          <p className="sj-legend" id={`${id}-hint`}><span aria-hidden="true" />{copy.note}</p>
        </div>
        <div className="sj-panel" id={`${id}-panel`}>
          <div className="sj-panel-heading" aria-live="polite" aria-atomic="true">
            <span className={`sj-status${activeStage === 2 ? " is-future" : ""}`}>{copy.stages[activeStage]}</span>
            <h3>{copy.titles[activeStage]}</h3>
            <p>{copy.descriptions[activeStage]}</p>
          </div>
          <ul className="sj-domains" key={selected.id} aria-label={copy.domains}>
            {selected.categories.map((group, index) => {
              const key = nodeId(activeStage, index);
              return <li key={group.category}>
                <button type="button" className={highlighted === key ? "sj-domain is-highlighted" : "sj-domain"}
                  aria-pressed={selectedNode === key} onClick={() => setSelectedNode(selectedNode === key ? null : key)}
                  onMouseEnter={() => setPreviewNode(key)} onMouseLeave={() => setPreviewNode(null)}
                  onFocus={() => setPreviewNode(key)} onBlur={() => setPreviewNode(null)}>
                  <span className="sj-domain-title">{t(group.category)}<span aria-hidden="true">↗</span></span>
                  <span className="sj-domain-skills">{group.skills.map(t).join(" · ")}</span>
                </button>
              </li>;
            })}
          </ul>
          <p className="sj-hover-hint">{copy.hover}</p>
        </div>
      </div>
      <details className="sj-overview">
        <summary>{copy.overview}<span aria-hidden="true">+</span></summary>
        <div className="sj-overview-content">
          {skillStages.map((stage, index) => <section key={stage.id} id={`skills-${stage.id}`} aria-labelledby={`skills-${stage.id}-title`}>
            <h3 id={`skills-${stage.id}-title`}>{copy.titles[index]}</h3>
            <p className="sj-overview-period">{copy.stages[index]} · {copy.periods[index]}</p>
            <p>{copy.descriptions[index]}</p>
            <dl>{stage.categories.map((group) => <div key={group.category}><dt>{t(group.category)}</dt><dd>{group.skills.map(t).join(" · ")}</dd></div>)}</dl>
          </section>)}
        </div>
      </details>
    </div>
  );
}
