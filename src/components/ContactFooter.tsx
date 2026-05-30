import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  // Marquee Animation
  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const marqueeText = Array(10).fill("ENGINEERING THE PERFECT PROMPT • ").join("");

  return (
    <section id="contact" className="relative w-full pt-16 md:pt-20 pb-8 md:pb-12 bg-bg overflow-hidden flex flex-col items-center justify-between min-h-[80vh]">
      
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center flex-1 justify-center">
        {/* Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-12 select-none opacity-80 mix-blend-screen">
          <div ref={marqueeRef} className="flex whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-stroke/50">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center text-center px-4 mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary mb-12 font-display">
            Ready to optimize?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:unihub.in@gmail.com" className="group relative rounded-full items-center justify-center shrink-0 w-fit h-fit">
              <div className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative border border-stroke bg-surface/50 backdrop-blur-md text-text-primary transition-colors duration-300 rounded-full text-lg md:text-2xl px-12 py-6 flex items-center gap-4">
                UNIHUB.IN@GMAIL.COM
                <span className="text-sm md:text-base transform group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </div>
            </a>
            
            <Link to="/optimizer" className="group relative rounded-full items-center justify-center shrink-0 w-fit h-fit cursor-pointer">
              <div className="absolute inset-[-2px] rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white text-black font-semibold transition-transform duration-300 hover:scale-[1.02] rounded-full text-lg md:text-2xl px-12 py-6 flex items-center gap-3">
                Start Optimizing
                <span className="text-sm md:text-base transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-stroke/50">
        
        {/* Availability */}
        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md border border-stroke rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-xs text-muted">Gemini API Powered</span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6">
          {["Mail", "GitHub", "LinkedIn"].map((link) => (
            <a key={link} href="#" className="text-sm text-muted hover:text-text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
