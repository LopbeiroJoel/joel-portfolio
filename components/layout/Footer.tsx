"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { profile } from "@/data/profile";
export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>{profile.name} · {t("Digital Resume")}</p>
        <a href="#home">{t("Retour en haut ↑")}</a>
      </div>
    </footer>
  );
}
