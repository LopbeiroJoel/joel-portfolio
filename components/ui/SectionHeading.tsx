"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { GuideNote } from "@/components/ui/ScrollCompanion";
type Props = { id: string; title: string; eyebrow?: string };
export default function SectionHeading({ id, title, eyebrow }: Props) {
  const { t } = useLocale();
  const section = id.replace(/-title$/, "").replace(/^experiences$/, "experience");
  return (
    <>
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2 id={id} className="section-title-pill">{t(title)}<span className="accent">.</span></h2>
    </div>
    {section !== "skills" && <GuideNote section={section} />}
    </>
  );
}
