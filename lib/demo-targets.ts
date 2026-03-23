/**
 * High-profile demo QRON targets
 *
 * Each entry defines a subject + style for generating a compelling
 * demo QRON that showcases the technology to potential buyers.
 *
 * These are used by:
 *   - /api/admin/generate-demos  (batch generation)
 *   - /app/demo page             (public showcase gallery)
 *   - Sale automation demos      (sent to prospects)
 */

export interface DemoTarget {
  id: string
  subject: string           // Prompt subject fed to illusion-diffusion
  style: string             // Style key or free-form style text
  destinationUrl: string    // URL the QR will encode
  label: string             // Display name for gallery
  category: 'brand' | 'celebrity' | 'sport' | 'culture' | 'luxury'
  pitch: string             // One-line sales pitch shown in demo gallery
  stripeCheckoutLabel: string // Text on the "order yours" button
}

export const DEMO_TARGETS: DemoTarget[] = [
  // ── Luxury Brands ──────────────────────────────────────────────────────────
  {
    id: 'nike',
    subject: 'Nike swoosh logo, athletic silhouette, Just Do It energy, bold red and black',
    style: 'cyberpunk',
    destinationUrl: 'https://nike.com',
    label: 'Nike — Just Do It QRON',
    category: 'brand',
    pitch: 'Turn your next Nike campaign into a scannable masterpiece.',
    stripeCheckoutLabel: 'Order Custom Nike-Style QRON',
  },
  {
    id: 'tesla',
    subject: 'Tesla Model S silhouette, electric lightning bolts, futuristic chrome, Elon Musk vision',
    style: 'miniature',
    destinationUrl: 'https://tesla.com',
    label: 'Tesla — Electric Future QRON',
    category: 'brand',
    pitch: 'The future of QR codes, as bold as a Tesla.',
    stripeCheckoutLabel: 'Order Custom Tesla-Style QRON',
  },
  {
    id: 'louis-vuitton',
    subject: 'Louis Vuitton LV monogram pattern, golden honey tones, luxury fashion house, Paris',
    style: 'luxury',
    destinationUrl: 'https://louisvuitton.com',
    label: 'Louis Vuitton — Monogram QRON',
    category: 'luxury',
    pitch: 'Haute couture meets blockchain — luxury QR authentication.',
    stripeCheckoutLabel: 'Order Custom LV-Style QRON',
  },
  {
    id: 'gucci',
    subject: 'Gucci double-G logo, green and red stripe, Italian luxury, snake motif, floral accents',
    style: 'watercolor',
    destinationUrl: 'https://gucci.com',
    label: 'Gucci — Flora QRON',
    category: 'luxury',
    pitch: 'Gucci-level artistry fused into every scan.',
    stripeCheckoutLabel: 'Order Custom Gucci-Style QRON',
  },
  {
    id: 'rolex',
    subject: 'Rolex crown logo, Swiss watch movement gears, gold and emerald green, precision craftsmanship',
    style: 'luxury',
    destinationUrl: 'https://rolex.com',
    label: 'Rolex — Precision QRON',
    category: 'luxury',
    pitch: 'Engineered to perfection — just like a Rolex.',
    stripeCheckoutLabel: 'Order Custom Rolex-Style QRON',
  },

  // ── Celebrity / Cultural Icons ─────────────────────────────────────────────
  {
    id: 'mj',
    subject: 'Michael Jordan silhouette dunking, Chicago Bulls red jersey, Air Jordan wings logo, legendary athlete',
    style: 'portrait',
    destinationUrl: 'https://jumpman23.com',
    label: 'Jordan Brand — Legendary QRON',
    category: 'celebrity',
    pitch: 'Be like Mike — with a QR code that\'s an art piece.',
    stripeCheckoutLabel: 'Order Custom Jordan-Style QRON',
  },
  {
    id: 'drake',
    subject: 'OVO owl logo, gold and black, hip hop royalty, Toronto skyline, luxury lifestyle',
    style: 'graffiti',
    destinationUrl: 'https://octobersveryown.com',
    label: 'OVO — Drake x QRON',
    category: 'celebrity',
    pitch: 'From the 6 to the blockchain — your music brand on a QRON.',
    stripeCheckoutLabel: 'Order Custom OVO-Style QRON',
  },
  {
    id: 'space-x',
    subject: 'SpaceX Falcon Heavy rocket launch, dramatic smoke plumes, starry night sky, Mars mission',
    style: 'miniature',
    destinationUrl: 'https://spacex.com',
    label: 'SpaceX — Launch Sequence QRON',
    category: 'brand',
    pitch: 'Rocket-powered QR codes for brands that shoot for the stars.',
    stripeCheckoutLabel: 'Order Custom SpaceX-Style QRON',
  },

  // ── Sports ─────────────────────────────────────────────────────────────────
  {
    id: 'lakers',
    subject: 'LA Lakers gold and purple court, basketball bursting with stars, championship glory, Hollywood lights',
    style: 'cyberpunk',
    destinationUrl: 'https://nba.com/lakers',
    label: 'LA Lakers — Championship QRON',
    category: 'sport',
    pitch: 'Championship-worthy QR codes for your next game-day campaign.',
    stripeCheckoutLabel: 'Order Custom Lakers-Style QRON',
  },
  {
    id: 'ferrari',
    subject: 'Ferrari prancing horse logo, Italian racing red, Formula 1 speed blur, Maranello craftsmanship',
    style: 'portrait',
    destinationUrl: 'https://ferrari.com',
    label: 'Ferrari — Prancing Horse QRON',
    category: 'luxury',
    pitch: 'Forza Ferrari — speed and artistry in every scan.',
    stripeCheckoutLabel: 'Order Custom Ferrari-Style QRON',
  },

  // ── Streetwear / Culture ───────────────────────────────────────────────────
  {
    id: 'supreme',
    subject: 'Supreme box logo, red and white, New York street culture, graffiti walls, skate aesthetic',
    style: 'graffiti',
    destinationUrl: 'https://supremenewyork.com',
    label: 'Supreme — Box Logo QRON',
    category: 'culture',
    pitch: 'Drop culture meets authentication culture.',
    stripeCheckoutLabel: 'Order Custom Supreme-Style QRON',
  },
  {
    id: 'apple',
    subject: 'Apple bitten logo, minimalist white glow, product design aesthetic, Steve Jobs vision, clean lines',
    style: 'geometric',
    destinationUrl: 'https://apple.com',
    label: 'Apple — Think Different QRON',
    category: 'brand',
    pitch: 'Insanely great QR codes for insanely great brands.',
    stripeCheckoutLabel: 'Order Custom Apple-Style QRON',
  },
]

// Lookup by id
export const getDemoTarget = (id: string): DemoTarget | undefined =>
  DEMO_TARGETS.find(t => t.id === id)
