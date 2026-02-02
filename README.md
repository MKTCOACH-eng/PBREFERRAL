# 🏖️ Pueblo Bonito Referral Platform - MVP

A luxury referral platform for Pueblo Bonito resort owners to refer friends and family, built with Next.js 16, Supabase, and TypeScript.

## 🎯 Project Overview

This platform enables Pueblo Bonito owners to:
- Submit referrals for friends and family
- Track referral status through a pipeline
- Earn $200 USD Food & Beverage credits for successful referrals
- Manage referrals across two destinations: Los Cabos and Mazatlán

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Link/OTP)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **i18n**: next-intl (English/Spanish)
- **State Management**: Zustand
- **Validation**: Zod
- **Forms**: React Hook Form

## 📋 Features (MVP)

### ✅ Completed
- [x] Project initialization with Next.js 16
- [x] Supabase database schema (complete with all tables, triggers, RLS policies)
- [x] Multi-language support (EN/ES)
- [x] Homeowner landing page
- [x] Magic link authentication setup
- [x] Requirements section

### 🚧 In Progress
- [ ] Guest landing page
- [ ] Owner dashboard
- [ ] Internal team portal
- [ ] Admin portals
- [ ] Notification system
- [ ] Concierge bot

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm
- Supabase account

### 1. Clone the Repository

```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the migration script:

```bash
# In Supabase SQL Editor, run the migration file:
# supabase/migrations/001_initial_schema.sql
```

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
pb-referral/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                # Internationalized routes
│   │   │   ├── homeowner/           # Owner landing
│   │   │   ├── homeguest/           # Guest landing
│   │   │   ├── dashboard/           # Owner dashboard
│   │   │   ├── internal/            # Internal portal
│   │   │   ├── admin/               # Admin portals
│   │   │   └── auth/                # Auth callbacks
│   │   └── layout.tsx
│   │
│   ├── features/                     # Feature-First Architecture
│   │   ├── auth/                    # Authentication
│   │   ├── dashboard/               # Owner dashboard
│   │   ├── referrals/               # Referral management
│   │   ├── rewards/                 # Rewards tracking
│   │   ├── admin/                   # Admin features
│   │   └── internal-portal/         # Internal team features
│   │
│   ├── shared/                       # Shared code
│   │   ├── components/              # Reusable UI components
│   │   ├── lib/                     # Libraries (Supabase, etc.)
│   │   ├── types/                   # TypeScript types
│   │   ├── utils/                   # Utility functions
│   │   └── constants/               # Constants
│   │
│   ├── i18n/                        # Internationalization
│   │   ├── routing.ts
│   │   └── request.ts
│   │
│   └── middleware.ts                # Next.js middleware
│
├── messages/                         # Translation files
│   ├── en.json
│   └── es.json
│
├── supabase/
│   └── migrations/                  # Database migrations
│       └── 001_initial_schema.sql
│
└── public/                          # Static assets
```

## 🗄️ Database Schema

The database includes the following main tables:

- **users**: Core user table with RBAC (owner, internal, dest_admin, super_admin)
- **owners**: Extended profile for owner users
- **referrals**: Guest referral submissions
- **opportunities**: Pipeline management (1:1 with referrals)
- **notes**: Internal notes on referrals
- **rewards**: Owner rewards tracking ($200 F&B credits)
- **notifications**: Email and in-app notifications queue
- **audit_logs**: Comprehensive audit trail
- **share_links**: Unique referral links for owners
- **magic_links**: Authentication tokens
- **internal_tasks**: SLA tracking and task management

### Key Features:
- ✅ Row Level Security (RLS) policies
- ✅ Automatic triggers for status sync
- ✅ Duplicate detection
- ✅ Reward creation on closed won
- ✅ Audit logging
- ✅ Views for reporting

## 🌐 Multi-Language Support

The platform supports English and Spanish:

- URL structure: `/en/homeowner` or `/es/homeowner`
- Default locale: English
- All UI, emails, and bot messages are translated

## 🔐 Authentication Flow

1. Owner enters email on `/homeowner`
2. System sends magic link via Supabase Auth
3. Owner clicks link in email
4. Redirected to `/auth/callback` for verification
5. Redirected to `/dashboard` on success

## 🎨 Design System

- **Primary Color**: Amber (luxury, warm)
- **Font**: Geist Sans (modern, clean)
- **Style**: Luxury, premium, discreet
- **Responsive**: Mobile-first approach

## 📧 Email Templates

Email templates are defined in the translation files and include:

- Guest confirmation
- Owner confirmation
- Owner stage updates
- Owner closed won (reward notification)
- Internal team notifications

## 🔒 Security

- Magic link authentication (15-minute expiry)
- Row Level Security (RLS) on all tables
- Destination-scoped access control
- Audit logging for all critical actions
- PII encryption at rest (where feasible)
- Rate limiting on form submissions

## 📊 Analytics & Reporting

Built-in views for:
- Pipeline summary by destination
- Owner performance metrics
- SLA compliance tracking

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Configure environment variables in Vercel dashboard.

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📝 Development Workflow

1. Create feature branch
2. Implement feature following Feature-First architecture
3. Test locally
4. Create pull request
5. Deploy to staging
6. Test in staging
7. Deploy to production

## 🤝 Contributing

This is a private project for Pueblo Bonito. For questions or issues, contact the development team.

## 📄 License

Proprietary - Pueblo Bonito

## 🔗 Links

- **Repository**: https://github.com/MKTCOACH-eng/PBREFERRAL.git
- **Supabase Dashboard**: [Your Supabase Project]
- **Vercel Dashboard**: [Your Vercel Project]

## 📞 Support

For technical support, contact the development team.

---

**Built with ❤️ for Pueblo Bonito**
