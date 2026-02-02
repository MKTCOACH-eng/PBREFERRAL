# 🚀 INSTRUCCIONES PARA DEPLOY A PRODUCCIÓN

## 📋 PRE-REQUISITOS

1. **Cuenta de Vercel** (https://vercel.com)
2. **Cuenta de GitHub** con el repositorio
3. **Acceso a Supabase Dashboard**

---

## 🔧 PASO 1: PREPARAR REPOSITORIO EN GITHUB

### Opción A: Si ya tienes un repositorio
```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
git remote -v  # Verificar remote
git push origin main  # O el nombre de tu branch principal
```

### Opción B: Si necesitas crear un nuevo repositorio
1. Ve a https://github.com/new
2. Crea un repositorio llamado `pb-referral-platform`
3. Ejecuta:
```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
git remote add origin https://github.com/TU-USUARIO/pb-referral-platform.git
git branch -M main
git push -u origin main
```

---

## 🌐 PASO 2: DEPLOY EN VERCEL

### 2.1 Importar Proyecto
1. Ve a https://vercel.com/new
2. Click en **"Import Git Repository"**
3. Selecciona tu repositorio `pb-referral-platform`
4. Click en **"Import"**

### 2.2 Configurar Proyecto
- **Framework Preset:** Next.js
- **Root Directory:** `./` (dejar por defecto)
- **Build Command:** `npm run build` (dejar por defecto)
- **Output Directory:** `.next` (dejar por defecto)

### 2.3 Agregar Variables de Entorno
En la sección **"Environment Variables"**, agrega las siguientes:

```
NEXT_PUBLIC_SUPABASE_URL=https://npbbllufwjhbcqsexrsc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYmJsbHVmd2poYmNxc2V4cnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5OTMyODksImV4cCI6MjA4NTU2OTI4OX0.FhunMNmlc4wZvjvtVbrHznVbnOmNeo6U2t2eq0nox7M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYmJsbHVmd2poYmNxc2V4cnNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk5MzI4OSwiZXhwIjoyMDg1NTY5Mjg5fQ.2rFz4nBwxUDgu6H7j4mQUp0-sJ04pr9CoT3kj31NrCE
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

⚠️ **IMPORTANTE:** Reemplaza `tu-proyecto.vercel.app` con tu URL real de Vercel después del deploy.

### 2.4 Deploy
1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu proyecto
3. Una vez completado, obtendrás una URL como: `https://pb-referral-platform.vercel.app`

---

## 🔐 PASO 3: ACTUALIZAR SUPABASE

### 3.1 Actualizar URLs Permitidas
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto: `npbbllufwjhbcqsexrsc`
3. Ve a **Settings** → **Authentication** → **URL Configuration**
4. Agrega las siguientes URLs:

**Site URL:**
```
https://tu-proyecto.vercel.app
```

**Redirect URLs (agregar todas):**
```
http://localhost:3000/**
https://tu-proyecto.vercel.app/**
https://*.vercel.app/**
```

### 3.2 Guardar Cambios
Click en **"Save"** en Supabase

---

## 🔄 PASO 4: ACTUALIZAR VARIABLE EN VERCEL

1. Ve a tu proyecto en Vercel
2. Click en **"Settings"** → **"Environment Variables"**
3. Edita `NEXT_PUBLIC_APP_URL` con tu URL real de producción
4. Click en **"Save"**
5. Ve a **"Deployments"** y click en **"Redeploy"** para aplicar cambios

---

## ✅ PASO 5: VERIFICAR DEPLOY

### URLs a Probar:
1. **Homepage:** `https://tu-proyecto.vercel.app/es/homeowner`
2. **Admin Login:** `https://tu-proyecto.vercel.app/es/admin/login`
3. **Owner Dashboard:** `https://tu-proyecto.vercel.app/es/dashboard`

### Checklist de Verificación:
- [ ] La página carga sin errores
- [ ] El login funciona correctamente
- [ ] Las imágenes se cargan
- [ ] La navegación funciona
- [ ] Supabase conecta correctamente

---

## 🐛 TROUBLESHOOTING

### Error: "Invalid redirect URL"
**Solución:** Verifica que agregaste todas las URLs en Supabase → Authentication → URL Configuration

### Error: "Supabase client error"
**Solución:** Verifica que las variables de entorno en Vercel sean correctas

### Error de Build
**Solución:** Revisa los logs en Vercel → Deployments → [tu deploy] → Build Logs

---

## 📝 NOTAS IMPORTANTES

1. **Dominio Personalizado (Opcional):**
   - Ve a Vercel → Settings → Domains
   - Agrega tu dominio personalizado (ej: `referral.pueblobonito.com`)
   - Actualiza las URLs en Supabase

2. **Monitoreo:**
   - Vercel Analytics: Automático
   - Logs: Vercel → Deployments → Runtime Logs

3. **Actualizaciones Futuras:**
   ```bash
   git add .
   git commit -m "tu mensaje"
   git push origin main
   ```
   Vercel automáticamente detectará el push y hará un nuevo deploy.

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DEL DEPLOY

1. **Crear usuario admin en producción:**
   - Ejecuta el script `INSERT-ADMIN.sql` en Supabase (producción)
   
2. **Probar flujos completos:**
   - Registro de propietario
   - Creación de referido
   - Login de admin
   - Generación de vouchers

3. **Configurar emails (opcional):**
   - Supabase → Authentication → Email Templates
   - Personalizar templates de confirmación

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica las variables de entorno
3. Confirma que Supabase tiene las URLs correctas

---

**¡Tu aplicación estará en producción en menos de 10 minutos!** 🚀
