import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface SuccessCheckProps {
  onComplete?: () => void;
}

export const SuccessCheck: React.FC<SuccessCheckProps> = ({ onComplete }) => {
  useEffect(() => {
    // Fire celebratory gold confetti matching the website theme
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    try {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ffd166', '#c59b27', '#ffffff'],
      });
      fire(0.2, {
        spread: 60,
        colors: ['#ffd166', '#f3e7be', '#25D366'],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ffd166', '#d4af37', '#e6ca65'],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ['#ffffff', '#ffd166', '#fff9e6'],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#ffd166', '#c59b27'],
      });
    } catch {
      // In case canvas-confetti is unsupported
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center my-6">
      {/* Warm Gold Aura Burst */}
      <motion.div
        className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#c59b27]/30 via-[#ffd166]/25 to-transparent blur-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* SVG Container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#1b1f28] to-[#10151C] border-2 border-[#ffd166] shadow-[0_0_35px_rgba(255,209,102,0.4)] flex items-center justify-center">
        <svg
          className="w-12 h-12 sm:w-14 sm:h-14 text-[#ffd166]"
          viewBox="0 0 52 52"
          fill="none"
        >
          {/* Outer circle */}
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            stroke="#ffd166"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Inner self-drawing gold checkmark */}
          <motion.path
            d="M15 27L22.5 34.5L37 19"
            stroke="#ffd166"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            onAnimationComplete={onComplete}
          />
        </svg>
      </div>
    </div>
  );
};
