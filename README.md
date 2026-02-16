# Pueblo Bonito Referral Platform (PB Referral)

A luxury referral management platform for **Pueblo Bonito Golf & Spa Resorts**. Owners refer friends and family to experience Pueblo Bonito resorts and earn **$200 USD Food & Beverage credits** for each successful referral.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Server Components) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| Auth | **Supabase Auth** (Magic Link / OTP) |
| Database | **Supabase PostgreSQL** |
| i18n | **next-intl** (EN / ES) |
| State | **Zustand** (client state) |
| Forms | **React Hook Form + Zod** |
| Deployment | **Vercel** |

## Features

### ✅ Implemented (Core MVP)

- **Owner Landing** (`/homeowner`) — Bilingual hero, magic link auth, guest requirements
- **Guest Landing** (`/homeguest`) — Bilingual registration form with consent checkboxes
- **Magic Link Authentication** — Passwordless sign-in via Supabase OTP
- **Owner Dashboard** — Overview stats, create referral, view referrals list, rewards tracking
- **Share Link** — Unique referral link per owner (`/homeguest?token=XXX`)
- **Referral Management** — Create, view list with status, destination routing
- **Rewards Tracking** — Automatic reward creation on closed_won, pending/issued status
- **Supabase Schema** — Full data model (Users, Owners, Referrals, Opportunities, Rewards, Notifications, Audit Logs, Notes, Share Links, Internal Tasks)
- **RLS Policies** — Row-level security for all tables by role
- **DB Triggers** — Auto-create opportunity, duplicate check, reward on closed_won, status sync
- **Notification Queue** — Database-backed notification system (email + in-app templates)
- **Email Templates** — Spec-compliant bilingual templates for all notification types
- **Audit Logging** — Automatic audit trail for referral status changes
- **Duplicate Detection** — Check by email/phone within 180-day window
- **Bilingual UI** — Complete EN/ES translations for all pages
- **Admin Dashboard** — Basic admin portal with referrals, owners, prospects views

### 🟡 Partially Implemented

- **Internal Team Portal** — Admin views exist but pipeline board needs enhancement
- **Email Delivery** — Templates ready, needs email provider integration (Resend/SendGrid)
- **SLA Tracking** — Internal tasks created, escalation alerts need cron/edge function

### ❌ Not Yet Implemented (Post-MVP)

- Concierge bots (Owner/Guest/Admin)
- In-platform reward redemption
- Advanced analytics dashboards
- Cron-based SLA escalation alerts

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # i18n routing (en/es)
│   │   ├── homeowner/      # Owner landing page
│   │   ├── homeguest/      # Guest landing + registration form
│   │   ├── guest/          # Legacy redirect → homeguest
│   │   ├── dashboard/      # Owner dashboard (protected)
│   │   │   ├── referrals/  # Referral list + create new
│   │   │   ├── rewards/    # Rewards tracking
│   │   │   └── account/    # Profile + share link
│   │   └── admin/          # Admin portal
│   └── auth/callback/      # Supabase auth callback
├── features/
│   ├── auth/               # Auth actions + components
│   ├── dashboard/          # Dashboard components
│   ├── guest/              # Guest actions + components
│   └── admin/              # Admin components
├── shared/
│   ├── components/         # Header, Footer, RequirementsSection, etc.
│   └── types/              # TypeScript type definitions
├── lib/
│   ├── supabase/           # Supabase clients (browser, server, admin)
│   └── email/              # Email templates + send utility
├── i18n/                   # next-intl configuration
└── middleware.ts            # Auth + i18n middleware
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Supabase project (free tier works)
- Vercel account (for deployment)

### 1. Clone & Install

```bash
git clone https://github.com/MKTCOACH-eng/PBREFERRAL.git
cd PBREFERRAL
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

Run the migrations in your Supabase SQL Editor:

1. `supabase/migrations/001_initial_schema.sql` — Creates all tables, types, triggers, RLS
2. `supabase/migrations/002_rls_improvements.sql` — Additional RLS policies and audit triggers

**Configure Magic Link Auth:**
- Go to Supabase Dashboard → Authentication → Settings
- Enable "Magic Link" under Email Auth
- Set Site URL to your app URL
- Add redirect URLs: `http://localhost:3000/auth/callback`, `https://your-domain.com/auth/callback`

### 4. Run Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 5. Deploy to Vercel

```bash
npx vercel
```

Add environment variables in Vercel Dashboard → Settings → Environment Variables.

## Business Rules

| Rule | Implementation |
|------|---------------|
| Magic link auth (no passwords) | Supabase OTP via `signInWithOtp()` |
| $200 F&B reward on closed_won | DB trigger `create_reward_on_closed_won()` |
| Duplicate check (180 days) | DB trigger `check_duplicate_referral()` |
| 1 referral = 1 opportunity | Unique constraint on `opportunities.referral_id` |
| 24h contact SLA | Auto-created `internal_tasks` on referral submission |
| Consent storage | `consent_transactional` + `consent_marketing` booleans with timestamps |
| Destination routing | `destination_current` field, RLS by `destination_scope` |

## License

Private — Pueblo Bonito Golf & Spa Resorts
