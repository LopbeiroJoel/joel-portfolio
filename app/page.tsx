import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Languages from "@/components/sections/Languages";
import Certifications from "@/components/sections/Certifications";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Languages />
      <Certifications />
      <Interests />
      <Contact />
    </main>
  );
}
