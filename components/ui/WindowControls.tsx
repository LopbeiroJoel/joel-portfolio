"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  targetLabel: string;
  onClose: () => void;
  onMinimize: () => void;
  onExpand: () => void;
  expanded: boolean;
  controlsId: string;
};

const copy = {
  fr: { close: "Masquer le projet", minimize: "Réduire le projet", expand: "Agrandir le projet" },
  en: { close: "Hide project", minimize: "Minimize project", expand: "Expand project" },
  pt: { close: "Ocultar o projeto", minimize: "Minimizar o projeto", expand: "Ampliar o projeto" },
};

export default function WindowControls({ targetLabel, onClose, onMinimize, onExpand, expanded, controlsId }: Props) {
  const { locale } = useLocale();
  const labels = copy[locale];
  const actions = [
    { kind: "close", label: labels.close, handler: onClose, path: "m4 4 6 6m0-6-6 6" },
    { kind: "minimize", label: labels.minimize, handler: onMinimize, path: "M3 7h8" },
    { kind: "expand", label: labels.expand, handler: onExpand, path: "M5 3h6v6M11 3l-8 8" },
  ];

  return (
    <div className="window-controls">
      {actions.map(action => <button key={action.kind} type="button"
        className={`window-control window-control--${action.kind}`}
        aria-label={`${action.label} — ${targetLabel}`} title={action.label}
        aria-controls={controlsId} aria-expanded={action.kind === "expand" ? expanded : undefined} onClick={action.handler}>
        <span className="window-control-dot" aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d={action.path} />
          </svg>
        </span>
      </button>)}
    </div>
  );
}
