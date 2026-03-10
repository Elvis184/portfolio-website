const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const heroPhoto = document.getElementById("heroPhoto");
const photoFallback = document.getElementById("photoFallback");
const profileAvatar = document.getElementById("profileAvatar");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });
}

if (heroPhoto && photoFallback) {
  const candidates = (heroPhoto.dataset.photoCandidates || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  let currentIndex = 0;
  photoFallback.hidden = true;

  const tryNextImage = () => {
    if (currentIndex >= candidates.length) {
      heroPhoto.style.display = "none";
      heroPhoto.hidden = true;
      photoFallback.hidden = false;
      photoFallback.setAttribute("aria-hidden", "false");
      return;
    }

    heroPhoto.src = candidates[currentIndex];
    currentIndex += 1;
  };

  heroPhoto.addEventListener("load", () => {
    heroPhoto.style.display = "block";
    heroPhoto.hidden = false;
    photoFallback.hidden = true;
    photoFallback.setAttribute("aria-hidden", "true");
  });

  heroPhoto.addEventListener("error", tryNextImage);

  if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
    heroPhoto.style.display = "block";
    heroPhoto.hidden = false;
    photoFallback.hidden = true;
    photoFallback.setAttribute("aria-hidden", "true");
  } else if (candidates.length > 0) {
    tryNextImage();
  } else {
    photoFallback.hidden = false;
    photoFallback.setAttribute("aria-hidden", "false");
  }
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thanks. Your message is ready to send.";
  });
}

if (profileAvatar) {
  const avatarCandidates = (profileAvatar.dataset.avatarCandidates || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  let avatarIndex = 0;

  const tryNextAvatar = () => {
    if (avatarIndex >= avatarCandidates.length) {
      return;
    }

    profileAvatar.src = avatarCandidates[avatarIndex];
    avatarIndex += 1;
  };

  profileAvatar.addEventListener("error", tryNextAvatar);

  if (!(profileAvatar.complete && profileAvatar.naturalWidth > 0) && avatarCandidates.length > 0) {
    tryNextAvatar();
  }
}
