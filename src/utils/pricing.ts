/**
 * ============================================================================
 * PRICING & VISITOR LOCATION UTILS
 * ============================================================================
 */

export interface PricingPlan {
  original: number;
  offer: number;
  link: string;
  label: string;
  localNote: string;
}

export const PRICING: Record<'PK' | 'INTL', PricingPlan> = {
  // PAKISTAN PRICING:
  PK: {
    original: 2800,
    offer: 1999,
    link: "/checkout",
    label: "Pakistan Special Offer",
    localNote: "Rs 1,999 (was Rs 2,800)"
  },
  // INTERNATIONAL PRICING:
  INTL: {
    original: 39,
    offer: 27,
    link: "/checkout",
    label: "Launch Offer",
    localNote: ""
  }
};

export const WHATSAPP_NUMBER = "923361068235";

export function calculateDiscountPercent(original: number, offer: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - offer) / original) * 100);
}

export async function detectVisitorCountry(): Promise<'PK' | 'INTL'> {
  try {
    const saved = localStorage.getItem('nexora_manual_country');
    if (saved === 'PK' || saved === 'INTL') {
      return saved;
    }
  } catch {}
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      const code = (data.country_code || data.country || '').toUpperCase();
      if (code === 'PK') return 'PK';
      return 'INTL';
    }
  } catch {
    try {
      const res2 = await fetch('https://ipwho.is/');
      if (res2.ok) {
        const data2 = await res2.json();
        const code2 = (data2.country_code || data2.country_code2 || '').toUpperCase();
        if (code2 === 'PK') return 'PK';
      }
    } catch {
      // Default to PK for manual payment emphasis
    }
  }
  return 'PK';
}
