import { useEffect, useState } from "react";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import CursorGlow from "./components/CursorGlow";
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

function getInitialTheme() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("portfolio-theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return true;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${darkMode ? "theme-dark dark bg-ink text-white" : "theme-light bg-slate-50 text-slate-900"} min-h-screen`}
    >
      <PageLoader visible={loading} />
      <ScrollProgress />
      <CursorGlow />
      <Navbar
        activeSection={activeSection}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((state) => !state)}
      />
      <main className="relative overflow-hidden">
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
  );
}
