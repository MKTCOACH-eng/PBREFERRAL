# 🔧 CONFIGURACIÓN DE SUPABASE PARA PUEBLO BONITO REFERRAL

## 📋 TABLA DE CONTENIDOS
1. [Configuración de Base de Datos](#1-configuración-de-base-de-datos)
2. [Configuración de OAuth (Google y Facebook)](#2-configuración-de-oauth)
3. [Verificación de URLs](#3-verificación-de-urls)
4. [Pruebas](#4-pruebas)

---

## 1. 🗄️ CONFIGURACIÓN DE BASE DE DATOS

### Paso 1: Acceder al SQL Editor
1. Ve a tu proyecto en Supabase: https://npbbllufwjhbcqsexrsc.supabase.co
2. En el menú lateral, haz clic en **"SQL Editor"**
3. Haz clic en **"New query"**

### Paso 2: Ejecutar el Script
1. Abre el archivo `supabase-setup.sql` que está en la raíz del proyecto
2. **Copia TODO el contenido** del archivo
3. **Pégalo** en el SQL Editor de Supabase
4. Haz clic en **"Run"** (o presiona Ctrl+Enter / Cmd+Enter)

### Paso 3: Verificar que se crearon las tablas
1. Ve a **"Table Editor"** en el menú lateral
2. Deberías ver estas tablas:
   - ✅ `owners`
   - ✅ `referrals`
   - ✅ `opportunities`
   - ✅ `rewards`
   - ✅ `activity_log`

---

## 2. 🔐 CONFIGURACIÓN DE OAUTH

### A) GOOGLE OAUTH

#### Paso 1: Crear Credenciales en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente (ej: "Pueblo Bonito Referral")
3. En el menú lateral, ve a **"APIs & Services"** → **"Credentials"**
4. Haz clic en **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Si es la primera vez, configura la **"OAuth consent screen"**:
   - User Type: **External**
   - App name: **Pueblo Bonito Referral**
   - User support email: tu email
   - Developer contact: tu email
   - Haz clic en **"Save and Continue"**
   - En Scopes, haz clic en **"Save and Continue"** (sin agregar scopes)
   - En Test users, agrega tu email para pruebas
   - Haz clic en **"Save and Continue"**

#### Paso 2: Crear OAuth Client ID
1. Ahora crea el **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Name: **Pueblo Bonito Referral Web**
   
2. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://npbbllufwjhbcqsexrsc.supabase.co
   ```

3. **Authorized redirect URIs:**
   ```
   http://localhost:3000/auth/callback
   https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback
   ```

4. Haz clic en **"Create"**
5. **GUARDA** el **Client ID** y **Client Secret** que aparecen

#### Paso 3: Configurar en Supabase
1. Ve a tu proyecto en Supabase
2. En el menú lateral, ve a **"Authentication"** → **"Providers"**
3. Busca **"Google"** en la lista
4. Activa el toggle **"Enable Sign in with Google"**
5. Pega tu **Client ID** y **Client Secret** de Google
6. Haz clic en **"Save"**

---

### B) FACEBOOK OAUTH

#### Paso 1: Crear una App en Facebook
1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Haz clic en **"My Apps"** → **"Create App"**
3. Selecciona **"Consumer"** como tipo de app
4. Nombre de la app: **Pueblo Bonito Referral**
5. Email de contacto: tu email
6. Haz clic en **"Create App"**

#### Paso 2: Configurar Facebook Login
1. En el dashboard de tu app, ve a **"Add Product"**
2. Busca **"Facebook Login"** y haz clic en **"Set Up"**
3. Selecciona **"Web"** como plataforma
4. En "Site URL", ingresa: `http://localhost:3000`
5. Haz clic en **"Save"**

#### Paso 3: Configurar OAuth Redirect URIs
1. En el menú lateral, ve a **"Facebook Login"** → **"Settings"**
2. En **"Valid OAuth Redirect URIs"**, agrega:
   ```
   http://localhost:3000/auth/callback
   https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback
   ```
3. Haz clic en **"Save Changes"**

#### Paso 4: Obtener App ID y App Secret
1. En el menú lateral, ve a **"Settings"** → **"Basic"**
2. Copia el **App ID**
3. Haz clic en **"Show"** en **App Secret** y cópialo (necesitarás verificar tu contraseña)

#### Paso 5: Configurar en Supabase
1. Ve a tu proyecto en Supabase
2. En el menú lateral, ve a **"Authentication"** → **"Providers"**
3. Busca **"Facebook"** en la lista
4. Activa el toggle **"Enable Sign in with Facebook"**
5. Pega tu **App ID** como "Client ID"
6. Pega tu **App Secret** como "Client Secret"
7. Haz clic en **"Save"**

#### Paso 6: Hacer la App Pública (cuando estés listo para producción)
1. En el dashboard de Facebook, ve a **"Settings"** → **"Basic"**
2. Completa toda la información requerida (Privacy Policy, Terms of Service, etc.)
3. Cambia el switch de **"Development"** a **"Live"**
4. Haz clic en **"Switch Mode"**

---

## 3. 🌐 VERIFICACIÓN DE URLs

### Paso 1: URLs de Redirección en Supabase
1. Ve a **"Authentication"** → **"URL Configuration"**
2. Verifica que estas URLs estén configuradas:

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs (una por línea):**
```
http://localhost:3000/**
http://localhost:3000/auth/callback
http://localhost:3000/dashboard
```

---

## 4. ✅ PRUEBAS

### Checklist de Verificación

#### Base de Datos:
- [ ] Las 5 tablas están creadas
- [ ] Las políticas RLS están activas
- [ ] Los triggers funcionan correctamente

#### Autenticación Email/Password:
- [ ] Puedes crear una cuenta con email/password
- [ ] Recibes el email de confirmación (si está habilitado)
- [ ] Puedes iniciar sesión
- [ ] Se crea el registro en la tabla `owners`

#### Autenticación Google:
- [ ] El botón "Continuar con Google" aparece
- [ ] Al hacer clic, te redirige a Google
- [ ] Después de autenticar, vuelves a `/dashboard`
- [ ] Se crea el registro en la tabla `owners`

#### Autenticación Facebook:
- [ ] El botón "Continuar con Facebook" aparece
- [ ] Al hacer clic, te redirige a Facebook
- [ ] Después de autenticar, vuelves a `/dashboard`
- [ ] Se crea el registro en la tabla `owners`

#### Selector de País:
- [ ] El selector de país aparece correctamente
- [ ] El país por defecto es México (+52)
- [ ] Puedes seleccionar otros países
- [ ] El número completo se guarda con el código de país

---

## 🚨 PROBLEMAS COMUNES

### Error: "Failed to create profile"
**Causa:** La tabla `owners` no existe o tiene permisos incorrectos

**Solución:**
1. Verifica que ejecutaste el script SQL completo
2. Ve a "Table Editor" y confirma que la tabla `owners` existe
3. Ve a "Authentication" → "Policies" y verifica que las políticas RLS estén activas

---

### Error: "Invalid OAuth configuration"
**Causa:** Client ID o Client Secret incorrectos

**Solución:**
1. Verifica que copiaste correctamente el Client ID y Secret
2. Asegúrate de que no haya espacios al inicio o final
3. Verifica que las Redirect URIs estén correctamente configuradas

---

### Error: "Redirect URI mismatch"
**Causa:** La URL de redirección no está autorizada

**Solución:**
1. Verifica que agregaste todas las URLs necesarias en Google Cloud o Facebook
2. Asegúrate de que las URLs terminen exactamente como se especifica
3. Guarda los cambios en Google Cloud / Facebook
4. Espera unos minutos para que los cambios se propaguen

---

## 📞 SOPORTE

Si tienes algún problema:
1. Revisa los logs en Supabase: **"Logs"** → **"Postgres Logs"** o **"Auth Logs"**
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que todas las variables de entorno en `.env.local` estén correctas

---

## ✨ ¡LISTO!

Una vez completados todos los pasos, tu plataforma de referidos estará completamente configurada y lista para usar.

**Próximos pasos:**
1. Completar el Owner Dashboard
2. Implementar el Guest Landing Page
3. Crear el Internal Team Portal
4. Configurar notificaciones por email
