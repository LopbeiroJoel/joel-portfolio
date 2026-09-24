export type CompanionClickState = { count: number; departed: boolean };
type Surface = { left: number; right: number; y: number };
type Options = {
  sprite: HTMLDivElement;
  button: HTMLButtonElement;
  caption: HTMLSpanElement;
  state: CompanionClickState;
  isSettled: () => boolean;
  surface: () => Surface | undefined;
  pause: () => void;
};

export function createCompanionClicks({
  sprite,
  button,
  caption,
  state,
  isSettled,
  surface,
  pause,
}: Options) {
  let running = false;
  let disposed = false;
  let textFrame = 0;
  let exitFrame = 0;
  let fade: Animation | undefined;
  const timers = new Set<number>();
  const later = (callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (!disposed) callback();
    }, delay);
    timers.add(id);
    return id;
  };
  let textTimer = 0;

  function followText() {
    textFrame = 0;
    if (!caption.textContent || disposed) return;
    const rect = sprite.getBoundingClientRect();
    const width = caption.getBoundingClientRect().width;
    const left =
      rect.right + width + 12 < innerWidth
        ? rect.right + 9
        : rect.left - width - 9;
    caption.style.left = `${Math.max(8, Math.min(innerWidth - width - 8, left))}px`;
    caption.style.top = `${Math.max(85, Math.min(innerHeight - 28, rect.top - 20))}px`;
    caption.style.visibility = sprite.hidden ? "hidden" : "visible";
    textFrame = requestAnimationFrame(followText);
  }
  function hideText() {
    fade?.cancel();
    fade = caption.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 180,
      fill: "forwards",
    });
    fade.onfinish = () => {
      caption.textContent = "";
      cancelAnimationFrame(textFrame);
      textFrame = 0;
    };
  }
  function say(text: string, duration = 0) {
    clearTimeout(textTimer);
    timers.delete(textTimer);
    fade?.cancel();
    caption.textContent = text;
    caption.style.visibility = "visible";
    fade = caption.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 160,
      fill: "forwards",
    });
    if (!textFrame) followText();
    if (duration) textTimer = later(hideText, duration);
  }

  function depart() {
    if (disposed) return;
    // Attendre une réception plutôt que couper un saut ou une chute en vol.
    if (!isSettled() || sprite.hidden || !surface()) {
      exitFrame = requestAnimationFrame(depart);
      return;
    }
    const initialSurface = surface();
    if (!initialSurface) return;
    const floorSnapshot: Surface = initialSurface;
    running = true;
    pause();
    hideText();
    sprite.style.removeProperty("opacity");
    const initialRect = sprite.getBoundingClientRect();
    const exitDirection = initialRect.left + 10 >= innerWidth / 2 ? 1 : -1;
    const startOffset = initialRect.left - initialSurface.left;
    const started = performance.now();
    let launch = { x: initialRect.left, y: initialRect.top };
    function tick(now: number) {
      const elapsed = now - started;
      const floor = surface() ?? floorSnapshot;
      const startX = floor.left + startOffset;
      const backX = Math.max(
        floor.left,
        Math.min(floor.right, startX - exitDirection * 36),
      );
      const edgeX = exitDirection > 0 ? floor.right : floor.left;
      let x: number, y: number;
      if (elapsed < 300) {
        const t = elapsed / 300;
        x = startX + (backX - startX) * t;
        y = floor.y - 29;
        sprite.dataset.pose = "walk";
        sprite.dataset.interaction = "runup";
      } else if (elapsed < 1000) {
        const t = Math.pow((elapsed - 300) / 700, 1.6);
        x = backX + (edgeX - backX) * t;
        y = floor.y - 29;
        sprite.dataset.pose = "walk";
        sprite.dataset.interaction = "run";
        launch = { x, y };
      } else if (elapsed < 1100) {
        x = edgeX;
        y = floor.y - 29;
        launch = { x, y };
        sprite.dataset.pose = "impulse";
        sprite.dataset.interaction = "launch";
      } else {
        const t = Math.min(1, (elapsed - 1100) / 720);
        const exitX = exitDirection > 0 ? innerWidth + 45 : -65;
        x = launch.x + (exitX - launch.x) * t;
        y = launch.y - 80 * Math.sin(Math.PI * t) + 95 * t * t;
        sprite.dataset.pose = t < 0.5 ? "jump" : "descend";
        sprite.dataset.interaction = "exit";
      }
      sprite.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (elapsed < 1820) exitFrame = requestAnimationFrame(tick);
      else {
        // Masquer seulement une fois entièrement sorti horizontalement de l'écran.
        state.departed = true;
        sprite.dataset.interaction = "gone";
        if (document.activeElement === button)
          document
            .querySelector<HTMLElement>("main")
            ?.focus({ preventScroll: true });
        sprite.hidden = true;
        caption.textContent = "";
        running = false;
      }
    }
    tick(started);
  }

  function onClick(event: MouseEvent) {
    event.stopPropagation();
    if (state.departed || state.count >= 3 || sprite.hidden) return;
    state.count += 1;
    if (state.count === 1) say("Aïe", 2400);
    else if (state.count === 2) say("Arrête, ça fait mal", 2600);
    else {
      button.disabled = true;
      say("Ok...");
      later(() => say("Tu veux jouer ?"), 900);
      later(depart, 2300);
    }
  }
  button.addEventListener("click", onClick);
  return {
    isBusy: () => running || state.departed,
    dispose() {
      disposed = true;
      if (state.count >= 3) state.departed = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(textFrame);
      cancelAnimationFrame(exitFrame);
      if (fade) {
        fade.onfinish = null;
        fade.cancel();
      }
      caption.textContent = "";
      button.removeEventListener("click", onClick);
    },
  };
}
