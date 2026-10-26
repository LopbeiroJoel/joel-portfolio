"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import ContactForm from "@/components/ui/ContactForm";
import { profile, socialLinks } from "@/data/profile";
export default function Contact() {
  const { t } = useLocale();
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="contact-panel"
    >
      <div className="container contact-panel-grid">
        <div className="contact-panel-copy">
          <p className="eyebrow">{t("À partir de janvier 2027")}</p>
          <h2 id="contact-title">
            <span>{t("Et si la suite")}</span>
            <span>{t("se construisait")}</span>
            <span>{t("ensemble ?")}</span>
          </h2>
          <p className="contact-intro">{t("Pour échanger sur une alternance ou un stage de 6 mois en développement informatique.")}</p>
          <address>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.phoneHref}>{profile.phone}</a>
            <span>{t(profile.location)}</span>
          </address>
          <ul className="social-links">
            {socialLinks.map((link) => (
              <li key={link.label}>
                {link.url ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
                ) : (
                  <span className="muted">{t("[")}{link.label}{t("à ajouter]")}</span>
                )}
              </li>
            ))}
            <li>
              <a href={profile.cvPath} download="CV_JOEL_LOPESRIBEIRO.pdf">{t("Mon CV")} ↓</a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
