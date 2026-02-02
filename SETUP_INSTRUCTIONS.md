# 🚀 Setup Instructions - Pueblo Bonito Referral Platform

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js 18+ installed
- [ ] npm or pnpm installed
- [ ] Git installed
- [ ] A Supabase account (free tier is fine for MVP)
- [ ] Access to the GitHub repository: https://github.com/MKTCOACH-eng/PBREFERRAL.git

## 🗄️ Step 1: Set Up Supabase

### 1.1 Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: `pueblo-bonito-referral`
   - **Database Password**: (choose a strong password and save it)
   - **Region**: Choose closest to your users (e.g., US West for Los Cabos/Mazatlán)
4. Click "Create new project"
5. Wait for the project to be provisioned (2-3 minutes)

### 1.2 Get Your Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - ⚠️ Keep this secret!

### 1.3 Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open the file: `/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral/supabase/migrations/001_initial_schema.sql`
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. Wait for the migration to complete (should take 10-20 seconds)
8. You should see "Success. No rows returned" message

### 1.4 Verify the Database Schema

1. Go to **Table Editor** in Supabase
2. You should see the following tables:
   - users
   - owners
   - referrals
   - opportunities
   - notes
   - rewards
   - notifications
   - audit_logs
   - share_links
   - magic_links
   - internal_tasks

### 1.5 Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional for MVP, can use defaults)
4. Go to **Authentication** → **URL Configuration**
5. Add redirect URLs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

### 1.6 Create Initial Super Admin (Optional)

The migration already creates a default super admin with email: `admin@pueblobonito.com`

To change this:

1. Go to **SQL Editor**
2. Run this query (replace with your email):

```sql
UPDATE users 
SET email = 'your-email@pueblobonito.com' 
WHERE email = 'admin@pueblobonito.com';
```

## 🔧 Step 2: Configure the Application

### 2.1 Update Environment Variables

1. Open the file: `.env.local`
2. Replace the placeholder values with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Save the file

### 2.2 Test the Connection

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the application running!

## 🔗 Step 3: Connect to Git Repository

### 3.1 Initialize Git (if not already done)

The project already has Git initialized. Verify:

```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
git status
```

### 3.2 Connect to Remote Repository

```bash
git remote add origin https://github.com/MKTCOACH-eng/PBREFERRAL.git
```

### 3.3 Pull Latest Changes (if any)

```bash
git pull origin main --allow-unrelated-histories
```

### 3.4 Push Initial Code

```bash
git add .
git commit -m "Initial commit: MVP setup with Next.js 16, Supabase, and i18n"
git push -u origin main
```

If you encounter authentication issues, you may need to:

1. Set up a Personal Access Token (PAT) on GitHub
2. Use the PAT as your password when pushing

## 🧪 Step 4: Test the Application

### 4.1 Test Homeowner Landing

1. Go to [http://localhost:3000/homeowner](http://localhost:3000/homeowner)
2. You should see the owner landing page
3. Try switching language: [http://localhost:3000/es/homeowner](http://localhost:3000/es/homeowner)

### 4.2 Test Magic Link Authentication

1. Enter your email on the homeowner page
2. Click "Send Magic Link"
3. Check your email (may take 1-2 minutes)
4. Click the link in the email
5. You should be redirected to the dashboard (when implemented)

### 4.3 Test Guest Landing

1. Go to [http://localhost:3000/homeguest](http://localhost:3000/homeguest)
2. You should see the guest landing page
3. Try filling out the form (won't submit yet without a valid share token)

## 🚀 Step 5: Deploy to Production (Optional)

### 5.1 Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts
4. Add environment variables in Vercel dashboard

### 5.2 Update Supabase Redirect URLs

1. Go to Supabase **Authentication** → **URL Configuration**
2. Add your production URL: `https://your-domain.vercel.app/auth/callback`

## ✅ Verification Checklist

After setup, verify:

- [ ] Supabase project is created and running
- [ ] Database migration completed successfully
- [ ] All tables are visible in Table Editor
- [ ] Environment variables are configured in `.env.local`
- [ ] Application runs on `http://localhost:3000`
- [ ] Homeowner landing page loads correctly
- [ ] Guest landing page loads correctly
- [ ] Language switching works (EN/ES)
- [ ] Git repository is connected
- [ ] Code is pushed to GitHub

## 🆘 Troubleshooting

### Issue: "Cannot connect to Supabase"

**Solution**: 
- Verify your Supabase URL and keys in `.env.local`
- Make sure the Supabase project is active (not paused)
- Check your internet connection

### Issue: "Magic link not working"

**Solution**:
- Check spam folder
- Verify redirect URLs in Supabase Auth settings
- Make sure email provider is enabled in Supabase

### Issue: "Database tables not found"

**Solution**:
- Re-run the migration in SQL Editor
- Check for any error messages in the SQL Editor
- Verify you're connected to the correct Supabase project

### Issue: "Git push failed"

**Solution**:
- Create a Personal Access Token on GitHub
- Use the token as your password
- Or use SSH keys instead of HTTPS

## 📞 Need Help?

If you encounter any issues:

1. Check the console for error messages
2. Check Supabase logs (Logs & Analytics section)
3. Review the README.md for additional documentation
4. Contact the development team

## 🎉 Next Steps

Once setup is complete, you can:

1. Create test data in Supabase
2. Test the magic link authentication flow
3. Start implementing the Owner Dashboard
4. Set up email templates
5. Configure the notification system

---

**Setup completed successfully? Great! You're ready to start developing! 🚀**
