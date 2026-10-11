import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';
import { PaymentMethod } from '../../context/PaymentContext';
import { PAYMENT_CONFIG } from '../../config/payment';

interface MethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export const MethodCard: React.FC<MethodCardProps> = ({
  method,
  isSelected,
  onSelect,
}) => {
  const isEasyPaisa = method === 'EasyPaisa';
  const account = isEasyPaisa ? PAYMENT_CONFIG.easyPaisa : PAYMENT_CONFIG.jazzCash;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(method)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-b from-[#1b1e24] to-[#10151C] border-[#ffd166] shadow-[0_0_30px_rgba(255,209,102,0.2)]'
          : 'bg-[#12161E] border-[#2A3441] hover:border-[#ffd166]/50 hover:bg-[#151a22]'
      }`}
    >
      {/* Selection Border Glow Accent */}
      {isSelected && (
        <motion.div
          layoutId="methodSelectionGlow"
          className="absolute inset-0 border-2 border-[#ffd166] rounded-2xl pointer-events-none"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Top row: Brand Badge + Selection Indicator */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Brand visual emblem */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-transform ${
              isEasyPaisa
                ? 'bg-[#00A651]/15 text-[#00E676] border border-[#00A651]/40'
                : 'bg-[#ED1C24]/15 text-[#FF5252] border border-[#ED1C24]/40'
            }`}
          >
            {isEasyPaisa ? (
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <circle cx="20" cy="20" r="18" fill="#00A651" fillOpacity="0.2" />
                <path
                  d="M13 14H27M13 20H23M13 26H27"
                  stroke="#00E676"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="27" cy="20" r="2.5" fill="#00E676" />
              </svg>
            ) : (
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <circle cx="20" cy="20" r="18" fill="#ED1C24" fillOpacity="0.2" />
                <path
                  d="M15 13L25 20L15 27"
                  stroke="#FF5252"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 13L27 15"
                  stroke="#ffd166"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Newsreader'] text-xl sm:text-2xl font-medium text-[#F3F0E8]">
                {method}
              </h3>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isSelected
                    ? 'bg-[#ffd166]/20 text-[#ffd166] border border-[#ffd166]/40'
                    : 'bg-[#171D25] text-[#8c919d] border border-[#2A3441]'
                }`}
              >
                Instant Transfer
              </span>
            </div>
            <p className="font-['Geist'] text-xs text-[#8c919d] mt-0.5">
              {isEasyPaisa ? 'Telenor Mobile Account (03361068235)' : 'Mobilink Microfinance (03361068235)'}
            </p>
          </div>
        </div>

        {/* Selection Check Circle */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-[#ffd166] text-[#07090C] shadow-[0_0_12px_rgba(255,209,102,0.8)]'
              : 'border border-[#2A3441] bg-[#10151C]'
          }`}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Account Info Snippet */}
      <div className="space-y-1.5 pt-3 border-t border-[#2A3441]/50 text-xs font-['Geist']">
        <div className="flex justify-between items-center text-[#8c919d]">
          <span>Account Title:</span>
          <span className="font-medium text-[#F3F0E8]">{account.name}</span>
        </div>
        <div className="flex justify-between items-center text-[#8c919d]">
          <span>Account Number:</span>
          <span className="font-mono font-semibold text-[#ffd166] text-sm">
            {account.number}
          </span>
        </div>
      </div>

      {/* Status hint footer */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8c919d]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#ffd166] shrink-0" />
        <span>Price: PKR 1,999 • Verified manually by Rafay Arif</span>
      </div>
    </motion.button>
  );
};
