import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiGrid,
  FiLayers,
  FiMenu,
  FiMessageSquare,
  FiPlay,
  FiShield,
  FiX,
  FiZap,
} from "react-icons/fi";
import navbarLogoSrc from "../images/logo-icon-optimized.png";

const navItems = [
  { id: "features", label: "Features" },
  { id: "customers", label: "Customers" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const trustedBrands = [
  "Dropbox",
  "Notion",
  "Linear",
  "Webflow",
  "Slack",
  "Stripe",
];

const features = [
  {
    icon: FiGrid,
    title: "Composable page system",
    text: "Launch polished marketing pages with a modular layout built for iteration, testing, and scale.",
  },
  {
    icon: FiLayers,
    title: "Design-consistent sections",
    text: "Every block follows a single spacing, typography, and visual system so the whole product feels intentional.",
  },
  {
    icon: FiBarChart2,
    title: "Growth-ready analytics",
    text: "Track funnel performance, feature adoption, and campaign impact without cluttering the interface.",
  },
  {
    icon: FiZap,
    title: "Fast production workflow",
    text: "Move from strategy to launch with clean handoff patterns, clear content hierarchy, and minimal friction.",
  },
  {
    icon: FiShield,
    title: "Enterprise-grade trust",
    text: "Use modern security messaging, governance controls, and approval flows that reassure larger buyers.",
  },
  {
    icon: FiMessageSquare,
    title: "Customer-led storytelling",
    text: "Explain value clearly with proof, testimonials, and product moments that convert attention into action.",
  },
];

const metrics = [
  { value: "4.8x", label: "faster campaign launches" },
  { value: "38%", label: "higher qualified conversions" },
  { value: "99.9%", label: "platform uptime confidence" },
  { value: "12k+", label: "teams scaling with clarity" },
];

const testimonials = [
  {
    quote:
      "The experience feels premium from the first scroll. It gave our product a more credible story and a much sharper conversion path.",
    name: "Maya Chen",
    role: "VP Marketing, Northstar",
  },
  {
    quote:
      "We replaced a fragmented landing flow with one system that reads clearly on desktop and mobile. The difference was immediate.",
    name: "Jordan Lewis",
    role: "Growth Lead, FrameOS",
  },
  {
    quote:
      "The layout looks clean, modern, and expensive without feeling noisy. It helped us position the product at a higher tier.",
    name: "Aisha Khan",
    role: "Founder, Vanta Studio",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "For early teams validating messaging and shipping faster pages.",
    features: [
      "Unlimited landing pages",
      "Shared design system",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$79",
    description: "For scaling companies optimizing conversion and launch speed.",
    features: [
      "Everything in Starter",
      "Advanced reporting",
      "Experiment-ready sections",
      "Priority support",
    ],
    cta: "Book Demo",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger organizations that need governance, control, and flexibility.",
    features: [
      "Custom workspaces",
      "Security reviews",
      "Dedicated onboarding",
      "Tailored SLAs",
    ],
    cta: "Talk Sales",
  },
];

const faqs = [
  {
    question: "How does this stay responsive across every screen size?",
    answer:
      "The layout uses a capped container, fluid spacing with clamp(), and mobile-first grid rules so cards, text, and actions never exceed the viewport width.",
  },
  {
    question: "Can this support a real SaaS marketing site?",
    answer:
      "Yes. The structure is designed for product storytelling, proof, pricing, and FAQ content with enough flexibility to scale into a production marketing website.",
  },
  {
    question: "Will it still feel fast with richer visuals?",
    answer:
      "Yes. The page uses lightweight gradients, CSS-based effects, and a restrained interaction model instead of heavy animation libraries or oversized assets.",
  },
  {
    question: "Can the sections be reused for multiple campaigns?",
    answer:
      "That is the point of the system. Each section is modular and can be duplicated, reordered, or adapted without breaking the visual rhythm.",
  },
];

export default function App() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [logoAvailable, setLogoAvailable] = useState(true);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    const handleDocumentClick = (event) => {
      if (!menuOpen || !navRef.current || navRef.current.contains(event.target)) {
        return;
      }

      setMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="landing-shell">
      <div className="dev-scene" aria-hidden="true">
        <div className="dev-grid-plane"></div>
        <div className="dev-orb dev-orb-one"></div>
        <div className="dev-orb dev-orb-two"></div>
        <div className="dev-card dev-card-one">
          <span className="dev-card-code">&lt;section className="hero"&gt;</span>
          <span className="dev-card-dot"></span>
          <span className="dev-card-line dev-card-line-short"></span>
          <span className="dev-card-line"></span>
          <span className="dev-card-line dev-card-line-accent"></span>
        </div>
        <div className="dev-card dev-card-two">
          <span className="dev-card-chip">API</span>
          <span className="dev-card-code">const metrics = await fetch("/growth")</span>
          <span className="dev-card-line"></span>
          <span className="dev-card-line dev-card-line-short"></span>
          <span className="dev-card-line dev-card-line-accent"></span>
        </div>
        <div className="dev-ring dev-ring-one"></div>
        <div className="dev-ring dev-ring-two"></div>
      </div>
      <header className="site-header">
        <div className="container nav" ref={navRef}>
          <a className="brand" href="#home" onClick={handleNavClick}>
            <span className="brand-badge" aria-hidden="true">
              {logoAvailable ? (
                <img
                  className="brand-logo"
                  src={navbarLogoSrc}
                  alt=""
                  onError={() => setLogoAvailable(false)}
                />
              ) : (
                <span className="brand-fallback">E</span>
              )}
            </span>
            <span className="brand-copy">
              <strong>ELVION</strong>
            </span>
          </a>

          <button
            className="menu-btn"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>

          <div className={`nav-panel${menuOpen ? " open" : ""}`} id="navLinks">
            <nav className="nav-links" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={handleNavClick}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <a className="btn btn-ghost" href="#pricing" onClick={handleNavClick}>
                View Pricing
              </a>
              <a className="btn btn-primary" href="#pricing" onClick={handleNavClick}>
                Start Free
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-bg hero-bg-one" aria-hidden="true"></div>
          <div className="hero-bg hero-bg-two" aria-hidden="true"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Premium SaaS Landing System</span>
              <h1>Build a modern product website that looks sharp and converts clearly.</h1>
              <p className="hero-description">
                A polished, responsive SaaS landing page system with strong hierarchy,
                balanced spacing, and the kind of visual confidence you expect from
                top-tier marketing teams.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#pricing">
                  Start Free
                </a>
                <a className="btn btn-secondary" href="#features">
                  <FiPlay aria-hidden="true" />
                  Explore Features
                </a>
              </div>

              <div className="hero-badges" aria-label="Key product benefits">
                <span>Responsive by default</span>
                <span>Fast launch cycles</span>
                <span>Conversion-focused UI</span>
              </div>
            </div>

            <aside className="hero-card">
              <div className="hero-card-top">
                <span className="hero-card-label">Launch Overview</span>
                <strong>Everything in one product narrative</strong>
              </div>

              <div className="hero-visual">
                <div className="hero-visual-panel">
                  <span>Traffic Growth</span>
                  <strong>+128%</strong>
                  <small>in the last 90 days</small>
                </div>
                <div className="hero-visual-chart" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="hero-proof-list">
                <div>
                  <strong>12k+</strong>
                  <span>teams onboarded</span>
                </div>
                <div>
                  <strong>4 min</strong>
                  <span>to launch a campaign</span>
                </div>
                <div>
                  <strong>99.9%</strong>
                  <span>service reliability</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="brands-section" id="customers" aria-label="Trusted brands">
          <div className="container brands-shell">
            <p>Trusted by product, growth, and design teams at</p>
            <div className="brands-row">
              {trustedBrands.map((brand) => (
                <span key={brand} className="brand-pill">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container section-head">
            <span className="eyebrow">Features</span>
            <h2>Everything needed for a polished, scalable marketing presence.</h2>
            <p>
              Clear layout logic, premium visuals, and flexible building blocks that
              stay stable from mobile to ultra-wide screens.
            </p>
          </div>

          <div className="container features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <feature.icon aria-hidden="true" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section metrics-section">
          <div className="container metrics-layout">
            <div className="metrics-copy">
              <span className="eyebrow">Performance</span>
              <h2>Designed to communicate value fast and keep attention focused.</h2>
              <p>
                The system is built around confident messaging, conversion-ready proof,
                and a layout rhythm that remains clean at every breakpoint.
              </p>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container section-head">
            <span className="eyebrow">Testimonials</span>
            <h2>Teams use it to make product marketing feel more credible.</h2>
            <p>
              Proof matters. These testimonial cards are designed to feel premium,
              readable, and trustworthy across screen sizes.
            </p>
          </div>

          <div className="container testimonials-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <p className="testimonial-quote">“{item.quote}”</p>
                <div className="testimonial-meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container section-head">
            <span className="eyebrow">Pricing</span>
            <h2>Simple plans with room to grow.</h2>
            <p>
              Pricing cards are structured for clear comparison, strong hierarchy,
              and responsive stacking from mobile through desktop.
            </p>
          </div>

          <div className="container pricing-grid">
            {plans.map((plan) => (
              <article
                className={`pricing-card${plan.featured ? " featured" : ""}`}
                key={plan.name}
              >
                <div className="pricing-header">
                  <span className="pricing-name">{plan.name}</span>
                  <strong>{plan.price}</strong>
                  <p>{plan.description}</p>
                </div>

                <ul className="pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <FiCheck aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                  href="#footer"
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-copy">
              <span className="eyebrow">FAQ</span>
              <h2>Built to stay stable, readable, and adaptable.</h2>
              <p>
                Common questions answered with a lightweight accordion that keeps the
                page interactive without adding unnecessary complexity.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <article className={`faq-item${isOpen ? " open" : ""}`} key={item.question}>
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <span>{item.question}</span>
                      <FiArrowRight aria-hidden="true" />
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="container footer-grid">
          <div className="footer-branding">
            <a className="brand footer-brand" href="#home">
              <span className="brand-badge" aria-hidden="true">
                {logoAvailable ? (
                  <img
                    className="brand-logo"
                    src={navbarLogoSrc}
                    alt=""
                    onError={() => setLogoAvailable(false)}
                  />
                ) : (
                  <span className="brand-fallback">E</span>
                )}
              </span>
              <span className="brand-copy">
                <strong>ELVION</strong>
              </span>
            </a>
            <p>
              A modern SaaS landing page system designed for premium presentation,
              responsive stability, and clear product storytelling.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h3>Product</h3>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h3>Resources</h3>
              <a href="#customers">Customers</a>
              <a href="#pricing">Plans</a>
              <a href="#home">Overview</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; {year} ELVION. Built for clean rendering on every screen.</p>
        </div>
      </footer>
    </div>
  );
}
