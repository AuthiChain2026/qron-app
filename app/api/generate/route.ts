import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { MODES } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export const maxDuration = 60;
const REPLICATE_VERSION = '628e604e13cf63d8ec58bd4d238474e8986b054bc5e1326e50995fdbc851c557';

const isTierSufficient = (userTier: string, requiredTier: string) => {
  if (requiredTier === 'free') return true;
  if (requiredTier === 'pro' && (userTier === 'pro' || userTier === 'enterprise')) return true;
  if (requiredTier === 'enterprise' && userTier === 'enterprise') return true;
  return false;
};

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ message: 'Supabase is not configured.' }, { status: 500 });
    }
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json({ message: 'Image generation is not configured.' }, { status: 500 });
    }
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });

    const { data: profile, error: profileError } = await supabase
      .from('profiles').select('tier, generations_used, generations_limit')
      .eq('user_id', user.id).single();
    if (profileError || !profile) return NextResponse.json({ message: 'Could not fetch user profile.' }, { status: 500 });

    let body: { targetUrl?: string; prompt?: string; mode?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
    }

    const { targetUrl, prompt: userPrompt, mode } = body;
    if (!targetUrl) return NextResponse.json({ message: 'Destination URL is required.' }, { status: 400 });
    if (!userPrompt) return NextResponse.json({ message: 'A creative prompt is required.' }, { status: 400 });

    if (profile.tier !== 'enterprise' && profile.generations_used >= profile.generations_limit) {
      return NextResponse.json({ message: `Generation limit reached (${profile.generations_used}/${profile.generations_limit}). Please upgrade.` }, { status: 403 });
    }

    const selectedMode = MODES.find(m => m.id === mode);
    if (!selectedMode) return NextResponse.json({ message: 'Invalid mode.' }, { status: 400 });
    if (!isTierSufficient(profile.tier, selectedMode.tier)) {
      return NextResponse.json({ message: `Upgrade to ${selectedMode.tier.toUpperCase()} to use the ${selectedMode.name} mode.` }, { status: 403 });
    }

    const replicateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=55',
      },
      body: JSON.stringify({
        version: REPLICATE_VERSION,
        input: {
          url: targetUrl,
          prompt: userPrompt,
          negative_prompt: 'ugly, disfigured, low quality, blurry, distorted, nsfw',
          guidance_scale: 9,
          image_resolution: 768,
          num_inference_steps: 30,
          num_outputs: 1,
          scheduler: 'DDIM',
        },
      }),
    });

    const prediction = await replicateRes.json();
    if (!replicateRes.ok || prediction.error) throw new Error(prediction.error ?? 'Replicate prediction failed.');
    if (prediction.status !== 'succeeded') {
      return NextResponse.json({ pending: true, predictionId: prediction.id, pollUrl: prediction.urls?.get });
    }

    const imageUrl = prediction.output?.[0];
    if (!imageUrl) throw new Error('No image returned.');

    const qronId = uuidv4();
    const { error: dbError } = await supabase.from('qrons').insert({
      id: qronId, user_id: user.id, mode: mode ?? 'standard',
      target_url: targetUrl, image_url: imageUrl, prompt: userPrompt,
      style: 'monster-labs-qr-controlnet',
    });
    if (dbError) return NextResponse.json({ message: 'Failed to save QRON.' }, { status: 500 });

    await supabase.rpc('increment_generation_count', { user_uuid: user.id });
    return NextResponse.json({ qron: { id: qronId, imageUrl, destinationUrl: targetUrl, prompt: userPrompt } });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', model: 'monster-labs/control_v1p_sd15_qrcode_monster' });
}
