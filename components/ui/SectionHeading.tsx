"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
type Props = { id: string; title: string; eyebrow?: string };
export default function SectionHeading({ id, title, eyebrow }: Props) {
  const { t } = useLocale();
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2 id={id}>{t(title)}</h2>
    </div>
  );
}
