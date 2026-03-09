import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-36 sm:pt-44">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(45,123,255,.25),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(142,91,255,.23),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(52,231,255,.18),transparent_40%)]" />
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:44px_44px] opacity-40" />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-glow backdrop-blur-xl sm:p-12"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-electric">
            Full Stack Developer
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Alex Carter
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            I build fast, scalable, and beautiful web applications.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-gradient-to-r from-electric to-violet px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-electric/60 hover:bg-electric/10"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:alex@example.com"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
