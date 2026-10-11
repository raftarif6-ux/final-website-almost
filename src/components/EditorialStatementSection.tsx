import React from 'react';

export const EditorialStatementSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40" id="about-the-guide">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-[0.25em] block font-semibold">
          Editorial Philosophy
        </span>
        <blockquote className="font-['Newsreader'] text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e7] leading-tight font-normal">
          “More possibilities. A clearer starting point.”
        </blockquote>
        <p className="font-['Newsreader'] text-lg sm:text-xl text-[#c2c6d3] max-w-2xl mx-auto leading-relaxed">
          Most guides drown novices in esoteric jargon or unrealistic hype. NEXORA DIGITAL strips away speculation to present grounded, systematically validated micro-business operations. You do not need computational engineering credentials; you need clear, disciplined blueprints.
        </p>
        <div className="flex justify-center items-center gap-4 pt-4">
          <span className="h-0.5 w-12 bg-[#333538]"></span>
          <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-widest">
            Nexora Research Group • Volume IV • Authored by Rafay Arif
          </span>
          <span className="h-0.5 w-12 bg-[#333538]"></span>
        </div>
      </div>
    </section>
  );
};
