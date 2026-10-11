import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const LICENSES_FILE = path.join(DATA_DIR, 'licenses.json');
const MASTER_PIN = '0336'; // Rafay Arif master seller PIN (also accepts 1999)

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredLicense {
  id: string;
  clientIdentifier: string; // Phone number or name
  passcode: string; // 4 or 6 digit code
  token: string; // Unique secret token
  allowedDevices: number; // Default 1
  claimedDevices: string[]; // List of device UUIDs
  createdAt: number;
  expiresAt: number; // Timestamp
  isRevoked: boolean;
  notes?: string;
}

function readLicenses(): StoredLicense[] {
  try {
    if (!fs.existsSync(LICENSES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(LICENSES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading licenses file:', err);
    return [];
  }
}

function writeLicenses(licenses: StoredLicense[]): void {
  try {
    fs.writeFileSync(LICENSES_FILE, JSON.stringify(licenses, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing licenses file:', err);
  }
}

app.use(express.json());

// ============================================================================
// API ROUTES FOR SECURE ACCESS & ANTI-FORWARDING
// ============================================================================

// 1. Create a new single-buyer license (Used by Rafay Arif in Seller Portal)
app.post('/api/licenses/create', (req, res) => {
  const { sellerPin, clientIdentifier, hoursValid = 24, maxDevices = 1 } = req.body;

  // Verify Seller authorization
  if (sellerPin !== MASTER_PIN && sellerPin !== '1999' && sellerPin !== 'nexora2026') {
    return res.status(403).json({ success: false, error: 'Unauthorized. Invalid Seller PIN.' });
  }

  const cleanClient = String(clientIdentifier || 'Client').trim();
  if (!cleanClient) {
    return res.status(400).json({ success: false, error: 'Client phone number or name is required.' });
  }

  const now = Date.now();
  const numHours = Number(hoursValid);
  const expiresAt = numHours === 0 ? 0 : now + numHours * 60 * 60 * 1000;
  
  // Generate random 4-digit passcode for easy typing
  const passcode = Math.floor(1000 + Math.random() * 9000).toString();
  // Generate secure token
  const token = `nex_${crypto.randomBytes(8).toString('hex')}`;

  const newLicense: StoredLicense = {
    id: `lic_${now}_${Math.random().toString(36).slice(2, 6)}`,
    clientIdentifier: cleanClient,
    passcode,
    token,
    allowedDevices: Number(maxDevices) || 1,
    claimedDevices: [],
    createdAt: now,
    expiresAt,
    isRevoked: false,
    notes: `Approved by Rafay for PKR 1,999 (${numHours === 0 ? 'Lifetime / Never Expire' : `Valid for ${numHours}h`})`,
  };

  const licenses = readLicenses();
  licenses.unshift(newLicense);
  writeLicenses(licenses);

  return res.json({
    success: true,
    license: newLicense,
  });
});

// 2. List all licenses (Used by Rafay in Seller Portal)
app.get('/api/licenses/list', (req, res) => {
  const sellerPin = req.headers['x-seller-pin'] || req.query.sellerPin;
  if (sellerPin !== MASTER_PIN && sellerPin !== '1999' && sellerPin !== 'nexora2026') {
    return res.status(403).json({ success: false, error: 'Unauthorized.' });
  }

  const licenses = readLicenses();
  return res.json({ success: true, licenses });
});

// 3. Revoke / Cancel a license (Rafay can revoke access if leaked or disputed)
app.post('/api/licenses/revoke', (req, res) => {
  const { sellerPin, licenseId } = req.body;
  if (sellerPin !== MASTER_PIN && sellerPin !== '1999' && sellerPin !== 'nexora2026') {
    return res.status(403).json({ success: false, error: 'Unauthorized.' });
  }

  const licenses = readLicenses();
  const target = licenses.find((l) => l.id === licenseId || l.token === licenseId);
  if (!target) {
    return res.status(404).json({ success: false, error: 'License not found.' });
  }

  target.isRevoked = true;
  writeLicenses(licenses);
  return res.json({ success: true, message: 'License revoked successfully.' });
});

// 4. Verify & Claim Access on Client Device (Anti-Forwarding Core)
app.post('/api/licenses/claim', (req, res) => {
  const { codeOrToken, token, code, deviceId, clientPhone } = req.body;
  const input = String(codeOrToken || token || code || clientPhone || '').trim();
  const userDeviceId = String(deviceId || '').trim();

  if (!input) {
    return res.status(400).json({ success: false, error: 'Please enter your access code or phone number.' });
  }

  if (!userDeviceId) {
    return res.status(400).json({ success: false, error: 'Device fingerprint required.' });
  }

  // Master bypass for Rafay testing
  if (['0336', '1999', 'nexora2026', 'rafay1999'].includes(input.toLowerCase())) {
    return res.json({
      success: true,
      clientName: 'Rafay Arif (Master Access)',
      isMaster: true,
      message: 'Master access granted.',
    });
  }

  const licenses = readLicenses();
  const matched = licenses.find(
    (l) =>
      l.passcode === input ||
      l.token === input ||
      (clientPhone && l.clientIdentifier.replace(/\D/g, '').endsWith(clientPhone.replace(/\D/g, '').slice(-10)))
  );

  if (!matched) {
    return res.status(404).json({
      success: false,
      error: 'Invalid or unrecognized access code. Please contact Rafay Arif on WhatsApp (03361068235) for your verified access.',
    });
  }

  // Check if revoked
  if (matched.isRevoked) {
    return res.status(403).json({
      success: false,
      error: 'This download access has been revoked. Please contact Rafay Arif on WhatsApp (03361068235).',
    });
  }

  // Check expiration (0 means lifetime / never expires)
  if (matched.expiresAt && matched.expiresAt > 0 && Date.now() > matched.expiresAt) {
    return res.status(410).json({
      success: false,
      error: 'This access link has expired. Download links are time-limited for security. Please WhatsApp Rafay (03361068235).',
    });
  }

  // CRITICAL ANTI-FORWARDING CHECK:
  // Has this license already been claimed by another device?
  const alreadyClaimedByThisDevice = matched.claimedDevices.includes(userDeviceId);

  if (!alreadyClaimedByThisDevice) {
    if (matched.claimedDevices.length >= matched.allowedDevices) {
      // FORWARDING DETECTED!
      return res.status(403).json({
        success: false,
        error:
          'Security Alert: Yeh link pehle hi kisi aur phone/device par activate ho chuka hai! Yeh eBook link sirf 1 single device ke liye reserved hai aur kisi doosray shakhs ko forward karnay par block ho jata hai. Agar aap ne phone change kiya hai to Rafay Arif (03361068235) se rabta karein.',
        forwardingBlocked: true,
      });
    }

    // First time claim on this device - bind it!
    matched.claimedDevices.push(userDeviceId);
    writeLicenses(licenses);
  }

  return res.json({
    success: true,
    clientName: matched.clientIdentifier,
    expiresAt: matched.expiresAt,
    deviceCount: matched.claimedDevices.length,
    message: 'Access verified and securely bound to this device.',
  });
});

// ============================================================================
// VITE OR STATIC FRONTEND MOUNTING
// ============================================================================
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
