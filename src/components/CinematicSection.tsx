import { useEffect, useRef } from "react";


export default function CinematicSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper to run a fade animation using requestAnimationFrame
    const animateOpacity = (targetOpacity: number, duration: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      const startOpacity = opacityRef.current;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear interpolation for opacity
        opacityRef.current = startOpacity + (targetOpacity - startOpacity) * progress;
        if (video) video.style.opacity = opacityRef.current.toString();

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      
      rafRef.current = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      // Fade in on load/loop start
      fadingOutRef.current = false;
      animateOpacity(1, 500);
      video.play().catch(console.error);
    };

    const handleTimeUpdate = () => {
      // Fade out when 0.55 seconds remain
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      
      if (timeLeft <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(0, 500);
      }
    };

    const handleEnded = () => {
      // Ensure opacity is 0, reset after 100ms
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      opacityRef.current = 0;
      video.style.opacity = "0";
      
      setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        video.play().catch(console.error);
        animateOpacity(1, 500);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    
    // Initial setup
    video.style.opacity = "0";
    video.play().catch(console.error);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black overflow-hidden relative w-full flex flex-col -mt-[17vh]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0 }}
        />
      </div>



      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[5%]">
        <div className="mb-6 text-white/70 uppercase tracking-[0.2em] text-sm md:text-base font-semibold">
          Improve prompt quality with intelligent AI
        </div>
        <h1 
          className="text-6xl md:text-7xl lg:text-[6.5rem] text-white mb-8 tracking-tight whitespace-nowrap leading-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Ideas Into Powerful AI Prompts
        </h1>
        
        <div className="max-w-xl w-full space-y-4">
          
          <p className="text-white/90 text-sm leading-relaxed px-4 max-w-md mx-auto">
            Generate professional, structured, and AI-optimized prompts for app development, coding, automation, content creation, and more using advanced AI.
          </p>
        </div>
      </div>
    </section>
  );
}
