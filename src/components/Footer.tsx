import React from 'react';
import { CheckCircle } from 'lucide-react';
import { CURRENCY_RATES } from '../data/ebookData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  currentCurrency: keyof typeof CURRENCY_RATES;
  onCurrencyChange: (currency: keyof typeof CURRENCY_RATES) => void;
  onOpenPreview: () => void;
  onOpenDirectory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenPreview,
  onOpenDirectory,
}) => {
  return (
    <footer className="w-full bg-[#10151C] border-t border-[#2A3441]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <BrandLogo size="md" />
            <p className="font-['Geist'] text-xs text-[#c2c6d3] leading-relaxed">
              The computational frontier of machine intelligence and strategic architectural cognition. Engineered for practitioners and visionary researchers.
            </p>
            <div className="flex items-center gap-2 text-[#6ed6e2]">
              <CheckCircle className="w-4 h-4" />
              <span className="font-['Geist'] text-[10px] uppercase tracking-wider text-[#c2c6d3]">
                Instant DRM-Free Delivery
              </span>
            </div>
          </div>

          {/* Column 2: Publication Modules */}
          <div className="flex flex-col gap-2.5">
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-widest mb-1 font-semibold">
              Publication Modules
            </span>
            <a
              href="#the-ebook"
              className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors"
            >
              Archival Specimen (v4.2)
            </a>
            <a
              href="#whats-inside"
              className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors"
            >
              Curriculum & Chapters
            </a>
            <button
              onClick={onOpenDirectory}
              className="text-left font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#6ed6e2] transition-colors cursor-pointer"
            >
              30 Practical Blueprints Catalog
            </button>
            <a
              href="#bonuses"
              className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors"
            >
              Cognitive Artifacts & Prompts
            </a>
            <button
              onClick={onOpenPreview}
              className="text-left font-['Geist'] text-xs text-[#6ed6e2] hover:underline cursor-pointer"
            >
              Reading Sanctuary Console
            </button>
          </div>

          {/* Column 3: Legal & Trust Protocols */}
          <div className="flex flex-col gap-2.5">
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-widest mb-1 font-semibold">
              Legal & Trust Protocols
            </span>
            <a href="#about-the-guide" className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors">
              End-User Licensing Agreement
            </a>
            <a href="#about-the-guide" className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors">
              Telemetry & Privacy Mandate
            </a>
            <a href="#purchase-vault" className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors">
              Terms of Digital Acquisition
            </a>
            <a href="#faqs" className="font-['Geist'] text-xs text-[#c2c6d3] hover:text-[#e2e2e7] transition-colors">
              14-Day Guarantee Protocol
            </a>
            <a
              href="/seller"
              className="font-['Geist'] text-[11px] text-[#ffd166]/70 hover:text-[#ffd166] flex items-center gap-1 transition-colors mt-1"
              title="Seller & Author Portal"
            >
              <span>🔒 Author Portal (PIN 0336)</span>
            </a>
          </div>

          {/* Column 4: Artifact Specs & Currency Switcher */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-widest block mb-2 font-semibold">
                Artifact Specifications
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1a1c1f] border border-[#2A3441] font-['Geist'] text-[10px] text-[#c2c6d3] uppercase font-mono">
                  EPUB 3.2
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1a1c1f] border border-[#2A3441] font-['Geist'] text-[10px] text-[#c2c6d3] uppercase font-mono">
                  PDF RETINA
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1a1c1f] border border-[#2A3441] font-['Geist'] text-[10px] text-[#c2c6d3] uppercase font-mono">
                  KINDLE AZW3
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2A3441]/40">
              <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-widest block mb-1 font-semibold">
                Settlement Currencies
              </span>
              <div className="flex items-center gap-2 font-['Geist'] text-xs">
                {(Object.keys(CURRENCY_RATES) as Array<keyof typeof CURRENCY_RATES>).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onCurrencyChange(curr)}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      currentCurrency === curr
                        ? 'bg-[#282a2e] text-[#6ed6e2] font-semibold'
                        : 'text-[#8c919d] hover:text-[#e2e2e7]'
                    }`}
                  >
                    {curr} ({CURRENCY_RATES[curr].symbol})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A3441]/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[#8c919d] font-['Geist'] text-[11px] uppercase tracking-widest">
            <span>© 2026 NEXORA DIGITAL. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6 text-[#8c919d] font-['Geist'] text-[10px]">
            <span className="flex items-center gap-1.5 text-[#c2c6d3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166]"></span>
              256-BIT ENCRYPTED VAULT
            </span>
            <span className="text-[#c2c6d3]">ANTI-PIRACY SINGLE-DEVICE SHIELD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
