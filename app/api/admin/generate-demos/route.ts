/**
 * POST /api/admin/generate-demos
 * Batch-generates QRON codes via HuggingFace CF Worker backend.
 * Protected by ADMIN_SECRET header.
 */

import { NextRequest, NextResponse } from 'next/server'
import { DEMO_TARGETS } from '@/lib/demo-targets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

const CF_WORKER_URL = process.env.QRON_WORKER_URL || 'https://qron-ai-api.undone-k.workers.dev'

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get('x-admin-secret')
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { targets: targetIds, dryRun = false } = body as { targets?: string[]; dryRun?: boolean }

  const targets = targetIds
    ? DEMO_TARGETS.filter(t => targetIds.includes(t.id))
    : DEMO_TARGETS

  if (targets.length === 0) {
    return NextResponse.json({ error: 'No matching targets' }, { status: 400 })
  }

  const hasDb = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  const supabase = hasDb
    ? (await import('@supabase/supabase-js')).createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      )
    : null

  const results: Array<{ id: string; imageUrl: string; txHash?: string; error?: string }> = []

  for (const target of targets) {
    try {
      console.log(`[admin/generate-demos] Generating: ${target.id}`)

      const prompt = [
        `${target.subject},`,
        `${target.style} aesthetic,`,
        'seamlessly integrated into a scannable QR code pattern,',
        'the QR modules form the structure of the artwork,',
        'highly detailed, award-winning digital art, scannable QR code',
      ].join(' ')

      let imageUrl: string

      if (dryRun) {
        imageUrl = `https://placehold.co/1080x1080/0a0a0a/c9a227?text=${encodeURIComponent(target.label)}`
      } else {
        // ── Generate via HuggingFace CF Worker ────────────────────────────
        const workerRes = await fetch(`${CF_WORKER_URL}/v1/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: target.destinationUrl, prompt, style: 'space' }),
          signal: AbortSignal.timeout(110_000),
        })

        if (!workerRes.ok) {
          const err = await workerRes.text()
          throw new Error(`Worker error ${workerRes.status}: ${err.slice(0, 100)}`)
        }

        const workerData = await workerRes.json() as { previewUrl?: string; downloadUrl?: string }
        imageUrl = workerData.downloadUrl || workerData.previewUrl || ''
        if (!imageUrl) throw new Error('No image returned from worker')
      }

      // ── Mint as NFT (optional) ────────────────────────────────────────────
      let txHash: string | undefined
      if (!dryRun && process.env.QRON_NFT_CONTRACT_ADDRESS && process.env.THIRDWEB_MINTER_KEY) {
        try {
          const mintRes = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/qron/mint-nft`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                recipient: process.env.DEMO_WALLET_ADDRESS || '0x0000000000000000000000000000000000000001',
                imageUrl, destinationUrl: target.destinationUrl, qronId: `demo-${target.id}`,
              }),
            },
          )
          if (mintRes.ok) txHash = ((await mintRes.json()) as { txHash?: string }).txHash
        } catch (mintErr) {
          console.warn(`[admin/generate-demos] Non-fatal mint error for ${target.id}:`, mintErr)
        }
      }

      // ── Persist to qron_demos ─────────────────────────────────────────────
      if (supabase) {
        try {
          await supabase.from('qron_demos').upsert({
            id: target.id, label: target.label, subject: target.subject,
            style: target.style, destination_url: target.destinationUrl,
            category: target.category, pitch: target.pitch, prompt,
            image_url: imageUrl, nft_tx_hash: txHash ?? null,
            generated_at: new Date().toISOString(),
          }, { onConflict: 'id' })
        } catch (dbErr) {
          console.warn(`[admin/generate-demos] Non-fatal DB error for ${target.id}:`, dbErr)
        }
      }

      results.push({ id: target.id, imageUrl, txHash })
      console.log(`[admin/generate-demos] ✓ ${target.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`[admin/generate-demos] ✗ ${target.id}:`, msg)
      results.push({ id: target.id, imageUrl: '', error: msg })
    }
  }

  return NextResponse.json({
    generated: results,
    summary: { total: targets.length, succeeded: results.filter(r => !r.error).length, failed: results.filter(r => r.error).length },
    backend: 'huggingface',
    worker: CF_WORKER_URL,
  })
}

export async function GET() {
  return NextResponse.json({
    targets: DEMO_TARGETS.map(t => ({ id: t.id, label: t.label, category: t.category, pitch: t.pitch, destinationUrl: t.destinationUrl })),
  })
}
