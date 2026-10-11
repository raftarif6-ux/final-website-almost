import React, { useState } from 'react';
import {
  Menu,
  X,
  BookOpen,
  ShoppingBag,
  Bookmark,
  Check,
  FileText,
  Compass,
  Gift,
  User,
  HelpCircle,
} from 'lucide-react';
import { CURRENCY_RATES } from '../data/ebookData';
import { PRICING } from '../utils/pricing';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentCurrency: keyof typeof CURRENCY_RATES;
  onCurrencyChange: (currency: keyof typeof CURRENCY_RATES) => void;
  onOpenPreview: () => void;
  onOpenCheckout: () => void;
  onOpenDirectory: () => void;
  savedCount: number;
  country?: 'PK' | 'INTL';
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenPreview,
  onOpenCheckout,
  onOpenDirectory,
  savedCount,
  country = 'INTL',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const plan = PRICING[country] || PRICING.INTL;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#10151C]/90 backdrop-blur-xl border-b border-[#2A3441]/60">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-6">
          <a href="#">
            <BrandLogo size="md" />
          </a>
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10151C] border border-[#2A3441]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] animate-pulse"></span>
            <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest font-semibold">v4.2 SYNTHESIS LIVE</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-[#12161E]/80 border border-[#2A3441] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <a
            href="#the-ebook"
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#6ed6e2]/40 transition-all duration-300"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#6ed6e2] group-hover:scale-110 transition-all" />
            <span>The eBook</span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#6EA8FF] to-[#6ed6e2] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>

          <a
            href="#whats-inside"
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#a8c8ff]/40 transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#a8c8ff] group-hover:scale-110 transition-all" />
            <span>What's Inside</span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#a8c8ff] to-[#6EA8FF] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>

          <button
            onClick={onOpenDirectory}
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#6ed6e2]/40 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#6ed6e2] group-hover:scale-110 transition-all" />
            <span>30 Blueprints</span>
            <span className="px-1.5 py-0.2 bg-[#10151C] text-[#6ed6e2] text-[9px] rounded font-mono font-bold border border-[#6ed6e2]/40 shadow-[0_0_8px_rgba(110,214,226,0.3)] animate-pulse">
              NEW
            </span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#6EA8FF] to-[#6ed6e2] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          <a
            href="#bonuses"
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#ffd166]/40 transition-all duration-300"
          >
            <Gift className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#ffd166] group-hover:scale-110 transition-all" />
            <span>Bonuses</span>
            <span className="px-1 py-0.2 bg-[#282a2e] text-[#ffd166] text-[8px] rounded font-mono font-bold">
              5 FREE
            </span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#ffd166] to-[#f39c12] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>

          <a
            href="#about-the-guide"
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#ffd166]/40 transition-all duration-300"
          >
            <User className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#ffd166] group-hover:scale-110 transition-all" />
            <span>About Author</span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#ffd166] to-[#6ed6e2] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>

          <a
            href="#faqs"
            className="group relative px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-['Geist'] uppercase tracking-wider font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] hover:border hover:border-[#2A3441] transition-all duration-300"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8c919d] group-hover:text-[#F3F0E8] group-hover:scale-110 transition-all" />
            <span>FAQs</span>
            <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-[#8c919d] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2.5 py-1.5 rounded-lg border border-[#2A3441] bg-[#10151C] text-[#c2c6d3] font-['Geist'] text-[11px] uppercase tracking-wider hover:border-[#6EA8FF] hover:text-[#F3F0E8] transition-colors flex items-center gap-1 cursor-pointer"
              title="Select currency"
            >
              <span className="text-[#6ed6e2] font-semibold">{CURRENCY_RATES[currentCurrency].symbol}</span>
              <span>{currentCurrency}</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#171D25] border border-[#2A3441] rounded-lg shadow-2xl py-1 z-50">
                {(Object.keys(CURRENCY_RATES) as Array<keyof typeof CURRENCY_RATES>).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11px] font-['Geist'] flex items-center justify-between transition-colors ${
                      currentCurrency === curr ? 'bg-[#282a2e] text-[#6ed6e2]' : 'text-[#c2c6d3] hover:bg-[#1e2023] hover:text-[#F3F0E8]'
                    }`}
                  >
                    <span>{curr} ({CURRENCY_RATES[curr].symbol})</span>
                    {currentCurrency === curr && <Check className="w-3.5 h-3.5 text-[#6ed6e2]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Preview Button */}
          <button
            onClick={onOpenPreview}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#2A3441] bg-transparent text-[#F3F0E8] font-['Geist'] text-[11px] uppercase tracking-wider hover:border-[#6ea8ff] hover:bg-[#6EA8FF]/5 hover:text-[#e2e2e7] transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6ed6e2]" />
            <span>Preview the Book</span>
          </button>

          {/* Primary CTA (Original Warm Ivory Pill style from zip) */}
          <button
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F3F0E8] text-[#07090C] font-['Geist'] text-[11px] font-medium tracking-wide uppercase shadow-[0_0_16px_rgba(110,168,255,0.2)] hover:bg-[#D9DEE5] hover:text-[#07090C] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Get This eBook (PKR 1,999)</span>
          </button>

          {/* Saved Blueprints Indicator */}
          {savedCount > 0 && (
            <button
              onClick={onOpenDirectory}
              className="relative p-2 rounded-lg bg-[#171D25] border border-[#2A3441] text-[#6ed6e2] hover:border-[#6ed6e2] transition-colors cursor-pointer"
              title={`${savedCount} saved blueprints`}
            >
              <Bookmark className="w-4 h-4 fill-[#6ed6e2]" />
              <span className="absolute -top-1 -right-1 bg-[#6EA8FF] text-[#07090C] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#2A3441] text-[#c2c6d3] hover:text-[#F3F0E8] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10151C]/95 backdrop-blur-2xl border-b border-[#2A3441] px-6 py-4 space-y-2">
          <a
            href="#the-ebook"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#6ed6e2]" />
            <span>The eBook Specimen</span>
          </a>
          <a
            href="#whats-inside"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] transition-all"
          >
            <FileText className="w-4 h-4 text-[#a8c8ff]" />
            <span>What's Inside</span>
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDirectory();
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#6ed6e2] hover:bg-[#1a222f] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#6ed6e2]" />
              <span>30 Practical Blueprints</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-[#6ed6e2]/20 text-[#6ed6e2] rounded font-mono font-bold animate-pulse">NEW</span>
          </button>
          <a
            href="#bonuses"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Gift className="w-4 h-4 text-[#ffd166]" />
              <span>5 Bonuses & Toolkits</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-[#ffd166]/20 text-[#ffd166] rounded font-mono font-bold">FREE</span>
          </a>
          <a
            href="#about-the-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#c2c6d3] hover:text-[#F3F0E8] hover:bg-[#1a222f] transition-all"
          >
            <User className="w-4 h-4 text-[#ffd166]" />
            <span>About the Author</span>
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-xl font-['Geist'] text-[12px] uppercase font-semibold text-[#c2c6d3] hover:text-[#e2e2e7] hover:bg-[#1a222f] transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#8c919d]" />
            <span>Frequently Asked Questions</span>
          </a>
          <div className="pt-3 border-t border-[#2A3441] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreview();
              }}
              className="flex-1 py-2 rounded border border-[#2A3441] text-[#F3F0E8] text-[11px] uppercase tracking-wider"
            >
              Preview Sample
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout();
              }}
              className="flex-1 py-2 rounded bg-[#F3F0E8] text-[#07090C] text-[11px] uppercase font-semibold tracking-wider"
            >
              Get eBook
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
