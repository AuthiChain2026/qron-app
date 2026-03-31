import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { deductCredit } from '@/lib/business-tier'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

/** Preset parameter overrides keyed by preset ID */
const PRESET_PARAMS: Record<string, { prompt: string; negative_prompt?: string; guidance_scale?: number; controlnet_conditioning_scale?: number; num_inference_steps?: number }> = {
  'static-portal':    { prompt: 'Clean black-and-gold geometry, AuthiChain Protocol seal at center, elegant minimal design', guidance_scale: 7.5, controlnet_conditioning_scale: 1.3 },
  'chromatic-portal': { prompt: 'Full-spectrum AI art woven around QR matrix, maximum visual impact, vibrant colors', guidance_scale: 7.5, controlnet_conditioning_scale: 1.1 },
  'cybernetic-bloom': { prompt: 'Circuit-board aesthetics, neon traces, organic glow, futuristic alive design', guidance_scale: 8, controlnet_conditioning_scale: 1.2 },
  'dark-matter':      { prompt: 'Void-black deep space with gravitational light distortion, cosmic energy', guidance_scale: 8, controlnet_conditioning_scale: 1.3 },
  'neon-drift':       { prompt: 'Synthwave neon gradients, retro-futurist night drive energy, glowing lines', guidance_scale: 7.5, controlnet_conditioning_scale: 1.1 },
  'holographic-seal': { prompt: 'Rainbow prismatic shimmer, premium foil-effect authentication mark, holographic', guidance_scale: 8, controlnet_conditioning_scale: 1.2 },
  'living-archive':   { prompt: 'Biomorphic self-similar fractal forms, organic intelligence encoded', guidance_scale: 8.5, controlnet_conditioning_scale: 1.3 },
  'dimensional-gate': { prompt: 'AR-depth layering with shadow and parallax, spatial anchor for physical media', guidance_scale: 8.5, controlnet_conditioning_scale: 1.3 },
  'neon-matrix':      { prompt: 'Glowing grid of pulsating neon lines with matrix-like streams of energy', guidance_scale: 8, controlnet_conditioning_scale: 1.2 },
  'galactic':         { prompt: 'Cosmic starfields and swirling galaxies, particles orbiting a living QRON', guidance_scale: 8, controlnet_conditioning_scale: 1.2 },
  'liquid-metal':     { prompt: 'Flowing metallic fluid forms and shimmering reflections that pulse with light', guidance_scale: 8, controlnet_conditioning_scale: 1.2 },
  'nature-elements':  { prompt: 'Organic elemental motifs of leaves vines water and fire swirling around', guidance_scale: 8, controlnet_conditioning_scale: 1.1 },
}

interface GenerateBody {
  url?: string
  prompt?: string
  mode?: string
  presetId?: string
}

export async function POST(request: Request) {
  try {
    const falKey = process.env.FAL_KEY
    if (!falKey) return NextResponse.json({ error: 'AI image generation service is not configured', code: 'FAL_KEY_MISSING' }, { status: 503 })

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json().catch(() => ({})) as GenerateBody
    const { url, prompt, mode = 'static', presetId } = body

    if (!url) return NextResponse.json({ error: 'Destination URL is required' }, { status: 400 })

    // ── Credit check / deduction ──────────────────────────────────────────────
    const creditResult = await deductCredit(session.user.id)
    if (!creditResult.ok) {
      return NextResponse.json({ error: creditResult.error, code: 'LIMIT_REACHED' }, { status: 403 })
    }

    // ── Resolve prompt from preset or custom ──────────────────────────────────
    let finalPrompt = prompt || ''
    let presetConfig = presetId ? PRESET_PARAMS[presetId] : null

    // If preset specified and exists in DB, load from DB
    if (presetId && !presetConfig) {
      try {
        const admin = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        const { data: dbPreset } = await admin
          .from('qron_presets')
          .select('*')
          .eq('id', presetId)
          .single()

        if (dbPreset) {
          presetConfig = {
            prompt: dbPreset.prompt,
            negative_prompt: dbPreset.negative_prompt,
            guidance_scale: dbPreset.guidance_scale,
            controlnet_conditioning_scale: dbPreset.controlnet_conditioning_scale,
            num_inference_steps: dbPreset.num_inference_steps,
          }
        }
      } catch {
        // DB preset not found — use custom prompt
      }
    }

    if (presetConfig) {
      finalPrompt = prompt ? `${prompt}, ${presetConfig.prompt}` : presetConfig.prompt
    }

    if (!finalPrompt) {
      return NextResponse.json({ error: 'A prompt or preset is required' }, { status: 400 })
    }

    // ── Generate base QR code as data URL ─────────────────────────────────────
    const QRCode = await import('qrcode')
    const qrDataUrl = await QRCode.toDataURL(url, { width: 768, margin: 2 })

    // ── Call fal.ai illusion-diffusion directly ───────────────────────────────
    const falPayload = {
      image_url: qrDataUrl,
      prompt: finalPrompt,
      negative_prompt: presetConfig?.negative_prompt || 'ugly, disfigured, low quality, blurry, nsfw',
      guidance_scale: presetConfig?.guidance_scale ?? 7.5,
      controlnet_conditioning_scale: presetConfig?.controlnet_conditioning_scale ?? 1.3,
      num_inference_steps: presetConfig?.num_inference_steps ?? 40,
      seed: Math.floor(Math.random() * 2147483647),
      image_size: 'square_hd',
    }

    const falRes = await fetch('https://queue.fal.run/fal-ai/illusion-diffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${falKey}`,
      },
      body: JSON.stringify(falPayload),
    })

    if (!falRes.ok) {
      const falError = await falRes.text()
      console.error('[qron/generate] fal.ai error:', falRes.status, falError)
      return NextResponse.json({ error: 'AI generation failed' }, { status: 502 })
    }

    const falData = await falRes.json() as { request_id?: string }
    const requestId = falData.request_id

    // Poll for result (fal.ai queue model)
    let imageUrl = ''
    if (requestId) {
      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 2000))

        const statusRes = await fetch(`https://queue.fal.run/fal-ai/illusion-diffusion/requests/${requestId}/status`, {
          headers: { 'Authorization': `Key ${falKey}` },
        })
        const statusData = await statusRes.json() as { status: string }

        if (statusData.status === 'COMPLETED') {
          const resultRes = await fetch(`https://queue.fal.run/fal-ai/illusion-diffusion/requests/${requestId}`, {
            headers: { 'Authorization': `Key ${falKey}` },
          })
          const resultData = await resultRes.json() as { image?: { url?: string }; images?: Array<{ url?: string }> }
          imageUrl = resultData.image?.url || resultData.images?.[0]?.url || ''
          break
        }

        if (statusData.status === 'FAILED') {
          return NextResponse.json({ error: 'AI generation failed' }, { status: 502 })
        }
      }

      if (!imageUrl) {
        return NextResponse.json({ error: 'Generation timed out' }, { status: 504 })
      }
    } else {
      // Synchronous response (some fal models return inline)
      const syncData = falData as { image?: { url?: string }; images?: Array<{ url?: string }> }
      imageUrl = syncData.image?.url || syncData.images?.[0]?.url || ''
      if (!imageUrl) {
        return NextResponse.json({ error: 'No image returned' }, { status: 502 })
      }
    }

    // ── Store generation in Supabase ──────────────────────────────────────────
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const qronId = crypto.randomUUID()
    await admin.from('qron_generations').insert({
      id: qronId,
      user_id: session.user.id,
      image_url: imageUrl,
      destination_url: url,
      prompt: finalPrompt,
      preset_id: presetId || null,
      mode,
      fal_request_id: requestId || null,
    }).then(({ error }) => {
      if (error) console.warn('[qron/generate] Supabase insert warning:', error.message)
    })

    // ── Register provenance with AuthiChain ───────────────────────────────────
    let registrationId: string | null = null
    const authichainUrl = process.env.AUTHICHAIN_API_URL
    if (authichainUrl) {
      try {
        const regRes = await fetch(`${authichainUrl}/api/qron-register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.AUTHICHAIN_API_SECRET || '',
          },
          body: JSON.stringify({
            user_id: session.user.id,
            asset_url: imageUrl,
            destination_url: url,
            prompt: finalPrompt,
            preset_id: presetId,
            mode,
            fal_request_id: requestId,
          }),
          signal: AbortSignal.timeout(5000),
        })
        if (regRes.ok) {
          const regData = await regRes.json() as { id?: string }
          registrationId = regData.id || null
        }
      } catch (err) {
        console.warn('[qron/generate] Provenance registration failed (non-fatal):', err)
      }
    }

    // ── Response ──────────────────────────────────────────────────────────────
    return NextResponse.json({
      imageUrl,
      qrDataUrl: imageUrl,
      prompt: finalPrompt,
      url,
      qron: {
        id: qronId,
        imageUrl,
        destinationUrl: url,
        prompt: finalPrompt,
        mode,
        registration_id: registrationId,
        createdAt: new Date().toISOString(),
      },
      remaining_credits: creditResult.remaining,
    })
  } catch (err: unknown) {
    console.error('[qron/generate] Error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', model: 'fal-ai/illusion-diffusion', pipeline: 'direct' })
}
