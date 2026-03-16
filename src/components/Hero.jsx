import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import HeroTechScene from "./HeroTechScene";

export default function Hero() {
  const [sceneEnabled, setSceneEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowWidth = window.innerWidth < 900;
    if (reduceMotion || lowWidth) {
      setSceneEnabled(false);
      return undefined;
    }

    let timeoutId = 0;
    let idleId = 0;
    const activate = () => setSceneEnabled(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(activate, { timeout: 380 });
    } else {
      timeoutId = window.setTimeout(activate, 260);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const container = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.09,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="hero-root relative overflow-hidden pt-28 sm:pt-36">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_20%,rgba(168,85,247,.24),transparent_35%),radial-gradient(circle_at_82%_8%,rgba(34,211,238,.22),transparent_34%),linear-gradient(180deg,#050814_0%,#0a1234_100%)]" />
      <div className="absolute inset-0 -z-20 bg-grid-pattern bg-[size:44px_44px] opacity-20" />
      {sceneEnabled && <HeroTechScene />}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_55%)]" />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="hero-panel mx-auto grid max-w-6xl items-center gap-10 rounded-[2rem] border border-white/15 bg-white/[0.07] p-6 text-center shadow-glow backdrop-blur-xl sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:p-14 lg:text-left"
        >
          <div>
            <motion.p
              variants={item}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-slate-100"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_rgba(52,231,255,0.85)]" />
              3D Creative Tech Experience
            </motion.p>

            <motion.h1
              variants={item}
              className="hero-heading font-display text-5xl font-bold uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-[5.1rem]"
            >
              <span className="bg-[linear-gradient(120deg,#ffffff_8%,#c4b5fd_40%,#7dd3fc_84%)] bg-clip-text text-transparent">
                ELVION TECH
              </span>
            </motion.h1>

            <motion.div variants={item} className="hero-title-underline mx-auto mt-6 lg:mx-0" />

            <motion.p
              variants={item}
              className="hero-tagline mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 lg:mx-0"
            >
              Build a modern web brand with immersive visuals, dynamic storytelling, and tech-powered interaction design. Scroll and hover to feel the layered parallax and rotating digital ecosystem.
            </motion.p>

            <motion.div variants={item} className="hero-actions-row mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#projects"
                className="hero-primary-button"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="hero-secondary-button"
              >
                Launch Your Idea
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:info.elviontech@gmail.com"
                className="hero-social-link"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} className="hero-subject-wrap relative mx-auto w-full max-w-[28rem] lg:max-w-none">
            <div className="absolute -left-2 top-12 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan/95 shadow-[0_0_24px_rgba(34,211,238,0.34)]">
              Cloud
            </div>
            <div className="absolute -right-2 top-28 rounded-full border border-violet/45 bg-violet/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.34)]">
              Rocket
            </div>
            <div className="absolute right-6 bottom-14 rounded-full border border-fuchsia-300/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 shadow-[0_0_20px_rgba(232,121,249,0.32)]">
              Gear
            </div>

            <div className="hero-subject-frame relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/[0.06] p-2 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]">
              <img
                src="/images/moto-digee-hero.png"
                alt="Confident MOTO DIGEE creator holding a camera"
                className="hero-subject-image h-auto w-full rounded-[1.45rem] object-cover"
                width="768"
                height="1344"
                decoding="async"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050814]/70 via-[#050814]/10 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
