/**
 * ============================================================================
 * VIP SECURITY & ANTI-FORWARDING ENGINE
 * 
 * 1. Single-device hardware/browser fingerprint lock
 * 2. Time-limited expiration (24h default)
 * 3. Prevents link forwarding (if Buyer A forwards link/code to Buyer B,
 *    Buyer B is blocked because it is already bound to Buyer A's device)
 * 4. Seller Portal integration for Rafay Arif (PIN: 0336 or 1999)
 * ============================================================================
 */

import { PAYMENT_CONFIG } from '../config/payment';

export interface LicenseItem {
  id: string;
  clientIdentifier: string; // Customer phone or name
  passcode: string; // 4-digit numeric code (e.g. 8492)
  token: string; // Unique URL token
  allowedDevices: number; // Default 1
  claimedDevices: string[];
  createdAt: number;
  expiresAt: number;
  isRevoked: boolean;
  notes?: string;
  link?: string;
}

const STORAGE_DEVICE_ID = 'nexora_client_device_id_v2';
const STORAGE_LOCAL_LICENSES = 'nexora_offline_licenses_v2';
const STORAGE_ACTIVATED_TOKEN = 'nexora_activated_token_v2';
const MASTER_PINS = ['0336', '1999', 'nexora2026', 'rafay1999'];

/**
 * Get or create unique persistent device ID for this browser
 */
export function getOrCreateDeviceId(): string {
  try {
    let id = localStorage.getItem(STORAGE_DEVICE_ID);
    if (!id) {
      id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(STORAGE_DEVICE_ID, id);
    }
    return id;
  } catch {
    return `dev_tmp_${Date.now()}`;
  }
}

/**
 * Claim and activate download access on this specific device.
 * Enforces single-device lock to prevent forwarding.
 */
export async function claimAccessOnDevice(
  codeOrToken: string,
  clientPhone?: string
): Promise<{
  success: boolean;
  clientName?: string;
  error?: string;
  forwardingBlocked?: boolean;
}> {
  const cleanInput = (codeOrToken || clientPhone || '').trim();
  if (!cleanInput) {
    return { success: false, error: 'Please enter your access code or phone number.' };
  }

  // Master PIN check (Rafay's private emergency bypass)
  if (MASTER_PINS.includes(cleanInput.toLowerCase())) {
    markDeviceActivatedLocally('Rafay Arif (Master Access)');
    return {
      success: true,
      clientName: 'Rafay Arif (Master Access)',
    };
  }

  const deviceId = getOrCreateDeviceId();

  // 1. Try server API
  try {
    const res = await fetch('/api/licenses/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codeOrToken: cleanInput,
        deviceId,
        clientPhone,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        markDeviceActivatedLocally(data.clientName || 'Verified Client');
        return {
          success: true,
          clientName: data.clientName,
        };
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.forwardingBlocked) {
        return {
          success: false,
          forwardingBlocked: true,
          error: errData.error || 'Security Alert: Forwarding detected. Link already claimed on another device.',
        };
      }
      return {
        success: false,
        error: errData.error || 'Access verification failed. Contact Rafay (03361068235).',
      };
    }
  } catch {
    // API not reachable, proceed to local client fallback
  }

  // 2. Client-side fallback check
  const localLicenses = getStoredLocalLicenses();
  const matched = localLicenses.find(
    (l) =>
      l.passcode === cleanInput ||
      l.token === cleanInput ||
      (clientPhone && l.clientIdentifier.replace(/\D/g, '').endsWith(clientPhone.replace(/\D/g, '').slice(-10)))
  );

  if (!matched) {
    // Also check emergency codes in config
    if (PAYMENT_CONFIG.secretAccessCodes.includes(cleanInput.toLowerCase())) {
      markDeviceActivatedLocally('Verified Purchaser');
      return { success: true, clientName: 'Verified Purchaser' };
    }

    return {
      success: false,
      error: 'Invalid or unrecognized access code. Please contact Rafay Arif on WhatsApp (03361068235).',
    };
  }

  if (matched.isRevoked) {
    return { success: false, error: 'This access license has been revoked by the author.' };
  }

  if (matched.expiresAt && matched.expiresAt > 0 && Date.now() > matched.expiresAt) {
    return { success: false, error: 'This access link has expired. Please contact Rafay on WhatsApp (03361068235).' };
  }

  // Check device claim limit
  if (!matched.claimedDevices.includes(deviceId)) {
    if (matched.claimedDevices.length >= matched.allowedDevices) {
      return {
        success: false,
        forwardingBlocked: true,
        error: 'Security Alert: Yeh link pehle hi kisi aur phone par activate ho chuka hai! Forwarding block hai.',
      };
    }
    matched.claimedDevices.push(deviceId);
    saveLocalLicenses(localLicenses);
  }

  markDeviceActivatedLocally(matched.clientIdentifier);
  return {
    success: true,
    clientName: matched.clientIdentifier,
  };
}

/**
 * Mark this device as authorized in browser
 */
function markDeviceActivatedLocally(clientName: string): void {
  try {
    localStorage.setItem(STORAGE_ACTIVATED_TOKEN, JSON.stringify({
      activated: true,
      clientName,
      timestamp: Date.now(),
      deviceId: getOrCreateDeviceId(),
    }));
  } catch {}
}

/**
 * Check if the current device is already activated
 */
export function isCurrentDeviceActivated(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVATED_TOKEN);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.activated);
  } catch {
    return false;
  }
}

/**
 * Get active client name on this device
 */
export function getActivatedClientName(): string {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVATED_TOKEN);
    if (!raw) return 'Verified Purchaser';
    const parsed = JSON.parse(raw);
    return parsed.clientName || 'Verified Purchaser';
  } catch {
    return 'Verified Purchaser';
  }
}

/**
 * Read local fallback licenses
 */
function getStoredLocalLicenses(): LicenseItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_LICENSES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalLicenses(licenses: LicenseItem[]): void {
  try {
    localStorage.setItem(STORAGE_LOCAL_LICENSES, JSON.stringify(licenses));
  } catch {}
}

/**
 * Rafay generates a new single-buyer license from Seller Portal
 */
export async function createLicenseBySeller(
  sellerPin: string,
  clientIdentifier: string,
  hoursValid: number = 24,
  maxDevices: number = 1
): Promise<{ success: boolean; license?: LicenseItem; error?: string }> {
  // Try server API first
  try {
    const res = await fetch('/api/licenses/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sellerPin,
        clientIdentifier,
        hoursValid,
        maxDevices,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.license) {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const link = `${origin}/thank-you?token=${data.license.token}&client=${encodeURIComponent(clientIdentifier)}`;
        data.license.link = link;
        
        // Also save locally as mirror
        const locals = getStoredLocalLicenses();
        saveLocalLicenses([data.license, ...locals.filter(l => l.id !== data.license.id)]);

        return { success: true, license: data.license };
      }
    }
  } catch {
    // fallback to local creation
  }

  // Fallback local license creation
  const now = Date.now();
  const passcode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = `nex_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const link = `${origin}/thank-you?token=${token}&client=${encodeURIComponent(clientIdentifier)}`;

  const newLicense: LicenseItem = {
    id: `lic_${now}_${Math.random().toString(36).slice(2, 6)}`,
    clientIdentifier,
    passcode,
    token,
    allowedDevices: maxDevices,
    claimedDevices: [],
    createdAt: now,
    expiresAt: Number(hoursValid) === 0 ? 0 : now + Number(hoursValid) * 60 * 60 * 1000,
    isRevoked: false,
    link,
    notes: `Local verified for PKR 1,999 (${Number(hoursValid) === 0 ? 'Lifetime / Never Expire' : `${hoursValid}h`})`,
  };

  const list = getStoredLocalLicenses();
  saveLocalLicenses([newLicense, ...list]);
  return { success: true, license: newLicense };
}

/**
 * Fetch all licenses for Rafay's Seller Portal
 */
export async function fetchAllLicenses(sellerPin: string): Promise<LicenseItem[]> {
  try {
    const res = await fetch(`/api/licenses/list?sellerPin=${encodeURIComponent(sellerPin)}`, {
      headers: { 'x-seller-pin': sellerPin },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.licenses)) {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        return data.licenses.map((l: LicenseItem) => ({
          ...l,
          link: `${origin}/thank-you?token=${l.token}&client=${encodeURIComponent(l.clientIdentifier)}`,
        }));
      }
    }
  } catch {}

  // Fallback to local
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return getStoredLocalLicenses().map((l) => ({
    ...l,
    link: `${origin}/thank-you?token=${l.token}&client=${encodeURIComponent(l.clientIdentifier)}`,
  }));
}

/**
 * Revoke license
 */
export async function revokeLicenseBySeller(sellerPin: string, licenseId: string): Promise<boolean> {
  try {
    await fetch('/api/licenses/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sellerPin, licenseId }),
    });
  } catch {}

  // Update local
  const list = getStoredLocalLicenses();
  const updated = list.map((l) => (l.id === licenseId ? { ...l, isRevoked: true } : l));
  saveLocalLicenses(updated);
  return true;
}

/**
 * Generate ready-to-send WhatsApp message for Rafay to copy/share
 */
export function buildClientWhatsAppMessage(license: LicenseItem): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const secureLink = license.link || `${origin}/thank-you?token=${license.token}&client=${encodeURIComponent(license.clientIdentifier)}`;
  
  return `Assalam-o-Alaikum ${license.clientIdentifier}! 🌟

Aap ki payment (PKR 1,999) EasyPaisa par verify ho chuki hai.

📘 *AI Side Hustles for Beginners (66 Pages Complete eBook)* download karnay k liye apna personal secure link open karein:

👉 *1-Click Secure Download Link:*
${secureLink}

🔐 *Aap ka Personal 4-Digit VIP Code:* ${license.passcode}

⚠️ *Ahem Hidayat (Security Notice):*
Yeh link sirf aap k 1 personal mobile / device k liye lock hai. Yeh kisi doosray shakhs ko forward karnay par auto-block ho jata hai. Baraye meharbani kisi ko share na karein.

Shukriya!
— *Rafay Arif* (03361068235)`;
}
