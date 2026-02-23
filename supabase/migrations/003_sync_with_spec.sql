-- ============================================
-- Migration 003: Sync with Specification
-- ============================================
-- NOTE: This migration must be run manually in the Supabase SQL Editor
-- because the actual DB was created with supabase-setup.sql (different schema)
-- and not through the Supabase CLI migrations.
--
-- ACTUAL DB SCHEMA (from supabase-setup.sql):
--   referrals: id, owner_id (FK→owners.id), guest_first_name, guest_last_name,
--     guest_email, guest_phone, destination (text), preferred_dates, number_of_guests,
--     special_requests, status (text: pending/contacted/confirmed/completed/cancelled),
--     guest_token, guest_token_expires_at, guest_viewed_at, guest_accepted_at,
--     created_at, updated_at
--
--   owners: id, user_id (FK→auth.users), email, first_name, last_name, phone,
--     preferred_destination, status, total_referrals, successful_referrals,
--     total_rewards_earned, created_at, updated_at
--
-- SPEC SCHEMA (from master specification):
--   referrals: id, owner_id, guest_first_name, guest_last_name, guest_email,
--     guest_phone, destination_initial, destination_current, status (enum),
--     consent_transactional, consent_marketing, submitted_at, updated_at,
--     duplicate_of_referral_id, source
--
--   owners: owner_user_id (FK), owner_external_id, unit_community,
--     referrals_total_count, referrals_won_count, rewards_total_amount, last_referral_at
--
-- ============================================

-- Step 1: Add missing columns to referrals
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS consent_transactional BOOLEAN DEFAULT FALSE;
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT FALSE;
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'owner_dashboard';
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS duplicate_of_referral_id UUID REFERENCES referrals(id);

-- Step 2: Update referrals status constraint to include spec values
-- Drop old constraint and add new one with combined values
ALTER TABLE referrals DROP CONSTRAINT IF EXISTS referrals_status_check;
ALTER TABLE referrals ADD CONSTRAINT referrals_status_check 
  CHECK (status IN ('pending', 'new', 'contacted', 'confirmed', 'qualified', 'visit_scheduled', 'completed', 'closed_won', 'closed_lost', 'cancelled'));

-- Step 3: Add last_referral_at to owners
ALTER TABLE owners ADD COLUMN IF NOT EXISTS last_referral_at TIMESTAMPTZ;

-- Step 4: Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_referrals_source ON referrals(source);
CREATE INDEX IF NOT EXISTS idx_referrals_duplicate ON referrals(duplicate_of_referral_id);

-- Step 5: Update existing data
-- Map 'pending' status to 'new' for consistency with spec
-- UPDATE referrals SET status = 'new' WHERE status = 'pending';

COMMENT ON TABLE referrals IS 'Guest referral submissions - hybrid schema (supabase-setup.sql + spec additions)';
COMMENT ON TABLE owners IS 'Owner profiles linked to auth.users';
