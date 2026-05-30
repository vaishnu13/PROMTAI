import { motion } from "motion/react";

const ENTRIES = [
  {
    title: "AI Prompt Scoring System",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    date: "Real-time analysis",
    readTime: "Quality metrics",
  },
  {
    title: "One-Click Export & History",
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80",
    date: "TXT, PDF, Markdown",
    readTime: "Search & Save",
  },
  {
    title: "Voice Input Support",
    image: "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?auto=format&fit=crop&q=80",
    date: "Hands-free entry",
    readTime: "Speech to text",
  },
];

export default function Journal() {
  return (
    <section id="capabilities" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Advanced <span className="font-display italic">features</span>
            </h2>
            <p className="text-muted mt-4 max-w-md">
              Powered by Gemini API for intelligent analysis and context enhancement.
            </p>
          </div>
          
          <a href="#" className="hidden md:inline-flex group relative rounded-full items-center justify-center shrink-0 w-fit h-fit">
            <div className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative border border-stroke bg-bg text-text-primary group-hover:border-transparent transition-colors duration-300 rounded-full text-sm px-6 py-3 flex items-center gap-2">
              View all features
              <span className="text-[10px] transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </a>
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg md:text-xl text-text-primary font-medium group-hover:text-white transition-colors duration-300">
                  {entry.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-6 px-4 pb-2 sm:p-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-6 text-sm text-muted">
                  <span>{entry.readTime}</span>
                  <span className="hidden sm:block text-stroke">•</span>
                  <span>{entry.date}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center group-hover:border-white transition-colors duration-300 shrink-0">
                  <span className="text-text-primary group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
