"use client";
import { useLocale } from "./LocaleProvider";
const languages = [{ code: "fr", label: "Français" }, { code: "en", label: "English" }, { code: "pt", label: "Português" }] as const;
function Flag({ code }: { code: "fr" | "en" | "pt" }) {
  return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
    {code === "fr" ? <>
      <path fill="#002395" d="M0 0h10v20H0z" /><path fill="#fff" d="M10 0h10v20H10z" /><path fill="#ed2939" d="M20 0h10v20H20z" />
    </> : code === "en" ? <>
      <path fill="#012169" d="M0 0h30v20H0z" />
      <path d="m0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="6" />
      <path d="m0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="2" />
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="7" />
      <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="4" />
    </> : <>
      <defs>
        <clipPath id="locale-brazil-diagonal"><path d="M0 0h22.5l-15 20H0z" /></clipPath>
        <clipPath id="locale-portugal-diagonal"><path d="M22.5 0H30v20H7.5z" /></clipPath>
      </defs>
      <g clipPath="url(#locale-brazil-diagonal)">
      <path fill="#009739" d="M0 0h30v20H0z" /><path fill="#ffdf00" d="m15 2 12 8-12 8L3 10z" />
      <circle cx="15" cy="10" r="5" fill="#002776" /><path d="M10.2 8.5c3.8-.6 6.8.5 9.4 2.3" fill="none" stroke="#fff" strokeWidth=".8" />
      <g fill="#fff"><circle cx="13" cy="11.8" r=".3" /><circle cx="16" cy="12.8" r=".3" /><circle cx="18" cy="11.8" r=".3" /></g>
      </g>
      <g clipPath="url(#locale-portugal-diagonal)">
        <path fill="#006600" d="M0 0h15v20H0z" /><path fill="#ef2929" d="M15 0h15v20H15z" />
        <circle cx="15" cy="10" r="5.3" fill="none" stroke="#ffdd00" strokeWidth="1" />
        <path d="M10 8h10M10 12h10M15 4.7v10.6M11.4 6.1l7.2 7.8M11.4 13.9l7.2-7.8" fill="none" stroke="#ffdd00" strokeWidth=".6" />
        <path fill="#fff" stroke="#c8102e" strokeWidth="1" d="M12 6.8h6v4.1c0 2.2-3 3.2-3 3.2s-3-1-3-3.2z" />
        <g fill="#003399"><circle cx="15" cy="8.4" r=".5" /><circle cx="13.5" cy="10" r=".5" /><circle cx="16.5" cy="10" r=".5" /><circle cx="15" cy="11.6" r=".5" /></g>
      </g>
    </>}
  </svg>;
}
export default function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();
  return <div className="locale-selector" role="group" aria-label={t("Langue du portfolio")}>
    {languages.map(({ code, label }) => <button key={code} type="button" lang={code} aria-label={label} title={label} aria-pressed={locale === code} onClick={() => setLocale(code)}>
      <Flag code={code} />
    </button>)}
  </div>;
}
