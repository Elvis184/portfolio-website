import { motion } from "framer-motion";
import {
  FaAws,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiDjango,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import SectionTitle from "./SectionTitle";

const groups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Laravel", icon: FaLaravel },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "Docker", icon: FaDocker },
      { name: "Firebase", icon: SiFirebase },
      { name: "AWS", icon: FaAws },
      { name: "Vercel", icon: SiVercel },
      { name: "Python", icon: FaPython },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-wrap">
      <SectionTitle
        kicker="Skills"
        title="Modern Stack, Production Mindset"
        subtitle="A balanced toolkit for shipping elegant interfaces and dependable backend infrastructure."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, idx) => (
          <motion.article
            key={group.title}
            className="card-base p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.08, duration: 0.45 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="group rounded-xl border border-white/10 bg-black/25 px-3 py-3 transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="text-electric transition group-hover:text-cyan" />
                      <p className="text-sm text-slate-200">{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
