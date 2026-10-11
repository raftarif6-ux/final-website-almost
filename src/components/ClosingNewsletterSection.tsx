import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CURRENCY_RATES } from '../data/ebookData';

interface ClosingNewsletterSectionProps {
  onOpenCheckout: () => void;
  currentCurrency: keyof typeof CURRENCY_RATES;
}

export const ClosingNewsletterSection: React.FC<ClosingNewsletterSectionProps> = ({
  onOpenCheckout,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 text-center border-t border-[#2A3441]/40">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="font-['Geist'] text-[10px] text-[#6ed6e2] uppercase tracking-[0.25em] block font-semibold">
          Explore What's Next
        </span>
        <h2 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#e2e2e7] font-normal">
          Ready to start your AI side hustle?
        </h2>
        <p className="font-['Newsreader'] text-lg sm:text-xl text-[#c2c6d3] max-w-xl mx-auto leading-relaxed">
          Join hundreds of curious beginners using the NEXORA DIGITAL blueprint to build practical digital skills and create independent online income.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onOpenCheckout}
            className="px-8 py-4 bg-[#d5e3ff] text-[#001b3c] rounded-lg font-['Geist'] text-xs uppercase tracking-wider font-semibold shadow-xl hover:bg-[#F3F0E8] transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Get the eBook & Bonuses (PKR 1,999)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Minimalist Newsletter Signup */}
        <div className="pt-10 max-w-md mx-auto space-y-3">
          <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-wider block font-semibold">
            Join the Nexora Synthesis Dispatch
          </span>
          {subscribed ? (
            <div className="p-3 bg-[#171D25] rounded-lg border border-[#6ed6e2] text-xs text-[#6ed6e2] font-['Geist'] flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Subscribed to Nexora Dispatch. Check your inbox!</span>
            </div>
          ) : (
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input
                className="flex-1 bg-[#171D25] border border-[#2A3441] text-[#e2e2e7] px-4 py-2.5 rounded-lg font-['Geist'] text-xs placeholder:text-[#8c919d] focus:outline-none focus:border-[#6ed6e2]"
                placeholder="Enter your email address"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-5 py-2.5 bg-[#282a2e] hover:bg-[#333538] text-[#6ed6e2] border border-[#2A3441] font-['Geist'] text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          )}
          <span className="font-['Geist'] text-[10px] text-[#8c919d] block">
            Curated bi-weekly notes on AI tools and emerging monetization models. Unsubscribe anytime.
          </span>
        </div>
      </div>
    </section>
  );
};
