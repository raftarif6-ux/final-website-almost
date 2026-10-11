import React, { useState } from 'react';
import { Eye, BookOpen, ArrowRight } from 'lucide-react';
import { BOOK_SPECIMEN_IMAGE } from '../data/ebookData';

interface InteractivePreviewSectionProps {
  onOpenCheckout: () => void;
  onOpenSanctuaryModal: () => void;
}

export const InteractivePreviewSection: React.FC<InteractivePreviewSectionProps> = ({
  onOpenCheckout,
  onOpenSanctuaryModal,
}) => {
  const [activeTab, setActiveTab] = useState<'cover' | 'framework' | 'toolstack' | 'action'>('cover');

  return (
    <section id="interactive-preview" className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block font-semibold">
            Interactive Reader Console
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Preview the Archival Manuscript
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3]">
            Sample live page spreads to inspect the clarity and precision engineered into every chapter.
          </p>
        </div>

        {/* Preview Console Shell */}
        <div className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-6 md:p-10 shadow-2xl space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2A3441]/50">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('cover')}
                className={`px-4 py-2 rounded text-xs uppercase font-['Geist'] tracking-wider transition-all cursor-pointer ${
                  activeTab === 'cover'
                    ? 'bg-[#282a2e] text-[#ffd166] border border-[#ffd166]/40 font-semibold'
                    : 'bg-[#1e2023] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
                }`}
              >
                01 Specimen Cover
              </button>
              <button
                onClick={() => setActiveTab('framework')}
                className={`px-4 py-2 rounded text-xs uppercase font-['Geist'] tracking-wider transition-all cursor-pointer ${
                  activeTab === 'framework'
                    ? 'bg-[#282a2e] text-[#ffd166] border border-[#ffd166]/40 font-semibold'
                    : 'bg-[#1e2023] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
                }`}
              >
                02 Chapter 1 Framework
              </button>
              <button
                onClick={() => setActiveTab('toolstack')}
                className={`px-4 py-2 rounded text-xs uppercase font-['Geist'] tracking-wider transition-all cursor-pointer ${
                  activeTab === 'toolstack'
                    ? 'bg-[#282a2e] text-[#ffd166] border border-[#ffd166]/40 font-semibold'
                    : 'bg-[#1e2023] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
                }`}
              >
                03 Tool Stack Matrix
              </button>
              <button
                onClick={() => setActiveTab('action')}
                className={`px-4 py-2 rounded text-xs uppercase font-['Geist'] tracking-wider transition-all cursor-pointer ${
                  activeTab === 'action'
                    ? 'bg-[#282a2e] text-[#ffd166] border border-[#ffd166]/40 font-semibold'
                    : 'bg-[#1e2023] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
                }`}
              >
                04 30-Day Blueprint
              </button>
            </div>
            <div className="flex items-center gap-2 text-[#8c919d] font-['Geist'] text-xs">
              <Eye className="w-4 h-4 text-[#ffd166]" />
              <span>UNLOCKED PREVIEW SPREAD</span>
            </div>
          </div>

          {/* Spread Display Container */}
          <div className="min-h-[380px] bg-[#1e2023] border border-[#2A3441] rounded-lg p-6 md:p-8 flex items-center justify-center relative overflow-hidden">
            {activeTab === 'cover' && (
              <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-2xl">
                <div className="w-44 md:w-56 shrink-0 rounded shadow-2xl overflow-hidden bg-[#0c0e11] border border-[#2A3441]">
                  <img
                    alt="eBook Specimen"
                    className="w-full h-auto object-cover"
                    src={BOOK_SPECIMEN_IMAGE}
                  />
                </div>
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                    Archival Edition v4.2
                  </span>
                  <h4 className="font-['Newsreader'] text-2xl md:text-3xl text-[#e2e2e7] font-normal leading-tight">
                    AI Side Hustles for Beginners
                  </h4>
                  <p className="font-['Geist'] text-xs md:text-sm text-[#c2c6d3] leading-relaxed">
                    Authored by Rafay Arif under the NEXORA DIGITAL Research Group. Formatted in DRM-free universal reading formats compatible with Kindle, Apple Books, and PDF desktop viewports.
                  </p>
                  <div className="pt-2 font-['Geist'] text-xs text-[#ffd166] uppercase tracking-wider font-semibold">
                    30 Pragmatic Monetization Blueprints Inside
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'framework' && (
              <div className="flex flex-col space-y-4 w-full max-w-2xl">
                <span className="font-['Geist'] text-xs text-[#ffd166] uppercase font-semibold">
                  Excerpt — Chapter 1: The Foundations
                </span>
                <h4 className="font-['Newsreader'] text-2xl md:text-3xl text-[#e2e2e7] font-normal">
                  The Tri-Tier Cognitive Workflow
                </h4>
                <blockquote className="font-['Newsreader'] text-lg md:text-xl text-[#c2c6d3] italic leading-relaxed border-l-2 border-[#ffd166] pl-4">
                  “The beginner's fatal error is attempting to use AI as a magic button. The professional treats the artificial intelligence model as an exceptionally obedient, hyper-literate junior associate. Your role is not generating content; it is curating, editing, and distributing utility.”
                </blockquote>
                <div className="p-4 bg-[#282a2e] rounded-lg text-[#8c919d] font-['Geist'] text-xs border border-[#2A3441]/50">
                  EXCERPT FROM CHAPTER 01, PAGE 19 — COPYRIGHT NEXORA DIGITAL LTD.
                </div>
              </div>
            )}

            {activeTab === 'toolstack' && (
              <div className="flex flex-col space-y-4 w-full max-w-2xl">
                <span className="font-['Geist'] text-xs text-[#a8c8ff] uppercase font-semibold">
                  Excerpt — The Minimalist Stack
                </span>
                <h4 className="font-['Newsreader'] text-2xl md:text-3xl text-[#e2e2e7] font-normal">
                  Zero-Overhead Tool Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#282a2e] border border-[#2A3441] p-4 rounded-lg">
                    <span className="font-['Geist'] text-xs text-[#ffd166] block uppercase font-semibold">
                      Primary Cognitive Engine
                    </span>
                    <span className="font-['Geist'] text-sm text-[#e2e2e7] font-semibold block mt-1">
                      ChatGPT Plus / Claude 3.5 Sonnet
                    </span>
                    <p className="font-['Geist'] text-xs text-[#c2c6d3] mt-1.5 leading-relaxed">
                      Core engine for structuring outputs, drafting pitches, synthesizing data, and client communications.
                    </p>
                  </div>
                  <div className="bg-[#282a2e] border border-[#2A3441] p-4 rounded-lg">
                    <span className="font-['Geist'] text-xs text-[#ffd166] block uppercase font-semibold">
                      Visual Asset Engine
                    </span>
                    <span className="font-['Geist'] text-sm text-[#e2e2e7] font-semibold block mt-1">
                      Midjourney v6.1 / Canva Magic
                    </span>
                    <p className="font-['Geist'] text-xs text-[#c2c6d3] mt-1.5 leading-relaxed">
                      Generates commercial brand identities, mockup backgrounds, textures, and banner marketing assets.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'action' && (
              <div className="flex flex-col space-y-4 w-full max-w-2xl">
                <span className="font-['Geist'] text-xs text-[#b4c8e3] uppercase font-semibold">
                  Excerpt — Execution Blueprint
                </span>
                <h4 className="font-['Newsreader'] text-2xl md:text-3xl text-[#e2e2e7] font-normal">
                  The 4-Week Validation Protocol
                </h4>
                <div className="space-y-3 font-['Geist'] text-xs sm:text-sm text-[#c2c6d3]">
                  <div className="flex items-center gap-3 p-3 bg-[#282a2e] rounded-lg border border-[#2A3441]">
                    <span className="w-6 h-6 rounded-full bg-[#1e2023] text-[#ffd166] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      01
                    </span>
                    <span>Select 1 of the 30 specific models that matches your background.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#282a2e] rounded-lg border border-[#2A3441]">
                    <span className="w-6 h-6 rounded-full bg-[#1e2023] text-[#ffd166] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      02
                    </span>
                    <span>Build 3 sample portfolio artifacts using the provided Bonus Prompts.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#282a2e] rounded-lg border border-[#2A3441]">
                    <span className="w-6 h-6 rounded-full bg-[#1e2023] text-[#ffd166] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      03
                    </span>
                    <span>Deploy 20 targeted outreach messages using the Bonus Cold Scripts.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="font-['Geist'] text-xs text-[#8c919d]">
                You are viewing 1 of 216 pages of the complete manual.
              </span>
              <button
                onClick={onOpenSanctuaryModal}
                className="text-xs text-[#ffd166] hover:underline font-['Geist'] flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Sanctuary Reading Console</span>
              </button>
            </div>
            <button
              onClick={onOpenCheckout}
              className="px-6 py-2.5 bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] rounded-lg font-['Geist'] text-xs uppercase tracking-wider font-bold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get the Complete eBook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
