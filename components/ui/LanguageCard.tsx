"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Language } from "@/types";

export default function LanguageCard({ language }: { language: Language }) {
  const { t } = useLocale();
  return (
    <article
      className="card language-card"
      tabIndex={0}
      aria-labelledby={`language-${language.code}`}
    >
      <span
        className="language-greeting"
        lang={language.locale}
        aria-hidden="true"
      >
        {language.greeting}
      </span>
      <div className="language-content">
        <div className="language-card-top">
          <span className="language-code" aria-hidden="true">
            {language.code}
          </span>
          <span className="language-level">{t(language.badge)}</span>
        </div>
        <h3 id={`language-${language.code}`}>{t(language.name)}</h3>
        {language.badge === "NATIF" && <p>{t(language.level)}</p>}
        <div
          className={`language-indicator language-indicator--${language.badge === "NATIF" ? "native" : "b2"}`}
          aria-hidden="true"
        >
          <span />
        </div>
      </div>
    </article>
  );
}
