# 🏖️ Pueblo Bonito Referral Platform

Plataforma de referidos para propietarios de Pueblo Bonito Resort.

## 🚀 Quick Start

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env.local` con:
```env
NEXT_PUBLIC_SUPABASE_URL=https://npbbllufwjhbcqsexrsc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurar Supabase

#### Opción A: Instrucciones Rápidas (5-10 min)
📖 Lee: **[INSTRUCCIONES-RAPIDAS.md](./INSTRUCCIONES-RAPIDAS.md)**

#### Opción B: Documentación Completa
📚 Lee: **[SUPABASE-CONFIG.md](./SUPABASE-CONFIG.md)**

#### Paso Principal: Ejecutar Script SQL
1. Ve a [Supabase SQL Editor](https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/sql)
2. Copia y pega el contenido de [`supabase-setup.sql`](./supabase-setup.sql)
3. Click en "Run"

### 4. Iniciar Servidor
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
pb-referral/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Rutas internacionalizadas
│   │   │   ├── homeowner/      # Landing page para propietarios
│   │   │   ├── dashboard/      # Dashboard del propietario
│   │   │   └── layout.tsx      # Layout principal
│   │   └── auth/
│   │       └── callback/       # OAuth callback
│   ├── features/
│   │   ├── auth/               # Autenticación
│   │   │   ├── components/     # AuthModal, HomeownerHero, etc.
│   │   │   └── actions/        # Server actions (signUp, signIn)
│   │   └── dashboard/          # Features del dashboard
│   ├── shared/
│   │   └── components/         # Componentes compartidos
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── LanguageSwitcher.tsx
│   ├── lib/
│   │   └── supabase/           # Cliente de Supabase
│   └── i18n/                   # Configuración de internacionalización
├── messages/
│   ├── en.json                 # Traducciones inglés
│   └── es.json                 # Traducciones español
├── public/                     # Assets estáticos
├── supabase-setup.sql          # Script de setup de base de datos
├── CHECKLIST.md                # Checklist de configuración
├── INSTRUCCIONES-RAPIDAS.md    # Guía rápida de setup
└── SUPABASE-CONFIG.md          # Documentación completa
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Autenticación
- ✅ Registro con Email/Password
- ✅ Login con Email/Password
- ✅ Login con Google OAuth
- ✅ Login con Facebook OAuth
- ✅ Selector de país con código de área para teléfono
- ✅ Toggle para ver/ocultar contraseña
- ✅ Modal elegante y responsivo

### ✅ UI/UX
- ✅ Header con logo Pueblo Bonito (blanco)
- ✅ Hero section con imagen de marca
- ✅ Footer con información de contacto (Los Cabos y Mazatlán)
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Animaciones y transiciones suaves
- ✅ Look & feel de Pueblo Bonito

### ✅ Internacionalización
- ✅ Soporte para Español e Inglés
- ✅ Selector de idioma en header
- ✅ Traducciones completas

### ✅ Base de Datos
- ✅ Tabla `owners` - Perfiles de propietarios
- ✅ Tabla `referrals` - Referidos
- ✅ Tabla `opportunities` - Pipeline interno
- ✅ Tabla `rewards` - Recompensas
- ✅ Tabla `activity_log` - Historial
- ✅ Row Level Security (RLS) configurado
- ✅ Triggers y funciones automáticas

---

## 🚧 Próximas Funcionalidades

### Owner Dashboard
- [ ] Navegación principal del dashboard
- [ ] Formulario para crear nuevos referidos
- [ ] Lista de referidos con filtros
- [ ] Página de recompensas y bonos
- [ ] Perfil del propietario

### Guest Landing Page
- [ ] Página para invitados referidos
- [ ] Información de ofertas especiales
- [ ] Formulario de registro de invitado

### Internal Team Portal
- [ ] Pipeline de oportunidades por destino
- [ ] Gestión de referidos
- [ ] Asignación a miembros del equipo
- [ ] Seguimiento y notas

### Admin Portals
- [ ] Dashboard de administrador
- [ ] Gestión de usuarios
- [ ] Reportes y analytics
- [ ] Configuración del sistema

### Notificaciones
- [ ] Email notifications
- [ ] In-app notifications
- [ ] Templates de email

### Concierge Bot
- [ ] Chat bot para owners
- [ ] Respuestas automáticas
- [ ] Integración con sistema

---

## 🛠️ Tecnologías

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Backend:** Supabase (PostgreSQL + Auth)
- **Autenticación:** Supabase Auth (Email, Google, Facebook)
- **Internacionalización:** next-intl
- **TypeScript:** Tipado completo
- **Forms:** React Hook Form + Zod

---

## 📊 Base de Datos

### Tablas Principales

#### `owners`
Perfiles de propietarios registrados
- `id`, `user_id`, `email`, `first_name`, `last_name`
- `phone`, `preferred_destination`
- `total_referrals`, `successful_referrals`, `total_rewards_earned`
- `status`, `created_at`, `updated_at`

#### `referrals`
Referidos creados por propietarios
- `id`, `owner_id`, `guest_first_name`, `guest_last_name`
- `guest_email`, `guest_phone`, `destination`
- `preferred_dates`, `number_of_guests`
- `status`, `special_requests`, `notes`
- `created_at`, `updated_at`

#### `opportunities`
Pipeline para equipo interno
- `id`, `referral_id`, `assigned_to`
- `pipeline_stage`, `priority`, `estimated_value`
- `probability`, `expected_close_date`
- `last_contact_date`, `next_follow_up`, `notes`

#### `rewards`
Recompensas y bonos
- `id`, `owner_id`, `referral_id`
- `reward_type`, `amount`, `currency`
- `status`, `description`
- `approved_by`, `approved_at`, `paid_at`

#### `activity_log`
Historial de actividades
- `id`, `entity_type`, `entity_id`
- `action`, `actor_id`, `actor_email`
- `details`, `created_at`

---

## 🔐 Seguridad

- ✅ Row Level Security (RLS) habilitado en todas las tablas
- ✅ Políticas de acceso por usuario
- ✅ Service role para operaciones de servidor
- ✅ OAuth seguro (Google, Facebook)
- ✅ Passwords hasheados por Supabase
- ✅ HTTPS en producción

---

## 🌐 URLs Importantes

### Desarrollo
- App: http://localhost:3000
- Homeowner: http://localhost:3000/homeowner
- Dashboard: http://localhost:3000/dashboard

### Supabase
- Dashboard: https://npbbllufwjhbcqsexrsc.supabase.co
- SQL Editor: https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/sql
- Authentication: https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/auth

---

## 📝 Checklist de Setup

Usa el checklist interactivo: **[CHECKLIST.md](./CHECKLIST.md)**

---

## 🐛 Troubleshooting

### Error: "Failed to create profile"
**Solución:** Ejecuta `supabase-setup.sql` en Supabase SQL Editor

### Error: "Invalid OAuth configuration"
**Solución:** Verifica Client ID y Secret en Google/Facebook

### Error: "Redirect URI mismatch"
**Solución:** Verifica que las Redirect URIs estén correctamente configuradas

### Puerto incorrecto (no 3000)
**Solución:** Mata procesos: `killall -9 node` y reinicia: `npm run dev`

Ver más en: [SUPABASE-CONFIG.md](./SUPABASE-CONFIG.md)

---

## 📞 Contacto

Para más información sobre Pueblo Bonito:
- **Sitio Web:** https://www.pueblobonito.com.mx/
- **Los Cabos:** +52 (624) 142-9898
- **Mazatlán:** +52 (669) 989-8900

---

## 📄 Licencia

Privado - Pueblo Bonito Resorts

---

## 🎉 ¡Listo para Empezar!

1. ✅ Lee [INSTRUCCIONES-RAPIDAS.md](./INSTRUCCIONES-RAPIDAS.md)
2. ✅ Ejecuta `supabase-setup.sql` en Supabase
3. ✅ Configura OAuth (opcional)
4. ✅ Ejecuta `npm run dev`
5. ✅ Abre http://localhost:3000/homeowner
6. ✅ Crea tu primera cuenta

**¡Bienvenido a la Plataforma de Referidos de Pueblo Bonito!** 🏖️
