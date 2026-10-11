import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top ambient luxury gold glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] bg-[#ffd166]/6 rounded-full blur-[140px]" />

      {/* Side soft warm amber ambient glow */}
      <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-[#c59b27]/7 rounded-full blur-[130px]" />

      {/* Bottom right subtle gold reflection */}
      <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-[#ffd166]/5 rounded-full blur-[140px]" />

      {/* Subtle geometric dot matrix in warm tone */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#ffd166 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
