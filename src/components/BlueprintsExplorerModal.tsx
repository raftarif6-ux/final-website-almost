import React, { useState } from 'react';
import { X, Search, Bookmark, Clock, Layers } from 'lucide-react';
import { BLUEPRINTS, BlueprintItem } from '../data/ebookData';

interface BlueprintsExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBlueprints: string[];
  onToggleSave: (id: string) => void;
  initialVector?: 'CREATE' | 'SERVE' | 'BUILD' | 'ALL';
}

export const BlueprintsExplorerModal: React.FC<BlueprintsExplorerModalProps> = ({
  isOpen,
  onClose,
  savedBlueprints,
  onToggleSave,
  initialVector = 'ALL',
}) => {
  const [activeVector, setActiveVector] = useState<'ALL' | 'CREATE' | 'SERVE' | 'BUILD'>(initialVector);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = BLUEPRINTS.filter((item) => {
    const matchesVector = activeVector === 'ALL' || item.vector === activeVector;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.starterStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesVector && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-xl text-[#F3F0E8]">The 30 Practical Side Hustles Directory</span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Section 02 Directory
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Structured taxonomy of beginner-friendly AI business micro-ventures</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-6 bg-[#171D25]/60 border-b border-[#2A3441] space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c919d] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blueprints by name, category, or tool (e.g. 'Notion', 'SEO', 'Voice')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#10151C] border border-[#2A3441] rounded-lg text-sm text-[#F3F0E8] placeholder:text-[#8c919d] focus:outline-none focus:border-[#ffd166]"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveVector('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeVector === 'ALL'
                    ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/40'
                    : 'bg-[#10151C] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                All (30)
              </button>
              <button
                onClick={() => setActiveVector('CREATE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeVector === 'CREATE'
                    ? 'bg-[#282a2e] text-[#ffd166] font-semibold border border-[#ffd166]/50'
                    : 'bg-[#10151C] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                Vector 01: Create (10)
              </button>
              <button
                onClick={() => setActiveVector('SERVE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeVector === 'SERVE'
                    ? 'bg-[#282a2e] text-[#6EA8FF] font-semibold border border-[#6EA8FF]/50'
                    : 'bg-[#10151C] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                Vector 02: Serve (10)
              </button>
              <button
                onClick={() => setActiveVector('BUILD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Geist'] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeVector === 'BUILD'
                    ? 'bg-[#282a2e] text-[#b4c8e3] font-semibold border border-[#b4c8e3]/50'
                    : 'bg-[#10151C] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                Vector 03: Build (10)
              </button>
            </div>
          </div>
        </div>

        {/* Hustles Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
          {filtered.map((item) => {
            const isSaved = savedBlueprints.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#171D25] border border-[#2A3441] hover:border-[#ffd166]/60 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold ${
                        item.vector === 'CREATE' ? 'text-[#ffd166]' : item.vector === 'SERVE' ? 'text-[#6EA8FF]' : 'text-[#b4c8e3]'
                      }`}>
                        #{item.number}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#10151C] text-[10px] uppercase font-['Geist'] text-[#8c919d] font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => onToggleSave(item.id)}
                      className={`p-1.5 rounded hover:bg-[#282a2e] transition-colors cursor-pointer ${
                        isSaved ? 'text-[#ffd166]' : 'text-[#8c919d] hover:text-[#F3F0E8]'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save blueprint'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#ffd166]' : ''}`} />
                    </button>
                  </div>
                  <h4 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-normal leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-['Geist'] text-xs text-[#c2c6d3] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#2A3441]/50 text-xs font-['Geist']">
                  <div className="flex justify-between items-center text-[#8c919d]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ffd166]" />
                      <span>{item.timeRequirement}</span>
                    </span>
                    <span className="font-mono text-[#ffd166] font-semibold">{item.earningsEstimate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.starterStack.map((tool, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-[#10151C] rounded text-[10px] text-[#8c919d] border border-[#2A3441]/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="p-2.5 bg-[#10151C] rounded-lg border border-[#2A3441]/60">
                    <span className="text-[10px] text-[#ffd166] uppercase tracking-wider block font-semibold mb-0.5">
                      Day-One Quick Start:
                    </span>
                    <p className="text-[11px] text-[#c2c6d3] leading-normal">
                      {item.dayOneAction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex justify-between items-center">
          <span className="text-xs text-[#8c919d] font-['Geist']">
            {savedBlueprints.length > 0 ? `${savedBlueprints.length} blueprints saved to your action list.` : 'Click bookmark icon to save favorite blueprints.'}
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
