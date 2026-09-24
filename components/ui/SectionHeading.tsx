type Props = { id: string; title: string; eyebrow?: string };
export default function SectionHeading({ id, title, eyebrow }: Props) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
    </div>
  );
}
