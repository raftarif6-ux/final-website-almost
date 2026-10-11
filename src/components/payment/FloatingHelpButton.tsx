import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { getHelpWhatsAppUrl } from '../../config/payment';
import { PaymentMethod } from '../../context/PaymentContext';

interface FloatingHelpButtonProps {
  method?: PaymentMethod | null;
}

export const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({ method }) => {
  const url = getHelpWhatsAppUrl(method || undefined);

  return (
    <motion.aside
      aria-label="WhatsApp Support Assistance"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#10151C]/95 border border-[#25D366]/40 text-[#F3F0E8] shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all duration-300"
      >
        {/* Animated green pulse badge */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
        </span>

        <MessageCircle className="w-4 h-4 text-[#25D366] transition-transform group-hover:scale-110" />

        <div className="flex flex-col text-left">
          <span className="font-['Geist'] text-xs font-semibold text-[#F3F0E8] leading-tight">
            Need Help?
          </span>
          <span className="font-['Geist'] text-[10px] text-[#8c919d] group-hover:text-[#25D366] transition-colors leading-none mt-0.5">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </motion.aside>
  );
};
