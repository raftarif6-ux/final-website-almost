import React from 'react';
import { Palette, Headset, Hammer, ArrowRight } from 'lucide-react';

interface OpportunityLandscapeSectionProps {
  onOpenDirectory: (vector?: 'CREATE' | 'SERVE' | 'BUILD' | 'ALL') => void;
}

export const OpportunityLandscapeSection: React.FC<OpportunityLandscapeSectionProps> = ({
  onOpenDirectory,
}) => {
  return (
    <section id="opportunity-landscape" className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block mb-1 font-semibold">
              Taxonomy of Execution
            </span>
            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
              The AI Opportunity Landscape
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-['Geist'] text-sm text-[#c2c6d3] max-w-md">
              Thirty micro-enterprises segmented across three core functional vectors of the modern computational economy.
            </p>
            <button
              onClick={() => onOpenDirectory('ALL')}
              className="px-4 py-2 rounded-lg bg-[#282a2e] border border-[#2A3441] text-[#ffd166] hover:bg-[#333538] font-['Geist'] text-xs uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer"
            >
              Browse All 30 Blueprints
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chapter 01: CREATE */}
          <div
            onClick={() => onOpenDirectory('CREATE')}
            className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-lg hover:border-[#ffd166] transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest font-semibold">
                  Vector 01
                </span>
                <Palette className="w-6 h-6 text-[#ffd166] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Newsreader'] text-2xl text-[#e2e2e7] font-normal">CREATE</h3>
              <p className="font-['Geist'] text-xs text-[#8c919d] uppercase tracking-wider">
                Content & Creative Workflows
              </p>
              <p className="font-['Geist'] text-sm text-[#c2c6d3] leading-relaxed">
                Harness generative synthetic imaging, localized copy production, and multimedia storyboarding to deliver assets for niche publishing and creative agencies.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-[#2A3441]/50">
              <div className="flex justify-between font-['Geist'] text-xs text-[#e2e2e7]">
                <span>Niche Newsletter Synthesis</span>
                <span className="text-[#ffd166] font-mono">10 Blueprints</span>
              </div>
              <div className="w-full h-1 bg-[#333538] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffd166] w-1/3"></div>
              </div>
              <div className="flex items-center gap-1 text-[#ffd166] text-xs font-['Geist'] pt-1">
                <span>Explore Vector 01</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Chapter 02: SERVE */}
          <div
            onClick={() => onOpenDirectory('SERVE')}
            className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-lg hover:border-[#6EA8FF] transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-[10px] text-[#a8c8ff] uppercase tracking-widest font-semibold">
                  Vector 02
                </span>
                <Headset className="w-6 h-6 text-[#a8c8ff] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Newsreader'] text-2xl text-[#e2e2e7] font-normal">SERVE</h3>
              <p className="font-['Geist'] text-xs text-[#8c919d] uppercase tracking-wider">
                Service-Oriented Client Solutions
              </p>
              <p className="font-['Geist'] text-sm text-[#c2c6d3] leading-relaxed">
                Bridge capacity constraints for local small businesses through automated customer concierge bots, localized search audits, and administrative automation.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-[#2A3441]/50">
              <div className="flex justify-between font-['Geist'] text-xs text-[#e2e2e7]">
                <span>B2B Operational Consulting</span>
                <span className="text-[#a8c8ff] font-mono">10 Blueprints</span>
              </div>
              <div className="w-full h-1 bg-[#333538] rounded-full overflow-hidden">
                <div className="h-full bg-[#6ea8ff] w-2/3"></div>
              </div>
              <div className="flex items-center gap-1 text-[#a8c8ff] text-xs font-['Geist'] pt-1">
                <span>Explore Vector 02</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Chapter 03: BUILD */}
          <div
            onClick={() => onOpenDirectory('BUILD')}
            className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-lg hover:border-[#b4c8e3] transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-[10px] text-[#b4c8e3] uppercase tracking-widest font-semibold">
                  Vector 03
                </span>
                <Hammer className="w-6 h-6 text-[#b4c8e3] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Newsreader'] text-2xl text-[#e2e2e7] font-normal">BUILD</h3>
              <p className="font-['Geist'] text-xs text-[#8c919d] uppercase tracking-wider">
                Digital Assets & Automation
              </p>
              <p className="font-['Geist'] text-sm text-[#c2c6d3] leading-relaxed">
                Architect modular Notion templates, programmatic spreadsheet systems, and reproducible prompt matrices that generate automated recurring revenue.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-[#2A3441]/50">
              <div className="flex justify-between font-['Geist'] text-xs text-[#e2e2e7]">
                <span>Digital Products & Micro-Tools</span>
                <span className="text-[#b4c8e3] font-mono">10 Blueprints</span>
              </div>
              <div className="w-full h-1 bg-[#333538] rounded-full overflow-hidden">
                <div className="h-full bg-[#b4c8e3] w-full"></div>
              </div>
              <div className="flex items-center gap-1 text-[#b4c8e3] text-xs font-['Geist'] pt-1">
                <span>Explore Vector 03</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
