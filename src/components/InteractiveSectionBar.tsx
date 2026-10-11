import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Compass,
  FileText,
  Eye,
  Gift,
  Calendar,
  User,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

interface SectionItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ElementType;
  accentColor: string;
}

export const InteractiveSectionBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('the-ebook');

  const sections: SectionItem[] = [
    { id: 'the-ebook', label: 'eBook Specimen', icon: BookOpen, accentColor: '#6ed6e2' },
    { id: 'scroll-animation', label: '3D Experience', badge: 'Interactive', icon: Sparkles, accentColor: '#ffd166' },
    { id: 'opportunity-landscape', label: '3 Vectors', icon: Compass, accentColor: '#6EA8FF' },
    { id: 'whats-inside', label: 'Curriculum', icon: FileText, accentColor: '#a8c8ff' },
    { id: 'interactive-preview', label: 'Manuscript', icon: Eye, accentColor: '#6ed6e2' },
    { id: 'bonuses', label: '5 Bonuses', badge: 'Free', icon: Gift, accentColor: '#ffd166' },
    { id: 'execution-timeline', label: '30-Day Plan', icon: Calendar, accentColor: '#6ed6e2' },
    { id: 'about-the-guide', label: 'About Author', icon: User, accentColor: '#ffd166' },
    { id: 'purchase-vault', label: 'Acquisition Vault', badge: 'Sale', icon: ShoppingBag, accentColor: '#6EA8FF' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, accentColor: '#8c919d' },
  ];

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#0a0d11]/90 backdrop-blur-xl border-y border-[#2A3441]/70 sticky top-20 z-30 py-2.5 px-4 lg:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Status Glyph */}
        <div className="hidden xl:flex items-center gap-2 shrink-0 pr-3 border-r border-[#2A3441]/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd166] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd166]"></span>
          </span>
          <span className="font-['Geist'] text-[10px] uppercase font-bold tracking-[0.2em] text-[#c2c6d3]">
            Curriculum Navigator
          </span>
        </div>

        {/* Scrollable Animated Bar Container */}
        <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="relative inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#10151C] border border-[#2A3441] shadow-inner">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`relative group px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-['Geist'] text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 shrink-0 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-[#1e2530] text-[#F3F0E8] shadow-[0_0_15px_rgba(255,209,102,0.25)] border border-[#ffd166]/50'
                      : 'text-[#8c919d] hover:text-[#F3F0E8] hover:bg-[#171D25] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#6EA8FF]/10 via-[#6ed6e2]/15 to-[#ffd166]/10 animate-pulse pointer-events-none" />
                  )}
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'text-[#ffd166]' : 'text-[#8c919d] group-hover:text-[#ffd166]'
                    }`}
                  />
                  <span className="relative z-10 whitespace-nowrap">{sec.label}</span>
                  {sec.badge && (
                    <span
                      className={`text-[8px] font-mono px-1 py-0.2 rounded uppercase transition-colors ${
                        isActive
                          ? 'bg-[#ffd166] text-[#07090C] font-bold'
                          : 'bg-[#282a2e] text-[#ffd166] group-hover:bg-[#ffd166] group-hover:text-[#07090C]'
                      }`}
                    >
                      {sec.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#ffd166] to-[#f39c12] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Quick Jump Indicator */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-[#2A3441]/60">
          <span className="text-[10px] text-[#8c919d] font-['Geist'] uppercase tracking-wider">
            10 Chapters
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#ffd166] animate-pulse" />
        </div>
      </div>
    </div>
  );
};
