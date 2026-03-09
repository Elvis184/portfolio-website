import { motion } from "framer-motion";

export default function SectionTitle({ kicker, title, subtitle }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-electric">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-slate-300">{subtitle}</p>}
    </motion.div>
  );
}
