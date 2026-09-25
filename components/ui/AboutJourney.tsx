"use client";
import { useEffect, useRef } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

const stops = [
  { label: "UNIVERSITÉ", x: 100, y: 110, kind: "university" },
  { label: "CASINO", x: 268, y: 110, kind: "casino" },
  { label: "ESGM", x: 100, y: 250, kind: "school" },
  { label: "CRIT", x: 268, y: 250, kind: "office" },
  { label: "EPITECH", x: 100, y: 390, kind: "tech" },
  { label: "CHEZ VOUS", x: 268, y: 390, kind: "future" },
];

export default function AboutJourney() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const figure = ref.current;
    if (!figure) return;
    let visible = false;
    const update = () => { figure.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.15 });
    observer.observe(figure);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <figure className="about-journey" ref={ref} data-running="false">
      <svg viewBox="0 0 400 425" role="img" aria-label={t("Mon parcours : Université, Casino, ESGM, CRIT, EPITECH, puis votre entreprise pour une future alternance.")}>
        <g className="journey-paths" fill="none">
          <path d="M12 110H382M12 250H382M12 390H382" />
          <path className="journey-connection" d="M382 110V140H22V250M382 250V280H22V390" />
        </g>
        {stops.map(({ label, x, y, kind }) => (
          <g key={kind} transform={`translate(${x} ${y})`} className={`journey-building journey-building--${kind}`}>
            <text className="journey-label" x="0" y="-76" textAnchor="middle">{t(label)}</text>
            <g shapeRendering="crispEdges">
              {kind === "office" ? <path className="journey-wall" d="M-38 0V-62H38V0Z" /> : <path className="journey-wall" d="M-28 0V-44H-32V-48H-20V-54H20V-48H32V-44H28V0Z" />}
              <path className="journey-door" d="M-7 0V-22H7V0Z" />
              {kind === "university" ? <path className="journey-detail" d="M-21-37h5v27h-5zM16-37h5v27h-5zM-23-41h46v3h-46z" /> :
                <path className="journey-detail" d="M-20-34h7v7h-7zM13-34h7v7h-7z" />}
              {kind === "office" && <path className="journey-detail" d="M-26-52h8v7h-8zM-4-52h8v7h-8zM18-52h8v7h-8zM-26-16h8v7h-8zM18-16h8v7h-8z" />}
              {kind === "casino" && <path className="journey-detail" d="M-2-43h4v4h4v4H2v4h-4v-4h-4v-4h4z" />}
              {kind === "tech" && <path className="journey-detail" d="M-4-42h-4v8h4v-2h-2v-4h2zM4-42h4v8H4v-2h2v-4H4z" />}
            </g>
            {kind === "future" && <text className="journey-future" x="0" y="20" textAnchor="middle">{t("Future alternance")}</text>}
          </g>
        ))}
        <g className="journey-actor" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M7 1h6v2h2v6h-2v2H7V9H5V3h2zM9 12h3v9H9z" />
          <path className="journey-arm" d="M6 13h3v3H6v4H3v-3h3zM12 13h3v4h3v3h-3v-4h-3z" />
          <path className="journey-step-a" d="M8 21h3v8H5v-3h3zM11 21h4v3h3v3h-5v-3h-2z" />
          <path className="journey-step-b" d="M11 21h3v5h3v3h-6zM7 21h4v3H8v3H3v-3h4z" />
        </g>
      </svg>
      <figcaption>{t("La prochaine étape peut être chez vous.")}</figcaption>
    </figure>
  );
}
