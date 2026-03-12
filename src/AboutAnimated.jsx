import { motion } from "framer-motion";

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Firebase",
  "UI Systems",
];

// Shared entrance variant for elements that should fade in and rise slightly.
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Parent variant used to stagger children as they enter the viewport.
const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export default function AboutAnimated() {
  return (
    <section
      id="about"
      aria-labelledby="about-animated-title"
      className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.32),transparent_40%),linear-gradient(180deg,#23003c_0%,#09040f_100%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.figure
          className="group mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <img
            src="/images/profile-avatar.png"
            alt="Elvis standing with a camera"
            className="block h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <motion.div
          className="space-y-6"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300/90"
            variants={fadeUp}
          >
            My Intro
          </motion.p>

          <motion.h2
            id="about-animated-title"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            About Me
          </motion.h2>

          {/* Each paragraph reuses the same fade-up variant so the content enters consistently. */}
          <motion.p
            className="max-w-3xl text-lg leading-8 text-white/80"
            variants={fadeUp}
          >
            Hello! I&apos;m Elvis, a passionate developer based in Tanzania. I
            work with HTML, CSS, JavaScript, React, Tailwind CSS, Firebase, and
            modern UI tooling to create responsive, polished digital products.
          </motion.p>

          <motion.p
            className="max-w-3xl text-lg leading-8 text-white/80"
            variants={fadeUp}
          >
            I enjoy solving practical product problems, writing maintainable
            code, and building interfaces that feel clear, fast, and reliable
            across devices. I keep improving through real projects, design
            iteration, and collaboration.
          </motion.p>

          <div>
            <motion.h3
              className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60"
              variants={fadeUp}
            >
              Core Skills
            </motion.h3>

            {/* The list container staggers each skill pill for a cleaner progressive reveal. */}
            <motion.ul
              className="mt-4 flex flex-wrap gap-3"
              variants={staggerParent}
            >
              {skills.map((skill) => (
                <motion.li
                  key={skill}
                  className="rounded-full border border-fuchsia-400/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm"
                  variants={fadeUp}
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
