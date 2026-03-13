import { useEffect, useState } from "react";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";

const sectionIds = [
  "hero",
  "about",
  "skills",
  "projects",
  "journey",
  "services",
  "testimonials",
  "contact",
];

function useActiveSection(ids) {
  const [activeSection, setActiveSection] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.65],
        rootMargin: "-14% 0px -40% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <PageLoader visible={loading} />
      <ScrollProgress />
      <div className="relative overflow-hidden bg-ink text-white">
        <Navbar
          activeSection={activeSection}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((value) => !value)}
        />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Services />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
