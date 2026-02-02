-- ============================================
-- INSERTAR ADMIN PRINCIPAL
-- ============================================
-- Ejecuta este script en Supabase SQL Editor

INSERT INTO public.admins (user_id, email, first_name, last_name, role, team, status)
VALUES (
  'a89b7335-c0c3-4fe1-acf1-a98597f21582',
  'admin@pueblobonito.com',
  'Admin',
  'Principal',
  'super_admin',
  'Both',
  'active'
);

-- Verificar que se insertó correctamente
SELECT * FROM public.admins WHERE email = 'admin@pueblobonito.com';

-- ✅ Si ves el registro, todo está listo!
-- Ahora puedes hacer login en: http://localhost:3000/admin/login
