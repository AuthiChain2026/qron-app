import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { deductCredit } from '@/lib/business-tier'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

const CF_WORKER_URL = process.env.QRON_WORKER_URL || 'https://qron-ai-api.undone-k.workers.dev'

const PRESET_PROMPTS: Record<string, string> = {
  'static-portal':    'Clean black-and-gold geometry, AuthiChain Protocol seal at center, elegant minimal design',
  'chromatic-portal': 'Full-spectrum AI art woven around QR matrix, maximum visual impact, vibrant colors',
  'cybernetic-bloom': 'Circuit-board aesthetics, neon traces, organic glow, futuristic alive design',
  'dark-matter':      'Void-black deep space with gravitational light distortion, cosmic energy',
  'neon-drift':       'Synthwave neon gradients, retro-futurist night drive energy, glowing lines',
  'holographic-seal': 'Rainbow prismatic shimmer, premium foil-effect authentication mark, holographic',
  'living-archive':   'Biomorphic self-similar fractal forms, organic intelligence encoded',
  'dimensional-gate': 'AR-depth layering with shadow and parallax, spatial anchor for physical media',
  'neon-matrix':      'Glowing grid of pulsating neon lines with matrix-like streams of energy',
  'galactic':         'Cosmic starfields and swirling galaxies, particles orbiting a living QRON',
  'liquid-metal':     'Flowing metallic fluid forms and shimmering reflections that pulse with light',
  'nature-elements':  'Organic elemental motifs of leaves vines water and fire swirling around',
}

interface GenerateBody {
  url?: string
  prompt?: string
  mode?: string
  presetId?: string
}

export async function POST(request: Request) {
  try {
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

    // ── Resolve prompt ────────────────────────────────────────────────────────
    let finalPrompt = prompt || ''
    const presetPrompt = presetId ? PRESET_PROMPTS[presetId] : null

    if (presetId && !presetPrompt) {
      try {
        const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
        const { data: dbPreset } = await admin.from('qron_presets').select('prompt').eq('id', presetId).single()
        if (dbPreset?.prompt) finalPrompt = prompt ? `${prompt}, ${dbPreset.prompt}` : dbPreset.prompt
      } catch { /* ignore */ }
    } else if (presetPrompt) {
      finalPrompt = prompt ? `${prompt}, ${presetPrompt}` : presetPrompt
    }

    if (!finalPrompt) return NextResponse.json({ error: 'A prompt or preset is required' }, { status: 400 })

    // ── Generate via QRON CF Worker (HuggingFace backend) ────────────────────
    const workerRes = await fetch(`${CF_WORKER_URL}/v1/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, prompt: finalPrompt, style: 'space' }),
      signal: AbortSignal.timeout(110_000),
    })

    if (!workerRes.ok) {
      const errText = await workerRes.text()
      console.error('[qron/generate] Worker error:', workerRes.status, errText)
      if (workerRes.status === 503) return NextResponse.json({ error: 'Generation service warming up — retry in 30s', code: 'WARMING_UP' }, { status: 503 })
      return NextResponse.json({ error: 'AI generation failed' }, { status: 502 })
    }

    const workerData = await workerRes.json() as { id?: string; previewUrl?: string; downloadUrl?: string }
    const imageUrl = workerData.downloadUrl || workerData.previewUrl || ''
    if (!imageUrl) return NextResponse.json({ error: 'No image returned' }, { status: 502 })

    // ── Persist to Supabase ───────────────────────────────────────────────────
    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const qronId = crypto.randomUUID()
    await admin.from('qron_generations').insert({
      id: qronId, user_id: session.user.id,
      image_url: imageUrl, destination_url: url,
      prompt: finalPrompt, preset_id: presetId || null,
      mode, provider: 'huggingface',
    }).then(({ error }) => { if (error) console.warn('[qron/generate] DB warning:', error.message) })

    // ── Provenance registration ───────────────────────────────────────────────
    let registrationId: string | null = null
    const authichainUrl = process.env.AUTHICHAIN_API_URL
    if (authichainUrl) {
      try {
        const regRes = await fetch(`${authichainUrl}/api/qron-register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.AUTHICHAIN_API_SECRET || '' },
          body: JSON.stringify({ user_id: session.user.id, asset_url: imageUrl, destination_url: url, prompt: finalPrompt, preset_id: presetId, mode }),
          signal: AbortSignal.timeout(5000),
        })
        if (regRes.ok) registrationId = ((await regRes.json()) as { id?: string }).id || null
      } catch (err) { console.warn('[qron/generate] Provenance non-fatal:', err) }
    }

    return NextResponse.json({
      imageUrl, qrDataUrl: imageUrl, prompt: finalPrompt, url,
      qron: { id: qronId, imageUrl, destinationUrl: url, prompt: finalPrompt, mode, registration_id: registrationId, createdAt: new Date().toISOString() },
      remaining_credits: creditResult.remaining,
    })
  } catch (err: unknown) {
    console.error('[qron/generate] Error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', model: 'DionTimmer/controlnet_qrcode-control_v1p_sd15', pipeline: 'huggingface', worker: CF_WORKER_URL })
}
