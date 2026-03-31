/**
 * POST /api/admin/generate-demos
 *
 * Batch-generates QRON codes for all high-profile demo targets using
 * fal-ai/illusion-diffusion, mints each as an NFT, and stores results
 * in the qron_demos table for the public showcase gallery.
 *
 * Protected by ADMIN_SECRET header — never expose to the public.
 *
 * Body (JSON):
 *   targets  – string[] of demo target IDs to generate (default: all)
 *   dryRun   – boolean: if true, skip fal.ai and return mock URLs
 *
 * Returns:
 *   { generated: { id, imageUrl, txHash }[] }
 */

import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'
import { DEMO_TARGETS } from '@/lib/demo-targets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 min for batch operations

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const adminSecret = req.headers.get('x-admin-secret')
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { targets: targetIds, dryRun = false } = body as {
    targets?: string[]
    dryRun?: boolean
  }

  const targets = targetIds
    ? DEMO_TARGETS.filter(t => targetIds.includes(t.id))
    : DEMO_TARGETS

  if (targets.length === 0) {
    return NextResponse.json({ error: 'No matching targets' }, { status: 400 })
  }

  const falKey = process.env.FAL_KEY
  if (!falKey && !dryRun) {
    return NextResponse.json({ error: 'AI image generation service is not configured', code: 'FAL_KEY_MISSING' }, { status: 503 })
  }

  if (!dryRun) fal.config({ credentials: falKey! })

  const hasDb = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  const supabase = hasDb
    ? (await import('@supabase/supabase-js')).createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      )
    : null

  const QRCode = (await import('qrcode')).default

  const results: Array<{ id: string; imageUrl: string; txHash?: string; error?: string }> = []

  for (const target of targets) {
    try {
      console.log(`[admin/generate-demos] Generating: ${target.id}`)

      // ── Build prompt ──────────────────────────────────────────────────────
      const prompt = [
        `${target.subject},`,
        `${target.style} aesthetic,`,
        'seamlessly integrated into a scannable QR code pattern,',
        'the QR modules form the structure of the artwork,',
        'highly detailed, award-winning digital art, scannable QR code',
      ].join(' ')

      // ── Generate QR base ──────────────────────────────────────────────────
      const qrDataUrl: string = await QRCode.toDataURL(target.destinationUrl, {
        errorCorrectionLevel: 'H',
        width: 1024,
        margin: 2,
      })

      // ── Generate artwork ──────────────────────────────────────────────────
      let imageUrl: string

      if (dryRun) {
        imageUrl = `https://placehold.co/1080x1080/0a0a0a/c9a227?text=${encodeURIComponent(target.label)}`
      } else {
        const falResult = await fal.subscribe('fal-ai/illusion-diffusion', {
          input: {
            prompt,
            image_url: qrDataUrl,
            guidance_scale: 8.5,
            num_inference_steps: 50,
            controlnet_conditioning_scale: 1.45,
          },
        })
        const falData = falResult.data as Record<string, any>
        imageUrl = falData?.image?.url || falData?.images?.[0]?.url
        if (!imageUrl) throw new Error('No image returned from fal.ai')
      }

      // ── Mint as NFT (optional — requires QRON_NFT_CONTRACT_ADDRESS) ───────
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
                imageUrl,
                destinationUrl: target.destinationUrl,
                qronId: `demo-${target.id}`,
              }),
            },
          )
          if (mintRes.ok) {
            const mintData = await mintRes.json()
            txHash = mintData.txHash
          }
        } catch (mintErr) {
          console.warn(`[admin/generate-demos] Non-fatal mint error for ${target.id}:`, mintErr)
        }
      }

      // ── Persist to qron_demos table ───────────────────────────────────────
      if (supabase) {
        try {
          await supabase.from('qron_demos').upsert(
            {
              id: target.id,
              label: target.label,
              subject: target.subject,
              style: target.style,
              destination_url: target.destinationUrl,
              category: target.category,
              pitch: target.pitch,
              prompt,
              image_url: imageUrl,
              nft_tx_hash: txHash ?? null,
              generated_at: new Date().toISOString(),
            },
            { onConflict: 'id' },
          )
        } catch (dbErr: unknown) {
          console.warn(`[admin/generate-demos] Non-fatal DB upsert for ${target.id}:`, dbErr)
        }
      }

      results.push({ id: target.id, imageUrl, txHash })
      console.log(`[admin/generate-demos] ✓ ${target.id} — ${imageUrl.slice(0, 60)}...`)
    } catch (err: any) {
      console.error(`[admin/generate-demos] ✗ ${target.id}:`, err.message)
      results.push({ id: target.id, imageUrl: '', error: err.message })
    }
  }

  const succeeded = results.filter(r => !r.error).length
  const failed    = results.filter(r => r.error).length

  return NextResponse.json({
    generated: results,
    summary: { total: targets.length, succeeded, failed },
  })
}

// GET — list current demo targets (no auth required)
export async function GET() {
  return NextResponse.json({
    targets: DEMO_TARGETS.map(t => ({
      id: t.id,
      label: t.label,
      category: t.category,
      pitch: t.pitch,
      destinationUrl: t.destinationUrl,
    })),
  })
}
