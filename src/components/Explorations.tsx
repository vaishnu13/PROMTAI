import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80",
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !col1Ref.current || !col2Ref.current) return;

    // Pin the center content
    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: contentRef.current,
      pinSpacing: false,
    });

    // Parallax for left column (moves up faster)
    const col1Anim = gsap.fromTo(
      col1Ref.current,
      { y: "20vh" },
      {
        y: "-100vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Parallax for right column (starts lower, moves up slower)
    const col2Anim = gsap.fromTo(
      col2Ref.current,
      { y: "60vh" },
      {
        y: "-50vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      pin.kill();
      col1Anim.kill();
      col2Anim.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="modes" className="relative w-full min-h-[300vh] bg-bg overflow-hidden">
      
      {/* Pinned Center Content */}
      <div ref={contentRef} className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none">

      </div>

      {/* Floating Parallax Columns */}
      <div className="absolute inset-0 w-full max-w-[1400px] mx-auto px-4 z-20 pointer-events-none flex justify-between">
        
        {/* Left Column */}
        <div ref={col1Ref} className="w-1/3 flex flex-col gap-24 md:gap-40 items-start pt-[50vh]">
          {EXPLORATIONS.slice(0, 3).map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxImg(img)}
              className="pointer-events-auto w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden cursor-zoom-in group border border-stroke shadow-2xl shadow-black/50 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            >
              <img src={img} alt="Exploration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div ref={col2Ref} className="w-1/3 flex flex-col gap-24 md:gap-40 items-end pt-[80vh]">
          {EXPLORATIONS.slice(3, 6).map((img, idx) => (
            <div 
              key={idx + 3}
              onClick={() => setLightboxImg(img)}
              className="pointer-events-auto w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden cursor-zoom-in group border border-stroke shadow-2xl shadow-black/50 transform rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <img src={img} alt="Exploration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              src={lightboxImg}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary hover:bg-stroke/50 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
