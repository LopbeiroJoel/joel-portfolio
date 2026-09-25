/** All props share the original 20 × 30 pixel coordinate system and color. */
export default function CompanionProps() {
  return (
    <g className="companion-props" aria-hidden="true">
      <g className="scene-prop scene-shovel">
        <g className="scene-shovel-tool">
          <path d="M19 10h6v2h-2v12h3v3h-2v2h-4v-2h-2v-3h3V12h-2z" />
        </g>
        <path className="scene-soil" d="M27 27h2v2h-2zM31 25h2v2h-2z" />
      </g>
      <g className="scene-prop scene-book">
        <path d="M2 14h7l2 2 2-2h7v10h-7l-2 2-2-2H2z" />
        <path className="scene-paper" d="M4 16h5v6H4zM13 16h5v6h-5z" />
        <path className="scene-page" d="M12 16h2v7h-2z" />
      </g>
      <g className="scene-prop scene-dumbbell">
        <path d="M16 12h3v9h-3zM19 15h7v3h-7zM26 12h3v9h-3z" />
      </g>
      <g className="scene-prop scene-computer">
        <path d="M17 13h15v11H17zM15 25h19v2H15z" />
        <path className="scene-paper" d="M19 15h11v7H19z" />
        <path className="scene-code" d="M20 17h4v1h-4zM20 19h7v1h-7z" />
        <path className="scene-check" d="M23 7h2v2h2V7h2V5h2v4h-2v2h-4V9h-2z" />
      </g>
      <g className="scene-prop scene-conversation">
        <g className="scene-friend" transform="translate(-29 0)">
          <path d="M7 1h6v2h2v6h-2v2H7V9H5V3h2zM9 12h3v9H9zM6 13h3v3H6v4H3v-3h3zM12 13h3v4h3v3h-3v-4h-3zM7 21h4v4H8v4H4v-3h3zM11 21h3v5h3v3h-5v-4h-1z" />
        </g>
        {['Hello', 'Olá', 'Hola', 'Bonjour'].map((word, index) => (
          <g className={`scene-bubble scene-bubble-${index}`} key={word}>
            <path className="scene-bubble-background" d="M-30-25h58v2h2v18h-2v2H2v4H0v-4h-30v-2h-2v-18h2z" />
            <text x="-1" y="-10" textAnchor="middle">{word}</text>
          </g>
        ))}
      </g>
      <g className="scene-prop scene-certificate">
        <path d="M13 12h12v15H13z" />
        <path className="scene-paper" d="M15 14h8v11h-8z" />
        <path d="M17 16h4v1h-4zM17 19h4v1h-4zM17 22h2v1h-2z" />
      </g>
      <g className="scene-prop scene-poker">
        <path d="M15 12h9v13h-9z" />
        <path className="scene-paper" d="M16 13h7v11h-7z" />
        <path d="M19 16h2v2h1v2h-2v2h-1v-2h-2v-2h2z" />
      </g>
      <g className="scene-prop scene-envelope">
        <path d="M12 15h15v11H12z" />
        <path className="scene-paper" d="M14 17h11v7H14z" />
        <path d="M14 17h2v2h2v2h3v-2h2v-2h2v2h-2v2h-2v2h-3v-2h-2v-2h-2z" />
      </g>
    </g>
  );
}
