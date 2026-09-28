"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useEffect, useRef, useState } from "react";
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
  const [selectedSection, setSelectedSection] = useState("home");
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const menuIds = new Set(links.map(([id]) => id));
    let frame = 0;
    function measure() {
      frame = 0;
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 80;
      const readingLine = headerBottom + Math.min(100, (innerHeight - headerBottom) * 0.2);
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
        else break;
      }
      const atBottom = Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2;
      setSelectedSection(atBottom ? "contact" : current && menuIds.has(current.id) ? current.id : "");
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(schedule);
    sections.forEach(section => observer.observe(section));
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);
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
              aria-current={selectedSection === id ? "location" : undefined}
              onClick={() => {
                setSelectedSection(id);
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
