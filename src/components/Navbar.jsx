import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl" : "backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto mt-4 max-w-7xl rounded-2xl border px-5 py-3 ${
          scrolled
            ? "border-white/15 bg-navy/75 shadow-card"
            : "border-white/10 bg-navy/55"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => jumpTo("hero")}
            className="font-display text-lg font-semibold tracking-wide text-white"
          >
            Alex<span className="text-electric">.dev</span>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => jumpTo(item.id)}
                className={`rounded-xl px-3 py-2 text-sm transition ${
                  activeSection === item.id
                    ? "bg-electric/20 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="rounded-xl border border-white/20 bg-white/5 p-2 text-slate-100 transition hover:border-electric/60 hover:text-electric"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setOpen((state) => !state)}
              className="rounded-xl border border-white/20 bg-white/5 p-2 text-slate-100 lg:hidden"
              aria-label="Open mobile menu"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 space-y-1 rounded-xl border border-white/10 bg-black/20 p-3 lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => jumpTo(item.id)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeSection === item.id
                    ? "bg-electric/20 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
