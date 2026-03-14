'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabase = hasSupabaseEnv ? createClient() : null;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Authentication is temporarily unavailable.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
      <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-10 border border-purple-500/30 shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Sign in to QRON</h1>
          <p className="text-purple-300 mt-2">We&apos;ll send a magic link to your email.</p>
        </div>

        {sent ? (
          <div className="text-center text-green-300 bg-green-900/30 border border-green-500/40 rounded-lg p-6">
            <p className="font-semibold text-lg">Check your inbox!</p>
            <p className="text-sm mt-2 text-green-200">A sign-in link was sent to <strong>{email}</strong>.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !supabase}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Sending…' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
