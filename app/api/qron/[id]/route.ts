/**
 * QRON Owner Control — /api/qron/[id]
 *
 * PATCH  – Update the destination URL and/or story mode settings for an owned QRON
 * GET    – Fetch QRON details (public for scanning, full details for owner)
 *
 * The QR code image itself never changes — the URL it redirects to does.
 * This enables dynamic QR codes: scan the same physical QRON, get any URL you set.
 *
 * Ownership is verified via Supabase auth (user_id must match).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// ── GET — public QRON data (used by scanner redirect + owner dashboard) ────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getServiceClient()
    const { id } = await params
  
    const { data: qron, error } = await supabase
      .from('qron_generations')
      .select('id, url, image_url, prompt, mode, subject, style, story_enabled, story_content, generated_at, user_id')
      .eq('id', id)
      .single()
  
    if (error || !qron) {
      return NextResponse.json({ error: 'QRON not found' }, { status: 404 })
    }
  
    // For public scan: only return non-sensitive fields
    const isOwnerRequest = req.headers.get('authorization')
    if (!isOwnerRequest) {
      return NextResponse.json({
        id: qron.id,
        url: qron.url,
        image_url: qron.image_url,
        story_enabled: qron.story_enabled,
        story_content: qron.story_content,
      })
    }
  
    return NextResponse.json(qron)
  } catch (err: any) {
    console.error('[GET] error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}

// ── PATCH — owner updates URL and/or story mode settings ─────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Auth
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
    const supabase = getServiceClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
    const { id } = await params
  
    // Verify ownership
    const { data: qron, error: fetchError } = await supabase
      .from('qron_generations')
      .select('id, user_id, url, story_enabled')
      .eq('id', id)
      .single()
  
    if (fetchError || !qron) {
      return NextResponse.json({ error: 'QRON not found' }, { status: 404 })
    }
    if (qron.user_id !== user.id) {
      return NextResponse.json({ error: 'You do not own this QRON' }, { status: 403 })
    }
  
    // Parse update fields
    const body = await req.json().catch(() => ({}))
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  
    // ── Dynamic URL update ──────────────────────────────────────────────────────
    if (body.url !== undefined) {
      if (typeof body.url !== 'string' || !body.url.startsWith('http')) {
        return NextResponse.json({ error: 'url must be a valid http/https URL' }, { status: 400 })
      }
      updates.url = body.url
    }
  
    // ── Story mode toggle ───────────────────────────────────────────────────────
    // story_enabled requires the user to have purchased Story Mode upgrade
    if (body.story_enabled !== undefined) {
      // Check if user has story mode entitlement
      const { data: profile } = await supabase
        .from('profiles')
        .select('story_mode_enabled, tier')
        .eq('id', user.id)
        .single()
  
      const hasStoryMode =
        profile?.story_mode_enabled ||
        profile?.tier === 'enterprise'
  
      if (body.story_enabled && !hasStoryMode) {
        return NextResponse.json(
          {
            error: 'Story Mode requires the AI Story Mode upgrade',
            upgradeUrl: '/api/checkout/story-mode',
          },
          { status: 402 },
        )
      }
      updates.story_enabled = Boolean(body.story_enabled)
    }
  
    // ── Story content update ────────────────────────────────────────────────────
    if (body.story_content !== undefined) {
      // story_content is a JSON blob: { title, tagline, cta, theme, scenes }
      updates.story_content = body.story_content
    }
  
    // ── Custom title / description ─────────────────────────────────────────────
    if (body.title !== undefined)       updates.title = String(body.title).slice(0, 120)
    if (body.description !== undefined) updates.description = String(body.description).slice(0, 500)
  
    const { data: updated, error: updateError } = await supabase
      .from('qron_generations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  
    if (updateError) {
      console.error('[qron/[id]] Update error:', updateError)
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }
  
    return NextResponse.json({ success: true, qron: updated })
  } catch (err: any) {
    console.error('[PATCH] error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
