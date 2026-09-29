import type { GroupVisual } from "@/types";

/* Small, isolated objects share the portfolio's existing green and line work. */
export default function CompetencyVisual({ visual }: { visual: GroupVisual }) {
  const green = "var(--color-primary)";
  const light = "var(--color-primary-light)";
  const pale = "var(--color-primary-subtle)";
  const paper = "var(--color-white)";
  return (
    <svg className="competency-visual" viewBox="0 0 160 128" fill="none"
      stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      {visual === "safe" && <>
        <path d="M42 20h69l14 10v78H42Z" fill={light} />
        <rect x="30" y="29" width="81" height="79" rx="7" fill={pale} />
        <rect x="39" y="38" width="62" height="60" rx="3" fill={paper} />
        <path d="M39 49h5m-5 37h5M43 108v7m56-7v7" strokeWidth="4" />
        <circle cx="73" cy="66" r="16" fill={pale} />
        <circle cx="73" cy="66" r="5" fill={green} />
        <path d="m73 61 0-8m4 16 7 5m-15-5-7 5" strokeWidth="3" />
        <path d="M92 57v18" strokeWidth="4" />
      </>}
      {visual === "microscope" && <>
        <path d="M89 46c28 8 31 40 6 50" strokeWidth="11" stroke={light} />
        <path d="M89 46c28 8 31 40 6 50" />
        <path d="m76 23 19 10-21 38-19-10Z" fill={pale} />
        <path d="m75 20 23 12 5-9-23-12Z" fill={green} />
        <path d="m59 64-5 9 9 5 5-9" fill={light} />
        <path d="M41 83h48m-32 0v8m22-8v8" strokeWidth="4" />
        <circle cx="96" cy="68" r="8" fill={paper} />
        <circle cx="96" cy="68" r="3" fill={green} />
        <path d="M77 94v11m-25 8h57l-9-9H62Z" fill={pale} />
        <path d="m46 66-5 9" stroke={light} />
      </>}
      {visual === "toolbox" && <>
        <path d="M59 42V28h43v14" strokeWidth="6" stroke={light} />
        <path d="M59 42V28h43v14" />
        <path d="M27 51h105v55H27Z" fill={pale} />
        <path d="m27 51 12-13h83l10 13v25H27Z" fill={green} />
        <path d="M39 89h24m34 0h23" stroke={light} />
        <rect x="71" y="65" width="17" height="24" rx="3" fill={paper} />
        <path d="M77 75h5" />
      </>}
      {visual === "cards" && <>
        <g transform="rotate(-14 66 68)">
          <rect x="35" y="24" width="59" height="83" rx="6" fill={pale} />
          <path d="m62 55-9 13 9 13 9-13Z" fill={green} />
          <path d="m47 34-4 5 4 5 4-5Z" fill={green} />
        </g>
        <g transform="rotate(10 94 67)">
          <rect x="67" y="23" width="58" height="84" rx="6" fill={paper} />
          <path d="M96 49c-5 7-15 12-15 20 0 8 10 10 15 4 5 6 15 4 15-4 0-8-10-13-15-20Zm0 24-5 10h10Z" fill={green} strokeWidth="1" />
          <path d="m77 34 0 9m-3-6 3-4 3 4" />
        </g>
      </>}
      {visual === "shield" && <>
        <path d="m80 17 40 15v32c0 24-19 40-40 50-21-10-40-26-40-50V32Z" fill={pale} />
        <path d="m80 27 30 12v25c0 18-13 32-30 41Z" fill={light} stroke="none" opacity=".55" />
        <rect x="65" y="56" width="30" height="26" rx="5" fill={paper} />
        <path d="M71 56v-7a9 9 0 0 1 18 0v7" strokeWidth="3" />
        <circle cx="80" cy="67" r="2" fill={green} />
        <path d="M80 69v5" />
      </>}
      {visual === "factory" && <>
        <path d="M24 108V65l26-16v16l26-16v59Z" fill={pale} />
        <path d="M82 107V27h20v80" fill={paper} />
        <path d="M111 107V44h24v63" fill={pale} />
        <path d="M82 28c0-10 20-10 20 0m9 16c0-11 24-11 24 0M83 44h18m-18 35h18m11-17h22" />
        <path d="M76 92h13V59h26M36 78h10v11H36Zm20 0h10v11H56Z" fill={light} />
        <path d="M21 109h117M117 107V83h11v24" />
      </>}
      {visual === "control" && <>
        <path d="M34 36H17v39h17m92-39h17v39h-17" fill={pale} />
        <rect x="35" y="26" width="90" height="60" rx="5" fill={paper} />
        <path d="M43 35h43v41H43Z" fill={pale} stroke="none" />
        <path d="m49 65 9-13 10 6 12-15M94 41h22m-22 10h15m-15 10h22m-22 10h10" />
        <path d="M72 86v15m16-15v15M39 102h82l12 10H27Z" fill={pale} />
        <path d="M47 108h57" stroke={light} />
      </>}
      {visual === "blocks" && <>
        <path d="m28 77 29-16 30 16-30 17Zm0 0v22l29 16V94m30-17v22l-30 16" fill={pale} />
        <path d="m76 68 29-16 29 16-29 17Zm0 0v23l29 16V85m29-17v23l-29 16" fill={light} />
        <path d="m52 33 28-16 29 16-29 17Zm0 0v27l28 16V50m29-17v27L80 76" fill={paper} />
        <ellipse cx="73" cy="29" rx="6" ry="3.5" fill={pale} />
        <ellipse cx="87" cy="36" rx="6" ry="3.5" fill={pale} />
        <ellipse cx="99" cy="65" rx="6" ry="3.5" fill={pale} />
        <ellipse cx="51" cy="75" rx="6" ry="3.5" fill={paper} />
      </>}
      {visual === "servers" && <>
        <rect x="27" y="21" width="46" height="82" rx="5" fill={pale} />
        <rect x="88" y="34" width="44" height="69" rx="5" fill={paper} />
        {[34, 53, 72].map(y => <g key={y}><rect x="34" y={y} width="32" height="12" rx="2" fill={paper} /><path d={`M40 ${y+6}h1m7 0h11`} /></g>)}
        {[46, 66].map(y => <g key={y}><rect x="95" y={y} width="30" height="13" rx="2" fill={pale} /><path d={`M101 ${y+6}h1m7 0h9`} /></g>)}
        <path d="M50 103v10h60v-10m-30 10V93" />
        <circle cx="80" cy="113" r="4" fill={green} />
      </>}
      {visual === "drafting" && <>
        <path d="m38 97-7 17m80-17 9 17M37 37l88-12 10 65-88 12Z" fill={pale} />
        <path d="m45 44 72-10 7 49-71 10Z" fill={paper} />
        <path d="m57 54 38-5 3 21-38 5Zm-1 29 39-5m-7-39 6 41" stroke={light} />
        <path d="m107 48 18-29 6 4-18 29-8 7Z" fill={green} />
        <path d="m50 101 62-8" />
        <circle cx="121" cy="93" r="12" fill={paper} />
        <circle cx="121" cy="93" r="4" fill={pale} />
        <path d="M121 76v5m0 24v5m-17-17h5m24 0h5" strokeWidth="3" />
      </>}
      {visual === "finance" && <>
        <rect x="23" y="24" width="92" height="61" rx="5" fill={pale} />
        <path d="M31 33h76v42H31Z" fill={paper} stroke="none" />
        <path d="M40 65V54m14 11V46m14 19V40m14 25V49" stroke={light} strokeWidth="6" />
        <path d="m38 46 18-11 20 5 21-8M62 85v14m-13 3h39" />
        <rect x="95" y="57" width="39" height="53" rx="3" fill={paper} />
        <path d="M103 67h23m-23 10h23m-23 10h23m-23 10h23m-11-21v29" />
      </>}
      {visual === "law" && <>
        <path d="M30 34h45v75H30c-11 0-11-13 0-13h45" fill={pale} />
        <path d="M31 43h30m-30 9h24M29 103h39" stroke={light} />
        <path d="M76 40h57M104 25v73m-17 9h34m-28-9h22" strokeWidth="3" />
        <circle cx="104" cy="34" r="5" fill={paper} />
        <path d="m82 42-12 27h24Zm45 0-12 27h24Z" />
        <path d="M70 69c0 15 24 15 24 0Zm45 0c0 15 24 15 24 0Z" fill={light} />
      </>}
    </svg>
  );
}
