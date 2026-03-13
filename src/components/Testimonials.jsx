import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const testimonials = [
  {
    name: "Olivia Grant",
    role: "Product Manager, SaaS Startup",
    quote:
      "Elvis combines clean engineering with strong product thinking. Delivery speed and code quality were both excellent.",
  },
  {
    name: "Daniel Kim",
    role: "Founder, E-commerce Brand",
    quote:
      "Our platform performance improved significantly, and the UX feels premium. Communication and execution were top-tier.",
  },
  {
    name: "Nora Hassan",
    role: "Design Lead",
    quote:
      "From component architecture to final polish, Elvis translated design intent into a robust, scalable frontend system.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-wrap">
      <SectionTitle
        kicker="Testimonials"
        title="What People Say"
        subtitle="Feedback from teams and clients on delivery, communication, and engineering quality."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.article
            key={item.name}
            className="card-base p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.08, duration: 0.43 }}
          >
            <p className="text-sm leading-relaxed text-slate-200">"{item.quote}"</p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sm text-slate-300">{item.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
