import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: '/hq720.jpg', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: '/Gemini_Generated_Image_751q0a751q0a751q.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

export default function ToonhubCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    // Preload
    IMAGES.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (dir === 'next') {
      setActiveIndex(prev => (prev + 1) % 4);
    } else {
      setActiveIndex(prev => (prev + 3) % 4);
    }
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 650);
  };

  return (
    <div 
      className="relative w-full overflow-hidden" 
      style={{ 
        backgroundColor: 'black', 
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        
        {/* Grain overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-50" 
          style={{ 
            opacity: 0.4, 
            backgroundSize: '200px 200px', 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Giant ghost text */}
        <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]" style={{ top: '18%' }}>
          <h1 
            className="text-white uppercase whitespace-nowrap m-0 p-0"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(50px, 16vw, 220px)',
              fontWeight: 900,
              opacity: 1,
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            TRY YOUR SELF
          </h1>
        </div>

        {/* Top-left brand removed */}

        {/* Carousel */}
        <div className="absolute inset-0 z-[3]">
          {IMAGES.map((item, i) => {
            let role = 'none';
            if (i === activeIndex) role = 'center';
            else if (i === (activeIndex + 3) % 4) role = 'left';
            else if (i === (activeIndex + 1) % 4) role = 'right';
            else if (i === (activeIndex + 2) % 4) role = 'back';

            let transform = '';
            let blur = '';
            let opacity = 0;
            let zIndex = 0;
            let left = '';
            let height = '';
            let bottom = '';

            if (role === 'center') {
              transform = `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`;
              blur = 'blur(0px)';
              opacity = 1;
              zIndex = 20;
              left = '50%';
              height = isMobile ? '60%' : '92%';
              bottom = isMobile ? '22%' : '0';
            } else if (role === 'left') {
              transform = `translateX(-50%) scale(1)`;
              blur = 'blur(2px)';
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? '20%' : '30%';
              height = isMobile ? '16%' : '28%';
              bottom = isMobile ? '32%' : '12%';
            } else if (role === 'right') {
              transform = `translateX(-50%) scale(1)`;
              blur = 'blur(2px)';
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? '80%' : '70%';
              height = isMobile ? '16%' : '28%';
              bottom = isMobile ? '32%' : '12%';
            } else if (role === 'back') {
              transform = `translateX(-50%) scale(1)`;
              blur = 'blur(4px)';
              opacity = 1;
              zIndex = 5;
              left = '50%';
              height = isMobile ? '13%' : '22%';
              bottom = isMobile ? '32%' : '12%';
            }

            return (
              <div 
                key={i}
                className="absolute"
                style={{
                  aspectRatio: '0.6 / 1',
                  transform,
                  filter: blur,
                  opacity,
                  zIndex,
                  left,
                  height,
                  bottom,
                  transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'transform, filter, opacity'
                }}
              >
                <img 
                  src={item.src} 
                  alt={`Toonhub ${i}`} 
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left text + nav */}
        <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-[60] max-w-[320px]">
          <p className="hidden sm:block text-xs sm:text-sm text-white/85 leading-[1.6] mb-4 sm:mb-5">
            Create optimized prompts for coding, app development, automation, and AI workflows in seconds.
          </p>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-150 hover:scale-[1.08] hover:bg-white/12 cursor-pointer"
            >
              <ArrowLeft strokeWidth={2.25} size={26} />
            </button>
            <button 
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-150 hover:scale-[1.08] hover:bg-white/12 cursor-pointer"
            >
              <ArrowRight strokeWidth={2.25} size={26} />
            </button>
            <span className="text-white/80 text-sm font-semibold uppercase tracking-widest ml-2">Click Here</span>
          </div>
        </div>

        {/* Bottom-right link */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-[60]">
          <a 
            href="#" 
            className="flex items-center text-white opacity-95 hover:opacity-100 transition-opacity duration-200 no-underline uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}
          >
            TRY NOW
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 ml-2 sm:ml-4" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </div>
  );
}
