import CompanionProps from "@/components/ui/CompanionProps";

// Le dessin et les poses pixel-art d’origine sont conservés.
export default function JoseSprite({ withProps = true }: { withProps?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 20 30" width="20" height="30" shapeRendering="crispEdges" fill="currentColor">
    <g className="pixel-standing">
      <path d="M7 1h6v2h2v6h-2v2H7V9H5V3h2zM9 12h3v9H9z" />
      <path className="pixel-arm-left" d="M6 13h3v3H6v4H3v-3h3z" />
      <path className="pixel-arm-right" d="M12 13h3v4h3v3h-3v-4h-3z" />
      <path className="pixel-legs-rest" d="M7 21h4v4H8v4H4v-3h3zM11 21h3v5h3v3h-5v-4h-1z" />
      <path className="pixel-step-a" d="M8 21h3v8H5v-3h3zM11 21h4v3h3v3h-5v-3h-2z" />
      <path className="pixel-step-b" d="M11 21h3v5h3v3h-6zM7 21h4v3H8v3H3v-3h4z" />
    </g>
    <g className="pixel-seated">
      <path d="M7 9h6v2h2v6h-2v2H7v-2H5v-6h2zM9 20h3v7h4v2H8v-2H7v-6h2zM5 21h2v8H4v-2h1zM14 29h3v5h3v2h-6z" />
    </g>
    {withProps && <CompanionProps />}
  </svg>;
}
