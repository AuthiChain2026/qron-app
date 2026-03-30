#!/usr/bin/env node
/**
 * Generate a PDF showcase of example QRON codes
 * Displays all 12 QRON presets as QR codes with descriptions
 */

const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// QRON Presets from the app
const PRESETS = [
  {
    name: 'Static Portal',
    tier: 'Free',
    prompt: 'Clean black-and-gold geometry, AuthiChain Protocol seal at center, elegant minimal design',
    guidanceScale: 7.5,
    controlnetScale: 1.3,
  },
  {
    name: 'Chromatic Portal',
    tier: 'Pro',
    prompt: 'Full-spectrum AI art woven around QR matrix, maximum visual impact, vibrant colors',
    guidanceScale: 7.5,
    controlnetScale: 1.1,
  },
  {
    name: 'Cybernetic Bloom',
    tier: 'Pro',
    prompt: 'Circuit-board aesthetics, neon traces, organic glow, futuristic alive design',
    guidanceScale: 8,
    controlnetScale: 1.2,
  },
  {
    name: 'Dark Matter',
    tier: 'Pro',
    prompt: 'Void-black deep space with gravitational light distortion, cosmic energy',
    guidanceScale: 8,
    controlnetScale: 1.3,
  },
  {
    name: 'Neon Drift',
    tier: 'Pro',
    prompt: 'Synthwave neon gradients, retro-futurist night drive energy, glowing lines',
    guidanceScale: 7.5,
    controlnetScale: 1.1,
  },
  {
    name: 'Holographic Seal',
    tier: 'Pro',
    prompt: 'Rainbow prismatic shimmer, premium foil-effect authentication mark, holographic',
    guidanceScale: 8,
    controlnetScale: 1.2,
  },
  {
    name: 'Living Archive',
    tier: 'Enterprise',
    prompt: 'Biomorphic self-similar fractal forms, organic intelligence encoded',
    guidanceScale: 8.5,
    controlnetScale: 1.3,
  },
  {
    name: 'Dimensional Gate',
    tier: 'Enterprise',
    prompt: 'AR-depth layering with shadow and parallax, spatial anchor for physical media',
    guidanceScale: 8.5,
    controlnetScale: 1.3,
  },
  {
    name: 'Neon Matrix',
    tier: 'Enterprise',
    prompt: 'Glowing grid of pulsating neon lines with matrix-like streams of energy',
    guidanceScale: 8,
    controlnetScale: 1.2,
  },
  {
    name: 'Galactic',
    tier: 'Enterprise',
    prompt: 'Cosmic starfields and swirling galaxies, particles orbiting a living QRON',
    guidanceScale: 8,
    controlnetScale: 1.2,
  },
  {
    name: 'Liquid Metal',
    tier: 'Enterprise',
    prompt: 'Flowing metallic fluid forms and shimmering reflections that pulse with light',
    guidanceScale: 8,
    controlnetScale: 1.2,
  },
  {
    name: 'Nature Elements',
    tier: 'Enterprise',
    prompt: 'Organic elemental motifs of leaves vines water and fire swirling around',
    guidanceScale: 8,
    controlnetScale: 1.1,
  },
];

// QRON Modes from the app
const MODES = [
  { name: 'Static', tier: 'Free', description: 'AI-styled QR code', features: ['AI styling', 'High resolution', 'Instant generation'] },
  { name: 'Stereographic', tier: 'Free', description: '3D depth effect', features: ['3D depth', 'Parallax effect', 'Cross-eye viewable'] },
  { name: 'Kinetic', tier: 'Pro', description: 'Animated motion QR', features: ['Video output', 'Smooth animation', 'Loop-ready'] },
  { name: 'Holographic', tier: 'Pro', description: 'Shimmer & shift', features: ['Color shift', 'Holographic foil', 'Premium look'] },
  { name: 'Memory', tier: 'Pro', description: 'Mint as NFT', features: ['On-chain', 'Own forever', 'Tradeable'] },
  { name: 'Echo', tier: 'Pro', description: 'Ultrasonic enabled', features: ['Sound trigger', 'Proximity detect', 'Chirp.io'] },
  { name: 'Temporal', tier: 'Enterprise', description: 'Time-based evolution', features: ['Scheduled changes', 'Day/night modes', 'Event triggers'] },
  { name: 'Reactive', tier: 'Enterprise', description: 'Environment-aware', features: ['Weather sync', 'Location aware', 'Context adaptive'] },
  { name: 'Layered', tier: 'Enterprise', description: 'Multi-composition', features: ['Multiple layers', 'Blend modes', 'Complex designs'] },
  { name: 'Dimensional', tier: 'Enterprise', description: 'AR-ready spatial', features: ['AR compatible', 'Spatial anchor', '3D placement'] },
  { name: 'Living', tier: 'Enterprise', description: 'Self-evolving AI', features: ['AI evolution', 'Learns & adapts', 'Truly alive'] },
];

const EXAMPLE_URL = 'https://qron.authichain.com';

// Tier badge colors
const TIER_COLORS = {
  Free: { bg: [34, 197, 94], text: [255, 255, 255] },      // Green
  Pro: { bg: [168, 85, 247], text: [255, 255, 255] },       // Purple
  Enterprise: { bg: [245, 158, 11], text: [255, 255, 255] }, // Amber
};

async function generateQRBuffer(url) {
  return QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
}

async function generatePDF() {
  const outputPath = path.join(__dirname, '..', 'business_output', 'qron-codes-example.pdf');

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - 80; // Account for margins
  const centerX = doc.page.width / 2;

  // ========== COVER PAGE ==========
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a');

  doc.fontSize(42).fillColor('#f5f5f5').font('Helvetica-Bold')
    .text('QRON', 0, 180, { align: 'center' });

  doc.fontSize(16).fillColor('#a3a3a3').font('Helvetica')
    .text('AI-Enhanced QR Code Platform', 0, 235, { align: 'center' });

  doc.fontSize(12).fillColor('#737373')
    .text('Example QR Codes & Preset Catalog', 0, 270, { align: 'center' });

  // Generate cover QR code
  const coverQR = await generateQRBuffer(EXAMPLE_URL);
  doc.image(coverQR, centerX - 75, 320, { width: 150, height: 150 });

  doc.fontSize(10).fillColor('#525252')
    .text(EXAMPLE_URL, 0, 485, { align: 'center' });

  doc.fontSize(9).fillColor('#404040')
    .text('Powered by AuthiChain Protocol', 0, 520, { align: 'center' });

  doc.fontSize(8).fillColor('#404040')
    .text('Generated: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 0, 545, { align: 'center' });

  // ========== PRESETS PAGES (2 per row, 3 rows per page) ==========
  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');

  // Section header
  doc.fontSize(28).fillColor('#0a0a0a').font('Helvetica-Bold')
    .text('QRON Presets', 40, 40);
  doc.fontSize(11).fillColor('#737373').font('Helvetica')
    .text('Each preset defines a unique AI styling direction for your QR codes.', 40, 75);
  doc.fontSize(11).fillColor('#737373')
    .text('QR codes below encode: ' + EXAMPLE_URL, 40, 92);

  let y = 125;
  const colWidth = (pageWidth - 20) / 2;
  const qrSize = 120;
  const cardHeight = 215;

  for (let i = 0; i < PRESETS.length; i++) {
    const preset = PRESETS[i];
    const col = i % 2;
    const row = Math.floor(i % 6 / 2);

    if (i > 0 && i % 6 === 0) {
      doc.addPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
      y = 40;
    }

    const cardX = 40 + col * (colWidth + 20);
    const cardY = y + row * (cardHeight + 10);

    // Card background
    doc.roundedRect(cardX, cardY, colWidth, cardHeight, 8)
      .fillAndStroke('#fafafa', '#e5e5e5');

    // Preset name
    doc.fontSize(14).fillColor('#0a0a0a').font('Helvetica-Bold')
      .text(preset.name, cardX + 10, cardY + 10, { width: colWidth - 20 });

    // Tier badge
    const tierColor = TIER_COLORS[preset.tier];
    const badgeX = cardX + colWidth - 70;
    doc.roundedRect(badgeX, cardY + 10, 55, 18, 4)
      .fill(`rgb(${tierColor.bg.join(',')})`);
    doc.fontSize(8).fillColor(`rgb(${tierColor.text.join(',')})`)
      .font('Helvetica-Bold')
      .text(preset.tier.toUpperCase(), badgeX, cardY + 14, { width: 55, align: 'center' });

    // QR Code
    const qrBuffer = await generateQRBuffer(EXAMPLE_URL + '?preset=' + preset.name.toLowerCase().replace(/\s+/g, '-'));
    doc.image(qrBuffer, cardX + 10, cardY + 35, { width: qrSize, height: qrSize });

    // Prompt text
    const textX = cardX + qrSize + 18;
    const textWidth = colWidth - qrSize - 35;
    doc.fontSize(8).fillColor('#525252').font('Helvetica-Bold')
      .text('AI Prompt:', textX, cardY + 38, { width: textWidth });
    doc.fontSize(7.5).fillColor('#737373').font('Helvetica')
      .text(preset.prompt, textX, cardY + 50, { width: textWidth, height: 55 });

    // Parameters
    doc.fontSize(7).fillColor('#525252').font('Helvetica-Bold')
      .text('Parameters:', textX, cardY + 110, { width: textWidth });
    doc.fontSize(7).fillColor('#737373').font('Helvetica')
      .text(`Guidance: ${preset.guidanceScale}  |  ControlNet: ${preset.controlnetScale}`, textX, cardY + 121, { width: textWidth });

    // Scan instruction
    doc.fontSize(6.5).fillColor('#a3a3a3').font('Helvetica')
      .text('Scan to preview this preset', cardX + 10, cardY + qrSize + 42, { width: qrSize, align: 'center' });
  }

  // ========== MODES PAGE ==========
  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');

  doc.fontSize(28).fillColor('#0a0a0a').font('Helvetica-Bold')
    .text('QRON Generation Modes', 40, 40);
  doc.fontSize(11).fillColor('#737373').font('Helvetica')
    .text('11 distinct modes for different QR code output types and capabilities.', 40, 75);

  y = 110;
  const modeCardHeight = 60;

  for (let i = 0; i < MODES.length; i++) {
    const mode = MODES[i];

    if (y + modeCardHeight > doc.page.height - 40) {
      doc.addPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
      y = 40;
    }

    // Mode card
    doc.roundedRect(40, y, pageWidth, modeCardHeight, 6)
      .fillAndStroke('#fafafa', '#e5e5e5');

    // Mode name
    doc.fontSize(13).fillColor('#0a0a0a').font('Helvetica-Bold')
      .text(mode.name, 55, y + 10, { width: 150 });

    // Description
    doc.fontSize(9).fillColor('#737373').font('Helvetica')
      .text(mode.description, 55, y + 28, { width: 150 });

    // Tier badge
    const tierColor = TIER_COLORS[mode.tier];
    doc.roundedRect(210, y + 10, 55, 18, 4)
      .fill(`rgb(${tierColor.bg.join(',')})`);
    doc.fontSize(8).fillColor(`rgb(${tierColor.text.join(',')})`)
      .font('Helvetica-Bold')
      .text(mode.tier.toUpperCase(), 210, y + 14, { width: 55, align: 'center' });

    // Features
    const featX = 285;
    doc.fontSize(8).fillColor('#525252').font('Helvetica')
      .text(mode.features.map(f => '  ' + f).join('     '), featX, y + 15, { width: pageWidth - featX + 40 - 55 });

    y += modeCardHeight + 8;
  }

  // ========== TECHNICAL SPECS PAGE ==========
  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');

  doc.fontSize(28).fillColor('#0a0a0a').font('Helvetica-Bold')
    .text('Technical Specifications', 40, 40);

  const specs = [
    ['QR Library', 'qrcode v1.5.4 (Node.js)'],
    ['AI Engine', 'Fal.ai Illusion-Diffusion with ControlNet'],
    ['Base Resolution', '768 x 768 px'],
    ['Output Resolution', '1024 x 1024 px (square_hd)'],
    ['Error Correction', 'Level H (30% recovery)'],
    ['Inference Steps', '40 (default)'],
    ['Guidance Scale Range', '7.5 - 8.5'],
    ['ControlNet Range', '1.1 - 1.3 (preserves scannability)'],
    ['Negative Prompt', 'ugly, disfigured, low quality, blurry, nsfw'],
    ['Provenance', 'AuthiChain Protocol registration'],
    ['NFT Minting', 'Thirdweb SDK integration'],
    ['Storage', 'Supabase file storage'],
  ];

  y = 85;
  for (const [key, value] of specs) {
    doc.roundedRect(40, y, pageWidth, 30, 4)
      .fillAndStroke(y % 2 === 1 ? '#fafafa' : '#f5f5f5', '#e5e5e5');
    doc.fontSize(10).fillColor('#0a0a0a').font('Helvetica-Bold')
      .text(key, 55, y + 9, { width: 180 });
    doc.fontSize(10).fillColor('#525252').font('Helvetica')
      .text(value, 240, y + 9, { width: pageWidth - 210 });
    y += 36;
  }

  // Tier comparison table
  y += 20;
  doc.fontSize(18).fillColor('#0a0a0a').font('Helvetica-Bold')
    .text('Tier Comparison', 40, y);
  y += 30;

  const tiers = [
    { name: 'Free', modes: 'Static, Stereographic', presets: 'Static Portal', color: TIER_COLORS.Free },
    { name: 'Pro', modes: '+ Kinetic, Holographic, Memory, Echo', presets: 'All presets', color: TIER_COLORS.Pro },
    { name: 'Enterprise', modes: '+ Temporal, Reactive, Layered, Dimensional, Living', presets: 'All presets', color: TIER_COLORS.Enterprise },
  ];

  for (const tier of tiers) {
    doc.roundedRect(40, y, pageWidth, 50, 6)
      .fillAndStroke('#fafafa', '#e5e5e5');

    // Tier badge
    doc.roundedRect(55, y + 8, 75, 20, 4)
      .fill(`rgb(${tier.color.bg.join(',')})`);
    doc.fontSize(9).fillColor(`rgb(${tier.color.text.join(',')})`)
      .font('Helvetica-Bold')
      .text(tier.name.toUpperCase(), 55, y + 13, { width: 75, align: 'center' });

    doc.fontSize(9).fillColor('#525252').font('Helvetica-Bold')
      .text('Modes:', 145, y + 12, { width: 50 });
    doc.fontSize(8).fillColor('#737373').font('Helvetica')
      .text(tier.modes, 195, y + 12, { width: pageWidth - 170 });

    doc.fontSize(9).fillColor('#525252').font('Helvetica-Bold')
      .text('Presets:', 145, y + 30, { width: 50 });
    doc.fontSize(8).fillColor('#737373').font('Helvetica')
      .text(tier.presets, 195, y + 30, { width: pageWidth - 170 });

    y += 58;
  }

  // Footer
  doc.fontSize(8).fillColor('#a3a3a3')
    .text('QRON by AuthiChain - AI-Enhanced QR Code Platform', 40, doc.page.height - 40, { align: 'center', width: pageWidth });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`PDF generated: ${outputPath}`);
      resolve(outputPath);
    });
    stream.on('error', reject);
  });
}

generatePDF().catch(console.error);
