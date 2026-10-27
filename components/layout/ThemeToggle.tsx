"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { isDarkTheme, setTheme, subscribeTheme } from "@/lib/theme";

const labels = {
  fr: { dark: "Passer au mode sombre", light: "Passer au mode clair" },
  en: { dark: "Switch to dark mode", light: "Switch to light mode" },
  pt: { dark: "Ativar o modo escuro", light: "Ativar o modo claro" },
};

export default function ThemeToggle() {
  const { locale } = useLocale();
  const dark = useSyncExternalStore(subscribeTheme, isDarkTheme, () => false);
  const label = dark ? labels[locale].light : labels[locale].dark;
  return <button className="theme-toggle" type="button" aria-label={label} title={label} aria-pressed={dark}
    onClick={() => setTheme(dark ? "light" : "dark")}>
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></>
        : <path d="M20.7 13.1A8.7 8.7 0 0 1 10.9 3.3a8.7 8.7 0 1 0 9.8 9.8Z" />}
    </svg>
  </button>;
}
