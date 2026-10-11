import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollIndicators: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(scrolled);
      }
      if (winScroll > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Thin Fixed Progress Bar at top */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#6EA8FF] via-[#6ed6e2] to-[#ffd166] shadow-[0_0_10px_rgba(255,209,102,0.6)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#171D25]/90 border border-[#2A3441] text-[#ffd166] shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:border-[#ffd166] hover:bg-[#282a2e] hover:shadow-[0_0_20px_rgba(255,209,102,0.3)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-center gap-2"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden sm:inline font-['Geist'] text-[10px] uppercase font-semibold tracking-wider text-[#c2c6d3] group-hover:text-[#F3F0E8]">
            Top
          </span>
        </button>
      )}
    </>
  );
};
