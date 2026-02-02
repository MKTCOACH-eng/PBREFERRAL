-- ============================================
-- ADMIN PORTAL SETUP - PUEBLO BONITO REFERRAL
-- ============================================
-- Este script crea las tablas necesarias para el portal de administración
-- Incluye: admins, vouchers, y políticas de seguridad por equipo

-- PASO 1: Crear tabla de administradores
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'team_admin', 'sales_rep')),
  team TEXT NOT NULL CHECK (team IN ('Los Cabos', 'Mazatlán', 'Both')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASO 2: Crear tabla de vouchers (QR codes para $200 bonus)
CREATE TABLE IF NOT EXISTS public.vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id UUID REFERENCES public.referrals(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.owners(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 200.00,
  currency TEXT DEFAULT 'USD',
  destination TEXT NOT NULL CHECK (destination IN ('Los Cabos', 'Mazatlán')),
  qr_code TEXT, -- base64 encoded SVG
  voucher_code TEXT UNIQUE NOT NULL, -- Código único alfanumérico
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'redeemed', 'expired', 'cancelled')),
  expires_at TIMESTAMPTZ NOT NULL,
  redeemed_at TIMESTAMPTZ,
  redeemed_by TEXT, -- Admin que marcó como redimido
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASO 3: Crear tabla de activity logs (auditoría)
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.admins(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'created_voucher', 'contacted_guest', 'updated_referral', etc.
  entity_type TEXT NOT NULL, -- 'owner', 'referral', 'voucher'
  entity_id UUID NOT NULL,
  details JSONB, -- Datos adicionales de la acción
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASO 4: Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON public.admins(user_id);
CREATE INDEX IF NOT EXISTS idx_admins_email ON public.admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_team ON public.admins(team);
CREATE INDEX IF NOT EXISTS idx_vouchers_referral_id ON public.vouchers(referral_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_owner_id ON public.vouchers(owner_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_code ON public.vouchers(voucher_code);
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON public.vouchers(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON public.admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON public.admin_activity_logs(entity_type, entity_id);

-- PASO 5: Habilitar RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- PASO 6: Políticas de seguridad para admins

-- Admins: Solo pueden ver su propio perfil
DROP POLICY IF EXISTS "admins_select_own" ON public.admins;
CREATE POLICY "admins_select_own" ON public.admins 
  FOR SELECT USING (auth.uid() = user_id);

-- Admins: Solo super_admin puede insertar nuevos admins
DROP POLICY IF EXISTS "admins_insert_super" ON public.admins;
CREATE POLICY "admins_insert_super" ON public.admins 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Admins: Pueden actualizar su propio perfil
DROP POLICY IF EXISTS "admins_update_own" ON public.admins;
CREATE POLICY "admins_update_own" ON public.admins 
  FOR UPDATE USING (auth.uid() = user_id);

-- PASO 7: Políticas para owners (admins pueden ver según su equipo)

-- Admins pueden ver owners de su equipo
DROP POLICY IF EXISTS "owners_select_by_admin" ON public.owners;
CREATE POLICY "owners_select_by_admin" ON public.owners 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = preferred_destination)
      AND status = 'active'
    )
  );

-- PASO 8: Políticas para referrals (admins pueden ver según su equipo)

-- Admins pueden ver referrals de su equipo
DROP POLICY IF EXISTS "referrals_select_by_admin" ON public.referrals;
CREATE POLICY "referrals_select_by_admin" ON public.referrals 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = destination)
      AND status = 'active'
    )
  );

-- Admins pueden actualizar referrals de su equipo
DROP POLICY IF EXISTS "referrals_update_by_admin" ON public.referrals;
CREATE POLICY "referrals_update_by_admin" ON public.referrals 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = destination)
      AND status = 'active'
    )
  );

-- PASO 9: Políticas para vouchers

-- Admins pueden ver vouchers de su equipo
DROP POLICY IF EXISTS "vouchers_select_by_admin" ON public.vouchers;
CREATE POLICY "vouchers_select_by_admin" ON public.vouchers 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = destination)
      AND status = 'active'
    )
  );

-- Admins pueden crear vouchers de su equipo
DROP POLICY IF EXISTS "vouchers_insert_by_admin" ON public.vouchers;
CREATE POLICY "vouchers_insert_by_admin" ON public.vouchers 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = destination)
      AND status = 'active'
    )
  );

-- Admins pueden actualizar vouchers de su equipo
DROP POLICY IF EXISTS "vouchers_update_by_admin" ON public.vouchers;
CREATE POLICY "vouchers_update_by_admin" ON public.vouchers 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND (team = 'Both' OR team = destination)
      AND status = 'active'
    )
  );

-- PASO 10: Políticas para activity logs

-- Admins pueden insertar sus propios logs
DROP POLICY IF EXISTS "logs_insert_by_admin" ON public.admin_activity_logs;
CREATE POLICY "logs_insert_by_admin" ON public.admin_activity_logs 
  FOR INSERT WITH CHECK (
    admin_id IN (SELECT id FROM public.admins WHERE user_id = auth.uid())
  );

-- Admins pueden ver logs de su equipo
DROP POLICY IF EXISTS "logs_select_by_admin" ON public.admin_activity_logs;
CREATE POLICY "logs_select_by_admin" ON public.admin_activity_logs 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid() 
      AND status = 'active'
    )
  );

-- PASO 11: Crear admin de prueba (ejecutar DESPUÉS de crear un user en Supabase Auth)
-- INSTRUCCIONES:
-- 1. Ve a Supabase → Authentication → Add user
-- 2. Email: admin@pueblobonito.com / Password: Admin123!
-- 3. Copia el user_id generado
-- 4. Ejecuta el INSERT de abajo reemplazando 'USER_ID_AQUI'

-- INSERT INTO public.admins (user_id, email, first_name, last_name, role, team, status)
-- VALUES (
--   'USER_ID_AQUI',
--   'admin@pueblobonito.com',
--   'Admin',
--   'Principal',
--   'super_admin',
--   'Both',
--   'active'
-- );

-- ============================================
-- ✅ SETUP COMPLETADO
-- ============================================
-- Siguiente paso: Ejecutar este script en Supabase SQL Editor
-- Luego: Crear el admin user manualmente y ejecutar el INSERT de arriba
