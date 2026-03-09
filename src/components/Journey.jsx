import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const timeline = [
  {
    date: "2021",
    role: "Frontend Developer Intern",
    description: "Built reusable UI components and improved page load speed by 35%.",
  },
  {
    date: "2022",
    role: "Freelance Full Stack Developer",
    description: "Delivered client products from concept to production in React and Node.js.",
  },
  {
    date: "2023",
    role: "Software Engineer",
    description: "Led end-to-end delivery of internal SaaS tools serving 10k+ monthly users.",
  },
  {
    date: "2024 - Present",
    role: "Senior Full Stack Developer",
    description: "Architecting scalable platforms with modern frontend and cloud-native backend workflows.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="section-wrap">
      <SectionTitle
        kicker="Experience"
        title="Career Journey"
        subtitle="A progression focused on product ownership, scalability, and engineering quality."
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-electric via-violet to-cyan sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                idx % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:ml-auto sm:pl-8"
              }`}
            >
              <span className="absolute left-[9px] top-4 h-3 w-3 rounded-full bg-electric shadow-[0_0_0_4px_rgba(45,123,255,.25)] sm:left-auto sm:right-[-6px] sm:top-5 sm:translate-x-1/2" />
              {idx % 2 !== 0 && (
                <span className="hidden sm:absolute sm:left-[-6px] sm:right-auto sm:block sm:-translate-x-1/2" />
              )}
              <article className="card-base p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-electric">
                  {item.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.role}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
