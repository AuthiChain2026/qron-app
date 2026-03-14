import { NextResponse } from 'next/server';
import { FalaiPreset } from '@/lib/types';

export const runtime = 'edge';

export async function GET() {
  const presets: FalaiPreset[] = [
    { id: 'static-portal',      name: 'Static Portal',      description: 'Clean black-and-gold geometry. AuthiChain Protocol seal at center.', is_premium: false, tier: 'free' },
    { id: 'chromatic-portal',   name: 'Chromatic Portal',   description: 'Full-spectrum AI art woven around the QR matrix. Maximum visual impact.', is_premium: false, tier: 'free' },
    { id: 'cybernetic-bloom',   name: 'Cybernetic Bloom',   description: 'Circuit-board aesthetics, neon traces, organic glow. Futuristic and alive.', is_premium: true, tier: 'pro' },
    { id: 'dark-matter',        name: 'Dark Matter',        description: 'Void-black deep space with gravitational light distortion.', is_premium: true, tier: 'pro' },
    { id: 'neon-drift',         name: 'Neon Drift',         description: 'Synthwave neon gradients. Retro-futurist night drive energy.', is_premium: true, tier: 'pro' },
    { id: 'holographic-seal',   name: 'Holographic Seal',   description: 'Rainbow prismatic shimmer. Premium foil-effect authentication mark.', is_premium: true, tier: 'pro' },
    { id: 'living-archive',     name: 'Living Archive',     description: 'Biomorphic, self-similar fractal forms. Organic intelligence encoded.', is_premium: true, tier: 'enterprise' },
    { id: 'dimensional-gate',   name: 'Dimensional Gate',   description: 'AR-depth layering with shadow and parallax. Spatial anchor for physical media.', is_premium: true, tier: 'enterprise' },
    // New animated QRON styles
    { id: 'neon-matrix',        name: 'Neon Matrix',        description: 'Glowing grid of pulsating neon lines with matrix-like streams of energy.', is_premium: true, tier: 'pro' },
    { id: 'galactic',           name: 'Galactic',           description: 'Cosmic starfields and swirling galaxies — particles orbiting a living QRON.', is_premium: true, tier: 'pro' },
    { id: 'liquid-metal',       name: 'Liquid Metal',       description: 'Flowing metallic fluid forms and shimmering reflections that pulse with light.', is_premium: true, tier: 'pro' },
    { id: 'nature-elements',    name: 'Nature Elements',    description: 'Organic elemental motifs of leaves, vines, water and fire swirling around.', is_premium: true, tier: 'enterprise' },
  ];

  return NextResponse.json(presets);
}
