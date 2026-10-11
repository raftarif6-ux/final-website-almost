import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, ChevronDown } from 'lucide-react';
import { BOOK_SPECIMEN_IMAGE, CURRENCY_RATES } from '../data/ebookData';
import { PRICING } from '../utils/pricing';

interface HeroSectionProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
  onOpenDirectory: () => void;
  currentCurrency: keyof typeof CURRENCY_RATES;
  country?: 'PK' | 'INTL';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCheckout,
  onOpenPreview,
  onOpenDirectory,
  country = 'INTL',
}) => {
  const plan = PRICING[country] || PRICING.INTL;

  return (
    <section className="relative w-full bg-[#0c0e11] px-6 lg:px-12 py-10 lg:py-16 overflow-hidden" id="the-ebook">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6EA8FF]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] rounded-full bg-[#6ed6e2]/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[calc(100vh-8rem)]">
        {/* Left Narrative Column */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#1e2023] border border-[#2A3441] rounded font-['Geist'] text-[10px] text-[#6ed6e2] uppercase tracking-widest font-semibold">
              NEXORA DIGITAL PRESENTS
            </span>
            <span className="text-[#8c919d] font-['Geist'] text-[10px] uppercase tracking-widest">•</span>
            <button
              onClick={onOpenDirectory}
              className="font-['Geist'] text-[10px] text-[#c2c6d3] uppercase tracking-widest hover:text-[#6ed6e2] transition-colors cursor-pointer"
            >
              30 Practical Ideas
            </button>
            <span className="text-[#8c919d] font-['Geist'] text-[10px] uppercase tracking-widest">•</span>
            <span className="font-['Geist'] text-[10px] text-[#c2c6d3] uppercase tracking-widest">
              5 Bonus Resources
            </span>
          </div>

          <h1 className="font-['Newsreader'] text-4xl sm:text-5xl lg:text-6xl text-[#e2e2e7] max-w-2xl leading-[1.08] tracking-tight font-normal">
            Your next opportunity starts with AI.
          </h1>

          <p className="font-['Newsreader'] text-xl sm:text-2xl text-[#b4c8e3] font-normal max-w-xl leading-snug">
            30 Practical Ways to Build Online Income Using AI — Without Advanced Skills
          </p>

          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] max-w-xl leading-relaxed">
            Explore 30 practical AI-powered side hustles, discover beginner-friendly tools, and organize your next steps with an archival-grade digital guide built for curious beginners, freelancers, and creative explorers.
          </p>

          {/* CTA Cluster */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCheckout}
              className="relative group px-8 py-3.5 bg-gradient-to-r from-[#d5e3ff] via-[#e8f0fe] to-[#d5e3ff] text-[#001b3c] rounded-xl font-['Geist'] text-[13px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(110,168,255,0.3)] hover:shadow-[0_0_30px_rgba(110,214,226,0.6)] hover:scale-102 active:scale-98 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="relative z-10">Get This eBook (PKR 1,999)</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenPreview}
              className="px-6 py-3.5 bg-[#171D25] text-[#e2e2e7] border border-[#2A3441] rounded-xl font-['Geist'] text-[13px] uppercase tracking-wider hover:bg-[#202732] hover:border-[#6ed6e2] hover:shadow-[0_0_20px_rgba(110,214,226,0.2)] hover:scale-102 active:scale-98 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore What's Inside</span>
              <BookOpen className="w-4 h-4 text-[#6ed6e2] transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Roadmap Command Bar */}
          <div className="pt-3">
            <div className="p-2 rounded-2xl bg-[#10151C]/90 border border-[#2A3441] shadow-xl backdrop-blur-md max-w-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <a
                  href="#the-ebook"
                  className="group p-2.5 rounded-xl bg-[#171D25] border border-[#6ed6e2]/50 hover:border-[#6ed6e2] hover:bg-[#1d242e] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Geist'] text-[10px] text-[#6ed6e2] uppercase font-bold tracking-wider">
                      01 Explore
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6ed6e2] shadow-[0_0_6px_#6ed6e2] animate-pulse"></span>
                  </div>
                  <span className="text-[10px] text-[#c2c6d3] group-hover:text-white font-['Geist'] font-medium mt-1 transition-colors">
                    3D Specimen
                  </span>
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#6ed6e2] to-[#6EA8FF] mt-2 rounded-full"></div>
                </a>

                <a
                  href="#whats-inside"
                  className="group p-2.5 rounded-xl bg-[#14181F] border border-[#2A3441] hover:border-[#a8c8ff] hover:bg-[#1a2029] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Geist'] text-[10px] text-[#8c919d] group-hover:text-[#a8c8ff] uppercase font-semibold tracking-wider transition-colors">
                      02 Master
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#333538] group-hover:bg-[#a8c8ff] transition-colors"></span>
                  </div>
                  <span className="text-[10px] text-[#8c919d] group-hover:text-[#c2c6d3] font-['Geist'] mt-1 transition-colors">
                    Curriculum
                  </span>
                  <div className="h-0.5 w-full bg-[#2A3441] group-hover:bg-[#a8c8ff] mt-2 rounded-full transition-colors"></div>
                </a>

                <a
                  href="#bonuses"
                  className="group p-2.5 rounded-xl bg-[#14181F] border border-[#2A3441] hover:border-[#ffd166] hover:bg-[#1a2029] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Geist'] text-[10px] text-[#8c919d] group-hover:text-[#ffd166] uppercase font-semibold tracking-wider transition-colors">
                      03 Equip
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#333538] group-hover:bg-[#ffd166] transition-colors"></span>
                  </div>
                  <span className="text-[10px] text-[#8c919d] group-hover:text-[#c2c6d3] font-['Geist'] mt-1 transition-colors">
                    5 Toolkits
                  </span>
                  <div className="h-0.5 w-full bg-[#2A3441] group-hover:bg-[#ffd166] mt-2 rounded-full transition-colors"></div>
                </a>

                <a
                  href="#purchase-vault"
                  className="group p-2.5 rounded-xl bg-[#14181F] border border-[#2A3441] hover:border-[#6EA8FF] hover:bg-[#1a2029] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Geist'] text-[10px] text-[#8c919d] group-hover:text-[#6EA8FF] uppercase font-semibold tracking-wider transition-colors">
                      04 Launch
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#333538] group-hover:bg-[#6EA8FF] transition-colors"></span>
                  </div>
                  <span className="text-[10px] text-[#8c919d] group-hover:text-[#c2c6d3] font-['Geist'] mt-1 transition-colors">
                    Get Vault
                  </span>
                  <div className="h-0.5 w-full bg-[#2A3441] group-hover:bg-[#6EA8FF] mt-2 rounded-full transition-colors"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3D eBook Specimen Column */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-8 lg:py-12">
          <div className="absolute inset-0 bg-gradient-to-t from-[#6ea8ff]/25 via-[#6ed6e2]/15 to-transparent blur-3xl rounded-full transform scale-110 pointer-events-none"></div>

          <div
            className="relative group w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex flex-col items-center cursor-pointer"
            onClick={onOpenPreview}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0c0e11] border border-[#2A3441] transition-all duration-500 animate-float-book hover:border-[#6ed6e2]/60 hover:shadow-[0_20px_60px_rgba(110,214,226,0.25)]">
              <img
                alt="AI Side Hustles for Beginners 3D Book Cover Specimen"
                className="w-full h-auto object-contain drop-shadow-[0_25px_55px_rgba(0,0,0,0.9)]"
                src={BOOK_SPECIMEN_IMAGE}
              />
            </div>
            <div className="w-4/5 h-6 mt-6 rounded-[100%] bg-gradient-to-r from-transparent via-[#0c0e11] to-transparent blur-lg opacity-85 animate-shadow-pulse"></div>

            <div className="mt-5 px-5 py-2.5 bg-[#1a1c1f]/95 border border-[#2A3441] rounded-xl shadow-lg flex items-center gap-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4" />
                <span className="font-['Geist'] text-[11px] text-[#e2e2e7] uppercase tracking-wider font-semibold">
                  Format: PDF + EPUB
                </span>
              </div>
              <span className="text-[#8c919d] text-[11px]">|</span>
              <span className="font-['Geist'] text-[11px] text-[#a8c8ff] uppercase tracking-wider font-semibold">
                30 Practical Blueprints
              </span>
              <span className="text-[#8c919d] text-[11px] hidden sm:inline">|</span>
              <span className="font-['Geist'] text-[11px] text-[#ffd166] uppercase tracking-wider font-semibold hidden sm:inline">
                5 Toolkits
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="mt-8 flex justify-center items-center gap-2 text-[#8c919d]">
        <ChevronDown className="w-4 h-4 animate-bounce text-[#6ed6e2]" />
        <span className="font-['Geist'] text-[10px] uppercase tracking-widest">
          Scroll to discover curriculum
        </span>
      </div>
    </section>
  );
};
