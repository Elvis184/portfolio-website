import { useState } from "react";
import { motion } from "framer-motion";

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Firebase",
  "UI Systems",
];

const highlights = [
  { label: "Experience", value: "Frontend systems" },
  { label: "Focus", value: "Modern web products" },
  { label: "Approach", value: "Clean and reliable UI" },
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
  const [imageSrc, setImageSrc] = useState("images/profile-avatar.png");
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const fallbackSources = [
    "images/profile-avatar.png",
    "images/hero.png",
    "images/hero-placeholder.svg",
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-animated-title"
      className="relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.figure
          className="profile-ripple group mx-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(30,41,59,0.72)] shadow-[0_30px_70px_-40px_rgba(2,6,23,0.8)] backdrop-blur-md"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <img
            src={imageSrc}
            alt="Elvis standing with a camera"
            className="block h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => {
              setFallbackIndex((currentIndex) => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < fallbackSources.length) {
                  setImageSrc(fallbackSources[nextIndex]);
                  return nextIndex;
                }
                return currentIndex;
              });
            }}
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
            className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/90"
            variants={fadeUp}
          >
            About
          </motion.p>

          <motion.h2
            id="about-animated-title"
            className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            Building readable, fast, and modern product interfaces
          </motion.h2>

          <motion.p
            className="max-w-2xl text-lg leading-8 text-slate-300"
            variants={fadeUp}
          >
            Hello! I&apos;m Elvis, a passionate developer based in Tanzania. I
            work with HTML, CSS, JavaScript, React, Tailwind CSS, Firebase, and
            modern UI tooling to create responsive, polished digital products.
          </motion.p>

          <motion.p
            className="max-w-2xl text-lg leading-8 text-slate-400"
            variants={fadeUp}
          >
            I enjoy solving practical product problems, writing maintainable
            code, and building interfaces that feel clear, fast, and reliable
            across devices. I keep improving through real projects, design
            iteration, and collaboration.
          </motion.p>

          <motion.div
            className="grid gap-3 sm:grid-cols-3"
            variants={staggerParent}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                className="rounded-[20px] border border-white/10 bg-[rgba(30,41,59,0.6)] px-4 py-4 backdrop-blur-md"
                variants={fadeUp}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {item.label}
                </p>
                <p className="m-0 text-sm font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div>
            <motion.h3
              className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400"
              variants={fadeUp}
            >
              Core Skills
            </motion.h3>

            <motion.ul
              className="mt-4 flex flex-wrap gap-3"
              variants={staggerParent}
            >
              {skills.map((skill) => (
                <motion.li
                  key={skill}
                  className="rounded-full border border-white/10 bg-[rgba(30,41,59,0.72)] px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30"
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
