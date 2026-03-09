import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useMemo, useState } from "react";
import SectionTitle from "./SectionTitle";

const filters = ["All", "SaaS", "E-commerce", "Productivity", "Social"];

const projects = [
  {
    title: "NovaCart Commerce",
    description:
      "A full-stack e-commerce platform with personalized recommendations, role-based admin, and analytics.",
    category: "E-commerce",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    title: "Flowboard Pro",
    description:
      "A collaborative task management app with real-time updates, team workspaces, and automation rules.",
    category: "Productivity",
    stack: ["Next.js", "TypeScript", "Firebase"],
  },
  {
    title: "Orbit Social",
    description:
      "A social media platform featuring live notifications, media uploads, and feed ranking.",
    category: "Social",
    stack: ["React", "Express", "MongoDB"],
  },
  {
    title: "PulseOps Dashboard",
    description:
      "A SaaS analytics dashboard with modular widgets, billing flows, and secure API integrations.",
    category: "SaaS",
    stack: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
  },
  {
    title: "Portfolio CMS Engine",
    description:
      "A headless CMS starter for portfolio websites with markdown editing and static site generation.",
    category: "SaaS",
    stack: ["React", "Django", "MySQL"],
  },
  {
    title: "Bookly Reserve",
    description:
      "A booking platform for service businesses with calendar sync, reminders, and invoice generation.",
    category: "Productivity",
    stack: ["Laravel", "Vue", "MySQL"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="section-wrap">
      <SectionTitle
        kicker="Projects"
        title="Featured Product Work"
        subtitle="Selected projects focused on performance, scale, design quality, and business outcomes."
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? "bg-gradient-to-r from-electric to-violet text-white shadow-glow"
                : "border border-white/15 bg-white/5 text-slate-300 hover:border-electric/50 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.06, duration: 0.42 }}
            className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-electric/60"
          >
            <div className="h-40 bg-[radial-gradient(circle_at_20%_20%,rgba(45,123,255,.4),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(142,91,255,.4),transparent_45%),linear-gradient(180deg,#0a1023,#050814)]" />

            <div className="p-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-electric">
                {project.category}
              </p>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/15 bg-black/20 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-electric/50 hover:text-white"
                >
                  <Github size={15} />
                  GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-electric to-violet px-3 py-2 text-sm text-white transition hover:brightness-110"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
