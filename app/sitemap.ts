import type { MetadataRoute } from 'next'

const BASE = 'https://qron.space'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // Core pages
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/collection/genesis`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/order`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/affiliate`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/demo`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/sample`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portals`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    // SEO landing pages
    { url: `${BASE}/free-qr-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ai-qr-code-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/qr-code-art`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/cannabis-qr-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/restaurant-qr-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/gig`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/targeted`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/digital-product-passport`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/real-estate-qr-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/wedding-qr-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Industry verticals
    { url: `${BASE}/for/cannabis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/for/restaurants`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/for/events`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/for/real-estate`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Demo pages
    { url: `${BASE}/demos`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/demos/cannabis`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/demos/luxury`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/demos/pharma`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/demos/collectibles`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/demos/supplychain`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    // Blog
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog/how-ai-qr-codes-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/ai-qr-code-generator-free`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/best-ai-qr-code-generator-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/ai-qr-codes-scan-rate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/blockchain-product-authentication-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/cannabis-dispensary-qr-code-compliance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/cannabis-dispensary-qr-code-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/cannabis-qr-code-art`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/luxury-goods-qr-code-authentication`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/qron-vs-competition-ai-qr-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/restaurant-menu-qr-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/restaurant-menu-qr-code-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/eu-digital-product-passport-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
