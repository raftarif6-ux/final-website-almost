import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const titleSize = size === 'sm' ? 'text-[12px]' : size === 'lg' ? 'text-[16px]' : 'text-[14px]';
  const subtitleSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[9px]';

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Emblem Icon with Animated Hover Flare */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1e2530] to-[#0c0e12] border border-[#2A3441] shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:border-[#ffd166] group-hover:shadow-[0_0_25px_rgba(255,209,102,0.4)] group-hover:-translate-y-0.5 group-hover:rotate-1 transition-all duration-300 shrink-0 overflow-hidden"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Ambient inner animated sheen */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#6EA8FF]/20 via-transparent to-[#ffd166]/20 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Bespoke Geometric Nexus "N" SVG Mark */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 relative z-10 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="nexoraCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8C8FF" />
              <stop offset="50%" stopColor="#6ED6E2" />
              <stop offset="100%" stopColor="#6EA8FF" />
            </linearGradient>
            <linearGradient id="nexoraGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F39C12" />
              <stop offset="100%" stopColor="#FFD166" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#6ed6e2" floodOpacity="0.5" />
            </filter>
          </defs>
          <rect
            x="7"
            y="7"
            width="4.2"
            height="22"
            rx="2.1"
            fill="url(#nexoraCyan)"
          />
          <rect
            x="24.8"
            y="7"
            width="4.2"
            height="22"
            rx="2.1"
            fill="url(#nexoraCyan)"
          />
          <path
            d="M8.5 8.5L27.5 27.5"
            stroke="url(#nexoraGold)"
            strokeWidth="4.2"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <circle
            cx="18"
            cy="18"
            r="2.5"
            fill="#FFFFFF"
            className="animate-pulse"
          />
          <circle
            cx="18"
            cy="18"
            r="4.5"
            stroke="url(#nexoraGold)"
            strokeWidth="0.8"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typography with Hover Gradient Transition */}
      <div className="flex flex-col select-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-['Geist'] ${titleSize} font-bold tracking-[0.22em] text-[#F3F0E8] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#6ed6e2] group-hover:to-[#ffd166] transition-all duration-300 uppercase leading-tight`}>
            NEXORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6ed6e2] shadow-[0_0_8px_#6ed6e2] group-hover:scale-125 transition-transform animate-pulse" />
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`font-['Geist'] ${subtitleSize} tracking-[0.32em] text-[#8c919d] group-hover:text-[#c2c6d3] uppercase font-semibold transition-colors leading-none`}>
              DIGITAL
            </span>
            <span className="text-[7px] text-[#2A3441] font-mono">/</span>
            <span className="text-[8px] tracking-[0.2em] text-[#ffd166]/80 group-hover:text-[#ffd166] font-mono font-medium transition-colors">
              v4.2
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
