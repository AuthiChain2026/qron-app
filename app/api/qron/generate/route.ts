/**
 * POST /api/qron/generate
 *
 * Generate an artistic QR code using Fal.ai illusion-diffusion.
 * Requires authentication. Rate-limited by subscription tier.
 *
 * Body (JSON):
 *   url     – The URL the QR code should point to (required)
 *   prompt  – Style/art prompt for the illusion effect (required)
 *   mode    – 'standard' | 'premium' | 'enterprise' (default: 'standard')
 *
 * Returns:
 *   { imageUrl, qrDataUrl, prompt, url }
 */

import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MODE_STEPS: Record<string, number> = {
  standard: 30,
  premium: 50,
  enterprise: 75,
}

export async function POST(req: NextRequest) {
  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const authHeader = req.headers.get('authorization')

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Validate user session via Supabase auth
    const supabase = createClient(supabaseUrl, supabaseKey)
    const token = authHeader?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── Input ─────────────────────────────────────────────────────────────────
    const body = await req.json()
    const { url, prompt, mode = 'standard' } = body

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json({ error: 'A valid URL is required' }, { status: 400 })
    }
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'A prompt is required' }, { status: 400 })
    }

    const falKey = process.env.FAL_KEY
    if (!falKey) {
      return NextResponse.json({ error: 'AI generation not configured' }, { status: 503 })
    }

    fal.config({ credentials: falKey })

    // ── Generate base QR ──────────────────────────────────────────────────────
    const QRCode = (await import('qrcode')).default
    const qrDataUrl: string = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      width: 1024,
      margin: 2,
    })

    // ── Generate artistic QR via Fal.ai ───────────────────────────────────────
    const steps = MODE_STEPS[mode] ?? MODE_STEPS.standard
    const falResult = await fal.subscribe('fal-ai/illusion-diffusion', {
      input: {
        prompt: `highly detailed QR code art, scannable, ${prompt.trim()}`,
        image_url: qrDataUrl,
        guidance_scale: 8.5,
        num_inference_steps: steps,
        controlnet_conditioning_scale: 1.5,
      },
    })

    const falData = falResult.data as Record<string, any>
    const imageUrl: string | undefined = falData?.image?.url || falData?.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned from AI service' }, { status: 502 })
    }

    // ── Log generation event ──────────────────────────────────────────────────
    const { error: insertErr } = await supabase.from('qron_generations').insert({
      user_id: user.id,
      url,
      prompt: prompt.trim(),
      mode,
      image_url: imageUrl,
      generated_at: new Date().toISOString(),
    })
    if (insertErr) {
      console.warn('[qron/generate] Non-fatal: failed to log generation', insertErr)
    }

    return NextResponse.json({ imageUrl, qrDataUrl, prompt: prompt.trim(), url })
  } catch (err: any) {
    console.error('[qron/generate] Error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
