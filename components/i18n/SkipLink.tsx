"use client";
import { useLocale } from "./LocaleProvider";
export default function SkipLink() { const {t} = useLocale(); return <a className="skip-link" href="#main-content">{t("Aller au contenu principal")}</a>; }
