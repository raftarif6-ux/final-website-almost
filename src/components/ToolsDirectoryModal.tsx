import React, { useState } from 'react';
import { X, Search, Sparkles, Check, Copy } from 'lucide-react';
import { CURATED_TOOLS } from '../data/ebookData';

interface ToolsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolsDirectoryModal: React.FC<ToolsDirectoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Writing', 'Design & Visual', 'Audio & Video', 'Automation', 'Web & Products'];

  const filteredTools = CURATED_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">Curated Beginner AI Tools Directory</span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Bonus 05 Artifact
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Tested, zero-barrier software verified for the 30 Blueprints</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-6 bg-[#171D25]/70 border-b border-[#2A3441] space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c919d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools by name, utility (e.g. 'podcast', 'voiceover', 'design')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#10151C] border border-[#2A3441] rounded-lg text-sm text-[#F3F0E8] placeholder:text-[#8c919d] focus:outline-none focus:border-[#ffd166]"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Geist'] uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                    : 'bg-[#10151C] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="p-4 rounded-xl bg-[#171D25] border border-[#2A3441] hover:border-[#ffd166] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-['Newsreader'] text-lg text-[#F3F0E8] font-medium">{tool.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      tool.pricing === 'Free' ? 'bg-[#ffd166]/10 text-[#ffd166]' :
                      tool.pricing === 'Freemium' ? 'bg-[#6EA8FF]/10 text-[#6EA8FF]' :
                      'bg-[#b4c8e3]/10 text-[#b4c8e3]'
                    }`}>
                      {tool.pricing}
                    </span>
                  </div>
                  <span className="text-[10px] font-['Geist'] text-[#8c919d] uppercase">{tool.category}</span>
                </div>
                <p className="font-['Geist'] text-xs text-[#c2c6d3] leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-2 border-t border-[#2A3441]/50 flex items-center justify-between text-xs font-['Geist']">
                <span className="text-[#8c919d] text-[11px]">
                  Best for: <strong className="text-[#F3F0E8] font-normal">{tool.bestFor}</strong>
                </span>
                <button
                  onClick={() => handleCopy(tool.urlHint)}
                  className="px-2 py-1 bg-[#10151C] rounded text-[#8c919d] hover:text-[#ffd166] flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
                  title="Copy tool link"
                >
                  {copiedUrl === tool.urlHint ? (
                    <>
                      <Check className="w-3 h-3 text-[#ffd166]" />
                      <span className="text-[#ffd166]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{tool.urlHint}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex justify-between items-center">
          <span className="text-xs text-[#8c919d] font-['Geist']">
            Showing {filteredTools.length} curated tools. Complete manual features 60+ categorized tools with exact setup tutorials.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#282a2e] text-[#F3F0E8] rounded font-['Geist'] text-xs uppercase tracking-wider hover:bg-[#333538] cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
