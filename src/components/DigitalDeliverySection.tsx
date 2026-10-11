import React from 'react';
import { Smartphone, Zap, Lock, Headphones } from 'lucide-react';

export const DigitalDeliverySection: React.FC = () => {
  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block font-semibold">
            Secure Delivery Guarantee
          </span>
          <h2 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#e2e2e7] font-normal">
            Digital Delivery Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-2 shadow-md">
            <Smartphone className="w-6 h-6 text-[#ffd166]" />
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">File Formats</span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Universal Digital</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3]">
              Formatted for iPad, Kindle, tablets, smartphones, and desktop displays.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-2 shadow-md">
            <Zap className="w-6 h-6 text-[#a8c8ff]" />
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Speed</span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Instant Delivery</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3]">
              A secure download link is sent to your inbox the moment checkout finishes.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-2 shadow-md">
            <Lock className="w-6 h-6 text-[#b4c8e3]" />
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Payment Gateways</span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Secure Checkout</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3]">
              Encrypted transactions handled through 256-bit SSL with full data privacy.
            </p>
          </div>

          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-2 shadow-md">
            <Headphones className="w-6 h-6 text-[#ffd166]" />
            <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase block">Assistance</span>
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Customer Support</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3]">
              Questions about your order? Reach our team at support@nexoradigital.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
