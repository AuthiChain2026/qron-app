-- ─────────────────────────────────────────────────────────────────────────────
-- add_generation_credits(user_uuid, amount)
--
-- Called by /api/webhook after a successful Stripe checkout to grant purchased
-- generation credits to a user's profile without overwriting their existing balance.
--
-- For unlimited plans (credits >= 999999) the webhook sets generations_limit
-- directly via UPDATE — this RPC is only used for finite credit packs.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.add_generation_credits(user_uuid UUID, amount INT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET
    generations_limit = generations_limit + amount,
    updated_at        = NOW()
  WHERE id = user_uuid;

  -- If no row exists yet (race condition: user bought before profile trigger ran)
  IF NOT FOUND THEN
    INSERT INTO profiles (id, generations_limit, tier, updated_at)
    VALUES (user_uuid, amount, 'pro', NOW())
    ON CONFLICT (id) DO UPDATE
      SET generations_limit = profiles.generations_limit + amount,
          updated_at        = NOW();
  END IF;
END;
$$;

-- Grant execute to service role (webhook uses service role key)
GRANT EXECUTE ON FUNCTION public.add_generation_credits(UUID, INT) TO service_role;
