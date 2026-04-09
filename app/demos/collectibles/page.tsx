/**
 * Demo: Collectibles QRON
 * Problem: Blue-chip art, trading cards, sneakers, and limited drops rely on fragile paper COAs and slabs that can be forged, lost, or decoupled from the piece — destroying value and insurance confidence.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: Every collectible ships with a QRON tied to an AuthiChain digital twin of the COA, so galleries, auction houses, grading services, and collectors can verify provenance with a single scan and keep valuation intact across every sale.
 */
'use client'

import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle, Gem, Stamp, Archive, Trophy } from 'lucide-react'

const STEPS = [
  {
    icon: Stamp,
    title: 'Issuer mints the digital twin',
    body: 'The gallery, publisher, or grading service mints a QRON that anchors the COA, edition, and condition grade to AuthiChain at issuance.',
  },
  {
    icon: Archive,
    title: 'Physical piece carries the mark',
    body: 'The QRON is embedded in the slab, certificate, box, or mount — the art object and its provenance travel together forever.',
  },
  {
    icon: Shield,
    title: 'Marketplace verifies in one scan',
    body: 'Auction houses, grading reseller platforms, and collectors verify authenticity and ownership history in 2.1 seconds, without contacting the issuer.',
  },
  {
    icon: Trophy,
    title: 'Value survives resale',
    body: 'Every transfer updates AuthiChain. Insurance, estate transfer, and auction catalogues can trust a single source of provenance truth.',
  },
]

const OUTCOMES = [
  'COA bound permanently to the physical piece',
  'Instant auction-house and platform verification',
  'Provenance history preserved across resales',
  'Insurance and estate workflows simplified',
]

export default function CollectiblesDemoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: '#c9a227' }}>
          ← Back to industry demos
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Gem className="w-3.5 h-3.5" /> Industry · Art &amp; Collectibles
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Collectibles QRON — provenance that lasts</h1>
          <p className="text-lg max-w-3xl" style={{ color: '#a8a8a8' }}>
            Blue-chip art, trading cards, sneakers, and limited prints all live or die on provenance. QRON binds the
            digital twin of the COA to the physical object — so value, insurance, and auction confidence survive
            every resale.
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
            Order a custom collectibles QRON <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/marketing/intake.md"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
            Book a collectibles briefing
          </Link>
        </div>
      </div>
    </main>
  )
}
