import { motion } from "motion/react";

const STATS = [
  { value: "10+", label: "AI Modes" },
  { value: "100x", label: "Faster Prompts" },
  { value: "99%", label: "Precision Score" },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col items-center justify-center text-center ${
                idx !== 0 ? "pt-12 md:pt-0" : ""
              }`}
            >
              <h3 className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary mb-4">
                {stat.value}
              </h3>
              <p className="text-muted uppercase tracking-[0.2em] text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
