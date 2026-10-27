export type Theme = "light" | "dark";
const themeKey = "portfolio-theme";

// Exécuté avant l’hydratation pour retrouver le thème choisi sans flash clair.
export const themeBootstrap = `(function(){var theme='light';try{if(localStorage.getItem('${themeKey}')==='dark')theme='dark';}catch{}document.documentElement.dataset.theme=theme;})();`;

export function isDarkTheme() {
  return document.documentElement.dataset.theme === "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(themeKey, theme); } catch { /* Le bouton fonctionne aussi sans stockage. */ }
}

export function subscribeTheme(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
