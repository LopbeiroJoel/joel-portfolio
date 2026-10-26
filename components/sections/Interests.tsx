"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { interests } from "@/data/interests";
export default function Interests() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="interests-title" className="section container">
      <SectionHeading
        id="interests-title"
        title="Centres d’intérêt"
      />
      <div className="grid interests-grid">
        {interests.map((interest) => (
          <article
            className="card interest-card"
            key={interest.name}
            tabIndex={0}
          >
            <h3>{t(interest.name)}</h3>
            {interest.description && <p className="muted">{t(interest.description)}</p>}
            {interest.details?.map((detail) => <p className="interest-detail" key={detail}>{t(detail)}</p>)}
            {interest.sections?.map((section) => (
              <div className="interest-sport" key={section.title}>
                <h4>{t(section.title)}</h4>
                <p>{t(section.description)}</p>
              </div>
            ))}
            <div className="interest-art" aria-hidden="true">
              {interest.name === "Poker" ? (
                <div className="playing-cards">
                  <span>
                    A<br />♠
                  </span>
                  <span>
                    A<br />♥
                  </span>
                </div>
              ) : interest.name === "Sport" ? (
                <svg
                  className="sport-art"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="32" cy="12" r="6" />
                  <path
                    className="sport-body"
                    d="M32 22v18m0-13-13-6-8 8m21-2 12 7 9-12M32 40 20 54m12-14 16 5 6 10"
                  />
                  <path stroke="#789883" d="m26 36 12 3m-5-1 5 9" />
                </svg>
              ) : (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M32 51 12 31C-1 18 17 4 32 20 47 4 65 18 52 31Z" />
                </svg>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
