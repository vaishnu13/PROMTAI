import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORDS = ["Built", "By", "Vaishnu", "Thank You"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let animationFrame: number;
    const duration = 2700;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min((progress / duration) * 100, 100);

      setCount(Math.floor(percentage));

      if (percentage < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden"
    >
      {/* Top Left */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em]">Vaishnu's TM</span>
      </motion.div>

      {/* Center Words */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary/80"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col gap-6">
        {/* Bottom Right Counter */}
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full w-full origin-left accent-gradient"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
