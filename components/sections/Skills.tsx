"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsJourney from "@/components/ui/SkillsJourney";
import { skillsFocus } from "@/data/skills-focus";
import { GuideNote } from "@/components/ui/ScrollCompanion";

export default function Skills() {
  const { locale } = useLocale();
  const focus = skillsFocus[locale];
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-title" className="section container">
      <SectionHeading id="skills-title" title="Compétences" />
      <div className="skills-focus">
        <span className="skills-focus-period">{focus.period}</span>
        <h3>{focus.title}</h3>
        <p>{focus.introduction}</p>
        <div className="skills-goals">
          {focus.goals.map(goal => <div key={goal.title}>
            <h4>{goal.title}</h4>
            <p>{goal.purpose}</p>
            <span>{goal.technologies}</span>
          </div>)}
        </div>
      </div>
      <GuideNote section="skills" />
      <SkillsJourney />
    </section>
  );
}
