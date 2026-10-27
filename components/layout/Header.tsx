"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import JoseSprite from "@/components/ui/JoseSprite";
import ThemeToggle from "./ThemeToggle";
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
        >
          <span className="brand-jose" aria-hidden="true"><JoseSprite withProps={false} /></span>
          <span className="brand-name"><span>Joel</span><span>Lopes Ribeiro</span></span>
        </a>
        <div className="header-tools"><Navigation /><div className="header-controls"><LanguageSelector /><ThemeToggle /></div></div>
      </div>
    </header>
  );
}
