import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "35+" },
  { label: "Technologies Mastered", value: "20+" },
];

export default function About() {
  return (
    <section id="about" className="section-wrap">
      <SectionTitle
        kicker="About"
        title="Building Products End-to-End"
        subtitle="I focus on turning ideas into resilient digital products with thoughtful UX and production-grade backend systems."
      />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          className="card-base p-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-slate-200">
            I am a full stack developer passionate about creating premium web
            experiences on the frontend and reliable business logic on the
            backend. From planning and architecture to deployment and
            monitoring, I ship complete applications with performance, security,
            and usability in mind.
          </p>
          <p className="mt-4 text-slate-300">
            I work across modern JavaScript and Python ecosystems, collaborate
            closely with product teams, and optimize delivery with clean
            reusable systems.
          </p>
        </motion.div>

        <motion.div
          className="card-base p-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="avatar-ring">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-2xl font-bold text-white">
                AC
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl text-white">Alex Carter</h3>
              <p className="text-sm text-slate-300">Full Stack Developer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="font-display text-2xl text-white">{stat.value}</p>
                <p className="text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
