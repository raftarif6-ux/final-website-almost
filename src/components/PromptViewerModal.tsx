import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Send } from 'lucide-react';
import { PROMPT_PACK_PREVIEW, OUTREACH_SCRIPTS } from '../data/ebookData';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'prompts' | 'scripts';
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'prompts',
}) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'scripts'>(initialTab);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              {activeTab === 'prompts' ? <Terminal className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">
                  {activeTab === 'prompts' ? 'Bonus 01: Battle-Tested Prompt Chains' : 'Bonus 02: Client Outreach Pitch Scripts'}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Copy & Paste
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Pre-engineered syntax verified across ChatGPT Plus, Claude 3.5, and Perplexity</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-3 bg-[#10151C] border-b border-[#2A3441] flex gap-2">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'prompts'
                ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/50'
                : 'bg-[#171D25] text-[#8c919d] hover:text-[#c2c6d3]'
            }`}
          >
            50+ AI Prompts Pack Preview
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={`px-4 py-2 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'scripts'
                ? 'bg-[#282a2e] text-[#6EA8FF] font-semibold border border-[#6EA8FF]/50'
                : 'bg-[#171D25] text-[#8c919d] hover:text-[#c2c6d3]'
            }`}
          >
            Client Pitch Scripts (Email & LinkedIn)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          {activeTab === 'prompts' ? (
            <>
              {PROMPT_PACK_PREVIEW.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#171D25] rounded-xl border border-[#2A3441] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-['Geist'] text-[#ffd166] font-semibold block">{item.category}</span>
                      <h4 className="font-['Newsreader'] text-base text-[#F3F0E8]">{item.title}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(item.prompt, `prompt-${idx}`)}
                      className="px-3 py-1.5 rounded bg-[#10151C] border border-[#2A3441] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#ffd166] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedIndex === `prompt-${idx}` ? <Check className="w-3.5 h-3.5 text-[#ffd166]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === `prompt-${idx}` ? 'Copied' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#10151C] rounded-lg text-xs font-mono text-[#c2c6d3] whitespace-pre-wrap leading-relaxed border border-[#2A3441]/50">
                    {item.prompt}
                  </pre>
                </div>
              ))}
            </>
          ) : (
            <>
              {OUTREACH_SCRIPTS.map((script, idx) => (
                <div key={idx} className="p-4 bg-[#171D25] rounded-xl border border-[#2A3441] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-['Geist'] text-[#6EA8FF] font-semibold block">{script.type}</span>
                      <h4 className="font-['Newsreader'] text-base text-[#F3F0E8]">Subject: {script.subject}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(script.body, `script-${idx}`)}
                      className="px-3 py-1.5 rounded bg-[#10151C] border border-[#2A3441] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#6EA8FF] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedIndex === `script-${idx}` ? <Check className="w-3.5 h-3.5 text-[#6EA8FF]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === `script-${idx}` ? 'Copied' : 'Copy Script'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#10151C] rounded-lg text-xs font-mono text-[#c2c6d3] whitespace-pre-wrap leading-relaxed border border-[#2A3441]/50">
                    {script.body}
                  </pre>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex justify-between items-center">
          <span className="text-xs text-[#8c919d] font-['Geist']">
            All 50 prompts and 12 outreach variants are included in the downloadable Bonus Pack.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#282a2e] text-[#F3F0E8] rounded font-['Geist'] text-xs uppercase tracking-wider hover:bg-[#333538] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
