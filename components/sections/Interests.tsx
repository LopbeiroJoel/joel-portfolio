import SectionHeading from "@/components/ui/SectionHeading";
import { interests } from "@/data/interests";
export default function Interests() {
  return (
    <section aria-labelledby="interests-title" className="section container">
      <SectionHeading
        id="interests-title"
        title="Centres d’intérêt"
        eyebrow="08 / En dehors des études"
      />
      <div className="grid">
        {interests.map((interest) => (
          <article
            className="card interest-card"
            key={interest.name}
            tabIndex={0}
          >
            <h3>{interest.name}</h3>
            <p className="muted">{interest.description}</p>
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
              ) : (
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
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
