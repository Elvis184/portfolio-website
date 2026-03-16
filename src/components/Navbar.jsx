import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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

export default function Navbar({ activeSection }) {
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
            className="group inline-flex min-h-11 min-w-11 items-center rounded-xl p-1 transition duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            aria-label="ELVION TECH home"
          >
            <img
              src="/images/logo.png"
              alt="ELVION TECH logo"
              width="56"
              height="56"
              decoding="async"
              fetchPriority="high"
              className="h-12 w-12 rounded-full border border-electric/45 object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_30px_rgba(45,123,255,0.35)] sm:h-14 sm:w-14"
            />
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => jumpTo(item.id)}
                className={`min-h-11 rounded-xl px-3 py-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                  activeSection === item.id
                    ? "bg-electric/20 text-white"
                    : "text-slate-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((state) => !state)}
              className="min-h-11 min-w-11 rounded-xl border border-white/20 bg-white/5 p-2 text-slate-100 transition duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy lg:hidden"
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
                className={`block min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
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
