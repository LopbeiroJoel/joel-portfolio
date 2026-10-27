import { createCompanionJump } from "@/lib/companion-jump";
import { createCompanionFall } from "@/lib/companion-fall";
import { createCompanionScenes } from "@/lib/companion-scenes";
import { createCompanionClicks, type CompanionClickState } from "@/lib/companion-clicks";

type Options = {
  sprite: HTMLDivElement; button: HTMLButtonElement; caption: HTMLSpanElement;
  bottomEdge: HTMLSpanElement; speech: HTMLDivElement; state: CompanionClickState;
  onSection: (section: string) => void;
};

/** José rejoint les repères de lecture puis s’appuie sur le bord du header pour suivre le lecteur. */
export function createReaderGuideMotion({ sprite, button, caption, bottomEdge, speech, state, onSection }: Options) {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const jump = createCompanionJump(sprite);
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  let support: HTMLElement | undefined;
  let x: number | undefined;
  let frame = 0;
  let previousTime = 0;
  let lastSection = "";
  let enteredAt = 0;
  let scrollQuietAt = 0;
  let scrollTimer = 0;
  let hovered = false;

  function headerBounds() {
    const header = document.querySelector("header");
    const logo = header?.querySelector("a")?.getBoundingClientRect();
    const nextControl = Array.from(header?.querySelectorAll("nav a, button") ?? [])
      .map(element => element.getBoundingClientRect())
      .filter(rect => rect.width > 0 && rect.left > (logo?.right ?? 0))
      .sort((a, b) => a.left - b.left)[0];
    const left = (logo?.right ?? 24) + 8;
    return { y: header?.getBoundingClientRect().bottom ?? 80, left, right: Math.max(left, (nextControl?.left ?? left + 120) - 28) };
  }
  function surface(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const header = headerBounds();
    const y = Math.max(header.y, Math.min(innerHeight - 1, rect.top));
    return { left: rect.left + 10, right: rect.right - 30, y, following: rect.top < header.y || rect.top > innerHeight - 1 };
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  const fall = createCompanionFall(sprite, () => {
    support = undefined;
    x = undefined;
    previousTime = 0;
    schedule();
  });
  const clicks = createCompanionClicks({
    sprite, button, caption, state,
    isSettled: () => !!support && !jump.isActive() && !fall.isActive(),
    surface: () => support ? surface(support) : undefined,
    pause: () => { jump.cancel(); fall.dispose(); cancelAnimationFrame(frame); frame = 0; bottomEdge.hidden = true; speech.hidden = true; },
  });
  const disposeScenes = createCompanionScenes(sprite, caption);
  button.disabled = state.departed || state.count >= 3;
  function positionSpeech() {
    speech.hidden = sprite.hidden || performance.now() < scrollQuietAt || !!caption.textContent || clicks.isBusy() || fall.isActive() || state.count >= 3;
    if (speech.hidden) return;
    const actor = sprite.getBoundingClientRect();
    const bubble = speech.getBoundingClientRect();
    const header = headerBounds().y;
    const below = actor.bottom + 10;
    const above = actor.top - bubble.height - 12;
    const placement = below + bubble.height < innerHeight - 12 || above < header + 8 ? "below" : "above";
    const top = Math.max(header + 8, Math.min(innerHeight - bubble.height - 12, placement === "below" ? below : above));
    const left = Math.max(12, Math.min(innerWidth - bubble.width - 12, actor.left - 12));
    speech.dataset.placement = placement;
    speech.style.left = `${left}px`;
    speech.style.top = `${top}px`;
    speech.style.setProperty("--jose-tail", `${Math.max(16, Math.min(bubble.width - 16, actor.left + 10 - left))}px`);
  }

  function update(now: number) {
    frame = 0;
    if (clicks.isBusy() || fall.isActive()) { speech.hidden = true; return; }
    const header = headerBounds();
    const readingLine = header.y + Math.min(140, (innerHeight - header.y) * 0.25);
    let current = sections[0];
    for (const item of sections) {
      if (item.getBoundingClientRect().top <= readingLine) current = item;
      else break;
    }
    const key = current?.id || current?.getAttribute("aria-labelledby")?.replace(/-title$/, "") || "home";
    if (key !== lastSection) { lastSection = key; onSection(key); }
    sprite.dataset.guideStop = key;

    const notes = Array.from(document.querySelectorAll<HTMLElement>(".jose-guide-note"));
    const candidates = notes.filter(note => {
      const y = note.getBoundingClientRect().top;
      return y > header.y + 30 && y < innerHeight - 30;
    });
    const next = candidates.find(note => note.dataset.guideStop === key) ?? candidates[0];
    if (!support?.isConnected) {
      support = next ?? notes.find(note => note.dataset.guideStop === key);
      if (!support) return;
      x = surface(support).left + 4;
      enteredAt = now;
      sprite.hidden = false;
    }

    if (jump.isActive()) { speech.hidden = true; schedule(); return; }
    if (next && next !== support) {
      const a = surface(support), b = surface(next);
      const landingX = Math.max(b.left, Math.min(b.right, x ?? b.left));
      // Une transition visible reste un petit saut, jamais un grand bond à travers la page.
      if (Math.abs(a.y - b.y) <= 110 && Math.abs((x ?? a.left) - landingX) <= 120) {
        const source = support;
        if (motion.matches) { support = next; x = landingX; }
        else {
          jump.start(() => ({ x: x ?? a.left, y: surface(source).y }),
            () => ({ x: landingX, y: surface(next).y }),
            () => { support = next; x = landingX; previousTime = 0; schedule(); });
          schedule();
          return;
        }
      }
    }

    const floor = surface(support);
    let targetX = floor.left + 64;
    if (floor.following) {
      const rect = current?.getBoundingClientRect();
      const progress = rect ? Math.max(0, Math.min(1, (header.y - rect.top) / Math.max(1, rect.height))) : 0;
      targetX = header.left + (header.right - header.left) * progress;
    }
    const elapsed = previousTime ? Math.min(48, now - previousTime) : 16;
    previousTime = now;
    const delta = targetX - (x ?? targetX);
    const walking = Math.abs(delta) > 0.5 && !motion.matches && !hovered;
    if (walking) x = (x ?? targetX) + Math.sign(delta) * Math.min(Math.abs(delta), elapsed * 0.07);
    else if (!hovered) x = targetX;
    sprite.hidden = false;
    sprite.dataset.following = String(floor.following);
    sprite.dataset.section = floor.following ? "home" : key;
    sprite.dataset.pose = walking ? "walk" : "idle";
    sprite.style.opacity = String(motion.matches ? 0.85 : Math.min(0.85, (now - enteredAt) / 180));
    sprite.style.transform = `translate3d(${x}px, ${floor.y - 29}px, 0)`;
    positionSpeech();
    bottomEdge.hidden = floor.y < innerHeight - 1;
    if (walking) schedule();
  }

  function onScroll() {
    scrollQuietAt = performance.now() + 500;
    speech.hidden = true;
    clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(schedule, 520);
    if (clicks.isBusy()) return;
    if (!motion.matches && fall.handleScroll()) {
      jump.cancel();
      delete sprite.dataset.scene;
      bottomEdge.hidden = true;
      speech.hidden = true;
      cancelAnimationFrame(frame);
      frame = 0;
      return;
    }
    schedule();
  }
  const resize = new ResizeObserver(schedule);
  const onEnter = () => { hovered = true; schedule(); };
  const onLeave = () => { hovered = false; previousTime = 0; schedule(); };
  button.addEventListener("pointerenter", onEnter);
  button.addEventListener("pointerleave", onLeave);
  sections.forEach(section => resize.observe(section));
  const changes = new MutationObserver(schedule);
  changes.observe(document.querySelector("main")!, { childList: true, characterData: true, subtree: true });
  changes.observe(caption, { childList: true, characterData: true, subtree: true });
  changes.observe(speech, { childList: true, characterData: true, subtree: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", schedule);
  motion.addEventListener("change", schedule);
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(scrollTimer);
    jump.cancel();
    fall.dispose();
    clicks.dispose();
    disposeScenes();
    resize.disconnect();
    changes.disconnect();
    button.removeEventListener("pointerenter", onEnter);
    button.removeEventListener("pointerleave", onLeave);
    bottomEdge.hidden = true;
    speech.hidden = true;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", schedule);
    motion.removeEventListener("change", schedule);
    delete sprite.dataset.following;
  };
}
