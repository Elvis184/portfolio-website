import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
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
    <section id="hero" className="hero-root relative overflow-hidden pt-36 sm:pt-44">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_18%,rgba(45,123,255,.3),transparent_34%),radial-gradient(circle_at_80%_14%,rgba(142,91,255,.26),transparent_38%),radial-gradient(circle_at_50%_88%,rgba(52,231,255,.18),transparent_36%)]" />
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:44px_44px] opacity-30" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-electric/20 blur-3xl sm:h-96 sm:w-96" />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="hero-panel mx-auto max-w-5xl rounded-[2rem] border border-white/15 bg-white/[0.06] p-8 text-center shadow-glow backdrop-blur-xl sm:p-12 lg:p-16"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-slate-200"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_rgba(52,231,255,0.85)]" />
            Modern Web Solutions Studio
          </motion.p>

          <motion.h1
            variants={item}
            className="hero-heading font-display text-5xl font-bold uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-[5.8rem]"
          >
            <span className="bg-[linear-gradient(135deg,#ffffff_0%,#d7e6ff_40%,#7dd3fc_100%)] bg-clip-text text-transparent">
              ELVION TECH
            </span>
          </motion.h1>

          <motion.div variants={item} className="hero-title-underline mx-auto mt-6" />

          <motion.p
            variants={item}
            className="hero-tagline mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            A modern web solutions studio crafting fast, scalable, and polished digital experiences for ambitious brands, startups, and products.
          </motion.p>

          <motion.div variants={item} className="hero-actions-row mt-10 flex flex-wrap items-center justify-center gap-4">
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
              Start a Project
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-3">
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
        </motion.div>
      </div>
    </section>
  );
}
