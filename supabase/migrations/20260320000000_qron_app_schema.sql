-- ─────────────────────────────────────────────────────────────────────────────
-- QRON App — core tables missing from initial schema
-- Run after: 20260306165900_initial_schema.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ── profiles ────────────────────────────────────────────────────────────────
-- One row per auth.users record; tracks subscription tier and generation quota.

CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT,
  tier            TEXT NOT NULL DEFAULT 'free'
                    CHECK (tier IN ('free', 'pro', 'enterprise')),
  generations_used    INT  NOT NULL DEFAULT 0,
  generations_limit   INT  NOT NULL DEFAULT 10,
  stripe_customer_id  TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(tier);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Increment generation count (called by /api/generate after a successful gen)
CREATE OR REPLACE FUNCTION public.increment_generation_count(user_uuid UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE profiles
  SET generations_used = generations_used + 1,
      updated_at       = NOW()
  WHERE id = user_uuid;
END;
$$;

-- ── qrons ─────────────────────────────────────────────────────────────────────
-- Each AI-generated QR code created via /api/generate or /api/qron/generate.

CREATE TABLE IF NOT EXISTS qrons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mode            TEXT NOT NULL DEFAULT 'standard',
  target_url      TEXT NOT NULL,
  image_url       TEXT NOT NULL,
  prompt          TEXT,
  style           TEXT,
  destination_url TEXT GENERATED ALWAYS AS (target_url) STORED,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qrons_user_id   ON qrons(user_id);
CREATE INDEX IF NOT EXISTS idx_qrons_created_at ON qrons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qrons_mode       ON qrons(mode);

CREATE TRIGGER update_qrons_updated_at
  BEFORE UPDATE ON qrons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── qron_generations ─────────────────────────────────────────────────────────
-- Append-only generation log used by /api/qron/generate (fal.ai path).
-- Kept separate from qrons so the two generate APIs don't conflict.

CREATE TABLE IF NOT EXISTS qron_generations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  url        TEXT,
  prompt     TEXT,
  mode       TEXT,
  image_url  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qron_generations_user_id    ON qron_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_qron_generations_created_at ON qron_generations(created_at DESC);

-- ── qron_deliveries ──────────────────────────────────────────────────────────
-- Tracks Stripe checkout sessions where we emailed the customer their QR code.

CREATE TABLE IF NOT EXISTS qron_deliveries (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email    TEXT,
  image_url         TEXT,
  qr_url            TEXT,
  prompt            TEXT,
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qron_deliveries_session  ON qron_deliveries(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_qron_deliveries_email    ON qron_deliveries(customer_email);

-- ── qron_nft_mints ───────────────────────────────────────────────────────────
-- On-chain mint receipts written by /api/qron/mint-nft.

CREATE TABLE IF NOT EXISTS qron_nft_mints (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qron_id          TEXT,
  recipient        TEXT NOT NULL,
  image_url        TEXT,
  destination_url  TEXT,
  tx_hash          TEXT NOT NULL,
  chain            TEXT,
  contract_address TEXT,
  minted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qron_nft_mints_recipient ON qron_nft_mints(recipient);
CREATE INDEX IF NOT EXISTS idx_qron_nft_mints_tx_hash   ON qron_nft_mints(tx_hash);
CREATE INDEX IF NOT EXISTS idx_qron_nft_mints_qron_id   ON qron_nft_mints(qron_id);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE qrons           ENABLE ROW LEVEL SECURITY;
ALTER TABLE qron_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE qron_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE qron_nft_mints  ENABLE ROW LEVEL SECURITY;

-- profiles: users can only read/update their own row
CREATE POLICY "profiles: owner read"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: owner update"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- qrons: users own their rows
CREATE POLICY "qrons: owner read"
  ON qrons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "qrons: owner insert"
  ON qrons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "qrons: owner delete"
  ON qrons FOR DELETE USING (auth.uid() = user_id);

-- qron_generations: users see their own
CREATE POLICY "qron_generations: owner read"
  ON qron_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "qron_generations: owner insert"
  ON qron_generations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- qron_deliveries: service role only (written by Stripe webhook, no user RLS)
-- no SELECT/INSERT policies → accessible only via service role key

-- qron_nft_mints: readable by recipient (wallet address match is not auth-based,
-- so we expose it only via service role; users can query through the app API)
-- no user-facing RLS policies → service role only
