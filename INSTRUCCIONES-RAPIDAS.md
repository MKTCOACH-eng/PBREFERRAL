# ⚡ INSTRUCCIONES RÁPIDAS - CONFIGURACIÓN SUPABASE

## 🚀 PASO 1: Configurar Base de Datos (5 minutos)

1. **Abre Supabase:**
   - Ve a: https://npbbllufwjhbcqsexrsc.supabase.co

2. **SQL Editor:**
   - Click en "SQL Editor" en el menú lateral
   - Click en "New query"

3. **Ejecutar Script:**
   - Abre el archivo `supabase-setup.sql`
   - Copia TODO el contenido
   - Pégalo en el SQL Editor
   - Click en "Run" (o Cmd+Enter / Ctrl+Enter)

4. **Verificar:**
   - Ve a "Table Editor"
   - Debes ver: `owners`, `referrals`, `opportunities`, `rewards`, `activity_log`

✅ **¡Base de datos lista!**

---

## 🔐 PASO 2: Configurar Google OAuth (10 minutos)

### Google Cloud Console

1. **Ir a:** https://console.cloud.google.com/
2. **Crear proyecto** (si no tienes uno): "Pueblo Bonito Referral"
3. **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth Client ID**

4. **Si es primera vez, configurar OAuth Consent Screen:**
   - User Type: External
   - App name: Pueblo Bonito Referral
   - Emails: tu email
   - Save and Continue (3 veces)

5. **Crear OAuth Client:**
   - Application type: Web application
   - Name: Pueblo Bonito Web
   
   **JavaScript origins:**
   ```
   http://localhost:3000
   ```
   
   **Redirect URIs:**
   ```
   http://localhost:3000/auth/callback
   https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback
   ```

6. **Copiar** Client ID y Client Secret

### En Supabase

1. **Authentication** → **Providers**
2. Buscar **Google**
3. Enable Sign in with Google ✅
4. Pegar Client ID y Client Secret
5. **Save**

✅ **¡Google OAuth listo!**

---

## 📘 PASO 3: Configurar Facebook OAuth (10 minutos)

### Facebook Developers

1. **Ir a:** https://developers.facebook.com/
2. **My Apps** → **Create App**
3. Type: **Consumer**
4. Name: Pueblo Bonito Referral
5. **Create App**

6. **Add Product** → **Facebook Login** → **Set Up**
7. Platform: **Web**
8. Site URL: `http://localhost:3000`

9. **Facebook Login** → **Settings**
   
   **Valid OAuth Redirect URIs:**
   ```
   http://localhost:3000/auth/callback
   https://npbbllufwjhbcqsexrsc.supabase.co/auth/v1/callback
   ```
   
10. **Save Changes**

11. **Settings** → **Basic**
    - Copiar **App ID**
    - Click "Show" en **App Secret** y copiarlo

### En Supabase

1. **Authentication** → **Providers**
2. Buscar **Facebook**
3. Enable Sign in with Facebook ✅
4. Pegar App ID (como Client ID) y App Secret (como Client Secret)
5. **Save**

✅ **¡Facebook OAuth listo!**

---

## 🌐 PASO 4: Verificar URLs en Supabase

1. **Authentication** → **URL Configuration**

   **Site URL:**
   ```
   http://localhost:3000
   ```

   **Redirect URLs:**
   ```
   http://localhost:3000/**
   http://localhost:3000/auth/callback
   http://localhost:3000/dashboard
   ```

2. **Save**

✅ **¡URLs configuradas!**

---

## ✅ PASO 5: Probar

1. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Abre:** http://localhost:3000/homeowner

3. **Prueba:**
   - ✅ Registro con email/password
   - ✅ Login con Google
   - ✅ Login con Facebook

---

## 🐛 Problemas Comunes

### "Failed to create profile: relation does not exist"
❌ **Solución:** No ejecutaste el script SQL
✅ **Fix:** Ve al Paso 1 y ejecuta `supabase-setup.sql`

### "Invalid OAuth configuration"
❌ **Solución:** Client ID o Secret incorrectos
✅ **Fix:** Verifica que copiaste bien los valores de Google/Facebook

### "Redirect URI mismatch"
❌ **Solución:** URLs no autorizadas
✅ **Fix:** Verifica las Redirect URIs en Google/Facebook

---

## 📚 Documentación Completa

Para más detalles, consulta: `SUPABASE-CONFIG.md`

---

## 🎉 ¡Listo!

Tu plataforma está configurada y lista para usar.
