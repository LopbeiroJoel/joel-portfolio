"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillGroup from "@/components/ui/SkillGroup";
import { skillStages } from "@/data/skills";

export default function Skills() {
  const { t } = useLocale();
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
      className="section container"
    >
      <SectionHeading
        id="skills-title"
        title="Compétences"
        eyebrow="04 / Progression"
      />
      <ol
        className="skills-progression"
        aria-label={t("Progression des compétences")}
      >
        <li>
          <a href="#skills-acquired">
            <span className="progression-number">{t("01")}</span>{t("Acquis")}</a>
        </li>
        <li>
          <a href="#skills-in-progress">
            <span className="progression-number">{t("02")}</span>{t("En cours")}</a>
        </li>
        <li>
          <a href="#skills-upcoming">
            <span className="progression-number">{t("03")}</span>{t("Future spécialisation Big Data & IA")}</a>
        </li>
      </ol>
      <div className="skill-stages">
        {skillStages.map((stage) => (
          <section
            key={stage.id}
            id={`skills-${stage.id}`}
            aria-labelledby={`skills-${stage.id}-title`}
            className={`skill-stage skill-stage--${stage.id}`}
          >
            <div className="skill-stage-heading">
              <h3 id={`skills-${stage.id}-title`}>{t(stage.title)}</h3>
              <p>{t(stage.description)}</p>
            </div>
            <div className="skills-cards">
              {stage.categories.map((group) => (
                <SkillGroup
                  key={group.category}
                  group={group}
                  badge={stage.badge}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
