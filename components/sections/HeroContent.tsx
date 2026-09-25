"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import { profile } from "@/data/profile";

export default function HeroContent({ hasPhoto, hasCV }: { hasPhoto: boolean; hasCV: boolean }) {
  const { t } = useLocale();
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="hero container"
    >
      <div className="hero-copy">
        <p className="eyebrow">{t("Développement informatique")}</p>
        <h1 id="hero-title">
          <span className="hero-name-line">{t("Joel")}</span>{" "}
          <span className="hero-name-line">{t("Lopes Ribeiro")}<span className="accent">{t(".")}</span>
          </span>
        </h1>
        <p className="hero-role">{t("Developer — Data & AI")}</p>
        <p className="hero-intro">{t("Du développement informatique à la donnée et à l’intelligence artificielle.")}</p>
        <div className="hero-availability">
          <p>{t("Recherche d’alternance · Janvier 2027 · 1 à 3 ans")}</p>
          <p>{t(profile.rhythm)}</p>
        </div>
        <p className="location">{profile.location}</p>
        <div className="actions">
          <a className="button" href="#contact">{t("Me contacter ")}<span aria-hidden="true">↗</span>
          </a>
          {hasCV && (
            <a
              className="button button-secondary"
              href={profile.cvPath}
              download="CV_JOEL_LOPESRIBEIRO.pdf"
            >{t("Télécharger mon CV")}<small aria-hidden="true">PDF ↓</small></a>
          )}
        </div>
      </div>
      <div className="profile-panel">
        {hasPhoto ? (
          <Image
            className="profile-photo"
            src={profile.photoPath}
            alt={t("Portrait de Joel Lopes Ribeiro")}
            width={273}
            height={273}
            sizes="(min-width: 900px) 256px, 180px"
            preload
          />
        ) : (
          <div className="photo-placeholder">
            <span className="initials" aria-hidden="true">{t("JLR")}</span>
          </div>
        )}
      </div>
    </section>
  );
}
