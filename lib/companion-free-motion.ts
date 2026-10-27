import { createCompanionScenes } from "@/lib/companion-scenes";
import { createCompanionFall } from "@/lib/companion-fall";
import { createCompanionJump } from "@/lib/companion-jump";
import { createCompanionClicks, type CompanionClickState } from "@/lib/companion-clicks";

type Support = { element: HTMLElement; edge: "top" | "bottom" };
type Options = { sprite: HTMLDivElement; button: HTMLButtonElement; caption: HTMLSpanElement; state: CompanionClickState };

// Comportement d’origine hors visite guidée : parcours, scènes, chute et clics.
export function createFreeCompanionMotion({ sprite, button, caption, state }: Options) {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function configure() {
      dispose();
      sprite.hidden = true;
      sprite.style.removeProperty("opacity");
      if (motion.matches || state.departed) return;
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("main .section, main .card, #home .profile-panel"),
      );
      const supports: Support[] = elements.flatMap((element) => {
        const style = getComputedStyle(element);
        const edges: Support[] = [];
        if (parseFloat(style.borderTopWidth) > 0)
          edges.push({ element, edge: "top" });
        if (element.matches(".card") && parseFloat(style.borderBottomWidth) > 0)
          edges.push({ element, edge: "bottom" });
        return edges;
      });
      let support: Support | undefined;
      let frame = 0;
      let lastScroll = -Infinity;
      let previousFrame = 0;
      let supportSince = 0;
      let followUntil = 0;
      let walkOffset = 40;
      let direction = 1;
      let walkMin = 40;
      let walkMax = 96;
      let hasAppeared = false;
      let allowReturn = false;
      let scrollDirection = 1;
      let previousScroll = window.scrollY;
      const jump = createCompanionJump(sprite);
      const fall = createCompanionFall(sprite, () => {
        support = undefined;
        allowReturn = true;
        measure(true);
      });

      const clicks = createCompanionClicks({
        sprite,
        button,
        caption,
        state: state,
        isSettled: () => !jump.isActive() && !fall.isActive() && !!support,
        surface: () => (support ? surface(support) : undefined),
        pause: () => {
          jump.cancel();
          fall.dispose();
          cancelAnimationFrame(frame);
          frame = 0;
        },
      });
      const disposeScenes = createCompanionScenes(sprite, caption);

      function surface(item: Support) {
        const rect = item.element.getBoundingClientRect();
        return {
          left: rect.left + 20,
          right: rect.right - 40,
          y: item.edge === "top" ? rect.top : rect.bottom - 1,
        };
      }
      function position(item: Support, offset = walkOffset) {
        const rect = item.element.getBoundingClientRect();
        const bounds = surface(item);
        return {
          x: Math.max(bounds.left, Math.min(bounds.right, rect.right - offset)),
          y: bounds.y,
        };
      }
      function labelSupport(item: Support) {
        const section = item.element.closest('main > section');
        sprite.dataset.section = section?.id || section?.getAttribute('aria-labelledby')?.replace('-title', '') || '';
        sprite.dataset.supportIndex = String(elements.indexOf(item.element));
        sprite.dataset.supportEdge = item.edge;
      }
      function paint(now: number) {
        if (!support || clicks.isBusy() || fall.isActive() || jump.isActive())
          return;
        const elapsed = previousFrame ? Math.min(now - previousFrame, 48) : 16;
        previousFrame = now;
        const walking = now - lastScroll < 700;
        if (walking) {
          walkOffset += direction * elapsed * 0.032;
          if (walkOffset >= walkMax || walkOffset <= walkMin) {
            walkOffset = Math.max(walkMin, Math.min(walkMax, walkOffset));
            direction *= -1;
          }
        }
        const point = position(support);
        sprite.style.transform = `translate3d(${point.x}px, ${point.y - 29}px, 0)`;
        sprite.dataset.pose = walking
          ? "walk"
          : support.element.matches(".card")
            ? "sit"
            : "idle";
        labelSupport(support);
        if ((walking || now < followUntil) && !frame)
          frame = requestAnimationFrame(animate);
      }
      function animate(now: number) {
        frame = 0;
        paint(now);
      }

      function travel(target: Support, entering = false) {
        cancelAnimationFrame(frame);
        frame = 0;
        const source = support;
        const originOffset = walkOffset;
        const currentX = source
          ? position(source).x
          : position(target, 64).x - 12;
        const bounds = surface(target);
        const landingX = Math.max(
          bounds.left,
          Math.min(bounds.right, currentX + 18 * direction),
        );
        const landingOffset =
          target.element.getBoundingClientRect().right - landingX;
        const destination = () => position(target, landingOffset);
        const origin = source
          ? () => position(source, originOffset)
          : () => {
              const point = destination();
              return { x: point.x - 12, y: point.y - 20 };
            };
        sprite.hidden = false;
        hasAppeared = true;
        labelSupport(target);
        jump.start(
          origin,
          destination,
          () => {
            support = target;
            supportSince = performance.now();
            walkOffset = landingOffset;
            walkMin = Math.max(40, landingOffset - 28);
            walkMax = Math.max(walkMin + 24, landingOffset + 28);
            lastScroll = performance.now();
            // Reprise sans recalage : la marche démarre au point exact de réception.
            paint(lastScroll);
          },
          entering,
        );
      }

      function measure(isScroll: boolean) {
        if (clicks.isBusy() || fall.isActive() || jump.isActive()) return;
        const now = performance.now();
        if (isScroll) lastScroll = now;
        const headerBottom =
          document.querySelector("header")?.getBoundingClientRect().bottom ??
          80;
        const visible = (item: Support) => {
          const point = surface(item);
          return point.y >= headerBottom + 32 && point.y <= innerHeight + 8;
        };
        const candidates = supports.filter(visible);
        if (window.scrollY < 40) {
          // L'accueil ajoute uniquement une pose calme, posée sur le cadre existant.
          const home = candidates.find((item) => item.element.matches('#home .profile-panel'));
          if (home) {
            support = home;
            sprite.hidden = false;
            paint(now);
            return;
          }
          sprite.hidden = true;
          support = undefined;
          return;
        }
        if (support) {
          const current = position(support);
          // Seuls les petits écarts sont franchis, pas de bonds entre blocs éloignés.
          const nearby = candidates
            .filter((candidate) => {
              if (candidate === support) return false;
              const target = surface(candidate);
              const dx = Math.max(
                target.left - current.x,
                current.x - target.right,
                0,
              );
              const dy = target.y - current.y;
              return (
                dx <= 110 && dy * scrollDirection > 8 && dy >= -80 && dy <= 135
              );
            })
            .sort(
              (a, b) =>
                Math.abs(surface(a).y - current.y) -
                Math.abs(surface(b).y - current.y),
            );
          const next = nearby[0];
          const nearExit =
            current.y < headerBottom + 70 || current.y > innerHeight - 45;
          if (
            next &&
            (nearExit ||
              (now - supportSince > 950 &&
                Math.abs(surface(next).y - innerHeight * 0.62) + 12 <
                  Math.abs(current.y - innerHeight * 0.62)))
          ) {
            travel(next);
            return;
          }
          if (current.y >= headerBottom - 8 && current.y <= innerHeight + 36) {
            sprite.hidden = false;
            paint(now);
            return;
          }
          // Le support et le personnage ont quitté l'écran ensemble.
          sprite.hidden = true;
          support = undefined;
          cancelAnimationFrame(frame);
          frame = 0;
        }
        // Après une sortie d'écran, revenir sur une surface qui entre à son tour.
        const arrivals =
          hasAppeared && !allowReturn
            ? candidates.filter((item) => {
                const y = surface(item).y;
                return scrollDirection > 0
                  ? y > innerHeight - 95
                  : y < headerBottom + 95;
              })
            : candidates;
        const target = arrivals.sort(
          (a, b) =>
            Math.abs(surface(a).y - innerHeight * 0.62) -
            Math.abs(surface(b).y - innerHeight * 0.62),
        )[0];
        if (target) {
          allowReturn = false;
          travel(target, true);
        } else sprite.hidden = true;
      }

      const onScroll = () => {
        if (clicks.isBusy()) return;
        const delta = window.scrollY - previousScroll;
        if (delta) scrollDirection = Math.sign(delta);
        previousScroll = window.scrollY;
        if (fall.handleScroll()) {
          jump.cancel();
          cancelAnimationFrame(frame);
          frame = 0;
          return;
        }
        measure(true);
      };
      const onResize = () => measure(false);
      const onSupportMotion = (event: Event) => {
        if (event.currentTarget !== support?.element) return;
        followUntil = performance.now() + 300;
        paint(performance.now());
      };
      elements.forEach((item) => {
        item.addEventListener("pointerenter", onSupportMotion);
        item.addEventListener("pointerleave", onSupportMotion);
      });
      const observer = new ResizeObserver(onResize);
      elements.forEach((item) => observer.observe(item));
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      measure(false);
      dispose = () => {
        disposeScenes();
        clicks.dispose();
        jump.cancel();
        fall.dispose();
        cancelAnimationFrame(frame);
        observer.disconnect();
        elements.forEach((item) => {
          item.removeEventListener("pointerenter", onSupportMotion);
          item.removeEventListener("pointerleave", onSupportMotion);
        });
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }
    configure();
    motion.addEventListener("change", configure);
    return () => {
      dispose();
      motion.removeEventListener("change", configure);
    };
}
