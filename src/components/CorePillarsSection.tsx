import React from 'react';
import { Focus, Wrench, GitFork, Sliders } from 'lucide-react';

export const CorePillarsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block font-semibold">
            Core Pillars
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Engineered for real-world impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1e2023] border border-[#2A3441] p-8 rounded-xl space-y-3 shadow-md hover:border-[#ffd166] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Focus className="w-5 h-5" />
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal pt-2">CLARITY</h3>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              No convoluted coding terms or vague theories. Direct explanations anyone can understand immediately.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-8 rounded-xl space-y-3 shadow-md hover:border-[#a8c8ff] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#a8c8ff]">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal pt-2">PRACTICALITY</h3>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Realistic business ideas you can start in your spare time without expensive software or hardware.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-8 rounded-xl space-y-3 shadow-md hover:border-[#b4c8e3] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#b4c8e3]">
              <GitFork className="w-5 h-5" />
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal pt-2">STRUCTURE</h3>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Systematic day-by-day roadmaps, ready-to-use templates, and pricing formulas to organize every phase.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-8 rounded-xl space-y-3 shadow-md hover:border-[#ffd166] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal pt-2">FLEXIBILITY</h3>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Choose from 30 different models that fit your schedule, from 2 hours a week to a full-time venture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
