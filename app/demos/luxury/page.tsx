/**
 * Demo: Luxury Goods QRON
 * Problem: Luxury handbags, watches, and fashion are routinely counterfeited and fraudulently resold, leaving maisons, retailers, and secondhand buyers without a trusted chain of custody from boutique to resale.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: A branded QRON tag — indistinguishable from the product&rsquo;s design language — anchors every item to an immutable AuthiChain record, protecting resale value, enabling warranty transfer, and giving maisons a direct owner-to-brand relationship at every hand-off.
 */
'use client'

import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle, Gem, Crown, Tag, Repeat } from 'lucide-react'

const STEPS = [
  {
    icon: Crown,
    title: 'Maison registers the piece',
    body: 'The brand enters the product details and commissions a QRON that mirrors the maison&rsquo;s visual language — monogram, colour, and craftsmanship cues.',
  },
  {
    icon: Tag,
    title: 'QRON woven into the tag',
    body: 'The QRON ships inside the hang tag, care label, or NFC insole — part of the design, not an afterthought. Every scan resolves to an AuthiChain record.',
  },
  {
    icon: Shield,
    title: 'Retailer authenticates at POS',
    body: 'At the boutique, the sales associate scans to confirm provenance, batch, and allocation — and the owner is optionally bound to the piece.',
  },
  {
    icon: Repeat,
    title: 'Resale stays verifiable',
    body: 'Every resale updates the provenance trail. Secondhand buyers pay more with confidence, and the maison keeps its brand promise alive across the lifetime of the object.',
  },
]

const OUTCOMES = [
  'Brand-consistent QRON art on every SKU',
  'Boutique-to-resale chain of custody',
  'Owner CRM at every scan',
  'Warranty and care offers triggered by verification',
]

export default function LuxuryDemoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: '#c9a227' }}>
          ← Back to industry demos
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Gem className="w-3.5 h-3.5" /> Industry · Luxury Goods
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury QRON — boutique to resale</h1>
          <p className="text-lg max-w-3xl" style={{ color: '#a8a8a8' }}>
            Luxury depends on trust — and trust depends on proof. QRON gives every handbag, watch, and couture piece
            an art-directed, AuthiChain-backed identity that travels with it from the maison to the secondary market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={i} className="rounded-2xl p-6"
                 style={{ background: '#0d0d0d', border: '1px solid rgba(201,162,39,0.15)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>Step {i + 1}</div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm" style={{ color: '#a8a8a8' }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 mb-12"
             style={{ background: 'linear-gradient(180deg, rgba(201,162,39,0.08), rgba(201,162,39,0.02))', border: '1px solid rgba(201,162,39,0.3)' }}>
          <h2 className="text-2xl font-bold mb-4">What you get</h2>
          <ul className="space-y-2">
            {OUTCOMES.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }} />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: '#c9a227', color: '#0a0a0a' }}>
            Order a custom luxury QRON <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/marketing/intake.md"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
            Book a luxury briefing
          </Link>
        </div>
      </div>
    </main>
  )
}
