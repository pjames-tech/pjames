import { motion } from "framer-motion";
import { services } from "./servicesData";
import type { ServiceItem } from "./servicesData";

/* ──────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ──────────────────────────────────────────────────────────────────────
   SERVICE CARD
   ────────────────────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const isOffset = index === 1;

  return (
    <motion.div
      variants={cardVariants}
      className={`service-pillar group relative flex flex-col overflow-hidden rounded-2xl p-8 lg:p-10
        glassmorphism-panel soft-border
        hover:border-[rgb(var(--accent)/0.3)]
        transition-all duration-500
        ${isOffset ? "lg:translate-y-12" : ""}`}>
      {/* ── Glow Overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgb(var(--accent) / 0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Number */}
        <span className="font-display text-[var(--step-2)] font-bold text-[rgb(var(--accent)/0.2)] transition-colors duration-500 group-hover:text-[rgb(var(--accent)/0.4)] mb-6 block">
          {service.number}
        </span>

        {/* Title */}
        <h3 className="font-display text-[var(--step-1)] font-bold leading-tight text-text mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Sub-Services (architectural left-border list) */}
        <ul className="mb-8 space-y-2 border-l-2 border-[rgb(var(--accent)/0.15)] pl-4 group-hover:border-[rgb(var(--accent)/0.35)] transition-colors duration-500">
          {service.subServices.map((sub) => (
            <li key={sub} className="text-[13px] text-muted/80 tracking-wide">
              {sub}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-text/5 text-muted border border-text/5 group-hover:border-[rgb(var(--accent)/0.2)] transition">
              {tag}
            </span>
          ))}
        </div>

        {/* Tech Signature */}
        <div className="pt-4 border-t border-text/5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted/50 font-display">
            Stack: <span className="text-muted/70">{service.techStack}</span>
          </p>
        </div>
      </div>

      {/* ── Bottom Accent Line ── */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[rgb(var(--accent))] to-transparent transition-all duration-700 delay-100 group-hover:w-full" />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   SERVICES GRID
   ────────────────────────────────────────────────────────────────────── */

export default function ServicesGrid() {
  return (
    <motion.div
      className="grid gap-8 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}>
      {services.map((service, index) => (
        <ServiceCard key={service.number} service={service} index={index} />
      ))}
    </motion.div>
  );
}
