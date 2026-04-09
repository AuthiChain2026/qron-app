/**
 * Demo: Pharmaceutical QRON
 * Problem: Counterfeit and diverted drugs cost the global pharma industry over $200B a year and put patient safety at risk, while DSCSA compliance demands unit-level serialisation and instant audit readiness.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: Every pill pack ships with a branded QRON that resolves to a DSCSA-compliant AuthiChain record — protecting patients, simplifying recalls, and turning authentication into a trust-building touchpoint at the pharmacy counter.
 */
'use client'

import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle, Pill, Activity, FileCheck } from 'lucide-react'

const STEPS = [
  {
    icon: Pill,
    title: 'Serialise at the line',
    body: 'Each unit dose receives a unique QRON — a GS1-compliant serial bound to an AuthiChain record — printed directly on the secondary package.',
  },
  {
    icon: Activity,
    title: 'Track every handoff',
    body: 'Manufacturer → 3PL → distributor → pharmacy. Every transfer is signed and timestamped, satisfying DSCSA §582 end-to-end.',
  },
  {
    icon: Shield,
    title: 'Verify at dispense',
    body: 'The pharmacist scans the QRON. AuthiChain confirms lot, expiry, and pedigree in under 2.1 seconds — no backend integration required.',
  },
  {
    icon: FileCheck,
    title: 'Audit on demand',
    body: 'A complete EPCIS-ready audit trail is generated instantly. Recalls, FDA inspections, and insurance claims become a single query.',
  },
]

const OUTCOMES = [
  'DSCSA / FDA 21 CFR Part 11 aligned',
  'Unit-level serial + lot + expiry in one scan',
  'Instant recall and pedigree queries',
  'Branded package art that doubles as a trust signal',
]

export default function PharmaDemoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: '#c9a227' }}>
          ← Back to industry demos
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Pill className="w-3.5 h-3.5" /> Industry · Pharmaceutical
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pharma QRON — DSCSA-grade authentication</h1>
          <p className="text-lg max-w-3xl" style={{ color: '#a8a8a8' }}>
            Counterfeit drugs kill people and cost the industry more than $200B every year. QRON turns each unit dose
            into a scannable, AuthiChain-backed identity — so pharmacists, regulators, and patients get instant proof
            of what&rsquo;s in the bottle.
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
            Order a custom pharma QRON <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/marketing/intake.md"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
            Book a pharma briefing
          </Link>
        </div>
      </div>
    </main>
  )
}
