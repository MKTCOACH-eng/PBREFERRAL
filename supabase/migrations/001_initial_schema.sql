-- Pueblo Bonito Referral Platform - Initial Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('owner', 'internal', 'dest_admin', 'super_admin');
CREATE TYPE user_status AS ENUM ('active', 'disabled');
CREATE TYPE language_preference AS ENUM ('en', 'es');
CREATE TYPE destination AS ENUM ('los_cabos', 'mazatlan');
CREATE TYPE referral_status AS ENUM ('new', 'contacted', 'qualified', 'visit_scheduled', 'closed_won', 'closed_lost');
CREATE TYPE referral_source AS ENUM ('owner_dashboard', 'guest_link', 'admin_manual');
CREATE TYPE reward_status AS ENUM ('pending', 'issued');
CREATE TYPE notification_channel AS ENUM ('email', 'in_app');
CREATE TYPE notification_status AS ENUM ('queued', 'sent', 'failed');
CREATE TYPE recipient_role AS ENUM ('owner', 'internal', 'admin', 'guest');

-- ============================================
-- USERS TABLE (Core authentication and profiles)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role user_role NOT NULL,
    destination_scope destination NULL, -- NULL for global (super_admin), specific for others
    name_first VARCHAR(100) NOT NULL,
    name_last VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    language_preference language_preference DEFAULT 'en',
    status user_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT check_destination_scope CHECK (
        (role = 'super_admin' AND destination_scope IS NULL) OR
        (role != 'super_admin' AND destination_scope IS NOT NULL)
    )
);

-- ============================================
-- OWNERS TABLE (Profile extension for owners)
-- ============================================
CREATE TABLE owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_external_id VARCHAR(100), -- Membership/fractional ID
    unit_community VARCHAR(255),
    referrals_total_count INTEGER DEFAULT 0,
    referrals_won_count INTEGER DEFAULT 0,
    rewards_total_amount DECIMAL(10,2) DEFAULT 0.00,
    last_referral_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_owner_user UNIQUE(owner_user_id)
);

-- ============================================
-- REFERRALS TABLE (Guest submissions)
-- ============================================
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id),
    guest_first_name VARCHAR(100) NOT NULL,
    guest_last_name VARCHAR(100) NOT NULL,
    guest_full_name VARCHAR(255) GENERATED ALWAYS AS (guest_first_name || ' ' || guest_last_name) STORED,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    destination_initial destination NOT NULL,
    destination_current destination NOT NULL,
    status referral_status DEFAULT 'new',
    consent_transactional BOOLEAN DEFAULT FALSE,
    consent_marketing BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duplicate_of_referral_id UUID REFERENCES referrals(id),
    source referral_source DEFAULT 'owner_dashboard',
    
    -- Indexes for performance
    CONSTRAINT check_consent_transactional CHECK (consent_transactional = TRUE)
);

CREATE INDEX idx_referrals_owner_id ON referrals(owner_id);
CREATE INDEX idx_referrals_guest_email ON referrals(guest_email);
CREATE INDEX idx_referrals_guest_phone ON referrals(guest_phone);
CREATE INDEX idx_referrals_destination_current ON referrals(destination_current);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_submitted_at ON referrals(submitted_at);

-- ============================================
-- OPPORTUNITIES TABLE (Pipeline management)
-- ============================================
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID UNIQUE NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    destination destination NOT NULL,
    stage referral_status DEFAULT 'new',
    assigned_team_id UUID REFERENCES users(id), -- Internal user assigned
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_opportunities_destination ON opportunities(destination);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_assigned_team ON opportunities(assigned_team_id);

-- ============================================
-- NOTES TABLE (Internal notes)
-- ============================================
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    created_by_user_id UUID NOT NULL REFERENCES users(id),
    note_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notes_referral_id ON notes(referral_id);
CREATE INDEX idx_notes_created_at ON notes(created_at);

-- ============================================
-- REWARDS TABLE (Owner rewards)
-- ============================================
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id),
    amount_usd DECIMAL(10,2) DEFAULT 200.00,
    type VARCHAR(100) DEFAULT 'Food & Beverage',
    status reward_status DEFAULT 'pending',
    issued_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_rewards_owner_id ON rewards(owner_id);
CREATE INDEX idx_rewards_status ON rewards(status);

-- ============================================
-- NOTIFICATIONS TABLE (Email + In-app)
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_user_id UUID REFERENCES users(id), -- NULL for guest-only emails
    recipient_role recipient_role NOT NULL,
    channel notification_channel NOT NULL,
    template_key VARCHAR(100) NOT NULL,
    language language_preference NOT NULL,
    payload_json JSONB NOT NULL, -- Variables for template rendering
    sent_at TIMESTAMP WITH TIME ZONE,
    status notification_status DEFAULT 'queued',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_recipient ON notifications(recipient_user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- AUDIT LOGS TABLE (Mandatory tracking)
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_user_id UUID REFERENCES users(id),
    action_key VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- referral, opportunity, reward, user, template
    entity_id UUID NOT NULL,
    before_json JSONB,
    after_json JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- SHARE LINKS TABLE (Owner unique referral links)
-- ============================================
CREATE TABLE share_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    clicks_count INTEGER DEFAULT 0,
    referrals_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_share_links_owner_id ON share_links(owner_id);
CREATE INDEX idx_share_links_token ON share_links(token);

-- ============================================
-- MAGIC LINKS TABLE (Authentication)
-- ============================================
CREATE TABLE magic_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_magic_links_email ON magic_links(email);
CREATE INDEX idx_magic_links_token ON magic_links(token);
CREATE INDEX idx_magic_links_expires_at ON magic_links(expires_at);

-- ============================================
-- INTERNAL TASKS TABLE (SLA tracking)
-- ============================================
CREATE TABLE internal_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    assigned_to_user_id UUID REFERENCES users(id),
    task_type VARCHAR(100) NOT NULL, -- 'contact_within_24h', 'follow_up', etc.
    description TEXT,
    due_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, overdue
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_internal_tasks_referral ON internal_tasks(referral_id);
CREATE INDEX idx_internal_tasks_assigned_to ON internal_tasks(assigned_to_user_id);
CREATE INDEX idx_internal_tasks_due_at ON internal_tasks(due_at);
CREATE INDEX idx_internal_tasks_status ON internal_tasks(status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_owners_updated_at BEFORE UPDATE ON owners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to sync referral status with opportunity stage
CREATE OR REPLACE FUNCTION sync_referral_opportunity_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update opportunity stage when referral status changes
    IF TG_TABLE_NAME = 'referrals' THEN
        UPDATE opportunities 
        SET stage = NEW.status, 
            last_activity_at = NOW()
        WHERE referral_id = NEW.id;
    END IF;
    
    -- Update referral status when opportunity stage changes
    IF TG_TABLE_NAME = 'opportunities' THEN
        UPDATE referrals 
        SET status = NEW.stage
        WHERE id = NEW.referral_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_referral_to_opportunity AFTER UPDATE OF status ON referrals
    FOR EACH ROW EXECUTE FUNCTION sync_referral_opportunity_status();

CREATE TRIGGER sync_opportunity_to_referral AFTER UPDATE OF stage ON opportunities
    FOR EACH ROW EXECUTE FUNCTION sync_referral_opportunity_status();

-- Function to create reward when referral is closed won
CREATE OR REPLACE FUNCTION create_reward_on_closed_won()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'closed_won' AND OLD.status != 'closed_won' THEN
        INSERT INTO rewards (referral_id, owner_id, amount_usd, type, status)
        VALUES (NEW.id, NEW.owner_id, 200.00, 'Food & Beverage', 'pending');
        
        -- Update owner stats
        UPDATE owners
        SET referrals_won_count = referrals_won_count + 1,
            rewards_total_amount = rewards_total_amount + 200.00
        WHERE owner_user_id = NEW.owner_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_reward_trigger AFTER UPDATE OF status ON referrals
    FOR EACH ROW EXECUTE FUNCTION create_reward_on_closed_won();

-- Function to update owner referral count
CREATE OR REPLACE FUNCTION update_owner_referral_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE owners
    SET referrals_total_count = referrals_total_count + 1,
        last_referral_at = NOW()
    WHERE owner_user_id = NEW.owner_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_owner_count_trigger AFTER INSERT ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_owner_referral_count();

-- Function to check for duplicate referrals
CREATE OR REPLACE FUNCTION check_duplicate_referral()
RETURNS TRIGGER AS $$
DECLARE
    duplicate_id UUID;
    duplicate_window_days INTEGER := 180;
BEGIN
    -- Check for duplicate by email or phone within the last 180 days
    SELECT id INTO duplicate_id
    FROM referrals
    WHERE (guest_email = NEW.guest_email OR guest_phone = NEW.guest_phone)
      AND id != NEW.id
      AND submitted_at > (NOW() - INTERVAL '180 days')
    LIMIT 1;
    
    IF duplicate_id IS NOT NULL THEN
        NEW.duplicate_of_referral_id := duplicate_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_duplicate_trigger BEFORE INSERT ON referrals
    FOR EACH ROW EXECUTE FUNCTION check_duplicate_referral();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_tasks ENABLE ROW LEVEL SECURITY;

-- Super Admin: Full access to everything
CREATE POLICY "Super admins have full access" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() AND u.role = 'super_admin'
        )
    );

-- Owners: Can view their own data
CREATE POLICY "Owners can view their own profile" ON users
    FOR SELECT USING (id = auth.uid() AND role = 'owner');

CREATE POLICY "Owners can view their own owner profile" ON owners
    FOR SELECT USING (owner_user_id = auth.uid());

CREATE POLICY "Owners can view their own referrals" ON referrals
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Owners can create referrals" ON referrals
    FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can view their own rewards" ON rewards
    FOR SELECT USING (owner_id = auth.uid());

-- Internal users: Can view data for their destination only
CREATE POLICY "Internal users can view their destination opportunities" ON opportunities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() 
            AND u.role IN ('internal', 'dest_admin')
            AND u.destination_scope = opportunities.destination
        )
    );

CREATE POLICY "Internal users can update their destination opportunities" ON opportunities
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() 
            AND u.role IN ('internal', 'dest_admin')
            AND u.destination_scope = opportunities.destination
        )
    );

-- Destination Admin: Additional permissions for their destination
CREATE POLICY "Dest admins can manage users in their destination" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() 
            AND u.role = 'dest_admin'
            AND u.destination_scope = users.destination_scope
        )
    );

-- Audit logs: Read-only for admins
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() 
            AND u.role IN ('dest_admin', 'super_admin')
        )
    );

-- ============================================
-- SEED DATA (Initial Super Admin)
-- ============================================

-- Insert initial super admin (update email as needed)
INSERT INTO users (role, destination_scope, name_first, name_last, email, language_preference, status)
VALUES ('super_admin', NULL, 'Super', 'Admin', 'admin@pueblobonito.com', 'en', 'active')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- VIEWS FOR REPORTING
-- ============================================

-- View: Referral Pipeline Summary by Destination
CREATE OR REPLACE VIEW v_pipeline_summary AS
SELECT 
    destination_current as destination,
    status,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE submitted_at > NOW() - INTERVAL '30 days') as count_last_30_days
FROM referrals
GROUP BY destination_current, status;

-- View: Owner Performance
CREATE OR REPLACE VIEW v_owner_performance AS
SELECT 
    u.id,
    u.email,
    u.name_first || ' ' || u.name_last as owner_name,
    o.referrals_total_count,
    o.referrals_won_count,
    o.rewards_total_amount,
    o.last_referral_at,
    CASE 
        WHEN o.referrals_total_count > 0 
        THEN ROUND((o.referrals_won_count::DECIMAL / o.referrals_total_count) * 100, 2)
        ELSE 0 
    END as conversion_rate
FROM users u
JOIN owners o ON o.owner_user_id = u.id
WHERE u.role = 'owner' AND u.status = 'active';

-- View: SLA Compliance
CREATE OR REPLACE VIEW v_sla_compliance AS
SELECT 
    r.destination_current,
    COUNT(*) as total_referrals,
    COUNT(*) FILTER (WHERE r.status = 'new' AND r.submitted_at < NOW() - INTERVAL '24 hours') as overdue_new,
    ROUND(
        (COUNT(*) FILTER (WHERE r.status != 'new' OR r.submitted_at >= NOW() - INTERVAL '24 hours')::DECIMAL / COUNT(*)) * 100, 
        2
    ) as sla_compliance_rate
FROM referrals r
WHERE r.submitted_at > NOW() - INTERVAL '30 days'
GROUP BY r.destination_current;

COMMENT ON TABLE users IS 'Core users table with RBAC roles';
COMMENT ON TABLE owners IS 'Extended profile for owner users';
COMMENT ON TABLE referrals IS 'Guest referral submissions';
COMMENT ON TABLE opportunities IS 'Pipeline management for referrals';
COMMENT ON TABLE rewards IS 'Owner rewards tracking';
COMMENT ON TABLE notifications IS 'Email and in-app notifications queue';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for all changes';
