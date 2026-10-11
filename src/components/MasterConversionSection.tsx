import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { BOOK_SPECIMEN_IMAGE, CURRENCY_RATES } from '../data/ebookData';
import { PRICING } from '../utils/pricing';
import { PriceDisplay, WhatsAppPaymentOption } from './PriceDisplay';

interface MasterConversionSectionProps {
  onOpenCheckout: () => void;
  currentCurrency: keyof typeof CURRENCY_RATES;
  country?: 'PK' | 'INTL';
  isLoadingCountry?: boolean;
  onToggleCountry?: () => void;
}

export const MasterConversionSection: React.FC<MasterConversionSectionProps> = ({
  onOpenCheckout,
  country = 'INTL',
  isLoadingCountry = false,
  onToggleCountry = () => {},
}) => {
  const activePlan = PRICING[country] || PRICING.INTL;

  return (
    <section className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50" id="purchase-vault">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1a1c1f] border border-[#2A3441] rounded-2xl p-8 lg:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Visual Pack Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#0c0e11] border border-[#2A3441]">
                <img
                  alt="AI Side Hustles for Beginners Master Pack"
                  className="w-full h-auto object-cover"
                  src={BOOK_SPECIMEN_IMAGE}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-[#1e2023] border border-[#2A3441] rounded font-['Geist'] text-[10px] text-[#8c919d] uppercase">
                PDF Version
              </span>
              <span className="px-3 py-1 bg-[#1e2023] border border-[#2A3441] rounded font-['Geist'] text-[10px] text-[#8c919d] uppercase">
                ePub Format
              </span>
              <span className="px-3 py-1 bg-[#1e2023] border border-[#2A3441] rounded font-['Geist'] text-[10px] text-[#6ed6e2] uppercase font-semibold">
                + 5 Resource Files
              </span>
            </div>
          </div>

          {/* Right Purchase Console */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-[#282a2e] text-[#6ed6e2] rounded font-['Geist'] text-[10px] uppercase tracking-widest inline-block font-semibold">
                Complete Launch Bundle
              </span>
              <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
                Get AI Side Hustles for Beginners
              </h2>
              <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3]">
                Everything you need to launch a practical AI side hustle today. Instant digital access, DRM-free files, and lifetime updates.
              </p>
            </div>

            {/* Included Package Inventory */}
            <div className="space-y-2.5 py-2">
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>The Complete Manual:</strong> 30 Blueprints (66 pages full edition, PDF & ePub)</span>
              </div>
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>Bonus 01:</strong> 50+ Tested AI Prompts (PDF & Notion)</span>
              </div>
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>Bonus 02:</strong> Client Outreach Templates & Pitch Scripts (DOCX)</span>
              </div>
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>Bonus 03:</strong> Side Hustle Pricing Calculator (XLSX / Sheets)</span>
              </div>
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>Bonus 04:</strong> 30-Day Action Roadmap & Milestone Tracker</span>
              </div>
              <div className="flex items-center gap-3 font-['Geist'] text-xs sm:text-sm text-[#e2e2e7]">
                <CheckCircle className="text-[#6ed6e2] w-4 h-4 shrink-0" />
                <span><strong>Bonus 05:</strong> Curated Directory of 60+ Beginner AI Tools</span>
              </div>
            </div>

            {/* Dynamic Country-Based Price Area */}
            <div className="pt-2">
              <PriceDisplay
                country={country}
                isLoading={isLoadingCountry}
                onToggleCountry={onToggleCountry}
              />
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-1">
              <button
                onClick={onOpenCheckout}
                className="w-full sm:w-auto px-10 py-4 bg-[#d5e3ff] text-[#001b3c] rounded-lg font-['Geist'] text-xs uppercase tracking-wider font-semibold text-center block sm:inline-flex items-center justify-center gap-2 shadow-xl hover:bg-[#F3F0E8] transition-all cursor-pointer"
              >
                <span>Get This eBook Now (PKR 1,999)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <WhatsAppPaymentOption country={country} />

              <p className="font-['Geist'] text-xs text-[#8c919d]">
                Instant digital access after payment. No physical book will be shipped.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
