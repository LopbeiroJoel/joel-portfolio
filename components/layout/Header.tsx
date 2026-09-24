import Navigation from "./Navigation";
export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Joel Lopes Ribeiro — Accueil"
        >
          JLR<span aria-hidden="true">.</span>
        </a>
        <Navigation />
      </div>
    </header>
  );
}
