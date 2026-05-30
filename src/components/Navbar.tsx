import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("WORK");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
    >
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/30" : ""
        }`}
      >
        {/* Logo */}
        <a href="https://my-portfolio-iota-liart-87.vercel.app/#" target="_blank" rel="noopener noreferrer" className="group relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-110">
          <div className="absolute inset-0 rounded-full accent-gradient opacity-100 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
          <div className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary mt-0.5">V</span>
          </div>
        </a>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Links */}
        <div className="flex items-center gap-1">
          {["WORK", "BUILD"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActive(link)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-300 ${
                active === link
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Say Hi Button */}
        <a href="#contact" className="group relative text-xs sm:text-sm rounded-full cursor-pointer flex items-center justify-center w-auto">
          <div className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 bg-surface rounded-full flex items-center gap-2 border border-stroke group-hover:border-transparent transition-colors duration-300">
            <span className="text-text-primary">SAYHI</span>
            <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </div>
        </a>
      </div>
    </motion.nav>
  );
}
