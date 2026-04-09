/**
 * Demo: QRON.space Industry Demo Index
 * Problem: Prospects, investors, and partners need a single entry point to see how QRON applies to every industry we serve — without hunting through the codebase or the marketing site.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: A curated demo gallery that lets a buyer self-qualify into the industry that matches their pain — pharma, cannabis, luxury, collectibles, supply chain — and converts into a custom QRON order in a single click.
 */
'use client'

import Link from 'next/link'
import { ArrowRight, Pill, Leaf, Gem, Ship, Sparkles } from 'lucide-react'

const DEMOS = [
  {
    href: '/demos/pharma',
    icon: Pill,
    sector: 'Pharmaceutical',
    headline: 'DSCSA-grade drug authentication',
    pitch: 'Unit-level serialisation, cold-chain pedigree, and instant recall queries — with a QRON on every pack.',
  },
  {
    href: '/demos/cannabis',
    icon: Leaf,
    sector: 'Cannabis',
    headline: 'Seed-to-sale, lab-to-consumer',
    pitch: 'Every package bound to cultivator licence, lab results, and terpene profile. Dispensary-ready.',
  },
  {
    href: '/demos/luxury',
    icon: Gem,
    sector: 'Luxury Goods',
    headline: 'Boutique-to-resale provenance',
    pitch: 'Art-directed QRONs that live inside the hang tag and travel with the piece through every resale.',
  },
  {
    href: '/demos/collectibles',
    icon: Sparkles,
    sector: 'Art & Collectibles',
    headline: 'Provenance that survives resale',
    pitch: 'Digital twin of the COA bound permanently to the art, card, or drop. Auction-house verifiable.',
  },
  {
    href: '/demos/supplychain',
    icon: Ship,
    sector: 'Supply Chain',
    headline: 'Factory-to-dock signed custody',
    pitch: 'Every hand-off signed on-chain with actor + GPS. Tamper attempts flagged in real time.',
  },
]

export default function DemosIndexPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Sparkles className="w-3.5 h-3.5" /> Industry demos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">QRON in the wild — pick your industry</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#a8a8a8' }}>
            Every demo below walks through how QRON + AuthiChain authenticate a product in 2.1 seconds for a
            specific industry. Pick the one closest to your problem — or book a briefing if you need a custom
            storymode.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {DEMOS.map(({ href, icon: Icon, sector, headline, pitch }) => (
            <Link key={href} href={href}
                  className="group rounded-2xl p-6 transition-all"
                  style={{ background: '#0d0d0d', border: '1px solid rgba(201,162,39,0.15)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>{sector}</div>
                  <h3 className="text-xl font-bold mb-2">{headline}</h3>
                  <p className="text-sm mb-4" style={{ color: '#a8a8a8' }}>{pitch}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#c9a227' }}>
                    Explore demo <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl p-8 text-center"
             style={{ background: 'linear-gradient(180deg, rgba(201,162,39,0.08), rgba(201,162,39,0.02))', border: '1px solid rgba(201,162,39,0.3)' }}>
          <h2 className="text-2xl font-bold mb-2">Need a custom industry QRON?</h2>
          <p className="mb-6" style={{ color: '#a8a8a8' }}>
            Tell us your use case through the marketing intake and we&rsquo;ll design a QRON + storymode that maps
            to your exact workflow.
          </p>
          <Link href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: '#c9a227', color: '#0a0a0a' }}>
            Order a custom QRON <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
