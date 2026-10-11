import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Home,
  Download,
  FileText,
  Sparkles,
  ExternalLink,
  Lock,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
  ArrowRight,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import {
  PAYMENT_CONFIG,
  getWhatsAppUrl,
} from '../config/payment';
import { BrandLogo } from '../components/BrandLogo';
import { Stepper } from '../components/payment/Stepper';
import { SuccessCheck } from '../components/payment/SuccessCheck';
import { BackgroundGlow } from '../components/payment/BackgroundGlow';
import {
  claimAccessOnDevice,
  isCurrentDeviceActivated,
  getActivatedClientName,
} from '../services/security';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    customerDetails,
    selectedMethod,
    uploadedImageUrl,
    resetCheckout,
  } = usePayment();

  // URL parameters for client access
  const tokenParam = searchParams.get('token');
  const codeParam = searchParams.get('code');
  const keyParam = searchParams.get('key');
  const clientParam = searchParams.get('client');

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return isCurrentDeviceActivated();
  });
  const [activeClientName, setActiveClientName] = useState<string>(() => {
    return getActivatedClientName();
  });

  const [passcodeInput, setPasscodeInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isForwardingBlocked, setIsForwardingBlocked] = useState(false);
  const [hasAutoDownloaded, setHasAutoDownloaded] = useState(false);

  // Automatic verification on URL parameters (1-Click for Buyer)
  useEffect(() => {
    const candidate = tokenParam || codeParam || keyParam;
    if (candidate && !isUnlocked) {
      setIsVerifying(true);
      claimAccessOnDevice(candidate, clientParam || undefined).then((res) => {
        setIsVerifying(false);
        if (res.success) {
          setIsUnlocked(true);
          setActiveClientName(res.clientName || clientParam || 'Verified Purchaser');
          setErrorMessage(null);
          setIsForwardingBlocked(false);
        } else {
          if (res.forwardingBlocked) {
            setIsForwardingBlocked(true);
          }
          setErrorMessage(res.error || 'Verification failed. Please contact Rafay Arif on WhatsApp (03361068235).');
        }
      });
    }
  }, [tokenParam, codeParam, keyParam, clientParam, isUnlocked]);

  // Auto-download PDF on first visit when unlocked
  useEffect(() => {
    if (isUnlocked && !hasAutoDownloaded) {
      const timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = PAYMENT_CONFIG.pdfDownloadUrl;
        link.download = 'AI-Side-Hustles-for-Beginners-Rafay-Arif.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setHasAutoDownloaded(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked, hasAutoDownloaded]);

  // Manual code or phone verification handler
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcodeInput.trim();
    if (!clean) return;

    setIsVerifying(true);
    setErrorMessage(null);
    setIsForwardingBlocked(false);

    const res = await claimAccessOnDevice(clean);
    setIsVerifying(false);

    if (res.success) {
      setIsUnlocked(true);
      setActiveClientName(res.clientName || 'Verified Purchaser');
    } else {
      if (res.forwardingBlocked) {
        setIsForwardingBlocked(true);
      }
      setErrorMessage(res.error || 'Invalid code or access. Please contact Rafay (03361068235).');
    }
  };

  const handleReturnHome = () => {
    resetCheckout();
    navigate('/');
  };

  // WhatsApp link for assistance
  const verificationRequestWhatsAppUrl = getWhatsAppUrl(
    `Salam Rafay! I have transferred PKR 1,999 to your EasyPaisa (03361068235) for "${PAYMENT_CONFIG.ebookTitle}". Please approve my access and send me my personal unlock link.`
  );

  const directWhatsAppUrl = getWhatsAppUrl(
    `Salam Rafay! I have unlocked and downloaded "${PAYMENT_CONFIG.ebookTitle}". Thank you!`
  );

  return (
    <div className="min-h-screen bg-[#07090C] text-[#e2e2e7] flex flex-col relative selection:bg-[#ffd166]/20 selection:text-[#ffd166]">
      <BackgroundGlow />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#10151C]/90 backdrop-blur-xl border-b border-[#2A3441]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link to="/" onClick={resetCheckout} className="inline-flex items-center gap-2">
            <BrandLogo size="md" />
          </Link>

          <button
            onClick={handleReturnHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#2A3441] bg-[#171D25] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166]/50 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 relative z-10 text-center">
        {/* Stepper (Step 4) */}
        <Stepper currentStep={4} />

        {/* -------------------------------------------------------------
            CASE 1: LOCKED VIEW (Anti-Forwarding & Anti-Scam Shield)
        ------------------------------------------------------------- */}
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Lock Emblem */}
            <div className="w-20 h-20 rounded-3xl bg-[#171D25] border-2 border-[#ffd166]/40 flex items-center justify-center text-[#ffd166] mx-auto shadow-[0_0_35px_rgba(255,209,102,0.25)]">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="font-['Geist'] text-[11px] uppercase tracking-[0.25em] text-[#ffd166] font-semibold block">
                Single-Buyer Device Security
              </span>
              <h1 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#F3F0E8] font-normal tracking-tight">
                Download Portal is Locked
              </h1>
              <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] max-w-lg mx-auto leading-relaxed">
                Yeh download portal sirf verified khareedaron ke liye hai jinhon ne <strong className="text-[#ffd166]">EasyPaisa (03361068235)</strong> par PKR 1,999 transfer kiye hain aur Rafay Arif se approval li hai.
              </p>
            </div>

            {/* FORWARDING BLOCKED ALERT BANNER (If unauthorized sharing attempted) */}
            <AnimatePresence>
              {isForwardingBlocked && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-600 text-left space-y-2 shadow-[0_0_30px_rgba(225,29,72,0.25)]"
                >
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <strong className="text-sm font-['Geist'] font-bold">
                      Security Alert: Forwarded Link Blocked!
                    </strong>
                  </div>
                  <p className="text-xs text-rose-200/90 font-['Geist'] leading-relaxed">
                    Yeh eBook access pehle hi kisi aur mobile phone par activate ho chuka hai. Kisi doosray shakhs ko link forward karnay par auto-protection active ho jati hai. Sirf jis client ko Rafay Arif ne permission di hai wohi unlock kar sakta hai.
                  </p>
                  <div className="pt-1">
                    <a
                      href={verificationRequestWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-medium hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Rabta Karein: Rafay Arif WhatsApp (03361068235)</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Passcode / Phone Unlock Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#12161E] border border-[#2A3441] shadow-2xl text-left space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#ffd166]" />
                <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8]">
                  4-Digit VIP Code Ya WhatsApp Number Enter Karein
                </h3>
              </div>
              <p className="font-['Geist'] text-xs text-[#8c919d]">
                Jab aap Rafay Arif (03361068235) ko receipt send karein gy, to Rafay aap ko 4-digit code ya WhatsApp link send karega:
              </p>

              <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setErrorMessage(null);
                    setIsForwardingBlocked(false);
                  }}
                  placeholder="Enter 4-digit code (e.g. 8492) ya Phone Number"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#10151C] border border-[#2A3441] text-sm font-mono text-[#F3F0E8] focus:border-[#ffd166] focus:outline-none"
                  disabled={isVerifying}
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] font-['Geist'] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(255,209,102,0.3)] hover:shadow-[0_0_30px_rgba(255,209,102,0.5)] transition-all flex items-center justify-center gap-1.5"
                >
                  {isVerifying ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Unlock eBook</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {errorMessage && !isForwardingBlocked && (
                <p className="text-xs text-rose-400 font-['Geist'] bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/40">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={verificationRequestWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#25D366] text-white font-['Geist'] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Rafay Ko WhatsApp Karein (03361068235)</span>
              </a>

              <Link
                to="/checkout"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#F3F0E8] hover:border-[#ffd166] font-['Geist'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Back to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* SELLER QUICK LINK (FOR RAFAY ARIF ONLY) */}
            <div className="pt-6 border-t border-[#2A3441]/40 text-center">
              <Link
                to="/seller"
                className="inline-flex items-center gap-1.5 text-xs text-[#8c919d] hover:text-[#ffd166] font-mono transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffd166]" />
                <span>Rafay Arif Seller Portal (Approve Clients / PIN: 0336) →</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* -------------------------------------------------------------
              CASE 2: UNLOCKED VIEW (Confirmed & Bound to this Device)
          ------------------------------------------------------------- */
          <>
            {/* Self-drawing Gold SVG Checkmark with Gold Confetti burst */}
            <SuccessCheck />

            {/* Animated Headline and Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffd166]/10 border border-[#ffd166]/30 text-xs text-[#ffd166] font-mono">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Verified & Bound to this Device ({activeClientName})</span>
              </div>

              <h1 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E8] font-normal tracking-tight">
                Access Granted & eBook Ready!
              </h1>
              <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] max-w-lg mx-auto leading-relaxed">
                Rafay Arif ne aap ki PKR 1,999 ki payment approve kar di hai. Aap ki 66-page complete eBook PDF download ke liye tayyar hai.
              </p>
            </motion.div>

            {/* PRIMARY DIRECT DOWNLOAD HERO CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1b1f28] to-[#10151C] border-2 border-[#ffd166] shadow-[0_0_35px_rgba(255,209,102,0.25)] space-y-5 text-center mb-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ffd166]/15 border border-[#ffd166]/40 flex items-center justify-center text-[#ffd166] mx-auto shadow-lg">
                <Download className="w-7 h-7 animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#ffd166] tracking-wider px-2.5 py-0.5 rounded bg-[#10151C] border border-[#ffd166]/30 inline-block mb-1">
                  Instant Download Unlocked
                </span>
                <h2 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#F3F0E8] font-medium">
                  {PAYMENT_CONFIG.ebookTitle}
                </h2>
                <p className="font-['Geist'] text-xs text-[#8c919d] mt-1">
                  Archival Edition v4.2 • 66 Pages • Universal PDF Retina Format
                </p>
              </div>

              {/* Big Download Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={PAYMENT_CONFIG.pdfDownloadUrl}
                  download="AI-Side-Hustles-for-Beginners-Rafay-Arif.pdf"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] font-['Geist'] text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,209,102,0.4)] hover:shadow-[0_0_35px_rgba(255,209,102,0.7)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 text-[#07090C]" />
                  <span>Download Complete eBook PDF</span>
                </a>

                <a
                  href={PAYMENT_CONFIG.pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166] font-['Geist'] text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#ffd166]" />
                  <span>Open in Browser</span>
                </a>
              </div>

              {hasAutoDownloaded && (
                <p className="font-['Geist'] text-xs text-emerald-400">
                  ✓ Direct download initiated automatically. If it didn't start, tap the button above.
                </p>
              )}
            </motion.div>

            {/* Order Summary Confirmation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#12161E] border border-[#2A3441] shadow-xl space-y-5 text-left mb-8"
            >
              <div className="flex items-center justify-between border-b border-[#2A3441]/60 pb-3">
                <div>
                  <span className="font-['Geist'] text-[10px] uppercase tracking-wider text-[#ffd166] font-semibold block">
                    Security & License Details
                  </span>
                  <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-normal">
                    Order Summary
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#8c919d] block">Price Paid</span>
                  <span className="font-mono text-base font-bold text-[#ffd166]">
                    PKR 1,999
                  </span>
                </div>
              </div>

              {/* Details Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Geist']">
                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441]/60 space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">Licensed To</span>
                  <span className="text-[#F3F0E8] font-medium block truncate">
                    {activeClientName || customerDetails.name || 'Verified Purchaser'}
                  </span>
                </div>

                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441]/60 space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">Payment Channel</span>
                  <span className="text-[#ffd166] font-semibold block">
                    {selectedMethod || 'EasyPaisa'} (03361068235)
                  </span>
                </div>

                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441]/60 space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">Device Protection</span>
                  <span className="text-emerald-400 font-semibold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Single-Device Locked (Active)</span>
                  </span>
                </div>

                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441]/60 space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">Author & Verification</span>
                  <span className="text-[#c2c6d3] block truncate">
                    Rafay Arif (WhatsApp: 03361068235)
                  </span>
                </div>
              </div>

              {/* Screenshot Link if available */}
              {uploadedImageUrl && (
                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#8c919d]">
                    <FileText className="w-4 h-4 text-[#ffd166]" />
                    <span>Uploaded Receipt:</span>
                  </div>
                  <a
                    href={uploadedImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffd166] hover:underline font-mono text-[11px]"
                  >
                    View Screenshot →
                  </a>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#25D366] text-white font-['Geist'] text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (03361068235)</span>
              </a>

              <button
                type="button"
                onClick={handleReturnHome}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#F3F0E8] hover:border-[#ffd166] hover:bg-[#ffd166]/10 font-['Geist'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </motion.div>

            {/* Discreet Seller Portal Link at bottom */}
            <div className="pt-8 border-t border-[#2A3441]/40 text-center">
              <Link
                to="/seller"
                className="text-[11px] text-[#555d6e] hover:text-[#ffd166] font-mono transition-colors"
              >
                Rafay Arif Seller Portal (PIN: 0336)
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
