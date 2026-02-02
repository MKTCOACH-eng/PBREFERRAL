# 🚨 URGENTE: Configurar Redirect URLs en Supabase

## ❌ Problema Actual

El magic link NO funciona porque **las Redirect URLs no están configuradas en Supabase**.

Error que aparece: **"Authentication Error - Sorry, we couldn't verify your magic link."**

---

## ✅ SOLUCIÓN (5 minutos)

### Paso 1: Abre Supabase Dashboard

**Copia y pega este enlace en tu navegador**:

```
https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/url-configuration
```

O navega manualmente:
1. Ve a https://supabase.com
2. Inicia sesión
3. Haz clic en tu proyecto: `npbbllufwjhbcqsexrsc`
4. En el menú lateral izquierdo: **Authentication** → **URL Configuration**

---

### Paso 2: Configura Site URL

Busca el campo **"Site URL"** y escribe:

```
http://localhost:3000
```

---

### Paso 3: Configura Redirect URLs

Busca el campo **"Redirect URLs"**.

**IMPORTANTE**: Borra todo lo que esté ahí y agrega estas 3 líneas (una por línea):

```
http://localhost:3000/en/auth/callback
http://localhost:3000/es/auth/callback
http://localhost:3000/**
```

Debe verse así:

```
┌──────────────────────────────────────────┐
│ Redirect URLs                             │
├──────────────────────────────────────────┤
│ http://localhost:3000/en/auth/callback   │
│ http://localhost:3000/es/auth/callback   │
│ http://localhost:3000/**                 │
└──────────────────────────────────────────┘
```

---

### Paso 4: Guarda los Cambios

1. **Desplázate hacia abajo** en la página
2. Busca el botón **"Save"** (generalmente es verde o azul)
3. **Haz clic en "Save"**
4. **Espera el mensaje de confirmación**: "Successfully updated settings"

---

### Paso 5: Espera 2 Minutos

**MUY IMPORTANTE**: Los cambios tardan 1-2 minutos en aplicarse.

**Espera 2 minutos completos antes de continuar.**

---

## 🧪 Probar el Magic Link

### Paso 1: Abre la aplicación

```
http://localhost:3000/en/homeowner
```

### Paso 2: Ingresa tu email

Usa un email real que puedas revisar.

### Paso 3: Haz clic en "SEND MAGIC LINK"

Deberías ver un mensaje de éxito.

### Paso 4: Revisa tu email

- **Busca en SPAM también**
- Remitente: `noreply@mail.app.supabase.io`
- Asunto: "Confirm your signup" o "Magic Link"

### Paso 5: Haz clic en el enlace del email

**NO uses enlaces viejos - solicita un nuevo magic link**

### Paso 6: Verifica el resultado

Deberías ser redirigido a:
```
http://localhost:3000/en/dashboard
```

Y ver:
```
✅ ¡Autenticación Exitosa! 🎉
El Magic Link funcionó correctamente
```

---

## ❓ Si Todavía No Funciona

### Verifica que guardaste los cambios:

1. Ve de nuevo a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/url-configuration
2. Verifica que las 3 URLs estén ahí
3. Si no están, agrégalas de nuevo y guarda

### Verifica que el servidor esté corriendo:

```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
npm run dev
```

Deberías ver:
```
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 1314ms
```

### Solicita un NUEVO magic link:

**NO uses enlaces viejos del email**. Los magic links expiran en 15 minutos.

1. Ve a http://localhost:3000/en/homeowner
2. Ingresa tu email de nuevo
3. Haz clic en "SEND MAGIC LINK"
4. Revisa tu email (incluyendo SPAM)
5. Haz clic en el NUEVO enlace

---

## 📸 Capturas de Pantalla de Referencia

### Cómo debe verse la configuración en Supabase:

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs:**
```
http://localhost:3000/en/auth/callback
http://localhost:3000/es/auth/callback
http://localhost:3000/**
```

---

## 🎨 Nuevo Diseño Pueblo Bonito

También he actualizado todo el diseño para que coincida con https://www.pueblobonito.com.mx/:

### Cambios de Diseño:

✅ **Colores de Pueblo Bonito**:
- Dorado elegante: `#C8A882`
- Azul marino: `#1A2332`
- Crema: `#F8F6F3`

✅ **Tipografía**:
- Títulos: `Playfair Display` (serif elegante)
- Texto: `Montserrat` (sans-serif moderna)

✅ **Estilo**:
- Sin bordes redondeados (más elegante)
- Bordes dorados decorativos
- Espaciado amplio y sofisticado
- Sombras sutiles
- Transiciones suaves

---

## 📞 Contacto

Si después de seguir TODOS estos pasos el magic link sigue sin funcionar:

**Envíame**:
1. ✅ Confirmación de que guardaste las Redirect URLs en Supabase
2. ✅ Captura de pantalla de la configuración en Supabase
3. ✅ Captura de pantalla del error que ves
4. ✅ La URL completa a la que te redirige el enlace

---

## ⚡ Resumen Rápido

1. ✅ Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/url-configuration
2. ✅ Site URL: `http://localhost:3000`
3. ✅ Redirect URLs (3 líneas):
   ```
   http://localhost:3000/en/auth/callback
   http://localhost:3000/es/auth/callback
   http://localhost:3000/**
   ```
4. ✅ Haz clic en "Save"
5. ✅ Espera 2 minutos
6. ✅ Solicita un NUEVO magic link
7. ✅ Haz clic en el enlace del email
8. ✅ Deberías ver "¡Autenticación Exitosa!"

---

**🚀 Una vez que funcione el magic link, podemos continuar con el Owner Dashboard!**
