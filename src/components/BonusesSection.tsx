import React from 'react';
import { Terminal, Send, Calculator, CheckSquare, Sparkles, ArrowRight } from 'lucide-react';

interface BonusesSectionProps {
  onOpenPrompts: (tab: 'prompts' | 'scripts') => void;
  onOpenCalculator: () => void;
  onOpenTracker: () => void;
  onOpenTools: () => void;
}

export const BonusesSection: React.FC<BonusesSectionProps> = ({
  onOpenPrompts,
  onOpenCalculator,
  onOpenTracker,
  onOpenTools,
}) => {
  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40" id="bonuses">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block mb-1 font-semibold">
            Augmented Value Suite
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Your guide comes with a practical toolkit.
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] mt-2">
            Included at zero additional cost. Five operational artifacts designed to accelerate implementation and eliminate guesswork.
          </p>
        </div>

        {/* Bonus Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bonus 1 */}
          <div
            onClick={() => onOpenPrompts('prompts')}
            className="bg-[#1e2023] border border-[#2A3441] rounded-xl p-8 space-y-4 shadow-md flex flex-col justify-between hover:border-[#ffd166] transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase font-semibold">
                  Bonus Artifact 01
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase">
                  PDF / Notion
                </span>
              </div>
              <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                50+ Battle-Tested AI Prompts
              </h3>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
                Pre-engineered prompt chains for content production, customer outreach, niche research, and high-converting copy generation.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[#ffd166] font-['Geist'] text-xs uppercase">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Plug-and-play templates</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bonus 2 */}
          <div
            onClick={() => onOpenPrompts('scripts')}
            className="bg-[#1e2023] border border-[#2A3441] rounded-xl p-8 space-y-4 shadow-md flex flex-col justify-between hover:border-[#6EA8FF] transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Geist'] text-[10px] text-[#a8c8ff] uppercase font-semibold">
                  Bonus Artifact 02
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase">
                  DOCX / Notion
                </span>
              </div>
              <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                Client Outreach Scripts
              </h3>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
                Professional, non-spammy cold email and LinkedIn message frameworks crafted specifically to pitch local businesses and digital clients.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[#a8c8ff] font-['Geist'] text-xs uppercase">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Tested response rates</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bonus 3 */}
          <div
            onClick={onOpenCalculator}
            className="bg-[#1e2023] border border-[#2A3441] rounded-xl p-8 space-y-4 shadow-md flex flex-col justify-between hover:border-[#b4c8e3] transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Geist'] text-[10px] text-[#b4c8e3] uppercase font-semibold">
                  Bonus Artifact 03
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase">
                  XLSX / Sheets
                </span>
              </div>
              <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                Side Hustle Pricing Calculator
              </h3>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
                A dynamic financial model to calculate your hourly rate, project-based pricing, and recurring client retainers based on realistic delivery hours.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[#b4c8e3] font-['Geist'] text-xs uppercase">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>Launch Interactive Tool</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bonus 4 */}
          <div
            onClick={onOpenTracker}
            className="bg-[#1e2023] border border-[#2A3441] rounded-xl p-8 space-y-4 shadow-md flex flex-col justify-between hover:border-[#ffd166] transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase font-semibold">
                  Bonus Artifact 04
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase">
                  PDF Printable
                </span>
              </div>
              <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                30-Day Action Roadmap
              </h3>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
                A day-by-day checklist that guides your launch sequence. Designed specifically to eliminate friction and sustain continuous momentum.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[#ffd166] font-['Geist'] text-xs uppercase">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span>Open Milestone Checklist</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bonus 5 */}
          <div
            onClick={onOpenTools}
            className="bg-[#1e2023] border border-[#2A3441] rounded-xl p-8 space-y-4 shadow-md flex flex-col justify-between lg:col-span-2 hover:border-[#a8c8ff] transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Geist'] text-[10px] text-[#a8c8ff] uppercase font-semibold">
                  Bonus Artifact 05
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase">
                  Curated Web Directory
                </span>
              </div>
              <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                Beginner-Friendly AI Tools Directory
              </h3>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] max-w-xl leading-relaxed">
                An active index of 60+ free and low-cost tools categorized by utility: writing, audio synthesis, design, automation, and landing page creation.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[#a8c8ff] font-['Geist'] text-xs uppercase">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Explore Searchable Tools Directory</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
