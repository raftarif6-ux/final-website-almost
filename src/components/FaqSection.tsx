import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need prior technical knowledge or coding skills?',
      a: 'None at all. The manual is written specifically for complete beginners. Every workflow relies on user-friendly web apps with simple graphical interfaces like ChatGPT, Claude, Canva, and Notion — no terminal commands, code, or mathematics required.'
    },
    {
      q: 'How do I pay via EasyPaisa or JazzCash?',
      a: 'We support 100% direct manual payment in Pakistan via EasyPaisa and JazzCash. You simply transfer the funds to the provided account number, upload your payment screenshot on our checkout portal, and we verify and send your eBook to WhatsApp & Email within 10 to 30 minutes.'
    },
    {
      q: 'Are expensive paid AI subscriptions required?',
      a: 'No. Each of the 30 side hustle blueprints lists free-tier alternatives. You can begin, build sample assets, and test your ideas with completely free plans before choosing to upgrade to paid tools.'
    },
    {
      q: 'How and when do I receive the 5 bonus resources?',
      a: 'All 5 bonus files are packaged directly with your eBook download. You will receive an immediate dispatch containing your master download link and files right after verification.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer an unconditional 14-day money-back guarantee. We take pride in the quality and depth of our publications. If you review the material and find it does not meet your expectations, simply reach out to support@nexoradigital.com for a swift, full refund.'
    },
    {
      q: 'Will I receive a physical book by mail?',
      a: 'No. This is an entirely digital publication. You will receive instant downloads (PDF and ePub) without shipping delays or courier costs, readable on all mobile and desktop devices.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50" id="faqs">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block font-semibold">
            Clear Answers
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Frequently Asked Questions
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3]">
            Everything you need to know about the eBook, bonus assets, payment methods, and fulfillment.
          </p>
        </div>

        {/* FAQ Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl p-6 shadow-md cursor-pointer hover:border-[#ffd166]/60 transition-all"
              onClick={() => toggleFaq(idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                  {faq.q}
                </h4>
                <ChevronDown
                  className={`w-5 h-5 text-[#8c919d] transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180 text-[#ffd166]' : ''
                  }`}
                />
              </div>
              {openIndex === idx && (
                <div className="mt-4 pt-3 border-t border-[#2A3441]/40 text-[#c2c6d3] font-['Geist'] text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
