import React, { useState } from 'react';
import { X, BookOpen, Volume2, CheckCircle } from 'lucide-react';
import { BOOK_SPECIMEN_IMAGE } from '../data/ebookData';

interface ReadingSanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const ReadingSanctuaryModal: React.FC<ReadingSanctuaryModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'cover' | 'framework' | 'toolstack' | 'action' | 'sanctuary'>('cover');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'compact'>('normal');
  const [readingTheme, setReadingTheme] = useState<'carbon' | 'graphite' | 'paper'>('carbon');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8] font-normal">Manuscript Reader Console</span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Archival Specimen
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Pages Unlocked for Verification Preview (4 Sample Spreads)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-['Geist'] flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'border-[#ffd166] bg-[#ffd166]/10 text-[#ffd166]'
                  : 'border-[#2A3441] text-[#c2c6d3] hover:border-[#ffd166]'
              }`}
              title="Toggle audio excerpt narration"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-[#ffd166]' : ''}`} />
              <span className="hidden sm:inline">{isPlayingAudio ? 'Narration Active' : 'Listen Audio Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#8c919d] hover:text-[#F3F0E8] hover:bg-[#282a2e] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 py-3 border-b border-[#2A3441] bg-[#10151C] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('cover')}
              className={`px-3.5 py-1.5 rounded font-['Geist'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cover'
                  ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                  : 'bg-[#171D25] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
              }`}
            >
              01 Specimen Cover
            </button>
            <button
              onClick={() => setActiveTab('framework')}
              className={`px-3.5 py-1.5 rounded font-['Geist'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'framework'
                  ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                  : 'bg-[#171D25] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
              }`}
            >
              02 Chapter 1 Framework
            </button>
            <button
              onClick={() => setActiveTab('toolstack')}
              className={`px-3.5 py-1.5 rounded font-['Geist'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'toolstack'
                  ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                  : 'bg-[#171D25] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
              }`}
            >
              03 Minimalist Tool Stack
            </button>
            <button
              onClick={() => setActiveTab('action')}
              className={`px-3.5 py-1.5 rounded font-['Geist'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'action'
                  ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                  : 'bg-[#171D25] text-[#8c919d] hover:bg-[#282a2e] hover:text-[#c2c6d3]'
              }`}
            >
              04 30-Day Protocol
            </button>
            <button
              onClick={() => setActiveTab('sanctuary')}
              className={`px-3.5 py-1.5 rounded font-['Geist'] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sanctuary'
                  ? 'bg-[#ffd166]/20 text-[#ffd166] font-semibold border border-[#ffd166]/60'
                  : 'bg-[#171D25] text-[#ffd166] hover:bg-[#282a2e]'
              }`}
            >
              Reading Sanctuary Mode
            </button>
          </div>

          {activeTab === 'sanctuary' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#171D25] p-1 rounded border border-[#2A3441]">
                <button
                  onClick={() => setFontSize('compact')}
                  className={`px-2 py-0.5 text-[10px] rounded cursor-pointer ${fontSize === 'compact' ? 'bg-[#282a2e] text-[#ffd166]' : 'text-[#8c919d]'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 text-[10px] rounded cursor-pointer ${fontSize === 'normal' ? 'bg-[#282a2e] text-[#ffd166]' : 'text-[#8c919d]'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 text-[10px] rounded cursor-pointer ${fontSize === 'large' ? 'bg-[#282a2e] text-[#ffd166]' : 'text-[#8c919d]'}`}
                >
                  A+
                </button>
              </div>
              <div className="flex items-center gap-1 bg-[#171D25] p-1 rounded border border-[#2A3441]">
                <button
                  onClick={() => setReadingTheme('carbon')}
                  className={`w-4 h-4 rounded-full bg-[#07090C] border cursor-pointer ${readingTheme === 'carbon' ? 'border-[#ffd166]' : 'border-transparent'}`}
                  title="Carbon"
                />
                <button
                  onClick={() => setReadingTheme('graphite')}
                  className={`w-4 h-4 rounded-full bg-[#1e2023] border cursor-pointer ${readingTheme === 'graphite' ? 'border-[#ffd166]' : 'border-transparent'}`}
                  title="Graphite"
                />
                <button
                  onClick={() => setReadingTheme('paper')}
                  className={`w-4 h-4 rounded-full bg-[#2a241f] border cursor-pointer ${readingTheme === 'paper' ? 'border-[#ffd166]' : 'border-transparent'}`}
                  title="Sepia"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Viewer Area */}
        <div className={`p-6 sm:p-10 flex-1 overflow-y-auto ${
          readingTheme === 'carbon' ? 'bg-[#07090C]' : readingTheme === 'graphite' ? 'bg-[#171D25]' : 'bg-[#1a1714]'
        }`}>
          {isPlayingAudio && (
            <div className="mb-6 p-3 rounded-lg bg-[#ffd166]/10 border border-[#ffd166]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd166] animate-ping"></span>
                <span className="font-['Geist'] text-xs text-[#ffd166]">
                  Simulated Voice Synthesis Narration: Volume IV Archival Chapter Introduction
                </span>
              </div>
              <span className="font-['Geist'] text-xs text-[#8c919d] font-mono">01:42 / 04:30</span>
            </div>
          )}

          {activeTab === 'cover' && (
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-2xl mx-auto py-4">
              <div className="w-48 sm:w-60 shrink-0 rounded-lg shadow-2xl overflow-hidden bg-[#07090C] border border-[#2A3441]">
                <img
                  src={BOOK_SPECIMEN_IMAGE}
                  alt="eBook Specimen"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4 text-left">
                <span className="px-2.5 py-1 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[11px] uppercase font-semibold">
                  Archival Edition v4.2
                </span>
                <h4 className="font-['Newsreader'] text-3xl text-[#F3F0E8] leading-tight font-normal">
                  AI Side Hustles for Beginners
                </h4>
                <p className="font-['Geist'] text-sm text-[#c2c6d3] leading-relaxed">
                  Authored by Rafay Arif under the NEXORA DIGITAL Research Group. Formatted in DRM-free universal reading formats compatible with Kindle, Apple Books, and PDF desktop viewports.
                </p>
                <div className="p-3 bg-[#10151C] rounded border border-[#2A3441] space-y-1 font-['Geist'] text-xs">
                  <div className="flex justify-between text-[#8c919d]">
                    <span>Total Pages:</span>
                    <span className="text-[#F3F0E8] font-mono">216 Pages</span>
                  </div>
                  <div className="flex justify-between text-[#8c919d]">
                    <span>Monetization Blueprints:</span>
                    <span className="text-[#ffd166] font-mono">30 Practical Models</span>
                  </div>
                  <div className="flex justify-between text-[#8c919d]">
                    <span>Included Artifacts:</span>
                    <span className="text-[#6EA8FF] font-mono">5 Bonus Toolkits</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'framework' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Excerpt — Chapter 1: The Foundations
                </span>
                <span className="text-[#8c919d] font-['Geist'] text-xs">Page 19 of 216</span>
              </div>
              <h4 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#F3F0E8] font-normal">
                The Tri-Tier Cognitive Workflow
              </h4>
              <blockquote className="border-l-2 border-[#ffd166] pl-4 font-['Newsreader'] text-xl italic text-[#e2e2e7] leading-relaxed">
                “The beginner's fatal error is attempting to use AI as a magic button. The professional treats the artificial intelligence model as an exceptionally obedient, hyper-literate junior associate. Your role is not generating content; it is curating, editing, and distributing utility.”
              </blockquote>
              <div className="space-y-4 font-['Geist'] text-sm text-[#c2c6d3] leading-relaxed">
                <p>
                  To convert computational output into commercially viable revenue, you must decouple creation from distribution. Every successful micro-business in this manual follows a simple three-tier cascade:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-[#171D25] rounded border border-[#2A3441]">
                    <span className="text-[#ffd166] font-mono text-xs block mb-1">01 / DISCOVERY</span>
                    <p className="text-xs text-[#8c919d]">Isolating high-friction client tasks that take human teams 4+ hours per week.</p>
                  </div>
                  <div className="p-3 bg-[#171D25] rounded border border-[#2A3441]">
                    <span className="text-[#6EA8FF] font-mono text-xs block mb-1">02 / SYNTHESIS</span>
                    <p className="text-xs text-[#8c919d]">Applying engineered prompt chains to compress that execution into 15 minutes.</p>
                  </div>
                  <div className="p-3 bg-[#171D25] rounded border border-[#2A3441]">
                    <span className="text-[#b4c8e3] font-mono text-xs block mb-1">03 / ARTIFACT</span>
                    <p className="text-xs text-[#8c919d]">Packaging the result into a clean, professional deliverable that justifies a retainer.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-[#171D25] rounded text-[#8c919d] font-['Geist'] text-[11px] text-center border border-[#2A3441]/50">
                EXCERPT FROM CHAPTER 01, SECTION 2 — COPYRIGHT NEXORA DIGITAL LTD.
              </div>
            </div>
          )}

          {activeTab === 'toolstack' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#282a2e] text-[#6EA8FF] font-['Geist'] text-[10px] uppercase font-semibold">
                  Excerpt — The Minimalist Stack
                </span>
                <span className="text-[#8c919d] font-['Geist'] text-xs">Page 28 of 216</span>
              </div>
              <h4 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#F3F0E8] font-normal">
                Zero-Overhead Tool Architecture
              </h4>
              <p className="font-['Geist'] text-sm text-[#c2c6d3]">
                You do not need $300/month in specialized software suites to start. This is the exact free-tier baseline that powered the initial case studies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#171D25] p-4 rounded-lg border border-[#2A3441]">
                  <span className="font-['Geist'] text-[11px] text-[#ffd166] block uppercase font-semibold">Primary Cognitive Engine</span>
                  <span className="font-['Geist'] text-sm text-[#F3F0E8] font-semibold mt-1 block">ChatGPT Plus / Claude 3.5 Sonnet</span>
                  <p className="font-['Geist'] text-xs text-[#8c919d] mt-1.5 leading-normal">
                    Core engine for structuring outputs, drafting pitches, synthesizing data, and client communications.
                  </p>
                </div>
                <div className="bg-[#171D25] p-4 rounded-lg border border-[#2A3441]">
                  <span className="font-['Geist'] text-[11px] text-[#ffd166] block uppercase font-semibold">Visual Asset Engine</span>
                  <span className="font-['Geist'] text-sm text-[#F3F0E8] font-semibold mt-1 block">Midjourney v6.1 / Canva Magic</span>
                  <p className="font-['Geist'] text-xs text-[#8c919d] mt-1.5 leading-normal">
                    Generates commercial brand identities, mockup backgrounds, textures, and banner marketing assets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'action' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#282a2e] text-[#b4c8e3] font-['Geist'] text-[10px] uppercase font-semibold">
                  Excerpt — Execution Blueprint
                </span>
                <span className="text-[#8c919d] font-['Geist'] text-xs">Page 187 of 216</span>
              </div>
              <h4 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#F3F0E8] font-normal">
                The 4-Week Validation Protocol
              </h4>
              <p className="font-['Geist'] text-sm text-[#c2c6d3]">
                A disciplined operational framework to take you from cold start to your first paid invoice within 30 days:
              </p>
              <div className="space-y-3 font-['Geist'] text-sm text-[#c2c6d3]">
                <div className="p-3 bg-[#171D25] rounded-lg border border-[#2A3441] flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#282a2e] text-[#ffd166] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    01
                  </span>
                  <div>
                    <span className="text-[#F3F0E8] font-semibold block text-xs">Vector Selection (Days 1–5)</span>
                    <span className="text-xs text-[#8c919d]">Complete the Skills Assessment Matrix and isolate 1 specific model that matches your domain.</span>
                  </div>
                </div>
                <div className="p-3 bg-[#171D25] rounded-lg border border-[#2A3441] flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#282a2e] text-[#6EA8FF] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    02
                  </span>
                  <div>
                    <span className="text-[#F3F0E8] font-semibold block text-xs">Artifact Production (Days 6–14)</span>
                    <span className="text-xs text-[#8c919d]">Build 3 sample portfolio artifacts using the included prompt chains. No client needed yet.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sanctuary' && (
            <div className={`max-w-2xl mx-auto space-y-6 py-6 ${
              fontSize === 'large' ? 'text-lg' : fontSize === 'compact' ? 'text-xs' : 'text-sm'
            }`}>
              <div className="text-center space-y-2 border-b border-[#2A3441]/40 pb-6">
                <span className="font-['Geist'] text-[10px] uppercase text-[#ffd166] tracking-widest">
                  Reading Sanctuary — Chapter 01
                </span>
                <h3 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#F3F0E8] font-normal">
                  The Foundations of Computational Leverage
                </h3>
                <p className="font-['Newsreader'] text-sm italic text-[#8c919d]">
                  By Rafay Arif — Nexora Digital Archival Series
                </p>
              </div>
              <div className="font-['Newsreader'] text-[#e2e2e7] leading-relaxed space-y-5 text-[18px]">
                <p>
                  <span className="float-left text-5xl font-['Newsreader'] text-[#ffd166] pr-3 pt-1 leading-none font-bold">W</span>
                  hen historians look back on the decade between 2020 and 2030, they will not remember it primarily for the hardware breakthroughs in Silicon Valley or the trillions poured into cloud compute. They will remember it as the moment when the cost of specialized cognitive labor collapsed to near-zero.
                </p>
                <p>
                  For over two centuries, building a high-margin services agency or digital publication required substantial human capital: copywriters, junior researchers, graphic layout assistants, and administrative coordinators. Today, a solo practitioner operating with disciplined prompt engineering possesses the analytical throughput of an eight-person research bureau.
                </p>
              </div>
              <div className="p-4 bg-[#171D25] rounded-xl border border-[#2A3441] space-y-2 text-center">
                <span className="font-['Geist'] text-xs text-[#8c919d] block">
                  You are previewing Chapter 01. The complete volume contains 216 pages across 4 major modules.
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] rounded font-['Geist'] text-xs uppercase font-bold hover:shadow-lg transition-all inline-block mt-2 cursor-pointer"
                >
                  Unlock Complete 216-Page Volume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation & CTA */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#8c919d] font-['Geist'] text-xs">
            <CheckCircle className="w-4 h-4 text-[#ffd166]" />
            <span>DRM-Free Universal Formats: PDF (Retina) & EPUB 3.2</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#2A3441] text-[#c2c6d3] font-['Geist'] text-xs uppercase hover:bg-[#282a2e] cursor-pointer"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="px-6 py-2 rounded bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] font-['Geist'] text-xs uppercase font-bold hover:shadow-lg shadow-[0_0_12px_rgba(255,209,102,0.3)] transition-all cursor-pointer"
            >
              Get Complete eBook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
