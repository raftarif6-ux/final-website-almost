import React from 'react';

export const BeginnerJourneySection: React.FC = () => {
  return (
    <section className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block font-semibold">
            Pedagogical Framework
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            The Beginner's Linear Journey
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3]">
            We designed the curriculum to deliberately walk you through progressive stages of capability.
          </p>
        </div>

        {/* 4 Stages Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 relative shadow-md hover:border-[#ffd166] transition-colors">
            <span className="font-['Geist'] text-xs font-mono text-[#ffd166] bg-[#10151C] border border-[#2A3441] px-2.5 py-1 rounded inline-block font-semibold">
              01 EXPLORE
            </span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Discover Models</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Examine 30 tested side hustles. Assess required time, setup complexity, and expected earnings to choose the ideal fit.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 relative shadow-md hover:border-[#a8c8ff] transition-colors">
            <span className="font-['Geist'] text-xs font-mono text-[#a8c8ff] bg-[#10151C] border border-[#2A3441] px-2.5 py-1 rounded inline-block font-semibold">
              02 UNDERSTAND
            </span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Master the Tools</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Demystify artificial intelligence prompts and workflow engines without code. Learn prompt design fundamentals.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 relative shadow-md hover:border-[#b4c8e3] transition-colors">
            <span className="font-['Geist'] text-xs font-mono text-[#b4c8e3] bg-[#10151C] border border-[#2A3441] px-2.5 py-1 rounded inline-block font-semibold">
              03 PLAN
            </span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Structure the Offer</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Use the included pricing calculator and outreach scripts to establish your service packages and commercial rates.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 relative shadow-md hover:border-[#ffd166] transition-colors">
            <span className="font-['Geist'] text-xs font-mono text-[#ffd166] bg-[#10151C] border border-[#2A3441] px-2.5 py-1 rounded inline-block font-semibold">
              04 TAKE ACTION
            </span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Execute & Deliver</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Follow the 30-day timeline to land your initial client, publish your digital artifact, and generate your first income.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
