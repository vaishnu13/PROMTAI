import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ToonhubCarousel from "../components/ToonhubCarousel";

import CinematicSection from "../components/CinematicSection";
import ContactFooter from "../components/ContactFooter";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // Update URL hash without jumping, and trigger hashchange event for Hero.tsx
        window.history.pushState(null, "", href);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`w-full bg-bg transition-opacity duration-1000 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        {!isLoading && <Navbar />}
        <Hero />
        <CinematicSection />
        <ToonhubCarousel />
        <ContactFooter />
      </div>
    </>
  );
}
