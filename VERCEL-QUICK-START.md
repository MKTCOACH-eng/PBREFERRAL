# 🚀 VERCEL DEPLOY - INICIO RÁPIDO

## ✅ PASO 1: IMPORTAR EN VERCEL

1. **Ve a:** https://vercel.com/new
2. **Click en:** "Add New..." → "Project"
3. **Importa desde GitHub:**
   - Busca: `MKTCOACH-eng/PBREFERRAL`
   - Click en "Import"

---

## ⚙️ PASO 2: CONFIGURACIÓN DEL PROYECTO

### Framework:
- ✅ **Next.js** (detectado automáticamente)

### Build Settings (dejar por defecto):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

## 🔐 PASO 3: VARIABLES DE ENTORNO

Click en **"Environment Variables"** y agrega estas **3 variables**:

### Variable 1:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://npbbllufwjhbcqsexrsc.supabase.co
```

### Variable 2:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYmJsbHVmd2poYmNxc2V4cnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5OTMyODksImV4cCI6MjA4NTU2OTI4OX0.FhunMNmlc4wZvjvtVbrHznVbnOmNeo6U2t2eq0nox7M
```

### Variable 3:
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYmJsbHVmd2poYmNxc2V4cnNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk5MzI4OSwiZXhwIjoyMDg1NTY5Mjg5fQ.2rFz4nBwxUDgu6H7j4mQUp0-sJ04pr9CoT3kj31NrCE
```

### Variable 4 (la agregaremos después del deploy):
```
Name: NEXT_PUBLIC_APP_URL
Value: [Tu URL de Vercel - la obtendrás después]
```

---

## 🎯 PASO 4: DEPLOY

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Listo! Obtendrás una URL como: `https://pbreferral-xxx.vercel.app`

---

## 🔄 PASO 5: ACTUALIZAR URL DE LA APP

1. Copia tu URL de Vercel
2. Ve a **Settings** → **Environment Variables**
3. Agrega:
   ```
   NEXT_PUBLIC_APP_URL = https://tu-url-real.vercel.app
   ```
4. Ve a **Deployments** → Click en los 3 puntos → **"Redeploy"**

---

## 🔐 PASO 6: ACTUALIZAR SUPABASE

1. Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc
2. **Settings** → **Authentication** → **URL Configuration**
3. Agrega en **Redirect URLs**:
   ```
   https://tu-url-vercel.vercel.app/**
   https://*.vercel.app/**
   ```
4. Click **"Save"**

---

## ✅ VERIFICAR QUE TODO FUNCIONA

Prueba estas URLs:
- `https://tu-url.vercel.app/es/homeowner`
- `https://tu-url.vercel.app/es/admin/login`
- `https://tu-url.vercel.app/es/dashboard`

---

## 🎉 ¡LISTO!

Tu aplicación está en producción. Cada vez que hagas `git push`, Vercel automáticamente hará un nuevo deploy.

---

## 📱 DOMINIO PERSONALIZADO (OPCIONAL)

Si quieres usar `referral.pueblobonito.com`:

1. Ve a Vercel → **Settings** → **Domains**
2. Click **"Add"**
3. Ingresa: `referral.pueblobonito.com`
4. Sigue las instrucciones para configurar DNS
5. Actualiza las URLs en Supabase

---

**¿Necesitas ayuda? Revisa los logs en Vercel → Deployments → [tu deploy] → Build Logs**
