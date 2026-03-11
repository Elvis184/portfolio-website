const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const heroPhoto = document.getElementById("heroPhoto");
const profileAvatar = document.getElementById("profileAvatar");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const skillRings = document.querySelectorAll(".skill-ring");
const sectionLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenu();
    }
  });
}

const attachFallbackLoader = (element, candidatesAttr) => {
  if (!element) {
    return;
  }

  const currentSrc = element.getAttribute("src");
  const candidates = [currentSrc, ...(element.dataset[candidatesAttr] || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)]
    .filter((item, index, items) => item && items.indexOf(item) === index);

  let index = Math.max(candidates.indexOf(currentSrc), 0) + 1;

  const loadNext = () => {
    if (index >= candidates.length) {
      element.removeEventListener("error", loadNext);
      return;
    }

    element.src = candidates[index];
    index += 1;
  };

  element.addEventListener("error", loadNext);

  if (!(element.complete && element.naturalWidth > 0) && index < candidates.length) {
    loadNext();
  }
};

attachFallbackLoader(heroPhoto, "photoCandidates");
attachFallbackLoader(profileAvatar, "avatarCandidates");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "Message captured. Connect this form to email or Formspree for live delivery.";
  });
}

if (skillRings.length > 0) {
  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const ring = entry.target;
        const value = Number(ring.dataset.value || 0);
        ring.style.setProperty("--value", value);
        ringObserver.unobserve(ring);
      });
    },
    { threshold: 0.35 }
  );

  skillRings.forEach((ring) => ringObserver.observe(ring));
}

if (sections.length > 0 && sectionLinks.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeId = `#${entry.target.id}`;
        sectionLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === activeId);
        });
      });
    },
    {
      threshold: 0.55,
      rootMargin: "-20% 0px -30% 0px",
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
