// Database types - matches ACTUAL Supabase schema (from supabase-setup.sql)
// Note: The migrations (001_initial_schema.sql) describe a different schema
// but the actual DB was created with supabase-setup.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Users table uses these enums (from migrations)
export type UserRole = 'owner' | 'internal' | 'dest_admin' | 'super_admin'
export type UserStatus = 'active' | 'disabled'
export type LanguagePreference = 'en' | 'es'
export type Destination = 'los_cabos' | 'mazatlan'

// Actual referral status values (text column, not enum)
export type ReferralStatus = 'pending' | 'new' | 'contacted' | 'confirmed' | 'qualified' | 
  'visit_scheduled' | 'completed' | 'closed_won' | 'closed_lost' | 'cancelled'

export type ReferralSource = 'owner_dashboard' | 'guest_link' | 'admin_manual'
export type RewardStatus = 'pending' | 'issued'
export type NotificationChannel = 'email' | 'in_app'
export type NotificationStatus = 'queued' | 'sent' | 'failed'
export type RecipientRole = 'owner' | 'internal' | 'admin' | 'guest'

export interface Database {
  public: {
    Tables: {
      // users table (from migrations - uses spec schema)
      users: {
        Row: {
          id: string
          role: UserRole
          destination_scope: Destination | null
          name_first: string
          name_last: string
          email: string
          phone: string | null
          language_preference: LanguagePreference
          status: UserStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          role: UserRole
          destination_scope?: Destination | null
          name_first: string
          name_last: string
          email: string
          phone?: string | null
          language_preference?: LanguagePreference
          status?: UserStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: UserRole
          destination_scope?: Destination | null
          name_first?: string
          name_last?: string
          email?: string
          phone?: string | null
          language_preference?: LanguagePreference
          status?: UserStatus
          created_at?: string
          updated_at?: string
        }
      }
      // owners table (ACTUAL schema from supabase-setup.sql)
      // Uses user_id, not owner_user_id
      // Has email, first_name, last_name, phone columns
      owners: {
        Row: {
          id: string
          user_id: string
          email: string
          first_name: string
          last_name: string
          phone: string
          preferred_destination: string | null
          status: string
          total_referrals: number
          successful_referrals: number
          total_rewards_earned: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          first_name: string
          last_name: string
          phone?: string
          preferred_destination?: string | null
          status?: string
          total_referrals?: number
          successful_referrals?: number
          total_rewards_earned?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string
          preferred_destination?: string | null
          status?: string
          total_referrals?: number
          successful_referrals?: number
          total_rewards_earned?: number
          created_at?: string
          updated_at?: string
        }
      }
      // referrals table (ACTUAL schema from supabase-setup.sql)
      // Uses destination (text), not destination_initial/destination_current
      // Uses created_at, not submitted_at
      referrals: {
        Row: {
          id: string
          owner_id: string // FK → owners.id
          guest_first_name: string
          guest_last_name: string
          guest_email: string
          guest_phone: string
          destination: string // text, e.g. "Los Cabos" | "Mazatlán"
          preferred_dates: string | null
          number_of_guests: number
          special_requests: string | null
          status: string // text: pending, contacted, confirmed, completed, cancelled
          guest_token: string | null
          guest_token_expires_at: string | null
          guest_viewed_at: string | null
          guest_accepted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          guest_first_name: string
          guest_last_name: string
          guest_email: string
          guest_phone: string
          destination: string
          preferred_dates?: string | null
          number_of_guests?: number
          special_requests?: string | null
          status?: string
          guest_token?: string | null
          guest_token_expires_at?: string | null
          guest_viewed_at?: string | null
          guest_accepted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          guest_first_name?: string
          guest_last_name?: string
          guest_email?: string
          guest_phone?: string
          destination?: string
          preferred_dates?: string | null
          number_of_guests?: number
          special_requests?: string | null
          status?: string
          guest_token?: string | null
          guest_token_expires_at?: string | null
          guest_viewed_at?: string | null
          guest_accepted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // opportunities table (from migrations - uses spec schema with enums)
      opportunities: {
        Row: {
          id: string
          referral_id: string
          destination: Destination
          stage: ReferralStatus
          assigned_team_id: string | null
          last_activity_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referral_id: string
          destination: Destination
          stage?: ReferralStatus
          assigned_team_id?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          referral_id?: string
          destination?: Destination
          stage?: ReferralStatus
          assigned_team_id?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          referral_id: string
          created_by_user_id: string
          note_text: string
          created_at: string
        }
        Insert: {
          id?: string
          referral_id: string
          created_by_user_id: string
          note_text: string
          created_at?: string
        }
        Update: {
          id?: string
          referral_id?: string
          created_by_user_id?: string
          note_text?: string
          created_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          referral_id: string
          owner_id: string
          amount_usd: number
          type: string
          status: RewardStatus
          issued_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          referral_id: string
          owner_id: string
          amount_usd?: number
          type?: string
          status?: RewardStatus
          issued_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          referral_id?: string
          owner_id?: string
          amount_usd?: number
          type?: string
          status?: RewardStatus
          issued_at?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_user_id: string | null
          recipient_role: RecipientRole
          channel: NotificationChannel
          template_key: string
          language: LanguagePreference
          payload_json: Json
          sent_at: string | null
          status: NotificationStatus
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_user_id?: string | null
          recipient_role: RecipientRole
          channel: NotificationChannel
          template_key: string
          language: LanguagePreference
          payload_json: Json
          sent_at?: string | null
          status?: NotificationStatus
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipient_user_id?: string | null
          recipient_role?: RecipientRole
          channel?: NotificationChannel
          template_key?: string
          language?: LanguagePreference
          payload_json?: Json
          sent_at?: string | null
          status?: NotificationStatus
          error_message?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          actor_user_id: string | null
          action_key: string
          entity_type: string
          entity_id: string
          before_json: Json | null
          after_json: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_user_id?: string | null
          action_key: string
          entity_type: string
          entity_id: string
          before_json?: Json | null
          after_json?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_user_id?: string | null
          action_key?: string
          entity_type?: string
          entity_id?: string
          before_json?: Json | null
          after_json?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      share_links: {
        Row: {
          id: string
          owner_id: string
          token: string
          clicks_count: number
          referrals_count: number
          created_at: string
          last_used_at: string | null
        }
        Insert: {
          id?: string
          owner_id: string
          token: string
          clicks_count?: number
          referrals_count?: number
          created_at?: string
          last_used_at?: string | null
        }
        Update: {
          id?: string
          owner_id?: string
          token?: string
          clicks_count?: number
          referrals_count?: number
          created_at?: string
          last_used_at?: string | null
        }
      }
      magic_links: {
        Row: {
          id: string
          email: string
          token: string
          expires_at: string
          used_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          token: string
          expires_at: string
          used_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          token?: string
          expires_at?: string
          used_at?: string | null
          created_at?: string
        }
      }
      internal_tasks: {
        Row: {
          id: string
          referral_id: string
          assigned_to_user_id: string | null
          task_type: string
          description: string | null
          due_at: string
          completed_at: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          referral_id: string
          assigned_to_user_id?: string | null
          task_type: string
          description?: string | null
          due_at: string
          completed_at?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          referral_id?: string
          assigned_to_user_id?: string | null
          task_type?: string
          description?: string | null
          due_at?: string
          completed_at?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      user_status: UserStatus
      language_preference: LanguagePreference
      destination: Destination
      referral_status: ReferralStatus
      referral_source: ReferralSource
      reward_status: RewardStatus
      notification_channel: NotificationChannel
      notification_status: NotificationStatus
      recipient_role: RecipientRole
    }
  }
}

// Helper types for convenience
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
