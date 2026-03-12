import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionTitle from "./SectionTitle";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

function getFormStartedAt() {
  return Date.now();
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formStartedAt, setFormStartedAt] = useState(getFormStartedAt);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formStartedAt,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Your message could not be sent right now. Please try again."
        );
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Thanks for reaching out. Your message has been received and a confirmation email is on the way.",
      });
      setFormData(INITIAL_FORM);
      setFormStartedAt(getFormStartedAt());
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while sending your message. Please email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-wrap pb-20">
      <SectionTitle
        kicker="Contact"
        title="Let's Build Something Great"
        subtitle="Available for full-time roles, freelance collaborations, and product-focused engineering projects."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="card-base space-y-4 p-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={formData.company}
              onChange={updateField}
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input-base"
              placeholder="Your name"
              maxLength="80"
              value={formData.name}
              onChange={updateField}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-base"
              placeholder="you@example.com"
              maxLength="254"
              value={formData.email}
              onChange={updateField}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm text-slate-300">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="input-base"
              placeholder="Project inquiry"
              maxLength="120"
              value={formData.subject}
              onChange={updateField}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="input-base resize-none"
              placeholder="Tell me about your project..."
              maxLength="5000"
              value={formData.message}
              onChange={updateField}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-gradient-to-r from-electric to-violet px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {status.message ? (
            <p
              className={`text-sm ${
                status.type === "success" ? "text-emerald-300" : "text-rose-300"
              }`}
              role="status"
            >
              {status.message}
            </p>
          ) : null}
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
            <p>Email: info.elviontech@gmail.com</p>
            <p>GitHub: github.com/elviontech</p>
            <p>LinkedIn: linkedin.com/in/elviontech</p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="mailto:info.elviontech@gmail.com"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="Mail"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/elviontech"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-slate-200 transition hover:border-electric/50 hover:text-electric"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/elviontech"
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
