import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
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

const interests = [
  "Interface Design",
  "Web Apps",
  "Brand Websites",
  "Product Launches",
];

const profile = {
  name: "Elvis Carter",
  email: "machaelvice8@gmail.com",
  phone: "0761354537",
  phoneHref: "tel:0761354537",
  emailHref: "mailto:machaelvice8@gmail.com",
};

const sectionIds = navItems.map((item) => item.id);

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
  const [formStatus, setFormStatus] = useState("");
  const [year, setYear] = useState("");
  const [heroPhoto, setHeroPhoto] = useState("/images/hero-collage.png");
  const [profilePhoto, setProfilePhoto] = useState("/images/profile-avatar.png");
  const [locationStatus, setLocationStatus] = useState(
    "Requesting visitor location permission..."
  );
  const [visitorLocation, setVisitorLocation] = useState(null);
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

    const error = () => {
      setLocationStatus(
        "Visitor location is unavailable until location permission is allowed."
      );
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
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

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus(
      "Message captured. Connect this form to email or Formspree for live delivery."
    );
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
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-shell container">
            <div className="hero-copy">
              <p className="eyebrow">Hello, this is Elvis</p>
              <h1>
                Creative <span>Frontend</span>
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

            <div className="hero-visual">
              <div className="hero-artwork">
                <div className="hero-artwork-glow"></div>
                <img
                  className="hero-photo"
                  src={heroPhoto}
                  alt="Elvis Carter portrait"
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    if (heroPhoto.endsWith("hero-collage.png")) {
                      setHeroPhoto("/images/hero.png");
                    } else if (heroPhoto.endsWith("hero.png")) {
                      setHeroPhoto("/images/hero-placeholder.svg");
                    }
                  }}
                />
              </div>
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

        <section className="section about-section" id="about">
          <div className="container two-column">
            <div className="about-visual">
              <div className="portrait-frame">
                <img
                  className="portrait"
                  src={profilePhoto}
                  alt="Elvis Carter profile"
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    if (!profilePhoto.endsWith("hero-placeholder.svg")) {
                      setProfilePhoto("/images/hero-placeholder.svg");
                    }
                  }}
                />
              </div>
            </div>

            <div className="about-copy">
              <p className="section-kicker">My Intro</p>
              <h2>About Me</h2>
              <p>
                I build websites that feel premium, load quickly, and
                communicate clearly. My work sits between design and engineering,
                so the final result looks strong and still holds up in
                production.
              </p>
              <ul className="about-list">
                <li>
                  <span>Name</span>
                  <strong>{profile.name}</strong>
                </li>
                <li>
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </li>
                <li>
                  <span>Phone</span>
                  <strong>{profile.phone}</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>Frontend, UI systems, web strategy</strong>
                </li>
              </ul>
              <div className="interest-grid">
                {interests.map((interest) => (
                  <div className="interest-item" key={interest}>
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <input type="text" placeholder="Project Type" required />
              <textarea
                rows="7"
                placeholder="Tell me about your project"
                required
              ></textarea>
              <button className="btn btn-solid" type="submit">
                Send Message
              </button>
              <p className="form-status" aria-live="polite">
                {formStatus}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div>
            <a className="brand footer-brand" href="#home" onClick={handleNavClick}>
              Elvis<span>.</span>
            </a>
            <p>
              Portfolio websites and frontend experiences designed to look sharp
              and ship cleanly.
            </p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-copy">
            &copy; <span>{year}</span> Elvis Carter. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
