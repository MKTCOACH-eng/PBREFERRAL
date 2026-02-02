# ✅ CHECKLIST DE CONFIGURACIÓN - PUEBLO BONITO REFERRAL

## 📋 Base de Datos Supabase

### Paso 1: Ejecutar Script SQL
- [ ] Abrí Supabase SQL Editor
- [ ] Copié el contenido de `supabase-setup.sql`
- [ ] Ejecuté el script (Run)
- [ ] Verifiqué las 5 tablas en Table Editor

### Paso 2: Verificar Tablas
Verifica que estas tablas existen:
- [ ] `owners` - Perfiles de propietarios
- [ ] `referrals` - Referidos creados por owners
- [ ] `opportunities` - Pipeline para equipo interno
- [ ] `rewards` - Recompensas y bonos
- [ ] `activity_log` - Historial de actividades

---

## 🔐 Autenticación

### Email/Password
- [ ] Email auth está habilitado en Supabase
- [ ] Puedo crear cuenta con email/password
- [ ] Puedo iniciar sesión

### Google OAuth (Opcional pero recomendado)
- [ ] Creé proyecto en Google Cloud Console
- [ ] Configuré OAuth Consent Screen
- [ ] Creé OAuth Client ID
- [ ] Agregué Redirect URIs:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback`
- [ ] Copié Client ID y Client Secret
- [ ] Habilitaré Google en Supabase → Authentication → Providers
- [ ] Pegué credenciales y guardé
- [ ] Probé login con Google ✅

### Facebook OAuth (Opcional)
- [ ] Creé app en Facebook Developers
- [ ] Agregué Facebook Login product
- [ ] Configuré Valid OAuth Redirect URIs:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback`
- [ ] Copié App ID y App Secret
- [ ] Habilité Facebook en Supabase → Authentication → Providers
- [ ] Pegué credenciales y guardé
- [ ] Probé login con Facebook ✅

---

## 🌐 URLs de Redirección

### En Supabase
- [ ] Fui a Authentication → URL Configuration
- [ ] Site URL: `http://localhost:3000`
- [ ] Redirect URLs configuradas:
  - [ ] `http://localhost:3000/**`
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `http://localhost:3000/dashboard`

---

## 🧪 Pruebas Funcionales

### Registro de Usuario
- [ ] Puedo acceder a `/homeowner`
- [ ] El selector de país funciona (por defecto +52)
- [ ] Puedo seleccionar diferentes países
- [ ] Puedo registrarme con email/password
- [ ] Se crea el perfil en la tabla `owners`
- [ ] Me redirige a `/dashboard` después del registro

### Login con Google
- [ ] Click en "Continuar con Google"
- [ ] Me redirige a Google
- [ ] Autorizo la app
- [ ] Vuelvo a la app en `/dashboard`
- [ ] Se crea automáticamente mi perfil en `owners`

### Login con Facebook
- [ ] Click en "Continuar con Facebook"
- [ ] Me redirige a Facebook
- [ ] Autorizo la app
- [ ] Vuelvo a la app en `/dashboard`
- [ ] Se crea automáticamente mi perfil en `owners`

### UI/UX
- [ ] El logo se ve correctamente (blanco)
- [ ] El logo tiene buen tamaño
- [ ] El header no tiene el botón "Acceso" (solo en Hero)
- [ ] El modal de autenticación no se desborda
- [ ] Puedo ver/ocultar la contraseña (icono de ojo)
- [ ] El selector de país + teléfono se ve bien
- [ ] El footer se ve correctamente
- [ ] Los idiomas ES/EN funcionan

---

## 🔍 Verificación Técnica

### Variables de Entorno
Verifica que `.env.local` tiene:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### Servidor de Desarrollo
- [ ] El servidor corre en `http://localhost:3000` (no otro puerto)
- [ ] No hay errores en la consola del servidor
- [ ] No hay errores en la consola del navegador (F12)

---

## 🐛 Resolución de Problemas

### Si ves: "Failed to create profile: relation does not exist"
❌ **Problema:** La tabla `owners` no existe
✅ **Solución:** Ejecuta `supabase-setup.sql` en Supabase SQL Editor

### Si ves: "Invalid OAuth configuration"
❌ **Problema:** Client ID o Secret incorrectos
✅ **Solución:** Verifica en Google Cloud / Facebook Developers

### Si ves: "Redirect URI mismatch"
❌ **Problema:** URLs no autorizadas
✅ **Solución:** Verifica Redirect URIs en Google/Facebook y Supabase

### Si ves: "Permission denied"
❌ **Problema:** Políticas RLS bloqueando
✅ **Solución:** Ejecuta `supabase-setup.sql` completo (incluye políticas)

---

## ✨ Estado Actual del Proyecto

### ✅ COMPLETADO
- [x] Homepage con Hero
- [x] Header con logo y navegación
- [x] Footer con información de contacto
- [x] Página de Homeowner (`/homeowner`)
- [x] Sistema de autenticación (Email, Google, Facebook)
- [x] Modal de registro/login
- [x] Selector de país con código de área
- [x] Toggle para ver/ocultar contraseña
- [x] Internacionalización (ES/EN)
- [x] Setup completo de Supabase
- [x] Documentación de configuración

### 🚧 EN PROGRESO / PENDIENTE
- [ ] Owner Dashboard (`/dashboard`)
- [ ] Formulario para crear referidos
- [ ] Lista de referidos con filtros
- [ ] Página de recompensas
- [ ] Guest Landing Page (`/homeguest`)
- [ ] Internal Team Portal
- [ ] Admin Portals
- [ ] Sistema de notificaciones
- [ ] Concierge Bot

---

## 📞 Siguiente Paso

Una vez que **TODOS** los checkboxes de "Base de Datos", "Autenticación" y "URLs" estén marcados:

```bash
npm run dev
```

Y prueba crear una cuenta en: http://localhost:3000/homeowner

¡Buena suerte! 🚀
