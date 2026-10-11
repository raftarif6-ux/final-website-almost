import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { PaymentMethod } from '../../context/PaymentContext';
import { PAYMENT_CONFIG, formatPKR } from '../../config/payment';
import { CopyButton } from './CopyButton';

interface AccountDetailsPanelProps {
  method: PaymentMethod | null;
}

export const AccountDetailsPanel: React.FC<AccountDetailsPanelProps> = ({ method }) => {
  if (!method) return null;

  const isEasyPaisa = method === 'EasyPaisa';
  const account = isEasyPaisa ? PAYMENT_CONFIG.easyPaisa : PAYMENT_CONFIG.jazzCash;
  const brandColor = isEasyPaisa ? '#00E676' : '#FF5252';

  return (
    <AnimatePresence>
      <motion.div
        key={method}
        initial={{ opacity: 0, height: 0, y: -10 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#171D25] to-[#10151C] border border-[#ffd166]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2A3441]/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
                <span className="font-['Geist'] text-xs uppercase tracking-wider text-[#ffd166] font-semibold">
                  Official {method} Details
                </span>
              </div>
              <h4 className="font-['Newsreader'] text-xl sm:text-2xl text-[#F3F0E8] mt-0.5">
                Transfer Information
              </h4>
            </div>

            {/* Price Badge */}
            <div className="bg-[#10151C] px-3.5 py-2 rounded-xl border border-[#2A3441] flex items-baseline gap-2">
              <span className="text-xs text-[#8c919d] font-['Geist']">Pay Exactly:</span>
              <span className="line-through text-xs font-mono text-[#8c919d]">
                {formatPKR(PAYMENT_CONFIG.originalPricePkr)}
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-[#ffd166]">
                {formatPKR(PAYMENT_CONFIG.pricePkr)}
              </span>
            </div>
          </div>

          {/* Account Detail Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Account Number Card */}
            <div className="p-4 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-2">
              <span className="font-['Geist'] text-[11px] uppercase tracking-wider text-[#8c919d] block">
                {method} Mobile Number
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F3F0E8] tracking-wider">
                  {account.number}
                </span>
                <CopyButton textToCopy={account.number} label="Copy Number" />
              </div>
              <span className="text-[11px] text-[#8c919d] block">
                Tap button to copy mobile account number (03361068235)
              </span>
            </div>

            {/* Account Title Card */}
            <div className="p-4 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-2">
              <span className="font-['Geist'] text-[11px] uppercase tracking-wider text-[#8c919d] block">
                Account Title / Receiver Name
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#ffd166]">
                  {account.name}
                </span>
                <CopyButton textToCopy={account.name} label="Copy Title" />
              </div>
              <span className="text-[11px] text-[#8c919d] block">
                Confirm this name matches on your transfer confirmation screen
              </span>
            </div>
          </div>

          {/* Simple step instructions callout */}
          <div className="p-4 rounded-xl bg-[#10151C]/80 border border-[#2A3441] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#ffd166]/10 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166] shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h5 className="font-['Geist'] text-xs font-semibold uppercase tracking-wider text-[#F3F0E8]">
                Instructions for Payment
              </h5>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
                Send exactly <strong className="text-[#ffd166] font-mono">{formatPKR(PAYMENT_CONFIG.pricePkr)}</strong> to <strong className="text-[#F3F0E8] font-mono">{account.number}</strong> via your {method} app or bank app, take a screenshot of the receipt, and upload it on the next step to receive your verified unlock link on WhatsApp.
              </p>
              {account.instructions && (
                <p className="font-['Geist'] text-xs text-[#8c919d] pt-1">
                  💡 {account.instructions}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
