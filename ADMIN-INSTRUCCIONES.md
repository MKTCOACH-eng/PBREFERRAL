# 🔐 ADMIN PORTAL - INSTRUCCIONES DE SETUP

## 📋 PASO 1: EJECUTAR SCRIPT SQL EN SUPABASE

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Navega a **SQL Editor**
3. Abre el archivo `ADMIN-SETUP.sql` (en la raíz del proyecto)
4. Copia y pega TODO el contenido en el SQL Editor
5. Click en **RUN** para ejecutar el script

**✅ Esto creará:**
- Tabla `admins` (administradores con roles y equipos)
- Tabla `vouchers` (QR codes para $200 bonus)
- Tabla `admin_activity_logs` (auditoría de acciones)
- Políticas RLS por equipo (Los Cabos, Mazatlán, Both)
- Índices para rendimiento

---

## 📋 PASO 2: CREAR USUARIO ADMIN EN SUPABASE AUTH

1. En Supabase, ve a **Authentication** → **Users**
2. Click en **Add user** → **Create new user**
3. Llena el formulario:
   - **Email**: `admin@pueblobonito.com` (o el email que prefieras)
   - **Password**: `Admin123!` (o la contraseña que prefieras)
   - **Auto Confirm User**: ✅ (activado)
4. Click en **Create user**
5. **IMPORTANTE**: Copia el `user_id` (UUID) que se generó

---

## 📋 PASO 3: INSERTAR ADMIN EN LA TABLA `admins`

1. Regresa al **SQL Editor** en Supabase
2. Ejecuta el siguiente SQL (reemplaza `USER_ID_AQUI` con el UUID que copiaste):

```sql
INSERT INTO public.admins (user_id, email, first_name, last_name, role, team, status)
VALUES (
  'USER_ID_AQUI',  -- ← REEMPLAZA CON EL UUID REAL
  'admin@pueblobonito.com',
  'Admin',
  'Principal',
  'super_admin',
  'Both',
  'active'
);
```

**Ejemplo con UUID real:**
```sql
INSERT INTO public.admins (user_id, email, first_name, last_name, role, team, status)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'admin@pueblobonito.com',
  'Admin',
  'Principal',
  'super_admin',
  'Both',
  'active'
);
```

---

## 📋 PASO 4: ACCEDER AL ADMIN PORTAL

1. Abre tu navegador en: `http://localhost:3000/admin/login`
2. Ingresa las credenciales que creaste:
   - **Email**: `admin@pueblobonito.com`
   - **Password**: `Admin123!`
3. Click en **Ingresar al Portal**

**✅ Si todo está bien, serás redirigido a:** `http://localhost:3000/admin/dashboard`

---

## 🎯 CARACTERÍSTICAS DEL ADMIN PORTAL

### **1. Dashboard Overview** (`/admin/dashboard`)
- KPIs: Total owners, referrals, conversión
- Breakdown por estado (pending, contacted, interested, won, lost)
- Breakdown de vouchers (pending, redeemed, expired)
- Activity logs recientes

### **2. Propietarios** (`/admin/dashboard/owners`)
- Tabla completa de todos los owners
- Búsqueda en tiempo real (nombre, email)
- Filtros: Destino, Status
- Click en "Ver detalle" para:
  - Info personal completa
  - Historial de referidos
  - Historial de recompensas
  - Métricas de éxito

### **3. Referidos** (`/admin/dashboard/referrals`)
- Tabla completa de todos los referrals
- Búsqueda de guests (nombre, email)
- Filtros: Destino, Status, Rango de fechas
- Indicador visual si el guest vio el link
- Click en "Ver detalle" para:
  - Cambiar estado del referral
  - Marcar como: Contactado, Interesado, Ganado, Perdido

### **4. Vouchers (QR)** (`/admin/dashboard/vouchers`)
- Lista de todos los vouchers generados
- Filtros: Destino, Status
- **Auto-generación**: Cuando marcas un referral como "Ganado", se genera automáticamente un voucher
- Click en "Ver QR" para:
  - Ver diseño elegante del voucher con QR
  - Descargar QR en PNG
  - Ver código único, guest, destino, fecha de expiración
- Click en "Canjear" para marcar voucher como usado

### **5. Reportes** (`/admin/dashboard/reports`)
- Exportar CSV de: Owners, Referrals, Vouchers
- Gráficas de rendimiento:
  - Por destino (Los Cabos vs Mazatlán)
  - Por estado (distribución de referrals)
  - Tasas de conversión

---

## 👥 ROLES Y EQUIPOS

### **Roles disponibles:**
1. **super_admin**: Acceso completo a todo
2. **team_admin**: Administrador de equipo específico
3. **sales_rep**: Representante de ventas

### **Equipos disponibles:**
1. **Los Cabos**: Solo ve owners/referrals de Los Cabos
2. **Mazatlán**: Solo ve owners/referrals de Mazatlán
3. **Both**: Ve ambos destinos (super_admin)

---

## 🎟️ FLUJO DE VOUCHERS ($200 BONUS)

### **Generación automática:**
1. Admin marca referral como **"Ganado"** en `/admin/dashboard/referrals`
2. Sistema auto-genera voucher con:
   - Código único (ej: `PB1A2B3C4D5E`)
   - QR code con toda la info
   - Expiración en 90 días
   - Status: "Pending"

### **Uso del voucher:**
1. Admin va a `/admin/dashboard/vouchers`
2. Click en "Ver QR" del voucher
3. Descarga el PNG del QR
4. Envía al guest por email/WhatsApp
5. Guest presenta QR en el resort
6. Staff escanea QR y admin marca como "Canjeado"

### **Diseño del QR:**
- Fondo degradado Pueblo Bonito (oscuro)
- Logo Pueblo Bonito elegante
- Monto destacado: **$200 USD**
- Código único
- Nombre del guest
- Destino
- Fecha de expiración
- QR code centrado

---

## 🔒 SEGURIDAD

### **Protección de rutas:**
- Middleware verifica autenticación en todas las rutas `/admin/dashboard/*`
- Verifica que el user sea admin activo
- Si no es admin, redirige a `/admin/login` o `/homeowner`

### **RLS Policies (Row Level Security):**
- Admins solo ven datos de su equipo asignado
- Políticas por equipo en: owners, referrals, vouchers
- Activity logs para auditoría completa

### **Service Role:**
- Solo se usa en server actions
- Nunca se expone al cliente
- Permite bypass de RLS cuando es necesario

---

## 📊 ACTIVITY LOGS (Auditoría)

Todas las acciones quedan registradas:
- ✅ Voucher generado
- ✅ Voucher canjeado
- ✅ Referral actualizado
- ✅ Guest contactado

Cada log incluye:
- Admin que realizó la acción
- Tipo de acción
- Entidad afectada (owner, referral, voucher)
- Detalles adicionales (JSON)
- Timestamp

---

## 🌐 TRADUCCIONES

El Admin Portal está **completamente traducido** en:
- 🇪🇸 Español
- 🇬🇧 English

**Cambiar idioma:**
- Español: `http://localhost:3000/es/admin/dashboard`
- English: `http://localhost:3000/en/admin/dashboard`

---

## 🚀 CREAR MÁS ADMINS

### **Para agregar un nuevo admin:**

1. Crea el user en Supabase Auth (Authentication → Users)
2. Ejecuta SQL:

```sql
INSERT INTO public.admins (user_id, email, first_name, last_name, role, team, status)
VALUES (
  'USER_ID_DEL_NUEVO_ADMIN',
  'nuevo@email.com',
  'Nombre',
  'Apellido',
  'sales_rep',        -- ← Cambiar según el rol
  'Los Cabos',        -- ← Cambiar según el equipo
  'active'
);
```

### **Ejemplos de configuraciones:**

**Sales Rep de Los Cabos:**
```sql
role: 'sales_rep'
team: 'Los Cabos'
```

**Team Admin de Mazatlán:**
```sql
role: 'team_admin'
team: 'Mazatlán'
```

**Super Admin (ve todo):**
```sql
role: 'super_admin'
team: 'Both'
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Después del setup, verifica:

- [ ] Puedes acceder a `/admin/login`
- [ ] Puedes iniciar sesión con las credenciales
- [ ] Eres redirigido a `/admin/dashboard`
- [ ] Ves las estadísticas generales
- [ ] Puedes navegar a Propietarios, Referidos, Vouchers, Reportes
- [ ] Los filtros funcionan correctamente
- [ ] Puedes ver detalle de un owner
- [ ] Puedes cambiar estado de un referral
- [ ] Al marcar un referral como "Ganado", se auto-genera un voucher
- [ ] Puedes ver el QR de un voucher
- [ ] Puedes descargar el QR en PNG
- [ ] Puedes exportar CSV de owners, referrals, vouchers
- [ ] Las traducciones cambian entre ES/EN

---

## 🆘 TROUBLESHOOTING

### **Error: "No tienes permisos de administrador"**
- Verifica que el user_id en la tabla `admins` coincida con el de Supabase Auth
- Verifica que el status sea `'active'`

### **Error: "No se encontraron propietarios/referidos"**
- Verifica que tu equipo (`team`) sea correcto
- Si eres `sales_rep` de "Los Cabos", solo verás datos de Los Cabos
- Cambia el team a `'Both'` para ver todo (requiere role `super_admin`)

### **Error: No se genera el voucher automáticamente**
- Verifica que el referral status sea exactamente `'won'`
- Revisa los logs en la consola del servidor
- Verifica que no exista ya un voucher para ese referral_id

---

## 📞 SOPORTE

Si tienes problemas con el setup, verifica:
1. Que ejecutaste `ADMIN-SETUP.sql` completo
2. Que el user existe en Supabase Auth
3. Que el admin existe en la tabla `admins`
4. Que el `user_id` coincide entre Auth y `admins`
5. Que el servidor dev está corriendo en puerto 3000

---

**¡Listo! Tu Admin Portal está completamente configurado.** 🎉
