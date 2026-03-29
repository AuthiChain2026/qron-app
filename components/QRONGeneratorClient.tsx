'use client';

import { ModeSelector } from '@/components/ModeSelector';
import { QRGenerator } from '@/components/QRGenerator';
import { QRDisplay } from '@/components/QRDisplay';
import { FeaturedQRONs } from '@/components/FeaturedQRONs';
import { useState, useEffect, useCallback } from 'react';
import { FalaiPreset, GeneratedQRON, QRONMode } from '@/lib/types';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface QRONGeneratorClientProps {
  user: User;
}

export default function QRONGeneratorClient({ user }: QRONGeneratorClientProps) {
  const [mode, setMode] = useState<QRONMode>('static');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQRON, setGeneratedQRON] = useState<GeneratedQRON | null>(null);
  const [presets, setPresets] = useState<FalaiPreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<string>('free');
  const [generationsUsed, setGenerationsUsed] = useState<number>(0);
  const [generationsLimit, setGenerationsLimit] = useState<number>(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchPresets = async () => {
      const response = await fetch('/api/presets');
      const data = await response.json();
      setPresets(data);
      const firstNonPremium = data.find((p: FalaiPreset) => !p.is_premium);
      if (firstNonPremium) {
        setSelectedPresetId(firstNonPremium.id);
      }
    };
    fetchPresets();
  }, []);

  const fetchProfile = useCallback(async () => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('tier, generations_used, generations_limit')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
    } else if (profile) {
      setUserTier(profile.tier);
      setGenerationsUsed(profile.generations_used);
      setGenerationsLimit(profile.generations_limit);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user, fetchProfile]);

  const handleGenerate = (qron: GeneratedQRON) => {
    setGeneratedQRON(qron);
    // Refresh profile to get updated credit count
    fetchProfile();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ModeSelector selectedMode={mode} onModeChange={setMode} userTier={userTier} />
          <QRGenerator
            mode={mode}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            presets={presets}
            selectedPresetId={selectedPresetId}
            setSelectedPresetId={setSelectedPresetId}
            userTier={userTier}
            generationsUsed={generationsUsed}
            generationsLimit={generationsLimit}
          />
        </div>
        <div>
          <QRDisplay qron={generatedQRON} isGenerating={isGenerating} mode={mode} />
        </div>
      </div>

      <div className="mt-16">
        <FeaturedQRONs />
      </div>
    </div>
  );
}
