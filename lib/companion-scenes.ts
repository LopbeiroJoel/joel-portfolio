/** Decorative scenes never own the position, pose or click counter. */
export function createCompanionScenes(sprite: HTMLElement, caption: HTMLElement) {
  const scenes = new Set(['home', 'experience', 'education', 'skills', 'projects', 'languages', 'certifications', 'interests', 'contact']);
  let timer = 0;
  let pending = '';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    const section = sprite.dataset.section ?? '';
    const resting = sprite.dataset.pose === 'sit' || sprite.dataset.pose === 'idle';
    const scene = !motion.matches && !sprite.hidden && resting && !caption.textContent && !sprite.dataset.interaction && scenes.has(section) ? section : '';
    if (scene === pending) return;
    pending = scene;
    clearTimeout(timer);
    delete sprite.dataset.scene;
    if (scene) timer = window.setTimeout(() => {
      sprite.dataset.sceneSide = sprite.getBoundingClientRect().left < 90 ? 'right' : 'left';
      sprite.dataset.scene = scene;
    }, 1000);
  }
  const observer = new MutationObserver(update);
  observer.observe(sprite, { attributes: true, attributeFilter: ['hidden', 'data-pose', 'data-section', 'data-interaction'] });
  observer.observe(caption, { childList: true, characterData: true, subtree: true });
  motion.addEventListener('change', update);
  update();
  return () => {
    clearTimeout(timer);
    observer.disconnect();
    motion.removeEventListener('change', update);
    delete sprite.dataset.scene;
    delete sprite.dataset.sceneSide;
  };
}
