import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="section-wrap pb-20">
      <SectionTitle
        kicker="Contact"
        title="Let’s Build Something Great"
        subtitle="Available for full-time roles, freelance collaborations, and product-focused engineering projects."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="card-base space-y-4 p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">Name</label>
            <input
              type="text"
              className="input-base"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="input-base"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Message</label>
            <textarea
              rows="5"
              className="input-base resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-electric to-violet px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="card-base p-6"
        >
          <h3 className="text-xl font-semibold text-white">Direct Contact</h3>
          <p className="mt-3 text-slate-300">
            Prefer direct communication? Reach out via email or connect through social profiles.
          </p>
          <div className="mt-5 space-y-3 text-sm text-slate-200">
            <p>Email: alex@example.com</p>
            <p>GitHub: github.com/alexcarter</p>
            <p>LinkedIn: linkedin.com/in/alexcarter</p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="mailto:alex@example.com"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="Mail"
            >
              <Mail size={18} />
            </a>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
