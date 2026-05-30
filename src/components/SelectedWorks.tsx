import { motion } from "motion/react";

const PROJECTS = [
  {
    title: "Prompt Analyzer",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    colSpan: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-auto md:h-[400px]",
  },
  {
    title: "AI Prompt Optimizer",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    colSpan: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto md:h-[400px]",
  },
  {
    title: "Multi-Mode Generation",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    colSpan: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto md:h-[400px]",
  },
  {
    title: "Smart Suggestions",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80",
    colSpan: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-auto md:h-[400px]",
  },
];

export default function SelectedWorks() {
  return (
    <section id="features" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Core Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Platform <span className="font-display italic">capabilities</span>
            </h2>
            <p className="text-muted mt-4 max-w-md">
              Everything you need to engineer the perfect prompt.
            </p>
          </div>
          
          <a href="#" className="hidden md:inline-flex group relative rounded-full items-center justify-center shrink-0 w-fit h-fit">
            <div className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative border border-stroke bg-bg text-text-primary group-hover:border-transparent transition-colors duration-300 rounded-full text-sm px-6 py-3 flex items-center gap-2">
              Explore capabilities
              <span className="text-[10px] transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl ${project.colSpan} ${project.aspect} cursor-pointer flex items-center justify-center`}
            >
              {/* Text Content (Replacing Image) */}
              <div className="relative z-10 p-8 text-center transition-transform duration-500 group-hover:scale-105">
                <h3 className="text-2xl md:text-4xl text-text-primary font-display italic">
                  {project.title}
                </h3>
              </div>
              
              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-plus-lighter pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "8px 8px" }}
              />

              {/* Hover Highlight State */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 ease-out pointer-events-none flex items-center justify-center">
                {/* Hover Pill Label */}
                <div className="absolute bottom-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="absolute inset-[-2px] rounded-full accent-gradient" />
                  <div className="relative bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
                    Explore feature <span className="text-[10px]">↗</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
