import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Send,
  MessageCircle,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldCheck,
  Lock,
  ExternalLink,
  Copy,
  Check,
  KeyRound,
} from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import {
  PAYMENT_CONFIG,
  formatPKR,
  buildReceiptWhatsAppMessage,
  getWhatsAppUrl,
} from '../config/payment';
import { uploadReceiptImage } from '../services/imgbb';
import { BrandLogo } from '../components/BrandLogo';
import { Stepper } from '../components/payment/Stepper';
import { ReceiptUploader } from '../components/payment/ReceiptUploader';
import { CopyButton } from '../components/payment/CopyButton';
import { BackgroundGlow } from '../components/payment/BackgroundGlow';
import { FloatingHelpButton } from '../components/payment/FloatingHelpButton';
import { claimAccessOnDevice } from '../services/security';

export const UploadReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedMethod,
    customerDetails,
    setCustomerDetails,
    receiptFile,
    setReceiptFile,
    receiptPreviewUrl,
    setReceiptPreviewUrl,
    setUploadedImageUrl,
    setReceiptSubmitted,
    setSubmissionDate,
  } = usePayment();

  // Redirect to /checkout if no method selected
  useEffect(() => {
    if (!selectedMethod) {
      navigate('/checkout', { replace: true });
    }
  }, [selectedMethod, navigate]);

  // Form State
  const [name, setName] = useState(customerDetails.name);
  const [phone, setPhone] = useState(customerDetails.phone);
  const [email, setEmail] = useState(customerDetails.email);
  const [transactionId, setTransactionId] = useState(customerDetails.transactionId);

  // Errors state
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    receipt?: string;
  }>({});

  // Submission & Verification state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Verification Pending view state (Anti-Scam Protection)
  const [isSubmittedAndPending, setIsSubmittedAndPending] = useState(false);
  const [readyWhatsAppUrl, setReadyWhatsAppUrl] = useState<string | null>(null);

  // Unlock code input state
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Web Share API support
  const [canWebShare, setCanWebShare] = useState<boolean>(false);
  useEffect(() => {
    if (
      typeof navigator !== 'undefined' &&
      'share' in navigator &&
      'canShare' in navigator &&
      receiptFile
    ) {
      try {
        const canShareFiles = navigator.canShare({ files: [receiptFile] });
        setCanWebShare(canShareFiles);
      } catch {
        setCanWebShare(false);
      }
    } else {
      setCanWebShare(false);
    }
  }, [receiptFile]);

  // Sync details back to context
  useEffect(() => {
    setCustomerDetails({
      name,
      phone,
      email,
      transactionId,
    });
  }, [name, phone, email, transactionId, setCustomerDetails]);

  if (!selectedMethod) {
    return null;
  }

  const account =
    selectedMethod === 'EasyPaisa' ? PAYMENT_CONFIG.easyPaisa : PAYMENT_CONFIG.jazzCash;

  // Validation
  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      phone?: string;
      email?: string;
      receipt?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'WhatsApp phone number is required.';
    } else {
      const cleanPhone = phone.replace(/[\s-]/g, '');
      const isPkPhone = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/.test(cleanPhone);
      if (!isPkPhone && cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid Pakistani mobile number (e.g., 0336 1068235).';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required for delivery backup.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!receiptFile) {
      newErrors.receipt = 'Please attach your payment screenshot or receipt.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission: Dispatches receipt to Rafay on WhatsApp & locks download until verified!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(10);

    let publicUrl: string | undefined = undefined;

    // 1. Upload receipt via multi-tier fallback service
    if (receiptFile) {
      const uploadRes = await uploadReceiptImage(receiptFile, (pct) => {
        setUploadProgress(pct);
      });

      if (uploadRes.success && uploadRes.url) {
        publicUrl = uploadRes.url;
        setUploadedImageUrl(publicUrl);
      } else if (receiptPreviewUrl) {
        setUploadedImageUrl(receiptPreviewUrl);
      }
    }

    // 2. Build WhatsApp message and link
    const waMessage = buildReceiptWhatsAppMessage({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      method: selectedMethod,
      amount: PAYMENT_CONFIG.pricePkr,
      transactionId: transactionId.trim(),
      receiptUrl: publicUrl,
    });

    const waUrl = getWhatsAppUrl(waMessage);
    setReadyWhatsAppUrl(waUrl);

    // 3. Mark submitted in state
    setReceiptSubmitted(true);
    setSubmissionDate(new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }));

    // 4. Open WhatsApp directly to send to Rafay (03361068235)
    try {
      window.open(waUrl, '_blank');
    } catch {}

    // 5. Present the Anti-Scam "Verification Pending" screen (do not allow direct download!)
    setIsSubmittedAndPending(true);
    setIsSubmitting(false);
  };

  // Web Share API handler
  const handleWebShare = async () => {
    if (!receiptFile || !navigator.share) return;
    try {
      await navigator.share({
        title: `Payment Receipt - ${PAYMENT_CONFIG.ebookTitle}`,
        text: buildReceiptWhatsAppMessage({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          method: selectedMethod,
          amount: PAYMENT_CONFIG.pricePkr,
          transactionId: transactionId.trim(),
          receiptUrl: 'Shared directly via device',
        }),
        files: [receiptFile],
      });
      setReceiptSubmitted(true);
      setSubmissionDate(new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }));
      setIsSubmittedAndPending(true);
    } catch (err) {
      console.log('Share canceled or error:', err);
    }
  };

  // Handle manual code entry if customer received code on WhatsApp
  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcodeInput.trim();
    if (!clean) return;

    setPasscodeError(null);
    const res = await claimAccessOnDevice(clean);
    if (res.success) {
      navigate('/thank-you');
    } else {
      setPasscodeError(res.error || 'Invalid access code. Please wait for Rafay to verify your receipt on WhatsApp.');
    }
  };

  // Copy permanent unlock link (helper for seller Rafay or customer)
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const permanentUnlockLink = `${currentOrigin}/thank-you?access=verified`;

  const handleCopyUnlockLink = async () => {
    try {
      await navigator.clipboard.writeText(permanentUnlockLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#e2e2e7] flex flex-col relative selection:bg-[#ffd166]/20 selection:text-[#ffd166]">
      <BackgroundGlow />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#10151C]/90 backdrop-blur-xl border-b border-[#2A3441]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <BrandLogo size="md" />
          </Link>

          <Link
            to="/checkout"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A3441] bg-[#171D25] text-xs font-['Geist'] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166]/50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Method</span>
          </Link>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 relative z-10">
        {/* Stepper (Step 3 active) */}
        <Stepper currentStep={3} />

        {/* -------------------------------------------------------------
            CASE 1: RECEIPT SUBMITTED -> ANTI-SCAM VERIFICATION SCREEN
        ------------------------------------------------------------- */}
        {isSubmittedAndPending ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 text-center"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd166]/15 border border-[#ffd166]/40 text-[#ffd166] text-xs font-['Geist'] font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Manual Payment Under Verification</span>
            </div>

            <h1 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E8] font-normal tracking-tight">
              Receipt Sent to Verification Desk
            </h1>

            <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] max-w-xl mx-auto leading-relaxed">
              Salam <strong className="text-[#F3F0E8]">{name || 'Valued Customer'}</strong>! We have received your payment submission for <strong className="text-[#ffd166]">PKR 1,999</strong> via {selectedMethod}.
            </p>

            {/* Anti-Scam Security Notice Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#12161E] border border-[#ffd166]/30 shadow-2xl text-left space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffd166]/10 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166] shrink-0 mt-0.5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-medium">
                    Anti-Fraud Account Verification
                  </h3>
                  <p className="font-['Geist'] text-xs sm:text-sm text-[#8c919d] leading-relaxed">
                    To prevent unauthorized distribution and fake receipt scams, each payment is verified directly in Rafay Arif's EasyPaisa/JazzCash account (<strong className="text-[#F3F0E8]">03361068235</strong>) before releasing the 66-page eBook file.
                  </p>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="p-4 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-3 font-['Geist'] text-xs">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>1. Transfer of PKR 1,999 sent to 03361068235</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>2. Receipt details forwarded via WhatsApp</span>
                </div>
                <div className="flex items-center gap-3 text-[#ffd166] font-semibold">
                  <Clock className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>3. Rafay Arif verifying account balance (Takes 5 - 15 minutes)</span>
                </div>
                <div className="flex items-center gap-3 text-[#8c919d]">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>4. Permanent Download Unlock Link sent to your WhatsApp & Email</span>
                </div>
              </div>

              {/* WhatsApp Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {readyWhatsAppUrl && (
                  <a
                    href={readyWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#25D366] text-white font-['Geist'] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Open WhatsApp Chat with Rafay (03361068235)</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setIsSubmittedAndPending(false)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#c2c6d3] hover:text-[#F3F0E8] hover:border-[#ffd166] font-['Geist'] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Edit Submission
                </button>
              </div>
            </div>

            {/* Have Rafay already sent you the code? */}
            <div className="p-6 rounded-2xl bg-[#12161E] border border-[#2A3441] text-left space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#ffd166]" />
                <h4 className="font-['Newsreader'] text-lg text-[#F3F0E8]">
                  Already Received Your Verified Unlock Link from Rafay?
                </h4>
              </div>
              <p className="font-['Geist'] text-xs text-[#8c919d]">
                If Rafay has already verified your 1,999 PKR in EasyPaisa and sent you the link or access code on WhatsApp, enter it below or click your WhatsApp link to download immediately:
              </p>

              <form onSubmit={handleVerifyPasscode} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setPasscodeError(null);
                  }}
                  placeholder="Enter access code (e.g. 1999 or nexora2026)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#10151C] border border-[#2A3441] text-xs font-mono text-[#F3F0E8] focus:border-[#ffd166] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] font-['Geist'] text-xs font-bold uppercase tracking-wider cursor-pointer hover:shadow-[0_0_20px_rgba(255,209,102,0.4)] transition-all"
                >
                  Unlock eBook Now
                </button>
              </form>
              {passcodeError && (
                <p className="text-xs text-rose-400 font-['Geist']">{passcodeError}</p>
              )}
            </div>
          </motion.div>
        ) : (
          /* -------------------------------------------------------------
              CASE 2: FORM INPUT & RECEIPT UPLOAD
          ------------------------------------------------------------- */
          <>
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-2 mb-8"
            >
              <span className="font-['Geist'] text-[10px] uppercase tracking-[0.25em] text-[#ffd166] font-semibold">
                Step 3 of 4: Payment Verification
              </span>
              <h1 className="font-['Newsreader'] text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E8] font-normal tracking-tight">
                Submit Your Payment Proof
              </h1>
              <p className="font-['Geist'] text-xs sm:text-sm text-[#8c919d] max-w-lg mx-auto leading-relaxed">
                Send <strong className="text-[#ffd166]">PKR 1,999</strong> to the account details below, then upload your transfer screenshot. We will verify and deliver your permanent eBook unlock link on WhatsApp.
              </p>
            </motion.div>

            {/* Account Details Reminder Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#171D25] to-[#10151C] border border-[#ffd166]/30 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2A3441]/60">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ffd166] font-bold">
                    Receiver Account Reminder
                  </span>
                  <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-medium">
                    {selectedMethod} Transfer
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#8c919d]">Exact Amount:</span>
                  <span className="line-through text-xs font-mono text-[#8c919d]">
                    {formatPKR(PAYMENT_CONFIG.originalPricePkr)}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#ffd166]">
                    {formatPKR(PAYMENT_CONFIG.pricePkr)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Geist']">
                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441] space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">
                    Account Title
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#F3F0E8] text-sm">
                      {account.name}
                    </span>
                    <CopyButton textToCopy={account.name} label="Copy" />
                  </div>
                </div>

                <div className="p-3 bg-[#10151C] rounded-xl border border-[#2A3441] space-y-1">
                  <span className="text-[#8c919d] text-[10px] uppercase block">
                    Mobile Number
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#ffd166] text-base">
                      {account.number}
                    </span>
                    <CopyButton textToCopy={account.number} label="Copy" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submission Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#12161E] border border-[#2A3441] shadow-2xl space-y-6"
            >
              <div className="border-b border-[#2A3441]/60 pb-3">
                <h3 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-normal">
                  Your Delivery Details
                </h3>
                <p className="font-['Geist'] text-xs text-[#8c919d]">
                  Please enter your real WhatsApp number and email where your verified PDF unlock link will be sent.
                </p>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-name"
                    className="block text-xs font-['Geist'] uppercase tracking-wider text-[#c2c6d3] font-medium"
                  >
                    Full Name <span className="text-[#ffd166]">*</span>
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Ali Ahmed"
                    className={`w-full px-4 py-3 rounded-xl bg-[#10151C] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#8c919d]/60 font-['Geist'] transition-colors focus:outline-none ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[#2A3441] focus:border-[#ffd166]'
                    }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-rose-400 font-['Geist']"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-phone"
                    className="block text-xs font-['Geist'] uppercase tracking-wider text-[#c2c6d3] font-medium"
                  >
                    WhatsApp Number <span className="text-[#ffd166]">*</span>
                  </label>
                  <input
                    id="field-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="0300 1234567"
                    className={`w-full px-4 py-3 rounded-xl bg-[#10151C] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#8c919d]/60 font-mono transition-colors focus:outline-none ${
                      errors.phone
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[#2A3441] focus:border-[#ffd166]'
                    }`}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-rose-400 font-['Geist']"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-email"
                    className="block text-xs font-['Geist'] uppercase tracking-wider text-[#c2c6d3] font-medium"
                  >
                    Email Address <span className="text-[#ffd166]">*</span>
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#10151C] border text-xs sm:text-sm text-[#F3F0E8] placeholder-[#8c919d]/60 font-['Geist'] transition-colors focus:outline-none ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[#2A3441] focus:border-[#ffd166]'
                    }`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-rose-400 font-['Geist']"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Transaction ID */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-tid"
                    className="block text-xs font-['Geist'] uppercase tracking-wider text-[#c2c6d3] font-medium"
                  >
                    Transaction ID / TRX <span className="text-[#8c919d] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="field-tid"
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 1948291054"
                    className="w-full px-4 py-3 rounded-xl bg-[#10151C] border border-[#2A3441] text-xs sm:text-sm text-[#F3F0E8] placeholder-[#8c919d]/60 font-mono transition-colors focus:outline-none focus:border-[#ffd166]"
                  />
                </div>
              </div>

              {/* Receipt File Upload Zone */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-['Geist'] uppercase tracking-wider text-[#c2c6d3] font-medium">
                  Payment Receipt Screenshot <span className="text-[#ffd166]">*</span>
                </label>

                <ReceiptUploader
                  file={receiptFile}
                  previewUrl={receiptPreviewUrl}
                  onFileSelect={(selectedFile, preview) => {
                    setReceiptFile(selectedFile);
                    setReceiptPreviewUrl(preview);
                    if (errors.receipt) {
                      setErrors((prev) => ({ ...prev, receipt: undefined }));
                    }
                  }}
                  uploadProgress={uploadProgress}
                  isUploading={isSubmitting}
                  error={errors.receipt || uploadError}
                  onErrorChange={(err) => setUploadError(err)}
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 space-y-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                  className={`w-full py-4.5 rounded-xl font-['Geist'] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    isSubmitting
                      ? 'bg-[#1b2029] text-[#ffd166] border border-[#ffd166]/40 cursor-wait'
                      : 'bg-gradient-to-r from-[#ffd166] via-[#f3e7be] to-[#c59b27] text-[#07090C] shadow-[0_0_25px_rgba(255,209,102,0.35)] hover:shadow-[0_0_35px_rgba(255,209,102,0.6)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#ffd166] border-t-transparent rounded-full animate-spin" />
                      <span>Forwarding Proof to WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Submit & Send Receipt on WhatsApp (03361068235)</span>
                    </>
                  )}
                </motion.button>

                {/* Direct Share on Phone if supported */}
                {canWebShare && receiptFile && (
                  <button
                    type="button"
                    onClick={handleWebShare}
                    className="w-full py-3 rounded-xl bg-[#171D25] border border-[#2A3441] text-[#ffd166] hover:border-[#ffd166] font-['Geist'] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Directly via WhatsApp App</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[11px] text-[#8c919d] font-['Geist'] pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ffd166]" />
                    <span>Protected against fake receipts & scams</span>
                  </span>
                  <span>Direct owner verification: 03361068235</span>
                </div>
              </div>
            </motion.form>
          </>
        )}
      </main>

      {/* Floating Help Button */}
      <FloatingHelpButton method={selectedMethod} />
    </div>
  );
};
