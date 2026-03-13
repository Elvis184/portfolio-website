import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiExternalLink,
  FiFacebook,
  FiGithub,
  FiHome,
  FiInstagram,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiTool,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import navbarLogoSrc from "../images/logo-icon-optimized.png";

const AboutAnimated = lazy(() => import("./AboutAnimated"));
const InfiniteIconScroll = lazy(() => import("./components/InfiniteIconScroll"));

const navItems = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiTool },
  { id: "services", label: "Services", icon: FiLayers },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

const heroBadges = ["React", "JavaScript", "Firebase", "APIs", "Responsive UI"];

const stats = [
  { value: "24+", label: "Completed builds" },
  { value: "5+", label: "Years improving UI quality" },
  { value: "18", label: "Brands and founders supported" },
  { value: "99%", label: "Mobile-first delivery focus" },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML & CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Firebase", "API Integration", "Authentication", "Data Flows"],
  },
  {
    title: "Workflow",
    items: ["UI Systems", "Responsive Delivery", "Accessibility", "Performance"],
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
    tag: "Brand Website",
    title: "Creative Studio Launch",
    description:
      "A polished launch experience focused on visual storytelling, strong hierarchy, and conversion-ready presentation.",
    stack: ["React", "UI Design", "Responsive"],
    repoUrl: "https://github.com/elvis184",
    liveUrl: null,
  },
  {
    tag: "SaaS",
    title: "Analytics Dashboard UI",
    description:
      "A clean dashboard direction built around clarity, fast scanning, and confident product communication.",
    stack: ["React", "Data UI", "Component System"],
    repoUrl: "https://github.com/elvis184",
    liveUrl: null,
  },
  {
    tag: "E-commerce",
    title: "Modern Storefront Experience",
    description:
      "A premium storefront concept with streamlined navigation, stronger card hierarchy, and mobile-first polish.",
    stack: ["Frontend", "Responsive", "UX"],
    repoUrl: "https://github.com/elvis184",
    liveUrl: null,
  },
  {
    tag: "Personal Brand",
    title: "Consultant Portfolio Redesign",
    description:
      "A modern portfolio refresh designed to elevate credibility, readability, and first-contact impact.",
    stack: ["Portfolio", "Branding", "Frontend"],
    repoUrl: "https://github.com/elvis184",
    liveUrl: null,
  },
];

const profile = {
  name: "Elvis Carter",
  email: "info.elviontech@gmail.com",
  phone: "0761354537",
  phoneHref: "tel:0761354537",
  emailHref: "mailto:info.elviontech@gmail.com",
  socialLinks: [
    {
      name: "GitHub",
      href: "https://github.com/elvis184",
      icon: FiGithub,
    },
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

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
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-12% 0px -40% 0px",
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
  const [logoAvailable, setLogoAvailable] = useState(true);
  const [toast, setToast] = useState(null);
  const [year, setYear] = useState("");
  const [locationStatus, setLocationStatus] = useState(
    "Visitor location is unavailable until location permission is allowed."
  );
  const [visitorLocation, setVisitorLocation] = useState(null);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
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
        message: error?.message || "Failed to send message. Please try again.",
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
          <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
          <div className="hero-glow hero-glow-two" aria-hidden="true"></div>
          <div className="hero-shell container">
            <div className="hero-grid">
              <motion.div
                className="hero-copy"
                variants={staggerParent}
                initial="hidden"
                animate="show"
              >
                <motion.p className="eyebrow" variants={fadeUp}>
                  Full Stack Developer
                </motion.p>
                <motion.h1 variants={fadeUp}>
                  Building modern, scalable{" "}
                  <span className="hero-accent">web experiences</span>
                </motion.h1>
                <motion.p className="hero-text" variants={fadeUp}>
                  I&apos;m <strong>{profile.name}</strong>, a developer based in
                  Tanzania focused on clean frontend systems, polished interfaces,
                  and launch-ready product experiences for brands, founders, and
                  teams.
                </motion.p>

                <motion.div className="hero-actions" variants={fadeUp}>
                  <a className="btn btn-solid" href="#projects">
                    View Projects
                  </a>
                  <a className="btn btn-outline" href="#contact">
                    Contact Me
                  </a>
                </motion.div>

                <motion.div className="hero-badges" variants={fadeUp}>
                  {heroBadges.map((badge) => (
                    <span key={badge} className="hero-badge">
                      {badge}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.aside
                className="hero-panel"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
              >
                <p className="hero-panel-label">Currently working with</p>
                <div className="hero-panel-stack">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                  <span>Firebase</span>
                </div>
                <div className="hero-panel-meta">
                  <div>
                    <span>Based in</span>
                    <strong>Dar es Salaam</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>Premium frontend systems</strong>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <motion.section
          className="stats container"
          aria-label="Portfolio highlights"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((stat) => (
            <motion.article className="stat-card" key={stat.label} variants={fadeUp}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.article>
          ))}
        </motion.section>

        <section className="section trust-section" aria-labelledby="trust-title">
          <div className="container">
            <div className="section-heading centered compact">
              <p className="section-kicker">Currently Working With</p>
              <h2 id="trust-title">Platforms modern teams already trust</h2>
            </div>
            <Suspense fallback={<div className="section-fallback section-fallback-marquee" />}>
              <InfiniteIconScroll />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<div className="section-fallback section-fallback-about container" />}>
          <AboutAnimated />
        </Suspense>

        <section className="section skills-section" id="skills">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Skills</p>
              <h2>Clean systems, modern tooling, practical delivery</h2>
              <p>
                A focused stack for product UI, responsive websites, and
                maintainable frontend work.
              </p>
            </div>

            <motion.div
              className="skills-groups"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {skillGroups.map((group) => (
                <motion.article className="skill-group-card" key={group.title} variants={fadeUp}>
                  <h3>{group.title}</h3>
                  <div className="skill-pills">
                    {group.items.map((item) => (
                      <span className="skill-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>

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
              <h2>Frontend-focused work with clear product value</h2>
              <p>
                Services shaped around clarity, premium presentation, and
                reliable execution.
              </p>
            </div>

            <motion.div
              className="services-grid"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((service) => (
                <motion.article className="service-card" key={service.id} variants={fadeUp}>
                  <div className="service-icon">{service.id}</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container cta-card">
            <div>
              <p className="section-kicker">Let&apos;s Build</p>
              <h2>Have a project in mind?</h2>
              <p>
                I can help redesign your current website or build a fresh one
                with the same premium presentation style you asked for here.
              </p>
            </div>
            <a className="btn btn-light" href="#contact">
              Contact Me
            </a>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Projects</p>
              <h2>Selected work with a sharper product presentation</h2>
              <p>
                A cleaner project grid with stronger hierarchy, clearer stack
                tags, and more polished card interactions.
              </p>
            </div>

            <motion.div
              className="projects-grid"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {projects.map((project) => (
                <motion.article className="project-card" key={project.title} variants={fadeUp}>
                  <div className="project-topline">
                    <span>{project.tag}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-stack">
                    {project.stack.map((item) => (
                      <span className="project-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.repoUrl ? (
                      <a
                        className="project-link"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiGithub aria-hidden="true" />
                        GitHub
                      </a>
                    ) : (
                      <span className="project-link project-link-disabled">
                        <FiGithub aria-hidden="true" />
                        GitHub
                      </span>
                    )}
                    {project.liveUrl ? (
                      <a
                        className="project-link project-link-primary"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiExternalLink aria-hidden="true" />
                        Live Demo
                      </a>
                    ) : (
                      <span className="project-link project-link-primary project-link-disabled">
                        <FiArrowRight aria-hidden="true" />
                        Live Demo
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <motion.div
              className="contact-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="section-kicker">Contact</p>
              <h2>Let&apos;s talk about your next build</h2>
              <p>
                Send a message with your website goals, and I&apos;ll help shape
                the right layout, styling direction, and build plan.
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
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
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
            </motion.form>
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
            <a className="brand footer-brand" href="#home" onClick={handleNavClick}>
              Elvis<span>.</span>
            </a>
            <h3>Elvis Carter</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <p className="footer-text">
              Full stack developer crafting polished websites and dependable user
              experiences with a premium frontend standard.
            </p>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <div className="footer-links-list">
              <a href="#services">Portfolio Websites</a>
              <a href="#services">Landing Pages</a>
              <a href="#services">Frontend Builds</a>
              <a href="#services">Website Refresh</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Navigation</h3>
            <span className="footer-rule" aria-hidden="true"></span>
            <div className="footer-links-list">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Connect</h3>
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
            &copy; <span>{year}</span> Elvis Carter. Designed to feel clean,
            modern, and recruiter-ready.
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
