-- ============================================
-- Migration 002: RLS Improvements & Additional Policies
-- ============================================

-- Allow service role inserts on all tables (for server actions)
-- These policies allow the admin/service-role client to bypass RLS

-- Notifications: Allow inserts for queuing
CREATE POLICY IF NOT EXISTS "Allow service insert notifications" ON notifications
    FOR INSERT WITH CHECK (true);

-- Audit logs: Allow inserts for logging
CREATE POLICY IF NOT EXISTS "Allow service insert audit_logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- Internal tasks: Allow inserts and management
CREATE POLICY IF NOT EXISTS "Allow service insert internal_tasks" ON internal_tasks
    FOR INSERT WITH CHECK (true);

-- Share links: Owner can view their own
CREATE POLICY IF NOT EXISTS "Owners can view their share links" ON share_links
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Owners can create share links" ON share_links
    FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Notes: Internal users can create/view for their destination
CREATE POLICY IF NOT EXISTS "Internal users can create notes" ON notes
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()
            AND u.role IN ('internal', 'dest_admin', 'super_admin')
        )
    );

CREATE POLICY IF NOT EXISTS "Internal users can view notes for their referrals" ON notes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN referrals r ON r.id = notes.referral_id
            WHERE u.id = auth.uid()
            AND (
                u.role = 'super_admin'
                OR (u.role IN ('internal', 'dest_admin') AND u.destination_scope = r.destination_current)
            )
        )
    );

-- Notifications: Users can see their own in-app notifications
CREATE POLICY IF NOT EXISTS "Users can view their own notifications" ON notifications
    FOR SELECT USING (recipient_user_id = auth.uid());

-- Internal tasks: Viewable by assigned users and admins
CREATE POLICY IF NOT EXISTS "Internal users can view their tasks" ON internal_tasks
    FOR SELECT USING (
        assigned_to_user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()
            AND u.role IN ('dest_admin', 'super_admin')
        )
    );

-- Internal users can view referrals for their destination
CREATE POLICY IF NOT EXISTS "Internal users can view destination referrals" ON referrals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()
            AND u.role IN ('internal', 'dest_admin')
            AND u.destination_scope = referrals.destination_current
        )
    );

-- Super admin full access on remaining tables
CREATE POLICY IF NOT EXISTS "Super admins full access owners" ON owners
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access referrals" ON referrals
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access opportunities" ON opportunities
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access rewards" ON rewards
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access notes" ON notes
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access notifications" ON notifications
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access internal_tasks" ON internal_tasks
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

CREATE POLICY IF NOT EXISTS "Super admins full access share_links" ON share_links
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'super_admin')
    );

-- ============================================
-- Function: Auto-create internal task on new referral
-- ============================================
CREATE OR REPLACE FUNCTION auto_create_contact_task()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO internal_tasks (referral_id, task_type, description, due_at, status)
    VALUES (
        NEW.id,
        'contact_within_24h',
        'Contact guest ' || NEW.guest_first_name || ' ' || NEW.guest_last_name || ' within 24 hours',
        NOW() + INTERVAL '24 hours',
        'pending'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only create if trigger doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'auto_contact_task_trigger') THEN
        CREATE TRIGGER auto_contact_task_trigger
            AFTER INSERT ON referrals
            FOR EACH ROW EXECUTE FUNCTION auto_create_contact_task();
    END IF;
END $$;

-- ============================================
-- Function: Audit log on referral status change
-- ============================================
CREATE OR REPLACE FUNCTION audit_referral_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO audit_logs (action_key, entity_type, entity_id, before_json, after_json)
        VALUES (
            'referral.status_changed',
            'referral',
            NEW.id,
            jsonb_build_object('status', OLD.status),
            jsonb_build_object('status', NEW.status)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_status_change_trigger') THEN
        CREATE TRIGGER audit_status_change_trigger
            AFTER UPDATE ON referrals
            FOR EACH ROW EXECUTE FUNCTION audit_referral_status_change();
    END IF;
END $$;
