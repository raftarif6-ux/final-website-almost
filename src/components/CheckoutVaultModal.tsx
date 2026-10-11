import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldCheck, Download, CheckCircle, Copy, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { CURRENCY_RATES, BOOK_SPECIMEN_IMAGE } from '../data/ebookData';
import { PRICING } from '../utils/pricing';

interface CheckoutVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: keyof typeof CURRENCY_RATES;
  onOpenPreview: () => void;
  country?: 'PK' | 'INTL';
}

export const CheckoutVaultModal: React.FC<CheckoutVaultModalProps> = ({
  isOpen,
  onClose,
  country = 'INTL',
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  if (!isOpen) return null;

  const plan = PRICING[country] || PRICING.INTL;
  const licenseKey = `NEXORA-v42-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const copyLicense = () => {
    navigator.clipboard?.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSimulatedDownload = (fileName: string) => {
    setDownloadProgress(fileName);
    setTimeout(() => {
      setDownloadProgress(null);
      const blob = new Blob([
        `NEXORA DIGITAL - ARCHIVAL EDITION v4.2\nAI Side Hustles for Beginners (216 Pages)\nLicense: ${licenseKey}\nLicensed To: ${email || 'Reader'}\nThank you for purchasing! Access all online updates at Nexora Digital.`
      ], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">
                  {step === 'checkout' ? 'Archival Acquisition Checkout' : 'Vault Unlocked — Download Central'}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  256-Bit Encrypted
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">
                {step === 'checkout' ? 'Instant DRM-Free Delivery to your email inbox' : 'Permanent offline access and bonus toolkits'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Order Summary */}
            <div className="p-4 rounded-xl bg-[#171D25] border border-[#2A3441] flex items-center gap-4">
              <div className="w-16 h-20 shrink-0 rounded bg-[#07090C] overflow-hidden border border-[#2A3441]">
                <img
                  src={BOOK_SPECIMEN_IMAGE}
                  alt="Book Specimen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-mono text-[#ffd166] font-semibold">Archival Edition v4.2</span>
                <h4 className="font-['Newsreader'] text-lg text-[#F3F0E8] leading-tight">AI Side Hustles for Beginners</h4>
                <p className="text-xs text-[#8c919d] font-['Geist'] mt-0.5">Includes Complete 216p Manual + 5 Bonus Toolkits</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="line-through text-xs text-[#8c919d] font-mono">${plan.original}</span>
                  <span className="font-mono text-xl font-bold text-[#ffd166]">${plan.offer}</span>
                </div>
                <span className="text-[10px] text-[#ffd166] block uppercase font-['Geist']">{plan.label}</span>
              </div>
            </div>

            {/* Direct Pakistan Payment Option Callout */}
            <div className="p-4 rounded-xl bg-[#12161E] border border-[#ffd166]/40 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-[#ffd166] block font-['Geist']">
                  In Pakistan? Pay via EasyPaisa / JazzCash
                </span>
                <span className="text-[11px] text-[#8c919d]">
                  Get instant manual verification and WhatsApp delivery.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] font-bold text-xs font-['Geist'] uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Go to Manual Checkout →
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="font-['Geist'] text-xs uppercase text-[#8c919d] tracking-wider block mb-1.5 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171D25] border border-[#2A3441] rounded-lg text-sm text-[#F3F0E8] placeholder:text-[#8c919d] focus:outline-none focus:border-[#ffd166]"
                />
              </div>
              <div>
                <label className="font-['Geist'] text-xs uppercase text-[#8c919d] tracking-wider block mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171D25] border border-[#2A3441] rounded-lg text-sm text-[#F3F0E8] placeholder:text-[#8c919d] focus:outline-none focus:border-[#ffd166]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-[#ffd166] to-[#f39c12] text-[#07090C] rounded-lg font-['Geist'] text-sm font-bold uppercase tracking-wider hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Digital Transfer...</span>
              ) : (
                <>
                  <span>Complete Acquisition & Download (${plan.offer})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: DOWNLOAD SUCCESS VAULT */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#ffd166]/10 border border-[#ffd166]/40 flex items-center justify-center text-[#ffd166] mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-['Newsreader'] text-2xl text-[#F3F0E8]">Your Archival Vault is Ready!</h3>
              <p className="font-['Geist'] text-xs text-[#8c919d] max-w-md mx-auto">
                Order confirmed for <strong className="text-[#F3F0E8]">{email || 'your email'}</strong>. Your master download files and receipt are available below.
              </p>
            </div>

            {/* License Key Box */}
            <div className="p-4 bg-[#171D25] rounded-xl border border-[#2A3441] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8c919d] uppercase font-['Geist'] block">Master License Token</span>
                <span className="font-mono text-sm text-[#ffd166] font-semibold">{licenseKey}</span>
              </div>
              <button
                onClick={copyLicense}
                className="px-3 py-1.5 rounded bg-[#10151C] border border-[#2A3441] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#ffd166] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey ? <CheckCircle className="w-3.5 h-3.5 text-[#ffd166]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>

            {/* Downloads List */}
            <div className="space-y-2.5">
              <div className="p-3 bg-[#171D25] rounded-lg border border-[#2A3441] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#ffd166]" />
                  <div>
                    <span className="font-['Newsreader'] text-sm text-[#F3F0E8] block">Complete Manual (PDF Retina)</span>
                    <span className="font-['Geist'] text-[10px] text-[#8c919d]">216 Pages • DRM-Free</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSimulatedDownload('AI-Side-Hustles-Beginners-v4.2.pdf')}
                  disabled={downloadProgress !== null}
                  className="px-3 py-1.5 bg-[#282a2e] hover:bg-[#333538] text-[#ffd166] rounded text-xs font-['Geist'] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadProgress === 'AI-Side-Hustles-Beginners-v4.2.pdf' ? 'Downloading...' : 'Download PDF'}</span>
                </button>
              </div>

              <div className="p-3 bg-[#171D25] rounded-lg border border-[#2A3441] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#b4c8e3]" />
                  <div>
                    <span className="font-['Newsreader'] text-sm text-[#F3F0E8] block">5 Bonus Artifacts Pack (.ZIP)</span>
                    <span className="font-['Geist'] text-[10px] text-[#8c919d]">Prompts, Scripts, Calculator, Notion OS</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSimulatedDownload('Nexora-AI-Bonus-Toolkit-Pack.zip')}
                  disabled={downloadProgress !== null}
                  className="px-3 py-1.5 bg-[#282a2e] hover:bg-[#333538] text-[#b4c8e3] rounded text-xs font-['Geist'] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadProgress === 'Nexora-AI-Bonus-Toolkit-Pack.zip' ? 'Downloading...' : 'Download .ZIP'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#282a2e] text-[#F3F0E8] rounded font-['Geist'] text-xs uppercase tracking-wider hover:bg-[#333538] cursor-pointer"
              >
                Close Vault
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
