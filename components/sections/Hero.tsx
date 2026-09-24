import Image from "next/image";
import { profile } from "@/data/profile";
import { hasPublicAsset } from "@/lib/public-assets";
export default function Hero() {
  const hasPhoto = hasPublicAsset(profile.photoPath);
  const hasCV = hasPublicAsset(profile.cvPath);
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="hero container"
    >
      <div className="hero-copy">
        <p className="eyebrow">
          Développement informatique
        </p>
        <h1 id="hero-title">
          <span className="hero-name-line">Joel</span>{" "}
          <span className="hero-name-line">
            Lopes Ribeiro<span className="accent">.</span>
          </span>
        </h1>
        <p className="hero-role">Developer — Data &amp; AI</p>
        <p className="hero-intro">
          Du développement informatique à la donnée et à l’intelligence artificielle.
        </p>
        <div className="hero-availability">
          <p>Recherche d’alternance · Janvier 2027 · 1 à 3 ans</p>
          <p>{profile.rhythm}</p>
        </div>
        <p className="location">{profile.location}</p>
        <div className="actions">
          <a className="button" href="#contact">
            Me contacter <span aria-hidden="true">↗</span>
          </a>
          {hasCV && (
            <a
              className="button button-secondary"
              href={profile.cvPath}
              download
            >
              Télécharger mon CV
            </a>
          )}
        </div>
      </div>
      <div className="profile-panel">
        {hasPhoto ? (
          <Image
            className="profile-photo"
            src={profile.photoPath}
            alt="Portrait de Joel Lopes Ribeiro"
            width={273}
            height={273}
            sizes="(min-width: 900px) 256px, 180px"
            preload
          />
        ) : (
          <div className="photo-placeholder">
            <span className="initials" aria-hidden="true">
              JLR
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
