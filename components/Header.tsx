'use client';

import Link from 'next/link';
import { Github, Twitter, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [userTier, setUserTier] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('tier')
          .eq('user_id', authUser.id)
          .single();
        if (profile) setUserTier(profile.tier);
      } else {
        setUserTier(null);
      }
    };
    getUserAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from('profiles').select('tier').eq('user_id', session.user.id).single()
          .then(({ data: profile }) => { if (profile) setUserTier(profile.tier); });
      } else {
        setUserTier(null);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="border-b border-[rgba(201,162,39,0.15)] bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-[#a07d10] flex items-center justify-center"
               style={{ boxShadow: '0 0 16px rgba(201,162,39,0.35)' }}>
            <span className="text-black font-black text-sm">Q</span>
          </div>
          <span className="text-xl font-bold" style={{ color: '#ffd700' }}>QRON</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.25)' }}>
            BETA
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/gallery" className="text-sm transition-colors hover:text-[#e8c547]"
                style={{ color: '#9e9e9e' }}>Gallery</Link>
          <Link href="/pricing" className="text-sm transition-colors hover:text-[#e8c547]"
                style={{ color: '#9e9e9e' }}>Pricing</Link>
          <Link href="/demo" className="text-sm font-semibold transition-colors flex items-center gap-1"
                style={{ color: '#c9a227' }}>
            <Sparkles className="w-3.5 h-3.5" />
            Demos
          </Link>
          <Link href="/targeted" className="text-sm transition-colors hover:text-[#e8c547] flex items-center gap-1"
                style={{ color: '#9e9e9e' }}>
            🎯 Targeted
          </Link>
          <Link href="/docs" className="text-sm transition-colors hover:text-[#e8c547]"
                style={{ color: '#9e9e9e' }}>Docs</Link>
          {user && (
            <Link href="/dashboard" className="text-sm transition-colors hover:text-[#e8c547]"
                  style={{ color: '#9e9e9e' }}>Dashboard</Link>
          )}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {userTier && userTier !== 'free' && (
                <span className="hidden sm:inline text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide"
                      style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.25)' }}>
                  {userTier}
                </span>
              )}
              <button onClick={handleLogout}
                      className="text-sm transition-colors hover:text-[#e8c547]"
                      style={{ color: '#9e9e9e' }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm transition-colors hover:text-[#e8c547]"
                    style={{ color: '#9e9e9e' }}>Login</Link>
              <Link href="/login"
                    className="btn-gold px-5 py-2 rounded-lg text-sm font-bold">
                Get Started
              </Link>
            </>
          )}
          <a href="https://github.com/authichain2026/qron-app" target="_blank" rel="noreferrer"
             className="transition-colors hover:text-[#e8c547]" style={{ color: '#6b6b6b' }}>
            <Github className="w-4 h-4" />
          </a>
          <a href="https://twitter.com/authichain" target="_blank" rel="noreferrer"
             className="transition-colors hover:text-[#e8c547]" style={{ color: '#6b6b6b' }}>
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
