"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useRef, useState } from "react";
const links = [
  ["home", "Accueil"],
  ["about", "À propos"],
  ["experience", "Expériences"],
  ["education", "Formation"],
  ["skills", "Compétences"],
  ["projects", "Projets"],
  ["contact", "Contact"],
];
export default function Navigation() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <nav
      aria-label={t("Navigation principale")}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {t(open ? "Fermer le menu" : "Ouvrir le menu")}
      </button>
      <ul id="main-navigation" className={`nav-links${open ? " is-open" : ""}`}>
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() => {
                setOpen(false);
                document.getElementById(id)?.focus({ preventScroll: true });
              }}
            >
              {t(label)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
