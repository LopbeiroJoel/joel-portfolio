"use client";
import { useLocale } from "./LocaleProvider";
const languages = [{ code: "fr", label: "Français" }, { code: "en", label: "English" }, { code: "pt", label: "Português" }] as const;
export default function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();
  return <div className="locale-selector" role="group" aria-label={t("Langue du portfolio")}>
    {languages.map(({ code, label }) => <button key={code} type="button" lang={code} aria-label={label} aria-pressed={locale === code} onClick={() => setLocale(code)}>{code.toUpperCase()}</button>)}
  </div>;
}
