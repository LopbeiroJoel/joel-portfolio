"use client";
import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { translate, type Locale } from "@/lib/i18n";

const storageKey = "portfolio-language";
let memoryLocale: Locale = "fr";
function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "en" || saved === "pt" || saved === "fr" ? saved : memoryLocale;
  } catch { return memoryLocale; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-language-change", callback);
  };
}
function setLocale(locale: Locale) {
  memoryLocale = locale;
  try { localStorage.setItem(storageKey, locale); } catch { /* Private browsing: keep the choice for this visit. */ }
  window.dispatchEvent(new Event("portfolio-language-change"));
}
const LocaleContext = createContext({ locale: "fr" as Locale, setLocale, t: (text: string) => text });
export const useLocale = () => useContext(LocaleContext);
export default function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => "fr" as Locale);
  const value = useMemo(() => ({ locale, setLocale, t: (text: string) => translate(locale, text) }), [locale]);
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-PT" : locale;
    const caption = document.querySelector<HTMLElement>(".companion-caption");
    if (caption?.textContent && caption.dataset.message) caption.textContent = translate(locale, caption.dataset.message);
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", translate(locale, "Portfolio professionnel de Joel Lopes Ribeiro, étudiant en Pré-MSc à EPITECH Strasbourg, orienté développement informatique, Big Data et Intelligence Artificielle."));
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
