type Point = { x: number; y: number };

/** Trajectoire recalculée à chaque frame pour rester liée aux supports au scroll. */
export function createCompanionJump(sprite: HTMLDivElement) {
  let frame = 0;
  let active = false;
  return {
    isActive: () => active,
    cancel() {
      cancelAnimationFrame(frame);
      active = false;
    },
    start(
      from: () => Point,
      to: () => Point,
      onLand: () => void,
      entering = false,
    ) {
      cancelAnimationFrame(frame);
      active = true;
      const started = performance.now();
      const origin = from();
      const destination = to();
      const distance = Math.hypot(
        destination.x - origin.x,
        destination.y - origin.y,
      );
      const impulse = entering ? 0 : 75;
      const flight = Math.min(390, 240 + distance * 0.65);
      const landing = 90;
      const height = Math.min(22, 12 + distance * 0.06);
      function tick(now: number) {
        const elapsed = now - started;
        const a = from(),
          b = to();
        let x = a.x,
          y = a.y;
        if (elapsed < impulse) {
          sprite.dataset.pose = "impulse";
        } else if (elapsed < impulse + flight) {
          const t = Math.min(1, (elapsed - impulse) / flight);
          x = a.x + (b.x - a.x) * t;
          y = a.y + (b.y - a.y) * t - 4 * height * t * (1 - t);
          const verticalVelocity = b.y - a.y - 4 * height * (1 - 2 * t);
          sprite.dataset.pose = verticalVelocity < 0 ? "jump" : "descend";
        } else {
          x = b.x;
          y = b.y;
          sprite.dataset.pose = "land";
        }
        sprite.style.transform = `translate3d(${x}px, ${y - 29}px, 0)`;
        if (entering)
          sprite.style.opacity = String(Math.min(0.6, (elapsed / 160) * 0.6));
        if (elapsed < impulse + flight + landing)
          frame = requestAnimationFrame(tick);
        else {
          active = false;
          sprite.style.removeProperty("opacity");
          onLand();
        }
      }
      tick(started);
    },
  };
}
