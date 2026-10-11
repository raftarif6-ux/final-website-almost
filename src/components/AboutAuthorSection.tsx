import React from 'react';
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import authorImg from '../assets/images/rafay_arif_portrait_1791721365719.jpg';

interface AboutAuthorSectionProps {
  onOpenPreview: () => void;
  onOpenCheckout: () => void;
}

export const AboutAuthorSection: React.FC<AboutAuthorSectionProps> = ({
  onOpenPreview,
  onOpenCheckout,
}) => {
  return (
    <section className="relative w-full bg-[#0c0e11] px-6 lg:px-12 py-20 border-t border-[#2A3441]/50 overflow-hidden" id="about-the-guide">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#ffd166]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#6EA8FF]/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-[0.25em] block font-semibold">
            Archival Leadership & Epistemology
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#e2e2e7] font-normal leading-tight">
            Meet the Author Behind the Blueprints
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3]">
            Engineered by a practitioner who strips away synthetic hype to deliver grounded, systematic digital execution.
          </p>
        </div>

        {/* Main Author Showcase Grid */}
        <div className="bg-[#10151C] border border-[#2A3441] rounded-2xl p-8 lg:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#ffd166]/30 via-[#6ed6e2]/25 to-[#ffd166]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-[#f39c12] via-[#ffd166] to-[#f1c40f] shadow-[0_0_40px_rgba(243,156,18,0.3)] transition-transform duration-700 group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#07090C] border-2 border-[#10151C]">
                  <img
                    src={authorImg}
                    alt="Rafay Arif — Author of AI Side Hustles for Beginners"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#171D25] border border-[#ffd166]/60 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
                <CheckCircle className="w-3.5 h-3.5 text-[#ffd166]" />
                <span className="font-['Geist'] text-[10px] font-semibold text-[#F3F0E8] uppercase tracking-wider">
                  Lead Author & Researcher
                </span>
              </div>
            </div>

            <div className="text-center mt-7 space-y-1">
              <h3 className="font-['Newsreader'] text-2xl text-[#F3F0E8] font-medium">Rafay Arif</h3>
              <p className="font-['Geist'] text-xs text-[#8c919d] uppercase tracking-widest font-mono">
                Founder • Nexora Digital Research Group
              </p>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#171D25] border border-[#2A3441] text-[#ffd166] rounded font-['Geist'] text-[10px] uppercase tracking-wider font-semibold">
                Principal Strategist
              </span>
              <span className="px-3 py-1 bg-[#171D25] border border-[#2A3441] text-[#6ed6e2] rounded font-['Geist'] text-[10px] uppercase tracking-wider font-semibold">
                30 Field-Tested Blueprints
              </span>
              <span className="px-3 py-1 bg-[#171D25] border border-[#2A3441] text-[#a8c8ff] rounded font-['Geist'] text-[10px] uppercase tracking-wider font-semibold">
                Zero-Code Philosophy
              </span>
            </div>

            <div className="space-y-4 font-['Newsreader'] text-[#e2e2e7] text-lg sm:text-xl leading-relaxed">
              <p className="italic text-[#ffd166] text-xl sm:text-2xl font-normal leading-snug">
                “You do not need algorithmic credentials or thousands of dollars in software; you need disciplined, systematic leverage.”
              </p>
              <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] leading-relaxed">
                <strong>Rafay Arif</strong> is a digital systems architect and AI operations strategist dedicated to bridging computational machine intelligence with pragmatic individual income. Frustrated by the sea of esoteric jargon and unrealistic internet get-rich-quick hype, Rafay engineered <em>AI Side Hustles for Beginners</em> to give everyday freelancers, creators, and students step-by-step operating manuals they can execute immediately.
              </p>
              <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] leading-relaxed">
                His foundational thesis treats artificial intelligence not as a passive novelty slot machine, but as an obedient, hyper-capable junior associate. By combining structured prompt engineering with lean no-code workflows, Rafay demonstrates how a solo practitioner can achieve the analytical and creative output of an entire boutique studio.
              </p>
            </div>

            {/* Credential highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-[#171D25] border border-[#2A3441] rounded-xl space-y-1">
                <span className="text-[#ffd166] font-mono text-xs font-bold block">01 / EMPIRICAL PROOF</span>
                <p className="text-xs text-[#8c919d] font-['Geist'] leading-normal">
                  Every single one of the 30 side hustles was validated across live micro-operations.
                </p>
              </div>
              <div className="p-3.5 bg-[#171D25] border border-[#2A3441] rounded-xl space-y-1">
                <span className="text-[#6ed6e2] font-mono text-xs font-bold block">02 / ZERO CODE</span>
                <p className="text-xs text-[#8c919d] font-['Geist'] leading-normal">
                  Relying purely on intuitive web interfaces: ChatGPT, Claude, Canva, and Make.com.
                </p>
              </div>
              <div className="p-3.5 bg-[#171D25] border border-[#2A3441] rounded-xl space-y-1">
                <span className="text-[#6EA8FF] font-mono text-xs font-bold block">03 / LIFETIME EVOLUTION</span>
                <p className="text-xs text-[#8c919d] font-['Geist'] leading-normal">
                  All readers receive continuous archival updates as new AI model capabilities advance.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCheckout}
                className="px-6 py-3 bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] rounded-lg font-['Geist'] text-xs uppercase tracking-wider font-bold hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Read Rafay's Complete Volume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenPreview}
                className="px-5 py-3 rounded-lg border border-[#2A3441] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166] font-['Geist'] text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#ffd166]" />
                <span>Sample Chapter 1 Excerpt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
