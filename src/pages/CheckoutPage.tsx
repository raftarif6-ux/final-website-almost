import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  Download,
} from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import { PAYMENT_CONFIG, formatPKR, getHelpWhatsAppUrl } from '../config/payment';
import { BOOK_SPECIMEN_IMAGE } from '../data/ebookData';
import { BrandLogo } from '../components/BrandLogo';
import { Stepper } from '../components/payment/Stepper';
import { MethodCard } from '../components/payment/MethodCard';
import { AccountDetailsPanel } from '../components/payment/AccountDetailsPanel';
import { BackgroundGlow } from '../components/payment/BackgroundGlow';
import { FloatingHelpButton } from '../components/payment/FloatingHelpButton';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMethod, setSelectedMethod } = usePayment();

  const handleProceed = () => {
    if (!selectedMethod) return;
    navigate('/upload-receipt');
  };

  const helpUrl = getHelpWhatsAppUrl(selectedMethod || undefined);

  return (
    <div className="min-h-screen bg-[#07090C] text-[#e2e2e7] flex flex-col relative selection:bg-[#ffd166]/20 selection:text-[#ffd166]">
      <BackgroundGlow />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#10151C]/90 backdrop-blur-xl border-b border-[#2A3441]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <BrandLogo size="md" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A3441] bg-[#171D25] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166]/50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Site</span>
          </Link>
        </div>
      </header>

      {/* Main Checkout Viewport */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 relative z-10">
        {/* Stepper (Step 1 active) */}
        <Stepper currentStep={1} />

        {/* Hero Section & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-2 mb-8"
        >
          <span className="font-['Geist'] text-[10px] uppercase tracking-[0.25em] text-[#ffd166] font-semibold">
            Official Payment Channel
          </span>
          <h1 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E8] font-normal tracking-tight">
            Choose Your Payment Method
          </h1>
          <p className="font-['Geist'] text-xs sm:text-sm text-[#8c919d] max-w-lg mx-auto">
            Transfer PKR 1,999 to EasyPaisa or JazzCash (03361068235) and upload your receipt screenshot. Rafay Arif will personally verify and send you the direct unlock link.
          </p>
        </motion.div>

        {/* Order Summary Specimen Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#12161E] border border-[#2A3441] shadow-xl flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Ebook Thumbnail */}
          <div className="w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-[#07090C] border border-[#2A3441] shadow-md">
            <img
              src={BOOK_SPECIMEN_IMAGE}
              alt={PAYMENT_CONFIG.ebookTitle}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-mono text-[10px] uppercase font-bold text-[#ffd166] bg-[#ffd166]/10 px-2 py-0.5 rounded border border-[#ffd166]/30">
                Archival Digital Edition
              </span>
              <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase">
                66 Pages • 30 Blueprints • 5 Bonus Toolkits
              </span>
            </div>
            <h2 className="font-['Newsreader'] text-xl sm:text-2xl text-[#F3F0E8] font-medium">
              {PAYMENT_CONFIG.ebookTitle}
            </h2>
            <p className="font-['Geist'] text-xs text-[#8c919d]">
              By {PAYMENT_CONFIG.author} • Complete Starter Kit PDF
            </p>
          </div>

          {/* Price & Savings */}
          <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#2A3441]/70 pt-3 sm:pt-0 sm:pl-6 shrink-0 space-y-0.5">
            <div className="flex items-baseline justify-center sm:justify-end gap-2">
              <span className="line-through text-xs font-mono text-[#8c919d]">
                {formatPKR(PAYMENT_CONFIG.originalPricePkr)}
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#ffd166]">
                {formatPKR(PAYMENT_CONFIG.pricePkr)}
              </span>
            </div>
            <span className="text-[10px] font-['Geist'] text-[#ffd166] font-semibold block uppercase">
              Save 29% Today (Special Price)
            </span>
          </div>
        </motion.div>

        {/* Method Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="space-y-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-['Geist'] text-xs uppercase tracking-wider text-[#ffd166] font-semibold">
              Select Payment Channel
            </h3>
            <span className="text-[11px] text-[#8c919d]">
              Account Number: 03361068235
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MethodCard
              method="EasyPaisa"
              isSelected={selectedMethod === 'EasyPaisa'}
              onSelect={(m) => setSelectedMethod(m)}
            />
            <MethodCard
              method="JazzCash"
              isSelected={selectedMethod === 'JazzCash'}
              onSelect={(m) => setSelectedMethod(m)}
            />
          </div>
        </motion.div>

        {/* Animated Account Details Panel */}
        <div className="mb-8">
          <AccountDetailsPanel method={selectedMethod} />
        </div>

        {/* Call to Action Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="p-6 rounded-2xl bg-[#12161E] border border-[#2A3441] shadow-xl space-y-4 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-normal">
                {selectedMethod
                  ? `Ready to submit your ${selectedMethod} payment?`
                  : 'Please select EasyPaisa or JazzCash above'}
              </h4>
              <p className="font-['Geist'] text-xs text-[#8c919d] mt-0.5">
                {selectedMethod
                  ? 'Send PKR 1,999 to 03361068235 and tap below to upload your receipt.'
                  : 'Choose a payment method to view receiver details and proceed.'}
              </p>
            </div>

            {/* Main CTA (Gold Button with sweep glow) */}
            <div className="w-full sm:w-auto">
              <motion.button
                type="button"
                onClick={handleProceed}
                disabled={!selectedMethod}
                whileHover={selectedMethod ? { scale: 1.02 } : {}}
                whileTap={selectedMethod ? { scale: 0.98 } : {}}
                className={`relative group w-full sm:w-auto px-8 py-4 rounded-xl font-['Geist'] text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer overflow-hidden ${
                  selectedMethod
                    ? 'bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] shadow-[0_0_25px_rgba(255,209,102,0.35)] hover:shadow-[0_0_35px_rgba(255,209,102,0.6)]'
                    : 'bg-[#1e2530] text-[#8c919d] border border-[#2A3441] cursor-not-allowed opacity-60'
                }`}
              >
                {selectedMethod && (
                  <span className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                )}
                <span className="relative z-10 font-bold">
                  I've Paid, Upload Receipt
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>

          {/* Secondary Action */}
          <div className="pt-3 border-t border-[#2A3441]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#8c919d] font-['Geist']">
              Having trouble with sending funds to 03361068235?
            </span>
            <a
              href={helpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#171D25] border border-[#2A3441] text-[#ffd166] hover:border-[#ffd166] hover:bg-[#ffd166]/10 transition-all font-['Geist']"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Need help? Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl bg-[#12161E]/60 border border-[#2A3441]/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ffd166]/10 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166] shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-['Geist'] text-xs font-semibold text-[#F3F0E8] block">
                Verified Manual Delivery
              </span>
              <span className="font-['Geist'] text-[11px] text-[#8c919d]">
                Verified personally by Rafay Arif
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#12161E]/60 border border-[#2A3441]/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ffd166]/10 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166] shrink-0">
              <Download className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-['Geist'] text-xs font-semibold text-[#F3F0E8] block">
                Official PDF eBook
              </span>
              <span className="font-['Geist'] text-[11px] text-[#8c919d]">
                Complete 66-page Archival Kit
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#12161E]/60 border border-[#2A3441]/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-['Geist'] text-xs font-semibold text-[#F3F0E8] block">
                WhatsApp Support
              </span>
              <span className="font-['Geist'] text-[11px] text-[#8c919d]">
                Direct line on 03361068235
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Help Button */}
      <FloatingHelpButton method={selectedMethod} />
    </div>
  );
};
