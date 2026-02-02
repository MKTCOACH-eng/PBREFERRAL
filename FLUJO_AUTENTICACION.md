# 🔐 Flujo de Autenticación Completo

## ✅ Implementado

### Flujo para Nuevos Owners:

```
1. Owner va a /homeowner
   ↓
2. Ingresa su email
   ↓
3. Recibe Magic Link por email
   ↓
4. Click en Magic Link
   ↓
5. Sistema verifica si el owner existe
   ↓
6. NO EXISTE → Redirige a /auth/complete-profile
   ↓
7. Owner completa su perfil:
   - Nombre
   - Apellido
   - Teléfono
   - Destino preferido (opcional)
   ↓
8. Crea registro en tabla "owners"
   ↓
9. Redirige a /dashboard ✅
```

### Flujo para Owners Existentes:

```
1. Owner va a /homeowner
   ↓
2. Ingresa su email
   ↓
3. Recibe Magic Link por email
   ↓
4. Click en Magic Link
   ↓
5. Sistema verifica si el owner existe
   ↓
6. SÍ EXISTE → Redirige directamente a /dashboard ✅
```

---

## 📁 Archivos Creados/Modificados

### 1. Callback de Autenticación
**Archivo**: `src/app/[locale]/auth/callback/route.ts`

- Maneja el callback del Magic Link
- Verifica si el owner existe en la BD
- Redirige a `/auth/complete-profile` si es nuevo
- Redirige a `/dashboard` si ya existe

### 2. Página de Completar Perfil
**Archivo**: `src/app/[locale]/auth/complete-profile/page.tsx`

- Página para nuevos owners
- Formulario para capturar información

### 3. Formulario de Completar Perfil
**Archivo**: `src/features/auth/components/CompleteProfileForm.tsx`

Campos:
- ✅ Nombre (requerido)
- ✅ Apellido (requerido)
- ✅ Teléfono (requerido)
- ✅ Destino preferido (opcional)

### 4. Acciones de Autenticación
**Archivo**: `src/features/auth/actions/authActions.ts`

Server Actions:
- `sendMagicLink(email)` - Envía el magic link
- `completeOwnerProfile(formData)` - Crea el perfil del owner

### 5. Componente de Login
**Archivo**: `src/features/auth/components/HomeownerLogin.tsx`

- Formulario de email
- Envía magic link
- Muestra mensaje de éxito

### 6. Página de Error
**Archivo**: `src/app/[locale]/auth/auth-code-error/page.tsx`

- Maneja errores de autenticación
- Link expirado o inválido

---

## 🗄️ Tabla de Owners

La tabla `owners` almacena:

```sql
- id (uuid)
- user_id (uuid) → referencia a auth.users
- email (text)
- first_name (text)
- last_name (text)
- phone (text)
- preferred_destination (text, nullable)
- status (text) → 'active', 'inactive'
- created_at (timestamp)
- updated_at (timestamp)
```

---

## 🔒 Protección del Dashboard

El dashboard (`src/app/[locale]/dashboard/layout.tsx`) verifica:

1. ¿Usuario autenticado? → Si no, redirect a `/homeowner`
2. ¿Owner existe en BD? → Si no, redirect a `/homeowner`

---

## 🎯 Ventajas de este Flujo

### ✅ Seguridad
- Sin contraseñas (passwordless)
- Magic links de un solo uso
- Verificación de email automática

### ✅ Experiencia de Usuario
- Proceso simple y rápido
- Solo pide información necesaria
- Primer acceso vs accesos subsecuentes diferenciados

### ✅ Datos Completos
- Captura nombre, apellido, teléfono
- Permite personalización (destino preferido)
- Información lista para crear referidos

---

## 🧪 Cómo Probar

### Opción 1: Flujo Completo (Recomendado)

1. Ve a http://localhost:3000/homeowner
2. Ingresa un email real (que puedas revisar)
3. Revisa tu email y haz click en el magic link
4. Completa tu perfil
5. Serás redirigido al dashboard

### Opción 2: Crear Owner Manualmente en Supabase

Si quieres saltar el flujo de registro:

```sql
-- 1. Primero crea un usuario en auth.users (usando Supabase Dashboard)
-- 2. Luego ejecuta esto en SQL Editor:

INSERT INTO owners (
  user_id,
  email,
  first_name,
  last_name,
  phone,
  status
) VALUES (
  'tu-user-id-de-auth-users',
  'tu@email.com',
  'Juan',
  'Pérez',
  '+52 555 1234567',
  'active'
);
```

---

## 🔄 Variables de Entorno Necesarias

En `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://npbbllufwjhbcqsexrsc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**IMPORTANTE**: El `NEXT_PUBLIC_APP_URL` debe coincidir con tu URL de desarrollo/producción para que el callback funcione correctamente.

---

## 📧 Configuración de Email en Supabase

Para que los magic links funcionen:

1. Ve a **Authentication → Email Templates** en Supabase
2. Personaliza el template "Magic Link"
3. Asegúrate de que la URL de confirmación apunte a `/auth/callback`

---

## 🚀 Estado Actual

✅ **Funcionando**:
- Magic link authentication
- Verificación de owner existente
- Formulario de completar perfil
- Creación de owner en BD
- Redirect a dashboard

🔄 **Próximos Pasos Opcionales**:
- Agregar validación de teléfono
- Permitir editar perfil desde dashboard
- Agregar foto de perfil
- Verificación de email adicional

---

**Servidor**: http://localhost:3000
**Fecha**: 2 de febrero de 2026
