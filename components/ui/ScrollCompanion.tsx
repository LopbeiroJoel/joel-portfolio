"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import CompanionProps from "@/components/ui/CompanionProps";
import { followGuide, readerGuide } from "@/lib/reader-guide";
import { createReaderGuideMotion } from "@/lib/reader-guide-motion";
import { createFreeCompanionMotion } from "@/lib/companion-free-motion";
import type { CompanionClickState } from "@/lib/companion-clicks";

const labels = {
  fr: { invite: "José peut vous guider.", optIn: "Oui, je veux que José me guide", hint: "Il vous accompagne et explique chaque section, à votre rythme.", title: "Le conseil de José", stop: "Arrêter le guide", interact: "Interagir avec José", ask: "Comment vous appelez-vous ?", name: "Votre prénom", start: "Commencer la visite", privacy: "Votre prénom reste uniquement dans cette page, le temps de la visite.", empty: "Indiquez votre prénom pour commencer.", hello: (name: string) => `Bonjour ${name} !` },
  en: { invite: "Let José guide you.", optIn: "Yes, I’d like José to guide me", hint: "He follows along and explains each section, at your own pace.", title: "José’s tip", stop: "Stop the guide", interact: "Interact with José", ask: "What’s your name?", name: "Your first name", start: "Start the tour", privacy: "Your first name stays on this page for this visit only.", empty: "Enter your first name to begin.", hello: (name: string) => `Hello ${name}!` },
  pt: { invite: "O José pode guiar a visita.", optIn: "Sim, quero que o José me guie", hint: "Acompanha a leitura e explica cada secção, ao seu ritmo.", title: "A dica do José", stop: "Parar o guia", interact: "Interagir com o José", ask: "Como se chama?", name: "O seu primeiro nome", start: "Começar a visita", privacy: "O seu nome fica apenas nesta página durante a visita.", empty: "Indique o seu nome para começar.", hello: (name: string) => `Olá ${name}!` },
};

type GuideState = {
  enabled: boolean; requested: boolean; setRequested: (value: boolean) => void;
  start: (name: string) => void; visitorName: string; section: string; overviewOpen: boolean;
};
const GuideContext = createContext<GuideState | null>(null);
function useGuide() {
  const value = useContext(GuideContext);
  if (!value) throw new Error("José needs his guide provider.");
  return value;
}

// Le dessin et les poses pixel-art d’origine sont conservés.
function JoseSprite() {
  return <svg aria-hidden="true" viewBox="0 0 20 30" width="20" height="30" shapeRendering="crispEdges" fill="currentColor">
    <g className="pixel-standing">
      <path d="M7 1h6v2h2v6h-2v2H7V9H5V3h2zM9 12h3v9H9z" />
      <path className="pixel-arm-left" d="M6 13h3v3H6v4H3v-3h3z" />
      <path className="pixel-arm-right" d="M12 13h3v4h3v3h-3v-4h-3z" />
      <path className="pixel-legs-rest" d="M7 21h4v4H8v4H4v-3h3zM11 21h3v5h3v3h-5v-4h-1z" />
      <path className="pixel-step-a" d="M8 21h3v8H5v-3h3zM11 21h4v3h3v3h-5v-3h-2z" />
      <path className="pixel-step-b" d="M11 21h3v5h3v3h-6zM7 21h4v3H8v3H3v-3h4z" />
    </g>
    <g className="pixel-seated">
      <path d="M7 9h6v2h2v6h-2v2H7v-2H5v-6h2zM9 20h3v7h4v2H8v-2H7v-6h2zM5 21h2v8H4v-2h1zM14 29h3v5h3v2h-6z" />
    </g>
    <CompanionProps />
  </svg>;
}

export function GuidePreference() {
  const guide = useGuide();
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const copy = labels[locale];
  return <div className="jose-guide-preference" data-active={guide.enabled}>
      <p className="jose-guide-invite-title">{copy.invite}</p>
      <label htmlFor="jose-guide-opt-in">
        <input id="jose-guide-opt-in" type="checkbox" checked={guide.requested} onChange={event => {
          guide.setRequested(event.target.checked);
          if (event.target.checked) requestAnimationFrame(() => {
            document.getElementById("jose-visitor-name")?.focus();
          });
        }} />
        <span>{copy.optIn}</span>
      </label>
      <p className="jose-guide-hint">{copy.hint}</p>
      {guide.requested && !guide.enabled && <form className="jose-name-form" onSubmit={event => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("visitorName") as HTMLInputElement;
        const cleanName = name.trim().replace(/\s+/g, " ").slice(0, 40);
        if (!cleanName) { input.setCustomValidity(copy.empty); input.reportValidity(); return; }
        guide.start(cleanName);
        requestAnimationFrame(() => document.querySelector('.jose-guide-note[data-guide-stop="home"]')?.scrollIntoView({
          block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        }));
      }}>
        <p>{copy.ask}</p>
        <label htmlFor="jose-visitor-name">{copy.name}</label>
        <div className="jose-name-fields">
          <input id="jose-visitor-name" name="visitorName" autoComplete="given-name" maxLength={40} required value={name}
            onChange={event => { event.target.setCustomValidity(""); setName(event.target.value); }} />
          <button type="submit">{copy.start}<span aria-hidden="true"> →</span></button>
        </div>
        <small>{copy.privacy}</small>
      </form>}
  </div>;
}

/** Le petit repère réserve la place de la bulle à l’entrée de chaque section. */
export function GuideNote({ section }: { section: string }) {
  const guide = useGuide();
  if (!guide.enabled) return null;
  return <div className="jose-guide-note" data-guide-stop={section} data-current={guide.section === section} aria-hidden="true" />;
}

export default function ScrollCompanion({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [requested, setRequested] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [section, setSection] = useState("home");
  const [overviewOpen, setOverviewOpen] = useState(false);
  const spriteRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const clickState = useRef<CompanionClickState>({ count: 0, departed: false });
  const stepKey = overviewOpen && (section === "skills" || section === "projects") ? `${section}Complete` : section;
  const step = readerGuide[locale][stepKey] ?? readerGuide[locale].home;

  function requestGuide(value: boolean) {
    setRequested(value);
    if (!value) setEnabled(false);
  }
  function startGuide(name: string) {
    if (clickState.current.departed || clickState.current.count >= 3) {
      clickState.current.count = 0;
      clickState.current.departed = false;
    }
    setVisitorName(name);
    setEnabled(true);
  }

  useEffect(() => {
    const overview = document.getElementById("skills-overview");
    function update() { setOverviewOpen(overview instanceof HTMLDetailsElement && overview.open); }
    overview?.addEventListener("toggle", update);
    update();
    return () => overview?.removeEventListener("toggle", update);
  }, []);

  useEffect(() => {
    if (!spriteRef.current || !buttonRef.current || !captionRef.current || !edgeRef.current) return;
    const elements = { sprite: spriteRef.current, button: buttonRef.current, caption: captionRef.current, state: clickState.current };
    elements.button.disabled = elements.state.departed || elements.state.count >= 3;
    if (!elements.state.departed && elements.state.count < 3) delete elements.sprite.dataset.interaction;
    if (!enabled) return createFreeCompanionMotion(elements);
    if (!speechRef.current) return;
    return createReaderGuideMotion({ ...elements, bottomEdge: edgeRef.current, speech: speechRef.current, onSection: setSection });
  }, [enabled]);

  return <GuideContext.Provider value={{ enabled, requested, setRequested: requestGuide, start: startGuide, visitorName, section, overviewOpen }}>
    {children}
    <div ref={spriteRef} className="scroll-companion jose-moving-guide" data-guided={enabled} hidden data-pose="idle">
      <button ref={buttonRef} type="button" className="companion-hitbox" aria-label={labels[locale].interact}><JoseSprite /></button>
    </div>
    <span ref={captionRef} className="companion-caption" role="status" aria-live="polite" aria-atomic="true" />
    <span ref={edgeRef} className="jose-follow-edge" aria-hidden="true" hidden />
    {enabled && <div ref={speechRef} className="jose-speech" aria-label={labels[locale].title} hidden>
      <span className="jose-speech-name">José</span>
      <button type="button" className="jose-speech-stop" aria-label={labels[locale].stop} onClick={() => requestGuide(false)}><span aria-hidden="true">×</span></button>
      <div key={`${locale}-${stepKey}`} className="jose-speech-copy">
        {section === "home" && <p className="jose-speech-hello">{labels[locale].hello(visitorName)}</p>}
        <p>{step.message}</p>
        <a href={`#${step.target}`} onClick={event => { event.preventDefault(); followGuide(step.target); }}>{step.action}<span aria-hidden="true"> →</span></a>
      </div>
    </div>}
  </GuideContext.Provider>;
}
