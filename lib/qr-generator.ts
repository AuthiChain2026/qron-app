import QRCode from 'qrcode';
import { createClient } from '@/utils/supabase/server';

interface QROptions {
  data: string;
  serialNumber: string;
  productName: string;
  manufacturer: string;
}

export async function generateQRWithSeal(options: QROptions) {
  const { data, serialNumber, productName, manufacturer } = options;

  // Generate QR code as data URL
  const qrDataUrl = await QRCode.toDataURL(data, {
    width: 512,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  // Create SVG seal composition
  const sealSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="600" height="700" fill="#f8fafc" rx="20"/>
  <!-- Border -->
  <rect x="10" y="10" width="580" height="680" fill="none" stroke="#1e40af" stroke-width="3" rx="16"/>
  <rect x="20" y="20" width="560" height="660" fill="none" stroke="#3b82f6" stroke-width="1" rx="12"/>
  <!-- Header -->
  <rect x="0" y="0" width="600" height="80" fill="#1e40af" rx="20"/>
  <rect x="0" y="60" width="600" height="20" fill="#1e40af"/>
  <text x="300" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">QRON Certified</text>
  <!-- QR Code -->
  <image href="${qrDataUrl}" x="75" y="100" width="450" height="450"/>
  <!-- Serial Number -->
  <text x="300" y="590" font-family="monospace" font-size="18" fill="#1e40af" text-anchor="middle" font-weight="bold">${serialNumber}</text>
  <!-- Product Name -->
  <text x="300" y="625" font-family="Arial, sans-serif" font-size="16" fill="#334155" text-anchor="middle">${productName}</text>
  <!-- Manufacturer -->
  <text x="300" y="655" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">${manufacturer}</text>
  <!-- Footer line -->
  <line x1="40" y1="670" x2="560" y2="670" stroke="#cbd5e1" stroke-width="1"/>
  <text x="300" y="690" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Scan to verify authenticity at qron.space</text>
</svg>`;

  // Upload to Supabase Storage
  const supabase = createClient();

  // Upload QR image
  const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
  const qrPath = `qr/${serialNumber}.png`;
  await supabase.storage
    .from('certifications')
    .upload(qrPath, qrBuffer, {
      contentType: 'image/png',
      upsert: true,
    });
  const { data: qrPublicData } = supabase.storage
    .from('certifications')
    .getPublicUrl(qrPath);

  // Upload seal SVG
  const sealPath = `seals/${serialNumber}.svg`;
  await supabase.storage
    .from('certifications')
    .upload(sealPath, sealSvg, {
      contentType: 'image/svg+xml',
      upsert: true,
    });
  const { data: sealPublicData } = supabase.storage
    .from('certifications')
    .getPublicUrl(sealPath);

  return {
    qrImageUrl: qrPublicData.publicUrl,
    sealSvgUrl: sealPublicData.publicUrl,
  };
}
