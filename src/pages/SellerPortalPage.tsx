import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Unlock,
  UserPlus,
  Send,
  Copy,
  Check,
  RefreshCw,
  Ban,
  Clock,
  Smartphone,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BackgroundGlow } from '../components/payment/BackgroundGlow';
import { PAYMENT_CONFIG } from '../config/payment';
import {
  LicenseItem,
  createLicenseBySeller,
  fetchAllLicenses,
  revokeLicenseBySeller,
  buildClientWhatsAppMessage,
} from '../services/security';

export const SellerPortalPage: React.FC = () => {
  // Seller Authentication State (Auto-login from ?pin=0336 or localStorage)
  const [sellerPin, setSellerPin] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryPin = urlParams.get('pin');
      if (queryPin && (queryPin === '0336' || queryPin === '1999' || queryPin === 'nexora2026')) {
        localStorage.setItem('nexora_seller_pin', queryPin);
        sessionStorage.setItem('nexora_seller_pin', queryPin);
        return queryPin;
      }
      return localStorage.getItem('nexora_seller_pin') || sessionStorage.getItem('nexora_seller_pin') || '';
    }
    return '';
  });

  const [isPinAuthenticated, setIsPinAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryPin = urlParams.get('pin');
      if (queryPin && (queryPin === '0336' || queryPin === '1999' || queryPin === 'nexora2026')) {
        return true;
      }
      const pin = localStorage.getItem('nexora_seller_pin') || sessionStorage.getItem('nexora_seller_pin');
      return pin === '0336' || pin === '1999' || pin === 'nexora2026';
    }
    return false;
  });
  const [pinError, setPinError] = useState<string | null>(null);

  // Form states for creating a new license
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [hoursValid, setHoursValid] = useState(0); // 0 = Lifetime (Never Expire) by default
  const [maxDevices, setMaxDevices] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState<LicenseItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPermanentLink, setCopiedPermanentLink] = useState(false);

  // License List states
  const [licenses, setLicenses] = useState<LicenseItem[]>([]);
  const [isLoadingLicenses, setIsLoadingLicenses] = useState(false);

  // Authenticate PIN
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sellerPin.trim();
    if (clean === '0336' || clean === '1999' || clean === 'nexora2026') {
      setIsPinAuthenticated(true);
      setPinError(null);
      localStorage.setItem('nexora_seller_pin', clean);
      sessionStorage.setItem('nexora_seller_pin', clean);
      loadLicenses(clean);
    } else {
      setPinError('Ghalat Seller PIN! Sirf Rafay Arif access kar sakta hai (Default: 0336 ya 1999).');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexora_seller_pin');
    sessionStorage.removeItem('nexora_seller_pin');
    setIsPinAuthenticated(false);
    setSellerPin('');
  };

  const loadLicenses = async (pin: string) => {
    setIsLoadingLicenses(true);
    try {
      const data = await fetchAllLicenses(pin);
      setLicenses(data);
    } catch {}
    setIsLoadingLicenses(false);
  };

  useEffect(() => {
    if (isPinAuthenticated && sellerPin) {
      loadLicenses(sellerPin);
    }
  }, [isPinAuthenticated, sellerPin]);

  // Handle Generate License
  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIdentifier.trim()) return;

    setIsSubmitting(true);
    const res = await createLicenseBySeller(sellerPin, clientIdentifier.trim(), hoursValid, maxDevices);
    setIsSubmitting(false);

    if (res.success && res.license) {
      setGeneratedLicense(res.license);
      setClientIdentifier('');
      loadLicenses(sellerPin);
    }
  };

  // Handle Revoke
  const handleRevoke = async (id: string) => {
    if (window.confirm('Kiya aap waqai is client ki access khatam (revoke) karna chahte hain?')) {
      await revokeLicenseBySeller(sellerPin, id);
      loadLicenses(sellerPin);
    }
  };

  // Copy helper
  const copyText = async (text: string, type: 'link' | 'message' | 'code') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } else if (type === 'message') {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2500);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
      }
    } catch {}
  };

  // WhatsApp Send helper
  const openWhatsAppToClient = (license: LicenseItem) => {
    const rawPhone = license.clientIdentifier.replace(/\D/g, '');
    let formattedPhone = rawPhone;
    if (rawPhone.startsWith('03')) {
      formattedPhone = '92' + rawPhone.slice(1);
    } else if (!rawPhone.startsWith('92') && rawPhone.length === 10) {
      formattedPhone = '92' + rawPhone;
    }
    const message = buildClientWhatsAppMessage(license);
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#e2e2e7] flex flex-col relative selection:bg-[#ffd166]/20 selection:text-[#ffd166]">
      <BackgroundGlow />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#10151C]/90 backdrop-blur-xl border-b border-[#2A3441]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <BrandLogo size="md" />
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd166]/10 border border-[#ffd166]/30 text-xs font-mono text-[#ffd166]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rafay's Control Room</span>
            </span>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#2A3441] bg-[#171D25] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166]/50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 relative z-10 space-y-8">
        {/* =============================================================
            PIN LOGIN SCREEN (If not unlocked)
        ============================================================= */}
        {!isPinAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto p-8 rounded-3xl bg-[#12161E] border-2 border-[#ffd166]/30 shadow-[0_0_40px_rgba(255,209,102,0.15)] text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#ffd166]/15 border border-[#ffd166]/40 flex items-center justify-center text-[#ffd166] mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ffd166] font-semibold">
                Private Seller Authentication
              </span>
              <h1 className="font-['Newsreader'] text-2xl sm:text-3xl text-[#F3F0E8] font-normal">
                Rafay Arif Seller Portal
              </h1>
              <p className="font-['Geist'] text-xs text-[#8c919d]">
                Clients ko eBook unlock permission dene aur link generate karne ke liye apna Seller PIN enter karein:
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-['Geist'] text-[#c2c6d3] mb-1.5">
                  Enter Seller PIN (Default: 0336 ya 1999)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#ffd166] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={sellerPin}
                    onChange={(e) => {
                      setSellerPin(e.target.value);
                      setPinError(null);
                    }}
                    placeholder="Enter PIN (e.g. 0336)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#10151C] border border-[#2A3441] text-sm font-mono text-[#F3F0E8] focus:border-[#ffd166] focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {pinError && (
                <p className="text-xs text-rose-400 font-['Geist'] bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/40">
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] font-['Geist'] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(255,209,102,0.3)] hover:shadow-[0_0_30px_rgba(255,209,102,0.5)] transition-all"
              >
                Open Seller Vault
              </button>
            </form>
          </motion.div>
        ) : (
          /* =============================================================
              AUTHENTICATED SELLER CONTROLS
          ============================================================= */
          <div className="space-y-8">
            {/* Top Title Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#171D25] to-[#10151C] border border-[#ffd166]/40 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#ffd166] font-semibold">
                    Live Anti-Piracy Authorization Engine
                  </span>
                </div>
                <h1 className="font-['Newsreader'] text-2xl sm:text-3xl lg:text-4xl text-[#F3F0E8] font-normal tracking-tight">
                  Customer Permission & Anti-Forwarding Panel
                </h1>
                <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] max-w-2xl leading-relaxed">
                  Jab koi client aap ko EasyPaisa (<strong className="text-[#ffd166]">03361068235</strong>) par <strong className="text-[#ffd166]">PKR 1,999</strong> bhej de, to yahan se unka number enter kar k <strong className="text-[#F3F0E8]">Single-Device Locked Link</strong> generate karein.
                </p>
              </div>
            </div>

            {/* PERMANENT SELLER ADMIN LINK CARD */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1218] border-2 border-[#ffd166]/40 shadow-[0_0_25px_rgba(255,209,102,0.12)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A3441]/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-5 h-5 text-[#ffd166]" />
                  <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">
                    Aap Ka Permanent Seller Portal Link (Always Working - Never Expire)
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#ffd166]/10 text-[#ffd166] border border-[#ffd166]/30 self-start sm:self-auto">
                  Bookmark This URL
                </span>
              </div>

              <p className="font-['Geist'] text-xs text-[#c2c6d3] leading-relaxed">
                Yeh aap ka direct zati link hai. Is link me aap ka PIN (<code className="text-[#ffd166] font-mono">0336</code>) pehle se attached hai, is liye jab bhi aap is link ko apne phone ya kisi bhi browser me open karein ge, yeh <strong className="text-[#F3F0E8]">hamesha bina kisi rok-tok k foran khulay ga</strong> aur kabhi expire nahi hoga:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? `${window.location.origin}/seller?pin=${sellerPin || '0336'}` : '/seller?pin=0336'}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#171D25] border border-[#2A3441] text-xs font-mono text-[#ffd166] select-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/seller?pin=${sellerPin || '0336'}` : '';
                    navigator.clipboard.writeText(fullUrl);
                    setCopiedPermanentLink(true);
                    setTimeout(() => setCopiedPermanentLink(false), 2500);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#ffd166] text-[#07090C] font-['Geist'] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#ffe082] transition-colors shrink-0"
                >
                  {copiedPermanentLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPermanentLink ? 'Link Copied!' : 'Copy Permanent Link'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-['Geist'] text-[#8c919d]">
                <span>💡 Is link ko WhatsApp par kisi personal chat ya Notes me save kar len.</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
                >
                  Logout / Switch PIN
                </button>
              </div>
            </div>

            {/* SECTION 1: CREATE NEW CLIENT PERMISSION */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12161E] border border-[#2A3441] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#2A3441]/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ffd166]/15 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166]">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-['Newsreader'] text-xl text-[#F3F0E8]">
                      Naye Client Ko Ijazzat (Permission) Den
                    </h2>
                    <p className="font-['Geist'] text-xs text-[#8c919d]">
                      1-Click Single-Device Secure Link & 4-Digit VIP Code
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#10151C] text-[#ffd166] border border-[#ffd166]/30">
                  Anti-Forwarding 100% Protected
                </span>
              </div>

              <form onSubmit={handleCreateLicense} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-['Geist'] font-medium text-[#c2c6d3]">
                      Client Ka WhatsApp Number ya Naam *
                    </label>
                    <input
                      type="text"
                      value={clientIdentifier}
                      onChange={(e) => setClientIdentifier(e.target.value)}
                      placeholder="e.g. 03001234567 ya Ali Khan"
                      className="w-full px-4 py-3 rounded-xl bg-[#10151C] border border-[#2A3441] text-sm text-[#F3F0E8] font-['Geist'] focus:border-[#ffd166] focus:outline-none placeholder:text-[#555d6e]"
                      required
                    />
                    <span className="text-[11px] font-['Geist'] text-[#8c919d] block">
                      Yeh link sirf isi shakhs ke phone ke liye lock hoga.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-['Geist'] font-medium text-[#c2c6d3]">
                      Expiry Duration
                    </label>
                    <select
                      value={hoursValid}
                      onChange={(e) => setHoursValid(Number(e.target.value))}
                      className="w-full px-3 py-3 rounded-xl bg-[#10151C] border border-[#2A3441] text-sm text-[#F3F0E8] font-['Geist'] focus:border-[#ffd166] focus:outline-none"
                    >
                      <option value={0}>♾️ Lifetime (Kabhi Expire Na Ho - Always Working)</option>
                      <option value={24}>24 Hours (Standard Security)</option>
                      <option value={48}>48 Hours (2 Days)</option>
                      <option value={72}>72 Hours (3 Days)</option>
                      <option value={168}>7 Days (1 Week)</option>
                    </select>
                    <span className="text-[11px] font-['Geist'] text-[#8c919d] block">
                      {hoursValid === 0 ? 'Yeh link hamesha active rahega aur kabhi expire nahi hoga.' : 'Time khatam honay par link auto-expire ho jata hai.'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#10151C] border border-[#2A3441]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-['Geist'] text-[#8c919d]">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#ffd166]" />
                    <span>
                      Device Lock Limit: <strong className="text-[#ffd166]">Sirf 1 Mobile/Device</strong> (Agar bnda kisi aur ko forward karega to dosra shakhs block ho jaye ga).
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] font-['Geist'] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(255,209,102,0.3)] hover:shadow-[0_0_30px_rgba(255,209,102,0.5)] transition-all shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Generating...' : '⚡ Generate Secure Permission Link'}</span>
                  </button>
                </div>
              </form>

              {/* GENERATED RESULT CARD */}
              <AnimatePresence>
                {generatedLicense && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#1b222d] to-[#12161E] border-2 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A3441] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="font-['Newsreader'] text-lg text-[#F3F0E8] font-medium">
                          Permission Successfully Created for: <strong className="text-[#ffd166]">{generatedLicense.clientIdentifier}</strong>
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                        Ready to Send on WhatsApp
                      </span>
                    </div>

                    {/* Codes and Links Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* 1-Click Link */}
                      <div className="p-3.5 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#ffd166] font-['Geist'] block">
                          1-Click Direct Unlock Link
                        </span>
                        <code className="text-xs font-mono text-[#F3F0E8] block truncate bg-[#07090C] p-2 rounded-lg border border-[#2A3441]/80 select-all">
                          {generatedLicense.link}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyText(generatedLicense.link || '', 'link')}
                          className="w-full py-1.5 rounded-lg bg-[#ffd166]/15 text-[#ffd166] border border-[#ffd166]/30 text-xs font-['Geist'] font-medium hover:bg-[#ffd166]/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                        </button>
                      </div>

                      {/* 4-Digit VIP Code */}
                      <div className="p-3.5 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#ffd166] font-['Geist'] block">
                          Personal 4-Digit VIP Access Code
                        </span>
                        <div className="bg-[#07090C] p-2 rounded-lg border border-[#2A3441]/80 text-center">
                          <span className="font-mono text-xl font-bold tracking-widest text-[#ffd166]">
                            {generatedLicense.passcode}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyText(generatedLicense.passcode, 'code')}
                          className="w-full py-1.5 rounded-lg bg-[#ffd166]/15 text-[#ffd166] border border-[#ffd166]/30 text-xs font-['Geist'] font-medium hover:bg-[#ffd166]/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Code Copied!' : 'Copy 4-Digit Code'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Ready WhatsApp Message with 1-click action */}
                    <div className="p-4 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#F3F0E8] font-['Geist'] flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>Pre-Formatted WhatsApp Message:</span>
                        </span>
                        <span className="text-[10px] text-[#8c919d] font-mono">1-Click Auto Message</span>
                      </div>

                      <pre className="text-xs font-['Geist'] text-[#c2c6d3] whitespace-pre-wrap bg-[#07090C] p-3 rounded-lg border border-[#2A3441]/60 leading-relaxed">
                        {buildClientWhatsAppMessage(generatedLicense)}
                      </pre>

                      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => openWhatsAppToClient(generatedLicense)}
                          className="w-full sm:w-auto flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#25D366] text-white font-['Geist'] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-4 h-4 fill-current" />
                          <span>Direct Send on WhatsApp to {generatedLicense.clientIdentifier}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => copyText(buildClientWhatsAppMessage(generatedLicense), 'message')}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#F3F0E8] hover:border-[#ffd166] text-xs font-['Geist'] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copiedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedMessage ? 'Message Copied!' : 'Copy Full Message'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 2: HOW PERMISSION & ANTI-FORWARDING WORKS (CLARITY GUIDE FOR RAFAY) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12161E] border border-[#2A3441] shadow-xl space-y-4 text-left">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#ffd166]" />
                <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8]">
                  Rafay Arif Ke Liye Rehnumai: "Aap Ijazzat Kaise Den Gy Aur Scam Kaise Ruke Ga?"
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-['Geist'] leading-relaxed pt-2">
                <div className="p-4 rounded-2xl bg-[#10151C] border border-[#2A3441]/80 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-[#ffd166]/15 text-[#ffd166] flex items-center justify-center font-bold font-mono">
                    1
                  </span>
                  <strong className="text-[#F3F0E8] block text-sm">Step 1: Payment Check Karein</strong>
                  <p className="text-[#8c919d]">
                    Client aap ke EasyPaisa (03361068235) par Rs 1,999 bhej kar receipt WhatsApp par share karega. Aap apne EasyPaisa app mein paisay confirm karein.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#10151C] border border-[#2A3441]/80 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-[#ffd166]/15 text-[#ffd166] flex items-center justify-center font-bold font-mono">
                    2
                  </span>
                  <strong className="text-[#F3F0E8] block text-sm">Step 2: Yahan 1-Click Permission Banayein</strong>
                  <p className="text-[#8c919d]">
                    Isi portal par client ka WhatsApp number likhein aur "Generate" dabayein. Foran client ka <strong>Single-Device Locked Link</strong> aur 4-digit code ban jaye ga.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#10151C] border border-[#2A3441]/80 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-[#ffd166]/15 text-[#ffd166] flex items-center justify-center font-bold font-mono">
                    3
                  </span>
                  <strong className="text-[#F3F0E8] block text-sm">Step 3: Anti-Forwarding Shield</strong>
                  <p className="text-[#8c919d]">
                    Client jab link khole ga to wo unke mobile par <strong>lock</strong> ho jaye ga. Agar wo kisi aur dost ko WhatsApp par send karega to dosray bnde ko <strong>Access Blocked</strong> ka error aayega!
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: LIVE ACTIVE LICENSES LIST */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12161E] border border-[#2A3441] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#2A3441]/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-5 h-5 text-[#ffd166]" />
                  <div>
                    <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8]">
                      Authorized Clients Ki List & Device Status
                    </h3>
                    <p className="font-['Geist'] text-xs text-[#8c919d]">
                      Tamam approved khareedaron ki live digital licenses
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => loadLicenses(sellerPin)}
                  disabled={isLoadingLicenses}
                  className="p-2 rounded-lg bg-[#10151C] border border-[#2A3441] text-[#c2c6d3] hover:text-[#ffd166] hover:border-[#ffd166]/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-['Geist']"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLicenses ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>

              {licenses.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#8c919d] font-['Geist']">
                  Abhi koi license generate nahi hui. Uper diye gaye form se naya client approve karein.
                </div>
              ) : (
                <div className="space-y-3">
                  {licenses.map((lic) => {
                    const isExpired = Date.now() > lic.expiresAt;
                    const isClaimed = lic.claimedDevices && lic.claimedDevices.length > 0;

                    return (
                      <div
                        key={lic.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          lic.isRevoked
                            ? 'bg-rose-950/15 border-rose-900/30 opacity-70'
                            : isExpired
                            ? 'bg-[#10151C] border-[#2A3441]/50 opacity-80'
                            : 'bg-[#10151C] border-[#2A3441]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-['Geist'] text-[#F3F0E8]">
                              {lic.clientIdentifier}
                            </strong>

                            {lic.isRevoked ? (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-900">
                                Revoked
                              </span>
                            ) : isExpired ? (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-900/40">
                                Expired
                              </span>
                            ) : isClaimed ? (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                                Active on Device ({lic.claimedDevices.length}/{lic.allowedDevices})
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-950/60 text-sky-400 border border-sky-800">
                                Waiting Activation
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#8c919d]">
                            <span>Code: <strong className="text-[#ffd166]">{lic.passcode}</strong></span>
                            <span>•</span>
                            <span>
                              Created: {new Date(lic.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span>•</span>
                            <span>
                              Expires in: {Math.max(0, Math.round((lic.expiresAt - Date.now()) / (1000 * 60 * 60)))}h
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => copyText(lic.link || '', 'link')}
                            className="px-3 py-1.5 rounded-lg bg-[#171D25] border border-[#2A3441] text-xs text-[#c2c6d3] hover:text-[#ffd166] hover:border-[#ffd166] transition-all flex items-center gap-1 cursor-pointer"
                            title="Copy Link"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Link</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openWhatsAppToClient(lic)}
                            className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 text-xs text-[#25D366] hover:bg-[#25D366]/25 transition-all flex items-center gap-1 cursor-pointer"
                            title="WhatsApp Client"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </button>

                          {!lic.isRevoked && (
                            <button
                              type="button"
                              onClick={() => handleRevoke(lic.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs text-rose-400 hover:bg-rose-950/60 transition-all flex items-center gap-1 cursor-pointer"
                              title="Revoke Access (Disputed/Scam)"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>Revoke</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
