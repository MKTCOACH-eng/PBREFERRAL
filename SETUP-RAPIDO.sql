-- ============================================
-- SETUP RÁPIDO - PUEBLO BONITO REFERRAL
-- ============================================

-- PASO 1: Eliminar tablas si existen (empezar limpio)
DROP TABLE IF EXISTS public.rewards CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.owners CASCADE;

-- PASO 2: Crear tablas
CREATE TABLE public.owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_destination TEXT CHECK (preferred_destination IN ('Los Cabos', 'Mazatlán')),
  status TEXT DEFAULT 'active',
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  total_rewards_earned DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE NOT NULL,
  guest_first_name TEXT NOT NULL,
  guest_last_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  destination TEXT NOT NULL,
  preferred_dates TEXT,
  number_of_guests INTEGER DEFAULT 2,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  guest_token TEXT UNIQUE,
  guest_token_expires_at TIMESTAMPTZ,
  guest_viewed_at TIMESTAMPTZ,
  guest_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE NOT NULL,
  referral_id UUID REFERENCES public.referrals(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASO 3: Índices para mejor rendimiento
CREATE INDEX idx_owners_user_id ON public.owners(user_id);
CREATE INDEX idx_owners_email ON public.owners(email);
CREATE INDEX idx_referrals_owner_id ON public.referrals(owner_id);
CREATE INDEX idx_referrals_guest_token ON public.referrals(guest_token);
CREATE INDEX idx_rewards_owner_id ON public.rewards(owner_id);

-- PASO 4: Habilitar RLS (Seguridad)
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- PASO 5: Políticas de seguridad
-- Owners: pueden ver/crear/actualizar su propio perfil
DROP POLICY IF EXISTS "owners_select_own" ON public.owners;
CREATE POLICY "owners_select_own" ON public.owners 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "owners_insert_own" ON public.owners;
CREATE POLICY "owners_insert_own" ON public.owners 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "owners_update_own" ON public.owners;
CREATE POLICY "owners_update_own" ON public.owners 
  FOR UPDATE USING (auth.uid() = user_id);

-- Referrals: owners pueden ver y crear sus propios referidos
DROP POLICY IF EXISTS "referrals_select_own" ON public.referrals;
CREATE POLICY "referrals_select_own" ON public.referrals 
  FOR SELECT USING (
    owner_id IN (SELECT id FROM public.owners WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "referrals_insert_own" ON public.referrals;
CREATE POLICY "referrals_insert_own" ON public.referrals 
  FOR INSERT WITH CHECK (
    owner_id IN (SELECT id FROM public.owners WHERE user_id = auth.uid())
  );

-- Referrals: acceso público por token (para que el guest pueda ver)
DROP POLICY IF EXISTS "referrals_select_by_token" ON public.referrals;
CREATE POLICY "referrals_select_by_token" ON public.referrals 
  FOR SELECT USING (guest_token IS NOT NULL);

DROP POLICY IF EXISTS "referrals_update_by_token" ON public.referrals;
CREATE POLICY "referrals_update_by_token" ON public.referrals 
  FOR UPDATE USING (guest_token IS NOT NULL);

-- Rewards: owners pueden ver sus propias recompensas
DROP POLICY IF EXISTS "rewards_select_own" ON public.rewards;
CREATE POLICY "rewards_select_own" ON public.rewards 
  FOR SELECT USING (
    owner_id IN (SELECT id FROM public.owners WHERE user_id = auth.uid())
  );

-- ¡LISTO! Tu base de datos está configurada correctamente
