import LocaleProvider from "@/components/i18n/LocaleProvider";
import SkipLink from "@/components/i18n/SkipLink";
import "./i18n.css";
import "./about-journey.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "./animations.css";
import "./skills.css";
import "./languages.css";
import "./refinements.css";
import "./companion-scenes.css";
import ScrollCompanion from "@/components/ui/ScrollCompanion";
export const metadata: Metadata = {
  title: "Joel Lopes Ribeiro | Portfolio",
  description:
    "Portfolio professionnel de Joel Lopes Ribeiro, étudiant en Pré-MSc à EPITECH Strasbourg, orienté développement informatique, Big Data et Intelligence Artificielle.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LocaleProvider>
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <ScrollCompanion />
      </LocaleProvider>
      </body>
    </html>
  );
}
