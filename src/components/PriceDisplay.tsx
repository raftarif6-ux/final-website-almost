import React from 'react';
import { PRICING, WHATSAPP_NUMBER, calculateDiscountPercent } from '../utils/pricing';

interface PriceDisplayProps {
  country: 'PK' | 'INTL';
  isLoading: boolean;
  onToggleCountry: () => void;
  compact?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  country,
  isLoading,
  onToggleCountry,
  compact = false,
}) => {
  const plan = PRICING[country] || PRICING.INTL;
  const discountPercent = calculateDiscountPercent(plan.original, plan.offer);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2 py-1">
        <div className="h-4 w-32 bg-[#282a2e] rounded"></div>
        <div className="h-9 w-44 bg-[#282a2e] rounded"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="line-through text-xs text-[#8c919d] font-mono">${plan.original}</span>
        <span className="font-mono text-base font-bold text-[#F3F0E8]">${plan.offer}</span>
        <span className="text-[10px] text-[#ffd166] font-semibold bg-[#171D25] px-1.5 py-0.5 rounded border border-[#2A3441]">
          Save {discountPercent}%
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 py-1">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-0.5 rounded bg-[#171D25] border border-[#2A3441] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
          {plan.label}
        </span>
        <span className="px-2.5 py-0.5 rounded bg-[#ffd166]/15 text-[#ffd166] font-['Geist'] text-[10px] font-bold">
          Save {discountPercent}%
        </span>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="line-through text-lg sm:text-xl text-[#8c919d] font-mono">
          ${plan.original}
        </span>
        <span className="font-['Newsreader'] text-4xl sm:text-5xl font-semibold text-[#F3F0E8] font-mono leading-none">
          ${plan.offer}
        </span>
        {plan.localNote && (
          <span className="text-xs sm:text-sm text-[#ffd166] font-['Geist'] font-medium bg-[#171D25] px-2 py-1 rounded border border-[#ffd166]/40">
            ({plan.localNote})
          </span>
        )}
      </div>

      <div className="pt-0.5">
        <button
          type="button"
          onClick={onToggleCountry}
          className="text-[11px] text-[#8c919d] hover:text-[#ffd166] transition-colors font-['Geist'] flex items-center gap-1 cursor-pointer"
        >
          <span>Viewing prices for:</span>
          <strong className="text-[#c2c6d3] underline decoration-[#2A3441] hover:decoration-[#ffd166]">
            {country === 'PK' ? 'Pakistan' : 'International'}
          </strong>
          <span className="text-[#ffd166]">(change)</span>
        </button>
      </div>
    </div>
  );
};

export const WhatsAppPaymentOption: React.FC<{ country: 'PK' | 'INTL' }> = ({ country }) => {
  if (country !== 'PK') return null;

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Salam! I want to buy "AI Side Hustles for Beginners" via JazzCash / EasyPaisa.'
  )}`;

  return (
    <div className="pt-2 text-left">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-[#c2c6d3] hover:text-[#ffd166] transition-colors font-['Geist'] bg-[#171D25] border border-[#2A3441] hover:border-[#ffd166] px-3 py-2 rounded-lg"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
        <span>
          Pay via <strong>JazzCash / Easypaisa</strong>? Contact us on WhatsApp
        </span>
      </a>
    </div>
  );
};
