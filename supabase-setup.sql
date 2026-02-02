-- ============================================
-- PUEBLO BONITO REFERRAL PLATFORM - DATABASE SETUP
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. OWNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_destination TEXT CHECK (preferred_destination IN ('Los Cabos', 'Mazatlán')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  total_rewards_earned DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_owners_user_id ON public.owners(user_id);
CREATE INDEX IF NOT EXISTS idx_owners_email ON public.owners(email);
CREATE INDEX IF NOT EXISTS idx_owners_status ON public.owners(status);

-- ============================================
-- 2. REFERRALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE NOT NULL,
  guest_first_name TEXT NOT NULL,
  guest_last_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  destination TEXT NOT NULL CHECK (destination IN ('Los Cabos', 'Mazatlán')),
  preferred_dates TEXT,
  number_of_guests INTEGER DEFAULT 2,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for referrals
CREATE INDEX IF NOT EXISTS idx_referrals_owner_id ON public.referrals(owner_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_destination ON public.referrals(destination);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals(created_at DESC);

-- ============================================
-- 3. OPPORTUNITIES TABLE (For internal team)
-- ============================================
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referral_id UUID REFERENCES public.referrals(id) ON DELETE CASCADE NOT NULL,
  assigned_to TEXT, -- email of team member
  pipeline_stage TEXT DEFAULT 'new' CHECK (pipeline_stage IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_value DECIMAL(10, 2),
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  last_contact_date TIMESTAMPTZ,
  next_follow_up TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for opportunities
CREATE INDEX IF NOT EXISTS idx_opportunities_referral_id ON public.opportunities(referral_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_assigned_to ON public.opportunities(assigned_to);
CREATE INDEX IF NOT EXISTS idx_opportunities_pipeline_stage ON public.opportunities(pipeline_stage);

-- ============================================
-- 4. REWARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE NOT NULL,
  referral_id UUID REFERENCES public.referrals(id) ON DELETE SET NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('fnb_bonus', 'commission', 'special_bonus')),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD' CHECK (currency IN ('USD', 'MXN')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  description TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for rewards
CREATE INDEX IF NOT EXISTS idx_rewards_owner_id ON public.rewards(owner_id);
CREATE INDEX IF NOT EXISTS idx_rewards_status ON public.rewards(status);
CREATE INDEX IF NOT EXISTS idx_rewards_created_at ON public.rewards(created_at DESC);

-- ============================================
-- 5. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('owner', 'referral', 'opportunity', 'reward')),
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for activity log
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- OWNERS POLICIES
-- ============================================

-- Allow users to read their own owner profile
CREATE POLICY "Users can view own owner profile"
ON public.owners FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to insert their own owner profile
CREATE POLICY "Users can insert own owner profile"
ON public.owners FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own owner profile
CREATE POLICY "Users can update own owner profile"
ON public.owners FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow service role to do anything (for server actions)
CREATE POLICY "Service role can do anything on owners"
ON public.owners FOR ALL
USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- REFERRALS POLICIES
-- ============================================

-- Allow owners to view their own referrals
CREATE POLICY "Owners can view own referrals"
ON public.referrals FOR SELECT
USING (
  owner_id IN (
    SELECT id FROM public.owners WHERE user_id = auth.uid()
  )
);

-- Allow owners to insert their own referrals
CREATE POLICY "Owners can insert own referrals"
ON public.referrals FOR INSERT
WITH CHECK (
  owner_id IN (
    SELECT id FROM public.owners WHERE user_id = auth.uid()
  )
);

-- Allow owners to update their own referrals
CREATE POLICY "Owners can update own referrals"
ON public.referrals FOR UPDATE
USING (
  owner_id IN (
    SELECT id FROM public.owners WHERE user_id = auth.uid()
  )
);

-- Allow service role to do anything
CREATE POLICY "Service role can do anything on referrals"
ON public.referrals FOR ALL
USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- REWARDS POLICIES
-- ============================================

-- Allow owners to view their own rewards
CREATE POLICY "Owners can view own rewards"
ON public.rewards FOR SELECT
USING (
  owner_id IN (
    SELECT id FROM public.owners WHERE user_id = auth.uid()
  )
);

-- Allow service role to do anything
CREATE POLICY "Service role can do anything on rewards"
ON public.rewards FOR ALL
USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- OPPORTUNITIES POLICIES (Internal team only)
-- ============================================

-- Only service role can access opportunities
CREATE POLICY "Service role can do anything on opportunities"
ON public.opportunities FOR ALL
USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- ACTIVITY LOG POLICIES
-- ============================================

-- Everyone can read activity log for their entities
CREATE POLICY "Users can view activity log"
ON public.activity_log FOR SELECT
USING (true);

-- Only service role can insert
CREATE POLICY "Service role can insert activity log"
ON public.activity_log FOR INSERT
WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- 7. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_owners_updated_at ON public.owners;
CREATE TRIGGER update_owners_updated_at
  BEFORE UPDATE ON public.owners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_referrals_updated_at ON public.referrals;
CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_rewards_updated_at ON public.rewards;
CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update owner stats when referral is created/updated
CREATE OR REPLACE FUNCTION update_owner_referral_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.owners
  SET 
    total_referrals = (
      SELECT COUNT(*) FROM public.referrals WHERE owner_id = NEW.owner_id
    ),
    successful_referrals = (
      SELECT COUNT(*) FROM public.referrals 
      WHERE owner_id = NEW.owner_id AND status = 'completed'
    ),
    updated_at = NOW()
  WHERE id = NEW.owner_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for owner stats update
DROP TRIGGER IF EXISTS update_owner_stats_on_referral ON public.referrals;
CREATE TRIGGER update_owner_stats_on_referral
  AFTER INSERT OR UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_owner_referral_stats();

-- Function to update owner rewards total
CREATE OR REPLACE FUNCTION update_owner_rewards_total()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.owners
  SET 
    total_rewards_earned = (
      SELECT COALESCE(SUM(amount), 0) 
      FROM public.rewards 
      WHERE owner_id = NEW.owner_id AND status = 'paid'
    ),
    updated_at = NOW()
  WHERE id = NEW.owner_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rewards total update
DROP TRIGGER IF EXISTS update_owner_rewards_on_reward ON public.rewards;
CREATE TRIGGER update_owner_rewards_on_reward
  AFTER INSERT OR UPDATE ON public.rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_owner_rewards_total();

-- ============================================
-- 8. INITIAL DATA / SEED (Optional)
-- ============================================

-- You can add some test data here if needed
-- Example:
-- INSERT INTO public.owners (user_id, email, first_name, last_name, phone, preferred_destination)
-- VALUES (...);

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Run this script in Supabase SQL Editor
-- Go to: https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/sql
-- Copy and paste this entire script and click "Run"
