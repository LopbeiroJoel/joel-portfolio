"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { profile, socialLinks } from "@/data/profile";
export default function Contact() {
  const { t } = useLocale();
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section container"
    >
      <SectionHeading
        id="contact-title"
        title="Contact"
        eyebrow="09 / Échangeons"
      />
      <div className="contact-grid">
        <div>
          <p className="contact-intro">{t("Pour échanger sur une alternance en développement informatique.")}</p>
          <address>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.phoneHref}>{profile.phone}</a>
            <span>{t("Saint-Louis, France")}</span>
          </address>
          <ul className="social-links">
            {socialLinks.map((link) => (
              <li key={link.label}>
                {link.url ? (
                  <a href={link.url}>{link.label}</a>
                ) : (
                  <span className="muted">{t("[")}{link.label}{t("à ajouter]")}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="actions">
            <a
              className="button button-secondary"
              href={profile.cvPath}
              download="CV_JOEL_LOPESRIBEIRO.pdf"
            >
              {t("Télécharger mon CV")}<small aria-hidden="true">PDF ↓</small>
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
