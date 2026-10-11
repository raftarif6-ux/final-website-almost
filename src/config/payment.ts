/**
 * ============================================================================
 * PAYMENT & CHECKOUT CONFIGURATION
 * All manual payment details, prices, and secret unlock key configured here.
 * ============================================================================
 */

export interface PaymentAccount {
  name: string;
  number: string;
  instructions?: string;
}

export interface PaymentConfig {
  ebookTitle: string;
  ebookSubtitle: string;
  author: string;
  pricePkr: number;
  originalPricePkr: number;
  whatsAppNumber: string; // International format without '+' or spaces
  easyPaisa: PaymentAccount;
  jazzCash: PaymentAccount;
  deliveryTimeText: string;
  imgbbApiKey: string;
  pdfDownloadUrl: string;
  permanentUnlockParam: string; // URL query param for permanent unlock link
  secretAccessCodes: string[]; // Allowed access codes/keys for unlock
}

export const PAYMENT_CONFIG: PaymentConfig = {
  // --- EBOOK DETAILS ---
  ebookTitle: "AI Side Hustles for Beginners",
  ebookSubtitle: "The Beginner Starter Kit: 30 Practical Ways to Build Online Income Using AI",
  author: "Rafay Arif",

  // --- PRICING (PKR) ---
  pricePkr: 1999, // Customer pays: PKR 1,999
  originalPricePkr: 2800, // Original price strikethrough: PKR 2,800

  // --- WHATSAPP NUMBER ---
  // 03361068235 in international format without '+' or spaces:
  whatsAppNumber: "923361068235",

  // --- EASYPAISA ACCOUNT ---
  easyPaisa: {
    name: "Rafay Arif",
    number: "03361068235",
    instructions: "Send PKR 1,999 via EasyPaisa app or any mobile wallet / bank transfer to EasyPaisa 03361068235.",
  },

  // --- JAZZCASH ACCOUNT ---
  jazzCash: {
    name: "Rafay Arif",
    number: "03361068235",
    instructions: "Send PKR 1,999 via JazzCash app (*786#) or mobile wallet / bank transfer to 03361068235.",
  },

  // --- VERIFICATION TIME ---
  deliveryTimeText: "5 to 15 minutes after WhatsApp receipt verification",

  // --- IMGBB API KEY ---
  imgbbApiKey: import.meta.env.VITE_IMGBB_API_KEY || "",

  // --- DIRECT EBOOK PDF ASSET ---
  pdfDownloadUrl: "/AI-Side-Hustles-for-Beginners-v4.2.pdf",

  // --- PERMANENT UNLOCK CONFIGURATION ---
  // Permanent link you send to client after confirming their payment:
  // e.g. https://[YOUR_URL]/thank-you?access=verified
  permanentUnlockParam: "access=verified",
  secretAccessCodes: ["verified", "nexora2026", "1999", "rafay1999", "vip"],
};

/**
 * Format currency with commas and PKR symbol
 */
export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/**
 * Build pre-filled WhatsApp message for payment submission
 */
export function buildReceiptWhatsAppMessage(params: {
  name: string;
  phone: string;
  email: string;
  method: "EasyPaisa" | "JazzCash";
  amount: number;
  transactionId?: string;
  receiptUrl?: string;
}): string {
  const tid = params.transactionId?.trim() || "N/A";
  const receipt = params.receiptUrl?.trim() || "Attached in this WhatsApp chat";

  return `*New Payment Receipt - AI Side Hustles for Beginners*
Name: ${params.name}
WhatsApp: ${params.phone}
Email: ${params.email}
Method: ${params.method}
Amount: PKR 1,999 (Discounted from PKR 2,800)
EasyPaisa / JazzCash Number: 03361068235
Transaction ID: ${tid}
Receipt: ${receipt}

Salam Rafay! I have sent PKR 1,999 to your ${params.method} (03361068235). Please verify my payment and send me the eBook download unlock link.`;
}

/**
 * Generate full wa.me URL
 */
export function getWhatsAppUrl(messageText: string, numberOverride?: string): string {
  const number = numberOverride || PAYMENT_CONFIG.whatsAppNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Quick help WhatsApp message
 */
export function getHelpWhatsAppUrl(method?: string): string {
  const methodText = method ? ` Payment channel: ${method} (03361068235).` : "";
  const msg = `Salam Rafay! I want to buy your eBook '${PAYMENT_CONFIG.ebookTitle}'.${methodText} Price: PKR 1,999 (was PKR 2,800). Need assistance with sending payment to 03361068235.`;
  return getWhatsAppUrl(msg);
}
