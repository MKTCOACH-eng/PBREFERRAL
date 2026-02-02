// Database types generated from Supabase schema
// This file should be regenerated when schema changes using: npx supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'owner' | 'internal' | 'dest_admin' | 'super_admin'
export type UserStatus = 'active' | 'disabled'
export type LanguagePreference = 'en' | 'es'
export type Destination = 'los_cabos' | 'mazatlan'
export type ReferralStatus = 'new' | 'contacted' | 'qualified' | 'visit_scheduled' | 'closed_won' | 'closed_lost'
export type ReferralSource = 'owner_dashboard' | 'guest_link' | 'admin_manual'
export type RewardStatus = 'pending' | 'issued'
export type NotificationChannel = 'email' | 'in_app'
export type NotificationStatus = 'queued' | 'sent' | 'failed'
export type RecipientRole = 'owner' | 'internal' | 'admin' | 'guest'

export interface Database {
  public: {
    Tables: {
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
      owners: {
        Row: {
          id: string
          owner_user_id: string
          owner_external_id: string | null
          unit_community: string | null
          referrals_total_count: number
          referrals_won_count: number
          rewards_total_amount: number
          last_referral_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_user_id: string
          owner_external_id?: string | null
          unit_community?: string | null
          referrals_total_count?: number
          referrals_won_count?: number
          rewards_total_amount?: number
          last_referral_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_user_id?: string
          owner_external_id?: string | null
          unit_community?: string | null
          referrals_total_count?: number
          referrals_won_count?: number
          rewards_total_amount?: number
          last_referral_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          owner_id: string
          guest_first_name: string
          guest_last_name: string
          guest_full_name: string
          guest_email: string
          guest_phone: string
          destination_initial: Destination
          destination_current: Destination
          status: ReferralStatus
          consent_transactional: boolean
          consent_marketing: boolean
          submitted_at: string
          updated_at: string
          duplicate_of_referral_id: string | null
          source: ReferralSource
        }
        Insert: {
          id?: string
          owner_id: string
          guest_first_name: string
          guest_last_name: string
          guest_email: string
          guest_phone: string
          destination_initial: Destination
          destination_current: Destination
          status?: ReferralStatus
          consent_transactional?: boolean
          consent_marketing?: boolean
          submitted_at?: string
          updated_at?: string
          duplicate_of_referral_id?: string | null
          source?: ReferralSource
        }
        Update: {
          id?: string
          owner_id?: string
          guest_first_name?: string
          guest_last_name?: string
          guest_email?: string
          guest_phone?: string
          destination_initial?: Destination
          destination_current?: Destination
          status?: ReferralStatus
          consent_transactional?: boolean
          consent_marketing?: boolean
          submitted_at?: string
          updated_at?: string
          duplicate_of_referral_id?: string | null
          source?: ReferralSource
        }
      }
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
      v_pipeline_summary: {
        Row: {
          destination: Destination
          status: ReferralStatus
          count: number
          count_last_30_days: number
        }
      }
      v_owner_performance: {
        Row: {
          id: string
          email: string
          owner_name: string
          referrals_total_count: number
          referrals_won_count: number
          rewards_total_amount: number
          last_referral_at: string | null
          conversion_rate: number
        }
      }
      v_sla_compliance: {
        Row: {
          destination_current: Destination
          total_referrals: number
          overdue_new: number
          sla_compliance_rate: number
        }
      }
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
