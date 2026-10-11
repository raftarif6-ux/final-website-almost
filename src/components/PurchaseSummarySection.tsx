import React from 'react';
import { BOOK_SPECIMEN_IMAGE, CURRENCY_RATES } from '../data/ebookData';
import { PRICING } from '../utils/pricing';
import { ArrowRight } from 'lucide-react';

interface PurchaseSummarySectionProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
  currentCurrency: keyof typeof CURRENCY_RATES;
  country?: 'PK' | 'INTL';
  isLoadingCountry?: boolean;
}

export const PurchaseSummarySection: React.FC<PurchaseSummarySectionProps> = ({
  onOpenCheckout,
  onOpenPreview,
  country = 'INTL',
  isLoadingCountry = false,
}) => {
  const plan = PRICING[country] || PRICING.INTL;

  return (
    <section className="w-full bg-[#1e2023] px-6 lg:px-12 py-12 lg:py-16 border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-8 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Thumbnail / Specimen */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              onClick={onOpenPreview}
              className="relative w-48 sm:w-60 rounded-lg overflow-hidden shadow-2xl bg-[#0c0e11] border border-[#2A3441] cursor-pointer group"
            >
              <img
                alt="AI Side Hustles for Beginners eBook Cover Specimen"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                src={BOOK_SPECIMEN_IMAGE}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-[#10151C] text-[#6ed6e2] rounded text-xs uppercase font-['Geist'] tracking-wider border border-[#2A3441]">
                  Click to Preview
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary Data & Checkout CTA */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#282a2e] text-[#6ed6e2] font-['Geist'] text-[10px] uppercase font-semibold">
                Curated Publication
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#282a2e] text-[#a8c8ff] font-['Geist'] text-[10px] uppercase font-semibold">
                DRM-Free
              </span>
            </div>

            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal leading-tight">
              AI Side Hustles for Beginners
            </h2>

            <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] max-w-xl leading-relaxed">
              A step-by-step master guide engineered for individuals seeking tangible, unhyped digital monetization methods powered by modern artificial intelligence.
            </p>

            {/* Key Facts Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="bg-[#1e2023] p-3 rounded-lg border border-[#2A3441]/70">
                <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Deliverable</span>
                <span className="font-['Geist'] text-sm sm:text-base text-[#e2e2e7] font-semibold">Digital eBook</span>
              </div>
              <div className="bg-[#1e2023] p-3 rounded-lg border border-[#2A3441]/70">
                <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Bonus Vault</span>
                <span className="font-['Geist'] text-sm sm:text-base text-[#6ed6e2] font-semibold">5 Resources</span>
              </div>
              <div className="bg-[#1e2023] p-3 rounded-lg border border-[#2A3441]/70">
                <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Delivery</span>
                <span className="font-['Geist'] text-sm sm:text-base text-[#e2e2e7] font-semibold">Instant Access</span>
              </div>
              <div className="bg-[#1e2023] p-3 rounded-lg border border-[#2A3441]/70">
                <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Valuation</span>
                {isLoadingCountry ? (
                  <span className="h-5 w-16 bg-[#282a2e] animate-pulse rounded block mt-0.5"></span>
                ) : (
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="line-through text-xs text-[#8c919d] font-mono">PKR 2,800</span>
                    <span className="font-['Geist'] text-sm sm:text-base text-[#a8c8ff] font-semibold font-mono">
                      PKR 1,999
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenCheckout}
                className="px-8 py-3 bg-[#d5e3ff] text-[#001b3c] rounded-lg font-['Geist'] text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-[#F3F0E8] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Get This eBook Now (PKR 1,999)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPreview}
                className="px-5 py-3 border border-[#2A3441] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#6EA8FF] rounded-lg font-['Geist'] text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Sample Manuscript Spread
              </button>

              <span className="font-['Geist'] text-xs text-[#8c919d]">
                Digital download. No physical book will be shipped.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
