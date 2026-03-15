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
      {
        name: "HTML",
        icon: FaHtml5,
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        name: "CSS",
        icon: FaCss3Alt,
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "JavaScript",
        icon: FaJs,
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        href: "https://www.typescriptlang.org/",
      },
      {
        name: "React",
        icon: FaReact,
        href: "https://react.dev/",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        href: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        href: "https://tailwindcss.com/",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        href: "https://nodejs.org/",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        href: "https://expressjs.com/",
      },
      {
        name: "Laravel",
        icon: FaLaravel,
        href: "https://laravel.com/",
      },
      {
        name: "Django",
        icon: SiDjango,
        href: "https://www.djangoproject.com/",
      },
    ],
  },
  {
    title: "Database",
    items: [
      {
        name: "MongoDB",
        icon: SiMongodb,
        href: "https://www.mongodb.com/",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        href: "https://www.postgresql.org/",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        href: "https://www.mysql.com/",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Git",
        icon: FaGitAlt,
        href: "https://git-scm.com/",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        href: "https://github.com/",
      },
      {
        name: "Docker",
        icon: FaDocker,
        href: "https://www.docker.com/",
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        href: "https://firebase.google.com/",
      },
      {
        name: "AWS",
        icon: FaAws,
        href: "https://aws.amazon.com/",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        href: "https://vercel.com/",
      },
      {
        name: "Python",
        icon: FaPython,
        href: "https://www.python.org/",
      },
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
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-white/10 bg-black/25 px-3 py-3 transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10 focus:outline-none focus:ring-2 focus:ring-electric/30"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="text-electric transition group-hover:text-cyan" />
                      <p className="text-sm text-slate-200">{item.name}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
