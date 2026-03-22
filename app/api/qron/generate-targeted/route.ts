/**
 * POST /api/qron/generate-targeted
 *
 * Generate a personalized QRON — an AI artwork fused with a scannable QR code —
 * targeting a specific person, business, or logo.
 *
 * Examples from the user-facing demo images:
 *   • Cyberpunk character portrait merged into QR modules
 *   • Watercolor leopard face blended with QR pattern
 *   • Miniature tilt-shift city built from QR blocks
 *
 * Body (JSON):
 *   url              – URL the QR code encodes (required)
 *   subject          – Who/what to target: person name, brand, "leopard face", etc. (required)
 *   style            – Art style preset key OR free-form style text (default: 'portrait')
 *   referenceImageUrl– Optional: URL of a logo/photo to use as image reference
 *   mode             – 'standard' | 'premium' | 'enterprise' (default: 'standard')
 *
 * Returns:
 *   { imageUrl, qrDataUrl, prompt, subject, style, url }
 */

import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Style presets ─────────────────────────────────────────────────────────────
// Each preset maps to a rich prompt suffix that guides illusion-diffusion
// toward the aesthetic shown in the example QRON images.
const STYLE_PRESETS: Record<string, string> = {
  // Cyberpunk character (neon cityscape, glitch art)
  cyberpunk:
    'cyberpunk aesthetic, neon lights, glitch art, futuristic cityscape, ' +
    'electric blue and magenta hues, dark atmosphere, high contrast, ultra-detailed',

  // Watercolor wildlife portrait (soft brush strokes, vibrant splashes)
  watercolor:
    'watercolor painting, soft brush strokes, vibrant color splashes, ' +
    'artistic portrait, pastel tones with bold accents, fine art style, studio lighting',

  // Tilt-shift miniature city (isometric, tiny world)
  miniature:
    'tilt-shift photography, miniature architecture, tiny world, isometric city, ' +
    'detailed micro-scale buildings, vivid saturation, bokeh depth-of-field',

  // Luxury brand / logo seal
  luxury:
    'luxury brand aesthetic, golden embossed seal, holographic foil, ' +
    'premium product photography, deep blacks and gold tones, high-end editorial',

  // Graffiti / street art mural
  graffiti:
    'street art mural, graffiti style, spray paint texture, bold outlines, ' +
    'urban wall art, vibrant colors, drip effects, tags and lettering accents',

  // Retro anime / manga
  anime:
    'anime art style, cel shading, vivid colors, manga panel composition, ' +
    'expressive character design, clean line art, Japanese illustration aesthetic',

  // Oil painting portrait
  portrait:
    'classical oil painting portrait, rich textures, dramatic chiaroscuro lighting, ' +
    'detailed brushwork, museum-quality fine art, warm Renaissance color palette',

  // Abstract geometric
  geometric:
    'abstract geometric art, bold shapes, primary color palette, ' +
    'Bauhaus-inspired composition, sharp edges, flat design with depth illusion',

  // Nature / botanical
  nature:
    'botanical illustration, lush jungle foliage, tropical flowers, ' +
    'detailed nature photography, vibrant greens and warm sunlight, macro detail',
}

const MODE_STEPS: Record<string, number> = {
  standard: 30,
  premium: 50,
  enterprise: 75,
}

// ── Build the illusion-diffusion prompt ───────────────────────────────────────
function buildPrompt(subject: string, styleKey: string, customStyle?: string): string {
  const styleDesc = customStyle
    ? customStyle.trim()
    : (STYLE_PRESETS[styleKey] ?? STYLE_PRESETS.portrait)

  return [
    `${subject.trim()},`,
    styleDesc + ',',
    'seamlessly integrated into a scannable QR code pattern,',
    'the QR modules form the structure of the artwork,',
    'highly detailed, photorealistic where appropriate,',
    'the QR code is clearly readable and scannable,',
    'award-winning digital art',
  ].join(' ')
}

export async function POST(req: NextRequest) {
  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── Input ─────────────────────────────────────────────────────────────────
    const body = await req.json()
    const {
      url,
      subject,
      style = 'portrait',
      referenceImageUrl,
      mode = 'standard',
    } = body

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json({ error: 'A valid URL is required' }, { status: 400 })
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'A subject is required (person name, brand, or description)' },
        { status: 400 },
      )
    }

    const falKey = process.env.FAL_KEY
    if (!falKey) {
      return NextResponse.json({ error: 'AI generation not configured' }, { status: 503 })
    }

    fal.config({ credentials: falKey })

    // ── Generate base QR code ─────────────────────────────────────────────────
    const QRCode = (await import('qrcode')).default
    const qrDataUrl: string = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H', // High — allows up to 30% data restoration (needed for illusion overlay)
      width: 1024,
      margin: 2,
    })

    // ── Build creative prompt ─────────────────────────────────────────────────
    // Detect if `style` is a preset key or free-form text
    const isPresetKey = style in STYLE_PRESETS
    const prompt = isPresetKey
      ? buildPrompt(subject, style)
      : buildPrompt(subject, 'portrait', style)

    // ── Call Fal.ai illusion-diffusion ────────────────────────────────────────
    // illusion-diffusion: ControlNet-based model that hides artwork inside QR code patterns
    // https://fal.ai/models/fal-ai/illusion-diffusion
    const steps = MODE_STEPS[mode] ?? MODE_STEPS.standard

    const falInput: Record<string, unknown> = {
      prompt,
      image_url: qrDataUrl,          // base QR code (B&W, high error correction)
      qr_code_content: url,           // content encoded in the QR
      guidance_scale: 8.5,            // how closely to follow the prompt
      num_inference_steps: steps,
      strength: 0.85,                 // higher = more artistic, lower = more QR-visible
      controlnet_conditioning_scale: 1.4, // balance between QR structure and art
    }

    // If a reference image is provided (logo or photo), pass it for image-guided generation
    // fal-ai/illusion-diffusion accepts an optional `image_url` for img2img conditioning
    if (referenceImageUrl && typeof referenceImageUrl === 'string') {
      // Use the reference as the conditioning image instead of bare QR
      // and supply the raw QR as qr_code_content for ControlNet guidance
      falInput.image_url = referenceImageUrl
      falInput.qr_code_content = url
      // Reduce strength slightly to preserve reference image identity
      falInput.strength = 0.75
      falInput.controlnet_conditioning_scale = 1.6
    }

    const falResult = await fal.subscribe('fal-ai/illusion-diffusion', {
      input: falInput,
    })

    const falData = falResult.data as Record<string, any>
    const imageUrl: string | undefined = falData?.image?.url || falData?.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned from AI service' }, { status: 502 })
    }

    // ── Log generation ────────────────────────────────────────────────────────
    await supabase
      .from('qron_generations')
      .insert({
        user_id: user.id,
        url,
        prompt,
        mode,
        image_url: imageUrl,
        generated_at: new Date().toISOString(),
        // Extra targeted-generation metadata
        subject: subject.trim(),
        style: isPresetKey ? style : 'custom',
      })
      .throwOnError()
      .catch((err: unknown) => {
        console.warn('[qron/generate-targeted] Non-fatal: failed to log generation', err)
      })

    return NextResponse.json({
      imageUrl,
      qrDataUrl,
      prompt,
      subject: subject.trim(),
      style: isPresetKey ? style : 'custom',
      url,
      availableStyles: Object.keys(STYLE_PRESETS),
    })
  } catch (err: any) {
    console.error('[qron/generate-targeted] Error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 },
    )
  }
}

// ── GET — return available style presets ──────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    styles: Object.entries(STYLE_PRESETS).map(([key, description]) => ({
      key,
      description,
    })),
    usage: {
      endpoint: 'POST /api/qron/generate-targeted',
      body: {
        url: 'https://your-brand.com (required)',
        subject: 'Nike, Elon Musk, golden retriever, etc. (required)',
        style: Object.keys(STYLE_PRESETS).join(' | ') + ' | custom free-form text',
        referenceImageUrl: 'https://... (optional — logo or photo for img2img)',
        mode: 'standard | premium | enterprise (default: standard)',
      },
    },
  })
}
