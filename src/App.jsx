import { useEffect, useState } from "react";
import AboutAnimated from "./AboutAnimated";
import InfiniteIconScroll from "./components/InfiniteIconScroll";
import {
  FiBriefcase,
  FiCheckCircle,
  FiFacebook,
  FiXCircle,
  FiHome,
  FiInstagram,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiTool,
  FiUser,
} from "react-icons/fi";

const navItems = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiTool },
  { id: "services", label: "Services", icon: FiLayers },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

const stats = [
  { value: "24+", label: "Completed builds" },
  { value: "5+", label: "Years improving UI quality" },
  { value: "18", label: "Brands and founders supported" },
  { value: "99%", label: "Mobile-first delivery focus" },
];

const skills = [
  {
    title: "HTML & CSS",
    value: 95,
    text: "Structured layouts, modern CSS systems, responsive delivery.",
  },
  {
    title: "JavaScript",
    value: 90,
    text: "Interactive interfaces, UI behavior, and lean frontend logic.",
  },
  {
    title: "React",
    value: 88,
    text: "Reusable components, app structure, and polished SPA flows.",
  },
];

const bars = [
  { title: "UI Design Translation", value: 92 },
  { title: "Landing Page Development", value: 96 },
  { title: "API Integration", value: 84 },
  { title: "Performance Optimization", value: 89 },
];

const services = [
  {
    id: "01",
    title: "Portfolio Websites",
    text: "High-end personal and creative portfolio websites with a strong first impression.",
  },
  {
    id: "02",
    title: "Business Landing Pages",
    text: "Conversion-focused pages for agencies, startups, and local brands.",
  },
  {
    id: "03",
    title: "Frontend Development",
    text: "Pixel-accurate implementation from design files into responsive code.",
  },
  {
    id: "04",
    title: "Website Refresh",
    text: "Modern redesigns for outdated websites that need better clarity and style.",
  },
];

const projects = [
  {
    className: "project-card project-tall",
    tag: "Brand Website",
    title: "Creative Studio Launch",
  },
  {
    className: "project-card project-amber",
    tag: "SaaS",
    title: "Analytics Dashboard UI",
  },
  {
    className: "project-card project-slate",
    tag: "E-commerce",
    title: "Modern Storefront Experience",
  },
  {
    className: "project-card project-olive",
    tag: "Personal Brand",
    title: "Consultant Portfolio Redesign",
  },
];

const profile = {
  name: "Elvis Carter",
  email: "machaelvice8@gmail.com",
  phone: "0761354537",
  phoneHref: "tel:0761354537",
  emailHref: "mailto:machaelvice8@gmail.com",
  socialLinks: [
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send?phone=255761354537&text=Hello%20I%20want%20more%20information",
      icon: FiMessageCircle,
    },
    {
      name: "Telegram",
      href: "https://t.me/jonaselvis18",
      icon: FiSend,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/drumm1er8_boy?igsh=eTNnNmx6b3g4NTE1",
      icon: FiInstagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/aglow.drummer",
      icon: FiFacebook,
    },
  ],
};

const sectionIds = navItems.map((item) => item.id);
const heroWords = ["Frontend", "Websites", "Interfaces", "Experiences"];

function getContactApiUrl() {
  const configuredUrl = import.meta.env.VITE_CONTACT_API_URL;

  if (!configuredUrl) {
    return "/api/contact";
  }

  const isLocalAbsoluteUrl = /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(
    configuredUrl
  );
  const isLocalHost =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

  if (isLocalAbsoluteUrl && !isLocalHost) {
    return "/api/contact";
  }

  return configuredUrl;
}

const contactApiUrl = getContactApiUrl();

function useActiveSection(ids) {
  const [activeSection, setActiveSection] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) {
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
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-18% 0px -35% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [year, setYear] = useState("");
  const [locationStatus, setLocationStatus] = useState(
    "Requesting visitor location permission..."
  );
  const [visitorLocation, setVisitorLocation] = useState(null);
  const [typedWord, setTypedWord] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedWord(heroWords[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const currentWord = heroWords[wordIndex];

      if (deleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      setTypedWord(currentWord.slice(0, charIndex));

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 1100);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % heroWords.length;
      }

      timeoutId = window.setTimeout(tick, deleting ? 70 : 110);
    };

    timeoutId = window.setTimeout(tick, 500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("Location is not supported on this browser.");
      return;
    }

    const success = ({ coords }) => {
      setVisitorLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setLocationStatus("Live visitor location shared by browser permission.");
    };

    const failGracefully = () => {
      setLocationStatus(
        "Visitor location is unavailable until location permission is allowed."
      );
    };

    const readLocation = () => {
      navigator.geolocation.getCurrentPosition(success, failGracefully, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      });
    };

    if (!("permissions" in navigator) || !navigator.permissions?.query) {
      failGracefully();
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          readLocation();
          return;
        }

        failGracefully();
      })
      .catch(() => {
        failGracefully();
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMenuOpen(false);
      }
    };

    const handleDocumentClick = (event) => {
      const nav = document.querySelector(".nav");
      if (menuOpen && nav && !nav.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 4200);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (isSubmitting || !form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      formStartedAt,
    };

    if (payload.company) {
      form.reset();
      setFormStartedAt(Date.now());
      return;
    }

    try {
      setIsSubmitting(true);
      setToast(null);

      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      form.reset();
      setFormStartedAt(Date.now());
      setToast({
        type: "success",
        message: "Message sent, check your email.",
      });
    } catch (error) {
      setToast({
        type: "error",
        message:
          error?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const visitorMapUrl = visitorLocation
    ? `https://www.google.com/maps?q=${visitorLocation.latitude},${visitorLocation.longitude}&z=15&output=embed`
    : "";

  return (
    <>
      <header className="site-header">
        <nav className="nav container">
          <a className="brand" href="#home" onClick={handleNavClick}>
            Elvis<span>.</span>
          </a>
          <button
            className="menu-btn"
            id="menuBtn"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((state) => !state)}
          >
            Menu
          </button>
          <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "active" : ""}
                  onClick={handleNavClick}
                >
                  <item.icon className="nav-icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-shell container">
            <div className="hero-copy animate-slideUp">
              <p className="eyebrow">Hello, this is Elvis</p>
              <h1>
                Creative{" "}
                <span className="hero-typed" aria-hidden="true">
                  {typedWord || "\u00A0"}
                </span>
                <span className="sr-only">Frontend</span>
                <br />
                Developer &amp; Digital Builder
              </h1>
              <p className="hero-text">
                I design polished interfaces, build fast web experiences, and
                turn product ideas into launch-ready websites.
              </p>
              <div className="hero-actions">
                <a className="btn btn-solid" href="#contact">
                  Hire Me
                </a>
                <a className="btn btn-outline" href="#projects">
                  See Projects
                </a>
              </div>
              <dl className="hero-meta">
                <div>
                  <dt>Based in</dt>
                  <dd>Dar es Salaam</dd>
                </div>
                <div>
                  <dt>Specialty</dt>
                  <dd>Modern portfolio &amp; business sites</dd>
                </div>
              </dl>
            </div>

          </div>
        </section>

        <section className="stats container" aria-label="Portfolio highlights">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="section trust-section" aria-labelledby="trust-title">
          <div className="container">
            <div className="trust-heading">
              <h2 id="trust-title">Built with platforms modern teams trust</h2>
              <div className="trust-divider" aria-hidden="true"></div>
            </div>

            <InfiniteIconScroll />
          </div>
        </section>

        <AboutAnimated />

        <section className="section skills-section" id="skills">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Skills</p>
              <h2>What I Use To Build</h2>
              <p>
                A practical stack for clean interfaces, maintainable code, and
                production-ready delivery.
              </p>
            </div>

            <div className="skill-circles">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <div
                    className="skill-ring"
                    style={{ "--value": skill.value }}
                  >
                    <div className="skill-ring-inner">
                      <strong>{skill.value}%</strong>
                    </div>
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                </article>
              ))}
            </div>

            <div className="bars-grid">
              {bars.map((bar) => (
                <article className="bar-card" key={bar.title}>
                  <div className="bar-head">
                    <h3>{bar.title}</h3>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ "--fill": `${bar.value}%` }}
                    ></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Services</p>
              <h2>What I Can Do For You</h2>
              <p>
                Clear offers focused on websites that look better and convert
                better.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.id}>
                  <div className="service-icon">{service.id}</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container cta-card">
            <div>
              <p className="section-kicker">Let's Build</p>
              <h2>Have a project in mind?</h2>
              <p>
                I can help redesign your current website or build a fresh one
                with the same premium presentation style you asked for here.
              </p>
            </div>
            <a className="btn btn-light" href="#contact">
              Start a Project
            </a>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Projects</p>
              <h2>Selected Work</h2>
              <p>
                A project gallery styled to match the reference direction,
                adapted into a cleaner modern portfolio.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className={project.className} key={project.title}>
                  <div className="project-overlay">
                    <span>{project.tag}</span>
                    <h3>{project.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">Contact</p>
              <h2>Have a Project?</h2>
              <p>
                Send a message with your website goals, and I'll help shape the
                right layout, styling direction, and build plan.
              </p>

              <div className="contact-details">
                <div>
                  <span>Email</span>
                  <a href={profile.emailHref}>{profile.email}</a>
                </div>
                <div>
                  <span>Phone</span>
                  <a href={profile.phoneHref}>{profile.phone}</a>
                </div>
                <div>
                  <span>Location</span>
                  <p>Dar es Salaam, Tanzania</p>
                </div>
              </div>

              <div className="visitor-location-card">
                <div className="visitor-location-copy">
                  <span>Visitor Location</span>
                  <p>{locationStatus}</p>
                  {visitorLocation ? (
                    <strong>
                      {visitorLocation.latitude.toFixed(6)},{" "}
                      {visitorLocation.longitude.toFixed(6)}
                    </strong>
                  ) : null}
                </div>

                {visitorLocation ? (
                  <iframe
                    className="visitor-map"
                    title="Visitor live location map"
                    src={visitorMapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : null}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <div className="field-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject / Project Type"
                required
              />
              <textarea
                name="message"
                rows="7"
                placeholder="Tell me about your project"
                required
              ></textarea>
              <input
                type="text"
                name="company"
                className="honey-field"
                tabIndex="-1"
                autoComplete="off"
              />
              <button
                className="btn btn-solid"
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <section className="section policy-section" id="privacy">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Privacy Policy</p>
              <h2>Your Privacy</h2>
              <p>
                This website respects visitor privacy and only uses information
                needed to respond to messages, improve the site experience, and
                display requested browser features.
              </p>
            </div>

            <div className="policy-card">
              <div className="policy-block">
                <h3>Information Collected</h3>
                <p>
                  If you submit the contact form, the information you enter such
                  as your name, email address, and message may be used to reply
                  to your inquiry.
                </p>
              </div>

              <div className="policy-block">
                <h3>Location Access</h3>
                <p>
                  Location is only requested through your browser with your
                  permission. If you deny access, the site will not track or
                  store your live location.
                </p>
              </div>

              <div className="policy-block">
                <h3>Cookies and Analytics</h3>
                <p>
                  This site does not intentionally use invasive tracking. If
                  analytics or third-party tools are added later, this policy
                  should be updated to reflect that usage clearly.
                </p>
              </div>

              <div className="policy-block">
                <h3>Contact</h3>
                <p>
                  For privacy questions, contact{" "}
                  <a href={profile.emailHref}>{profile.email}</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div className="footer-column footer-column-main">
            <a
              className="brand footer-brand"
              href="#home"
              onClick={handleNavClick}
            >
              Elvis<span>.</span>
            </a>
            <h3>Elvis Carter</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <p className="footer-text">
              Portfolio websites and frontend experiences designed to look sharp
              and ship cleanly.
            </p>
          </div>

          <div className="footer-column">
            <h3>Products</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <div className="footer-links-list">
              <a href="#services">Portfolio Websites</a>
              <a href="#services">Landing Pages</a>
              <a href="#services">Frontend Builds</a>
              <a href="#services">Website Refresh</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Useful Links</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <div className="footer-links-list">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <div className="footer-contact-list">
              <p>{profile.name}</p>
              <a href={profile.emailHref}>{profile.email}</a>
              <a href={profile.phoneHref}>{profile.phone}</a>
              <p>Dar es Salaam, Tanzania</p>
            </div>
            <div className="footer-socials" aria-label="Social media links">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.name}
                  className="footer-social-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  title={link.name}
                >
                  <link.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p className="footer-copy">
            &copy; <span>{year}</span> Elvis Carter. All rights reserved.
          </p>
        </div>
      </footer>

      {toast ? (
        <div
          className={`contact-toast contact-toast-${toast.type}`}
          role="alert"
          aria-live="assertive"
        >
          <div className="contact-toast-icon" aria-hidden="true">
            {toast.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
          </div>
          <p>{toast.message}</p>
        </div>
      ) : null}
    </>
  );
}
