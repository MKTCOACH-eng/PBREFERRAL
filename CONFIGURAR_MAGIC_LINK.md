# 🔧 Configurar Magic Link - Paso a Paso

## ❌ Problema Actual

El email del magic link llega, pero al hacer clic dice: **"Safari no pudo conectarse al servidor"**

**Causa**: Las Redirect URLs no están configuradas en Supabase.

---

## ✅ SOLUCIÓN (5 minutos)

### Paso 1: Ir a Supabase Dashboard

1. **Abre tu navegador** (Chrome, Safari, o Firefox)
2. **Ve a**: https://supabase.com
3. **Inicia sesión** si no lo has hecho
4. **Haz clic en tu proyecto**: `npbbllufwjhbcqsexrsc`

---

### Paso 2: Ir a Authentication Settings

1. En el menú lateral izquierdo, busca **"Authentication"** (ícono de candado 🔐)
2. Haz clic en **"Authentication"**
3. En el submenú que aparece, haz clic en **"URL Configuration"**

**Ruta completa**: `Authentication → URL Configuration`

---

### Paso 3: Configurar Site URL

1. Busca el campo **"Site URL"**
2. **Borra** lo que esté ahí
3. **Escribe exactamente**:
   ```
   http://localhost:3000
   ```
4. **NO hagas clic en Save todavía**

---

### Paso 4: Configurar Redirect URLs

1. Más abajo, busca el campo **"Redirect URLs"**
2. **Agrega estas 3 URLs** (una por línea):

```
http://localhost:3000/en/auth/callback
http://localhost:3000/es/auth/callback
http://localhost:3000/**
```

Debería verse así:

```
┌─────────────────────────────────────────┐
│ Redirect URLs                            │
├─────────────────────────────────────────┤
│ http://localhost:3000/en/auth/callback  │
│ http://localhost:3000/es/auth/callback  │
│ http://localhost:3000/**                │
└─────────────────────────────────────────┘
```

---

### Paso 5: Guardar Cambios

1. **Desplázate hacia abajo** en la página
2. Busca el botón **"Save"** (generalmente verde)
3. **Haz clic en "Save"**
4. Espera el mensaje de confirmación: "Successfully updated settings"

---

## 🧪 Probar de Nuevo

### Paso 1: Ir a la aplicación

1. Abre tu navegador
2. Ve a: **http://localhost:3000/en/homeowner**

### Paso 2: Solicitar nuevo Magic Link

1. Ingresa tu email
2. Haz clic en **"Send Magic Link"**
3. Deberías ver: "Check your email for a secure sign-in link."

### Paso 3: Revisar email

1. Abre tu email
2. Busca el email de Supabase
3. **Haz clic en el enlace**

### Paso 4: Verificar redirección

Ahora deberías ser redirigido correctamente a:
```
http://localhost:3000/en/auth/callback
```

Y luego a:
```
http://localhost:3000/en/dashboard
```

**Nota**: El dashboard aún no está implementado, así que verás un error 404. Esto es **NORMAL**. Lo importante es que el magic link funcione y te redirija correctamente.

---

## 🔍 Verificar que Funcionó

### Señales de Éxito:

1. ✅ El enlace del email **NO dice** "Safari no pudo conectarse"
2. ✅ Te redirige a una URL que empieza con `http://localhost:3000`
3. ✅ Ves la página de tu aplicación (aunque sea un 404 del dashboard)

### Si Todavía No Funciona:

1. **Verifica que guardaste** los cambios en Supabase
2. **Espera 1-2 minutos** para que los cambios se apliquen
3. **Solicita un NUEVO magic link** (los anteriores ya expiraron)
4. **Usa el mismo navegador** donde está corriendo localhost:3000

---

## 📋 Resumen de Configuración

### En Supabase Dashboard:

| Campo | Valor |
|-------|-------|
| **Site URL** | `http://localhost:3000` |
| **Redirect URLs** | `http://localhost:3000/en/auth/callback`<br>`http://localhost:3000/es/auth/callback`<br>`http://localhost:3000/**` |

---

## 🆘 Troubleshooting

### Error: "Safari no pudo conectarse al servidor"

**Causa**: Las Redirect URLs no están configuradas o no se guardaron.

**Solución**:
1. Ve a Supabase → Authentication → URL Configuration
2. Verifica que las URLs estén ahí
3. Haz clic en "Save" de nuevo
4. Espera 1-2 minutos
5. Solicita un NUEVO magic link

---

### Error: "Invalid redirect URL"

**Causa**: La URL en el email no coincide con las configuradas.

**Solución**:
1. Verifica que agregaste `http://localhost:3000/**` (con los asteriscos)
2. Guarda los cambios
3. Solicita un nuevo magic link

---

### Error: 404 después de hacer clic

**Esto es NORMAL** si te redirige a `/dashboard` porque el dashboard aún no está implementado.

**Señales de que funcionó**:
- ✅ La URL cambió a `http://localhost:3000/...`
- ✅ No dice "no pudo conectarse al servidor"
- ✅ Ves una página de tu aplicación (aunque sea 404)

---

## 🎯 Siguiente Paso

Una vez que el magic link funcione:

1. ✅ La autenticación está funcionando
2. ✅ Puedes continuar con el desarrollo
3. 🚧 Siguiente: Implementar el Owner Dashboard

---

## 💡 Nota Importante

**Los magic links expiran en 15 minutos**. Si un enlace no funciona:
1. NO uses el enlace viejo
2. Ve a la aplicación
3. Solicita un NUEVO magic link
4. Usa el enlace nuevo

---

## 📞 Enlaces Útiles

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Tu Proyecto**: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc
- **Auth Settings**: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/url-configuration
- **Aplicación Local**: http://localhost:3000/en/homeowner

---

**¡Sigue estos pasos y el magic link funcionará! 🚀**
