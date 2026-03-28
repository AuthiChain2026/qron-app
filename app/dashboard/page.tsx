'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Shield, Sparkles, Download, ExternalLink, Target, Lock, Zap, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface QRONEntry {
  id: string;
  image_url: string;
  url: string;
  prompt: string;
  mode: string;
  generated_at: string;
}

interface Profile {
  tier: string;
  generations_used: number;
  generations_limit: number;
}

export default function DashboardPage() {
  const [qrons, setQrons] = useState<QRONEntry[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        window.location.replace('/login');
        return;
      }
      setUser(authUser);

      const [{ data: prof }, { data: gens }] = await Promise.all([
        supabase.from('profiles').select('tier, generations_used, generations_limit').eq('user_id', authUser.id).single(),
        supabase.from('qron_generations').select('id, image_url, url, prompt, mode, generated_at')
          .eq('user_id', authUser.id)
          .order('generated_at', { ascending: false })
          .limit(50),
      ]);

      if (prof) setProfile(prof);
      if (gens) setQrons(gens);
      setLoading(false);
    };
    load();
  }, []);

  const tierLabel = (t: string) => ({ free: 'Free', pro: 'Pro', enterprise: 'Enterprise' }[t] ?? t);

  if (loading) {
    return (
      <div className="min-h-screen protocol-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2"
             style={{ borderColor: 'rgba(201,162,39,0.2)', borderTopColor: '#c9a227' }} />
      </div>
    );
  }

  const usagePct = profile ? Math.min(100, Math.round((profile.generations_used / profile.generations_limit) * 100)) : 0;

  return (
    <div className="min-h-screen protocol-bg text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="protocol-badge">
                <Shield className="w-3 h-3" />
                AuthiChain Protocol
              </span>
            </div>
            <h1 className="text-3xl font-extrabold gold-text">My QRONs</h1>
            <p className="text-sm mt-1" style={{ color: '#6b6b6b' }}>{user?.email}</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link href="/" className="btn-gold px-5 py-2.5 rounded-xl flex items-center gap-2 no-underline text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              Generate
            </Link>
            <Link href="/targeted" className="btn-outline-gold px-5 py-2.5 rounded-xl flex items-center gap-2 no-underline text-sm">
              <Target className="w-4 h-4" />
              Targeted
            </Link>
          </div>
        </div>

        {/* ── Stats strip ───────────────────────────────────────────────── */}
        {profile && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="protocol-card p-5">
              <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>Plan</div>
              <div className="text-xl font-bold gold-text">{tierLabel(profile.tier)}</div>
              {profile.tier === 'free' && (
                <Link href="/#pricing" className="text-xs mt-1 block" style={{ color: '#c9a227' }}>Upgrade →</Link>
              )}
            </div>
            <div className="protocol-card p-5">
              <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>Generations</div>
              <div className="text-xl font-bold" style={{ color: usagePct >= 90 ? '#ff6b6b' : '#e8c547' }}>
                {profile.generations_used} / {profile.generations_limit >= 999999 ? '∞' : profile.generations_limit}
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all"
                     style={{ width: `${profile.generations_limit >= 999999 ? 20 : usagePct}%`, background: usagePct >= 90 ? '#ff4444' : '#c9a227' }} />
              </div>
            </div>
            <div className="protocol-card p-5">
              <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>Total QRONs</div>
              <div className="text-xl font-bold" style={{ color: '#e8c547' }}>{qrons.length}</div>
              <div className="text-xs mt-1" style={{ color: '#3a3a3a' }}>in this session</div>
            </div>
          </div>
        )}

        <div className="gold-divider mb-10" />

        {/* ── Gallery ───────────────────────────────────────────────────── */}
        {qrons.length === 0 ? (
          <div className="protocol-card p-14 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#2a2a2a' }} />
            <p className="text-lg font-bold mb-2" style={{ color: '#4a4a4a' }}>No QRONs yet</p>
            <p className="text-sm mb-6" style={{ color: '#3a3a3a' }}>Generate your first cryptographically-signed QR artwork.</p>
            <Link href="/" className="btn-gold px-8 py-3 rounded-xl inline-flex items-center gap-2 no-underline font-bold">
              <Sparkles className="w-4 h-4" />
              Create First QRON
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {qrons.map((q) => (
              <div key={q.id} className="protocol-card overflow-hidden group">
                {/* Image */}
                <div className="relative aspect-square bg-black">
                  <Image
                    src={q.image_url}
                    alt={q.prompt || 'QRON'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                       style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <a href={q.image_url} download={`qron-${q.id}.png`} target="_blank" rel="noreferrer"
                       className="p-2 rounded-lg" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)' }}>
                      <Download className="w-4 h-4" style={{ color: '#c9a227' }} />
                    </a>
                    <a href={q.url} target="_blank" rel="noreferrer"
                       className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-3">
                  <p className="text-xs truncate mb-0.5" style={{ color: '#9e9e9e' }}>
                    {q.prompt || 'No prompt'}
                  </p>
                  <p className="text-xs truncate" style={{ color: '#3a3a3a' }}>
                    {new URL(q.url).hostname}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.2)' }}>
                      {q.mode}
                    </span>
                    <span className="text-xs" style={{ color: '#2a2a2a' }}>
                      {new Date(q.generated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Upgrade CTA (free users) ──────────────────────────────────── */}
        {profile?.tier === 'free' && (
          <>
            <div className="gold-divider my-10" />
            <div className="protocol-card p-8 text-center"
                 style={{ background: 'linear-gradient(135deg, #0d0d00 0%, #0a0a0a 100%)' }}>
              <div className="protocol-badge mb-4 inline-flex">
                <Zap className="w-3 h-3" />
                Upgrade Your Plan
              </div>
              <h2 className="text-2xl font-bold mb-2 gold-text">Need more generations?</h2>
              <p className="text-sm mb-6" style={{ color: '#6b6b6b' }}>
                Pro plan gives you 100 credits. Enterprise gets unlimited.
              </p>
              <Link href="/#pricing" className="btn-gold px-8 py-3 rounded-xl inline-flex items-center gap-2 no-underline font-bold">
                <Lock className="w-4 h-4" />
                Upgrade Now →
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
