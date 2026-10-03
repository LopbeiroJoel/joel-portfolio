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
  fr: { close: "Fermer le détail", minimize: "Réduire la fenêtre", expand: "Afficher toutes les informations" },
  en: { close: "Close details", minimize: "Minimize window", expand: "Show all information" },
  pt: { close: "Fechar os detalhes", minimize: "Minimizar a janela", expand: "Mostrar todas as informações" },
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
        aria-controls={controlsId} aria-expanded={expanded} onClick={action.handler}>
        <span className="window-control-dot" aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d={action.path} />
          </svg>
        </span>
      </button>)}
    </div>
  );
}
