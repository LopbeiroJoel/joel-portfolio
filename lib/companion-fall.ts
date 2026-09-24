/**
 * Easter egg déclenché uniquement par un défilement descendant rapide
 * après une interaction molette/tactile. Les ancres ne le déclenchent pas.
 */
export function createCompanionFall(
  sprite: HTMLDivElement,
  resume: () => void,
) {
  const samples: { time: number; distance: number }[] = [];
  const sampleWindow = 140;
  const speedThreshold = 5; // pixels par milliseconde : >700 px en 140 ms
  const cooldown = 5000;
  let lastY = window.scrollY;
  let inputAt = -Infinity;
  let touchY = 0;
  let active = false;
  let allowedAt = 0;
  let returnTimer = 0;
  let animation: Animation | undefined;

  const onWheel = (event: WheelEvent) => {
    if (event.deltaY > 0 && event.isTrusted) inputAt = performance.now();
  };
  const onTouchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
  };
  const onTouchMove = (event: TouchEvent) => {
    const nextY = event.touches[0]?.clientY ?? touchY;
    if (nextY < touchY && event.isTrusted) inputAt = performance.now();
    touchY = nextY;
  };
  const clearIntent = () => {
    inputAt = -Infinity;
    samples.length = 0;
  };
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("click", clearIntent, true);
  window.addEventListener("keydown", clearIntent, true);

  function start(now: number) {
    active = true;
    allowedAt = now + cooldown;
    samples.length = 0;
    const rect = sprite.getBoundingClientRect();
    const centerX = window.innerWidth * 0.52;
    const middleY = window.innerHeight * 0.35;
    sprite.dataset.pose = "fall";
    animation = sprite.animate(
      [
        {
          transform: `translate3d(${rect.left}px, ${rect.top}px, 0) rotate(0deg)`,
          opacity: 0.6,
        },
        {
          offset: 0.2,
          transform: `translate3d(${centerX}px, ${middleY}px, 0) rotate(-10deg)`,
          opacity: 0.6,
        },
        {
          offset: 0.85,
          transform: `translate3d(${centerX}px, ${window.innerHeight - 30}px, 0) rotate(12deg)`,
          opacity: 0.5,
        },
        {
          transform: `translate3d(${centerX}px, ${window.innerHeight + 45}px, 0) rotate(18deg)`,
          opacity: 0,
        },
      ],
      { duration: 760, easing: "ease-in", fill: "forwards" },
    );
    animation.onfinish = () => {
      sprite.hidden = true;
      animation?.cancel();
      sprite.dataset.pose = "idle";
      returnTimer = window.setTimeout(() => {
        active = false;
        lastY = window.scrollY;
        resume();
      }, 400);
    };
  }

  return {
    isActive: () => active,
    handleScroll() {
      const now = performance.now();
      const distance = window.scrollY - lastY;
      lastY = window.scrollY;
      if (active) return true;
      if (distance <= 0 || now - inputAt > 500) {
        samples.length = 0;
        return false;
      }
      samples.push({ time: now, distance });
      while (samples.length && samples[0].time < now - sampleWindow)
        samples.shift();
      const speed =
        samples.reduce((total, sample) => total + sample.distance, 0) /
        sampleWindow;
      if (!sprite.hidden && now >= allowedAt && speed > speedThreshold) {
        start(now);
        return true;
      }
      return false;
    },
    dispose() {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", clearIntent, true);
      window.removeEventListener("keydown", clearIntent, true);
      clearTimeout(returnTimer);
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
      }
      sprite.dataset.pose = "idle";
    },
  };
}
