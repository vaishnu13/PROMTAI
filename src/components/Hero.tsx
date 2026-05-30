import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { Link } from "react-router-dom";

const ROLES = ["Analyzer", "Optimizer", "Generator", "Assistant"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const [hash, setHash] = useState(window.location.hash || '#work');

  // Listen to hash changes for Navbar clicks
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || '#work');
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 3 }); // wait for loading screen
    tl.fromTo(
      ".name-reveal",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2 }
    ).fromTo(
      ".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );
  }, []);

  // Initialize HLS Video
  useEffect(() => {
    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          startLevel: -1,
          capLevelToPlayerSize: true,
        });
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {});
        });
        return () => hls.destroy();
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoSrc;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play().catch(() => {});
        });
      }
    }
  }, []);

  // Cycle Roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full mt-16">
        <p className="blur-in opacity-0 text-xs text-muted uppercase tracking-[0.3em] mb-8">
          POWERED BY VAISHNU
        </p>

        <h1 className="name-reveal opacity-0 text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight text-text-primary mb-6">
          PromptPilot
        </h1>

        <div className="blur-in opacity-0 text-lg md:text-2xl text-text-primary/90 mb-6 flex items-center gap-2">
          <span>The ultimate AI prompt</span>
          <span key={roleIndex} className="font-display text-text-primary animate-role-fade-in inline-block">
            {ROLES[roleIndex]}
          </span>
        </div>

        <p className="blur-in opacity-0 text-sm md:text-base text-muted max-w-md mx-auto mb-12 transition-all duration-500">
          {hash === '#build' 
            ? "Building applications using AI."
            : "Transform simple user prompts into structured, production-ready prompts for app development, coding, and generative workflows."}
        </p>

        <div className="blur-in opacity-0 flex flex-col sm:flex-row items-center gap-4">
          <Link to="/optimizer" className="group relative rounded-full hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 rounded-full text-sm px-7 py-3.5 font-medium">
              Start Optimizing
            </div>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 blur-in opacity-0">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
