"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import Navigation from "./Navigation";
export default function Header() {
  const { t } = useLocale();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label={t("Joel Lopes Ribeiro — Accueil")}
        >{t("JLR")}<span aria-hidden="true">{t(".")}</span>
        </a>
        <div className="header-tools"><Navigation /><LanguageSelector /></div>
      </div>
    </header>
  );
}
