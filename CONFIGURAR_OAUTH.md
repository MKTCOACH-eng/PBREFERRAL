# Configurar Autenticación Social (Google y Facebook)

## ✅ Cambios Implementados

1. **Eliminado Magic Link** - Reemplazado con sistema tradicional
2. **Nuevo sistema de autenticación:**
   - ✅ Sign Up / Sign In con Email y Password
   - ✅ Botón "Continue with Google"
   - ✅ Botón "Continue with Facebook"
3. **Traducciones corregidas** - Ahora funciona correctamente en español
4. **Formulario mejorado** con tabs para alternar entre Sign Up y Sign In

---

## 🔧 Configuración Requerida en Supabase

### 1. Configurar Google OAuth

1. Ve a tu **Supabase Dashboard** → Tu Proyecto → **Authentication** → **Providers**
2. Busca **Google** y haz click en configurar
3. Activa **Enable Sign in with Google**
4. Necesitarás crear credenciales en Google Cloud Console:

#### Crear Credenciales de Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Ve a **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs:
     ```
     https://[TU-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - Copia el **Client ID** y **Client Secret**

5. Pega las credenciales en Supabase:
   - **Client ID**: [tu-google-client-id]
   - **Client Secret**: [tu-google-client-secret]

---

### 2. Configurar Facebook OAuth

1. En **Supabase Dashboard** → **Authentication** → **Providers**
2. Busca **Facebook** y haz click en configurar
3. Activa **Enable Sign in with Facebook**
4. Necesitarás crear una app en Facebook Developers:

#### Crear App de Facebook:
   - Ve a [Facebook Developers](https://developers.facebook.com/)
   - Click **My Apps** → **Create App**
   - Selecciona **Consumer** como tipo de app
   - Completa los detalles de la app
   - Ve a **Settings** → **Basic**
   - Agrega **Facebook Login** como producto
   - En **Facebook Login Settings**, agrega Valid OAuth Redirect URIs:
     ```
     https://[TU-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - Copia el **App ID** y **App Secret**

5. Pega las credenciales en Supabase:
   - **Facebook Client ID**: [tu-facebook-app-id]
   - **Facebook Client Secret**: [tu-facebook-app-secret]

---

## 🎯 Cómo Funciona Ahora

### Sign Up (Registro):
1. Usuario puede elegir:
   - **Google** → Registro instantáneo con cuenta de Google
   - **Facebook** → Registro instantáneo con cuenta de Facebook
   - **Email/Password** → Formulario completo con:
     - Nombre, Apellido, Teléfono
     - Email y Contraseña
     - Destino preferido
     - Checkboxes de consentimiento

2. Al registrarse, se crea:
   - ✅ Usuario en `auth.users`
   - ✅ Perfil en tabla `owners`
   - ✅ Redirect automático a `/dashboard`

### Sign In (Iniciar Sesión):
1. Usuario puede elegir:
   - **Google** → Login instantáneo
   - **Facebook** → Login instantáneo
   - **Email/Password** → Solo email y contraseña

2. Después del login:
   - ✅ Redirect automático a `/dashboard`

---

## 🚀 Próximos Pasos

1. **Configurar Google OAuth** en Supabase (usa las instrucciones arriba)
2. **Configurar Facebook OAuth** en Supabase (usa las instrucciones arriba)
3. **Probar el flujo completo:**
   - Registro con Google
   - Registro con Facebook
   - Registro con Email/Password
   - Login con cada método

4. **Opcional:** Implementar "Forgot Password" flow si es necesario

---

## ⚠️ Notas Importantes

- Los providers de OAuth (Google/Facebook) **requieren HTTPS** en producción
- En desarrollo local (`localhost:3000`), funcionarán sin problema
- Asegúrate de que las URLs de callback estén correctamente configuradas
- Los usuarios que se registren con OAuth social también tendrán perfil en la tabla `owners`

---

## 🔐 Seguridad

- Las contraseñas se hashean automáticamente por Supabase
- Mínimo 6 caracteres requeridos
- OAuth tokens manejados de forma segura por Supabase
- Sesiones gestionadas con cookies HTTP-only
