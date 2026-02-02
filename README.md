# 🏖️ Pueblo Bonito - Plataforma de Referidos MVP

Plataforma web para gestión de referidos de propietarios de Pueblo Bonito Golf & Spa Resorts.

---

## 🎯 DESCRIPCIÓN DEL PROYECTO

Sistema completo de gestión de referidos que permite a los propietarios de Pueblo Bonito referir a amigos y familiares, con tracking completo del proceso y sistema de recompensas.

### **Usuarios del sistema:**
1. **Homeowners (Propietarios)** - Crean y gestionan referidos
2. **Guests (Referidos)** - Reciben ofertas personalizadas vía link único
3. **Admin Teams (2 equipos)** - Gestionan el programa por destino (Los Cabos / Mazatlán)

---

## 🚀 TECNOLOGÍAS

- **Frontend**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS
- **Internacionalización**: next-intl (ES/EN)
- **Backend**: Supabase (Auth + Database + RLS)
- **QR Codes**: qrcode (generación de vouchers)
- **TypeScript**: Full type safety

---

## 📁 ESTRUCTURA DEL PROYECTO

```
pb-referral/
├── src/
│   ├── app/[locale]/
│   │   ├── homeowner/          # Landing page para owners
│   │   ├── dashboard/          # Portal del owner
│   │   ├── guest/              # Landing page para guests
│   │   ├── test-email/         # Visualizar emails simulados
│   │   └── admin/
│   │       ├── login/          # Login admin
│   │       └── dashboard/      # Portal admin
│   ├── features/
│   │   ├── auth/               # Autenticación
│   │   ├── homeowner/          # Componentes homeowner
│   │   ├── dashboard/          # Componentes owner dashboard
│   │   ├── guest/              # Componentes guest
│   │   ├── admin/              # Componentes admin portal
│   │   └── test/               # Test utilities
│   ├── shared/
│   │   └── components/         # Header, Footer, etc.
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   └── email/              # Email templates
│   └── i18n/                   # Configuración i18n
├── messages/
│   ├── es.json                 # Traducciones español
│   └── en.json                 # Traducciones inglés
├── public/                     # Assets estáticos
├── SETUP-RAPIDO.sql           # Setup inicial DB
├── ADMIN-SETUP.sql            # Setup admin portal
├── ADMIN-INSTRUCCIONES.md     # Guía setup admin
└── SUPABASE-CONFIG.md         # Configuración Supabase
```

---

## 🔧 SETUP INICIAL

### **1. Clonar y configurar entorno:**

```bash
cd /Users/lourdesalcarazmartinez/Documents/REFERRAL\ PB/pb-referral
npm install
```

### **2. Configurar variables de entorno:**

Crea `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **3. Setup Supabase Database:**

1. Ejecuta `SETUP-RAPIDO.sql` en Supabase SQL Editor
2. (Opcional) Ejecuta `ADMIN-SETUP.sql` para Admin Portal
3. Lee `ADMIN-INSTRUCCIONES.md` para crear usuarios admin

### **4. Ejecutar servidor de desarrollo:**

```bash
npm run dev
```

Abre `http://localhost:3000` (IMPORTANTE: debe ser puerto 3000 por Supabase)

---

## 🌐 RUTAS PRINCIPALES

### **Para Propietarios:**
- `/es/homeowner` - Landing page (español)
- `/en/homeowner` - Landing page (inglés)
- `/dashboard` - Panel de control del owner
- `/dashboard/referrals/new` - Crear nuevo referido
- `/dashboard/referrals` - Ver mis referidos
- `/dashboard/rewards` - Ver mis recompensas

### **Para Guests:**
- `/guest?ref=TOKEN_UNICO` - Landing page personalizada
- El guest recibe un link único por email

### **Para Admins:**
- `/admin/login` - Login admin
- `/admin/dashboard` - Overview general
- `/admin/dashboard/owners` - Gestión de propietarios
- `/admin/dashboard/referrals` - Gestión de referidos
- `/admin/dashboard/vouchers` - Vouchers QR ($200 bonus)
- `/admin/dashboard/reports` - Reportes y exportación

### **Para Testing:**
- `/test-email` - Ver links de guest generados

---

## 🎨 DISEÑO Y BRANDING

**Paleta de colores:**
- Primary Navy: `#1A2332`
- Gold/Tan: `#C8A882`
- Hover Gold: `#B89872`
- Background: `#F8F6F3`

**Tipografía:**
- Headings: Font Serif (elegante)
- Body: Font Sans (legible)
- Tracking elevado en subtítulos

**Look & Feel:**
- Minimalista y elegante
- Inspirado en https://www.pueblobonito.com.mx/
- Espacios amplios
- Transiciones suaves
- Responsive design

---

## 📧 SISTEMA DE EMAILS

### **Emails automáticos (actualmente simulados):**

1. **Al Owner** - Confirmación de referido creado
2. **Al Guest** - Bienvenida con link único personalizado

**Para ver emails:**
- Ve a `/test-email` después de crear un referido
- Copia el link del guest y ábrelo

**TODO**: Integrar Resend o SendGrid para envíos reales

---

## 🔐 AUTENTICACIÓN

### **Método actual:**
- Email/Password (signup/login)
- Supabase Auth
- Profile completion automático

### **Flujo:**
1. User hace signup con email/password
2. Completa perfil (nombre, teléfono, destino)
3. Auto-crea owner profile en DB
4. Redirige a dashboard

---

## 🎟️ SISTEMA DE VOUCHERS

### **Características:**
- Auto-generación cuando referral status = "won"
- Código único alfanumérico
- QR code con diseño elegante Pueblo Bonito
- Expiración en 90 días
- Estados: pending, redeemed, expired, cancelled
- Descarga en PNG de alta calidad
- Admin puede marcar como canjeado

### **Información en el QR:**
```json
{
  "code": "PB1A2B3C4D5E",
  "guest": "John Doe",
  "amount": 200,
  "currency": "USD",
  "destination": "Los Cabos",
  "expires": "2026-05-15T00:00:00Z"
}
```

---

## 👥 EQUIPOS ADMIN

### **Los Cabos Team:**
- Ve solo owners con `preferred_destination = 'Los Cabos'`
- Ve solo referrals con `destination = 'Los Cabos'`
- Ve solo vouchers de Los Cabos

### **Mazatlán Team:**
- Ve solo owners con `preferred_destination = 'Mazatlán'`
- Ve solo referrals con `destination = 'Mazatlán'`
- Ve solo vouchers de Mazatlán

### **Both (Super Admin):**
- Ve todo sin restricciones
- Puede exportar datos de ambos destinos
- Acceso completo a reportes

---

## 📊 MÉTRICAS Y REPORTES

### **KPIs principales:**
- Total owners registrados
- Total referrals creados
- Referrals ganados
- Tasa de conversión (%)
- Vouchers pendientes/canjeados/expirados

### **Exportación:**
- CSV de owners (email, nombre, destino, stats)
- CSV de referrals (guest, owner, estado, fechas)
- CSV de vouchers (código, guest, monto, estado)

### **Gráficas:**
- Rendimiento por destino
- Distribución por estado
- Tasas de conversión

---

## 🛡️ SEGURIDAD Y PERMISOS

### **Row Level Security (RLS):**
Todas las tablas tienen RLS habilitado con políticas específicas:

**Owners:**
- Solo ven su propio perfil
- Admins ven según su equipo

**Referrals:**
- Owners ven sus propios referrals
- Guests acceden por token único
- Admins ven según su equipo

**Vouchers:**
- Solo admins tienen acceso
- Filtrado por equipo

**Activity Logs:**
- Solo admins pueden ver
- No se pueden modificar

---

## 📝 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Servidor dev en localhost:3000

# Build
npm run build            # Build de producción

# Producción
npm run start            # Servidor producción

# Linting
npm run lint             # Verificar código
```

---

## 🔄 FLUJO COMPLETO DEL SISTEMA

### **1. Owner crea referido:**
```
Owner login → Dashboard → Crear referido → 
Llena formulario (guest info) → Submit → 
Email a owner (confirmación) + Email a guest (link único)
```

### **2. Guest recibe y acepta oferta:**
```
Guest recibe email → Click en link único → 
Landing page personalizada → Ve oferta exclusiva → 
"Acepto Oferta" o "Más Información" → 
Referral status actualizado
```

### **3. Admin gestiona y cierra:**
```
Admin login → Dashboard → Referrals → 
Ve nuevo referral "Interesado" → 
Contacta al guest → Marca como "Contactado" → 
Guest confirma → Admin marca como "Ganado" → 
Sistema auto-genera voucher QR → 
Admin descarga QR → Envía a guest → 
Guest presenta en resort → Admin canjea voucher
```

---

## 🎁 PROGRAMA DE RECOMPENSAS

### **Para Owners:**
- **$200 USD F&B Credit** por cada referido exitoso
- Tracking en dashboard
- Historial completo de recompensas

### **Para Guests:**
- **7 NOCHES por $630 USD** (All-Inclusive opcional)
- **3 NOCHES por $270 USD** (All-Inclusive opcional)
- Acceso a resorts galardonados
- Experiencia Pueblo Bonito completa

---

## 📱 RESPONSIVE DESIGN

El sistema es **100% responsive**:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🌍 INTERNACIONALIZACIÓN

### **Idiomas soportados:**
- 🇪🇸 Español (default)
- 🇬🇧 English

### **Cambio de idioma:**
- Selector en header
- URL structure: `/es/...` o `/en/...`
- Persiste en toda la navegación

### **Traducciones:**
- `messages/es.json` - Español
- `messages/en.json` - English
- Todas las páginas y componentes traducidos

---

## 📦 DEPENDENCIAS PRINCIPALES

```json
{
  "next": "^16.1.6",
  "react": "^19.0.0",
  "next-intl": "^3.29.1",
  "@supabase/ssr": "^0.6.2",
  "@supabase/supabase-js": "^2.48.1",
  "tailwindcss": "^3.4.17",
  "qrcode": "^1.5.4",
  "typescript": "^5.7.3"
}
```

---

## 🎨 ASSETS

### **Imágenes incluidas:**
- Hero images de Los Cabos y Mazatlán
- Property photos (Sunset Beach, Emerald Bay, etc.)
- Gallery carousel images
- Logo SVG (blanco y original)

### **Íconos:**
- SVG icons personalizados
- Heroicons para UI
- Font Awesome social media

---

## 📄 DOCUMENTACIÓN ADICIONAL

- **`SETUP-RAPIDO.sql`** - Script SQL para setup inicial de owners/referrals
- **`ADMIN-SETUP.sql`** - Script SQL para setup del admin portal
- **`ADMIN-INSTRUCCIONES.md`** - Guía paso a paso para configurar admin portal
- **`SUPABASE-CONFIG.md`** - Configuración detallada de Supabase

---

## ✅ ESTADO DEL MVP

### **COMPLETADO:**
- ✅ Homeowner Landing Page
- ✅ Owner Dashboard completo
- ✅ Guest Landing Page con link único
- ✅ Admin Portal (2 equipos)
- ✅ Sistema de Vouchers QR
- ✅ Autenticación Email/Password
- ✅ Sistema de emails (simulado)
- ✅ Traducciones completas ES/EN
- ✅ Responsive design
- ✅ Chatbot inteligente para guests

### **PENDIENTE:**
- ⏳ Integrar email service real (Resend/SendGrid)
- ⏳ Editar/Eliminar referidos (owner dashboard)
- ⏳ Notificaciones push en tiempo real
- ⏳ Deploy a producción (Vercel)

---

## 🏗️ PRÓXIMOS PASOS

1. **Ejecutar `ADMIN-SETUP.sql`** en Supabase
2. **Crear primer admin** siguiendo `ADMIN-INSTRUCCIONES.md`
3. **Probar flujo completo**:
   - Owner crea referido
   - Guest recibe link y acepta oferta
   - Admin marca como ganado
   - Voucher QR se genera automáticamente
   - Admin descarga y envía QR a guest
4. **Integrar email service real**
5. **Deploy a producción**

---

## 📞 CONTACTO

**Pueblo Bonito Golf & Spa Resorts**

**Los Cabos:**
- Tel: +52 (624) 142 9898

**Mazatlán:**
- Tel: +52 (669) 989 8900

**Email:**
- referrals@pueblobonito.com

**Sitio oficial:**
- https://www.pueblobonito.com.mx/

---

## 📜 LICENCIA

© 2026 Pueblo Bonito Resorts. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Pueblo Bonito Golf & Spa Resorts**
