import { profile } from "@/data/profile";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>{profile.name} · Digital Resume</p>
        <a href="#home">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
