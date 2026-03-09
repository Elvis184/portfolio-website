import { motion } from "framer-motion";
import { Code2, Database, Globe, Layers3, Plug, Zap } from "lucide-react";
import SectionTitle from "./SectionTitle";

const services = [
  { title: "Frontend Development", icon: Globe },
  { title: "Backend Development", icon: Database },
  { title: "Full Stack Web Apps", icon: Layers3 },
  { title: "API Integration", icon: Plug },
  { title: "UI Implementation", icon: Code2 },
  { title: "Website Optimization", icon: Zap },
];

export default function Services() {
  return (
    <section id="services" className="section-wrap">
      <SectionTitle
        kicker="Services"
        title="What I Can Build For You"
        subtitle="From polished interfaces to scalable architecture, designed for speed and reliability."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              className="card-base p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.07, duration: 0.4 }}
            >
              <div className="mb-4 inline-flex rounded-xl border border-electric/30 bg-electric/15 p-3 text-electric">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
