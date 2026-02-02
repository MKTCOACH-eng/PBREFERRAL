# 🗄️ Ejecutar Migración de Base de Datos - Supabase

## ✅ Credenciales Configuradas

Las credenciales de Supabase ya están configuradas en `.env.local`:

- **URL**: https://npbbllufwjhbcqsexrsc.supabase.co
- **Project Ref**: npbbllufwjhbcqsexrsc
- **Anon Key**: ✅ Configurada
- **Service Role Key**: ✅ Configurada

---

## 📋 Pasos para Ejecutar la Migración

### Opción 1: SQL Editor de Supabase (RECOMENDADO) ⭐

1. **Abre el SQL Editor de Supabase**
   
   Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/sql/new

2. **Copia el contenido del archivo de migración**
   
   Archivo: `supabase/migrations/001_initial_schema.sql`
   
   Puedes abrirlo desde:
   ```
   /Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral/supabase/migrations/001_initial_schema.sql
   ```

3. **Pega el contenido en el SQL Editor**
   
   - Selecciona todo el contenido del archivo
   - Copia (Cmd+C)
   - Pega en el SQL Editor de Supabase

4. **Ejecuta la migración**
   
   - Haz clic en el botón "Run" (o presiona Cmd+Enter)
   - Espera 10-20 segundos
   - Deberías ver el mensaje: "Success. No rows returned"

5. **Verifica que las tablas se crearon**
   
   Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/editor
   
   Deberías ver estas 11 tablas:
   - ✅ users
   - ✅ owners
   - ✅ referrals
   - ✅ opportunities
   - ✅ notes
   - ✅ rewards
   - ✅ notifications
   - ✅ audit_logs
   - ✅ share_links
   - ✅ magic_links
   - ✅ internal_tasks

---

### Opción 2: Desde la Terminal (Alternativa)

Si prefieres ejecutar desde la terminal:

```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
node scripts/run-migration.js
```

**Nota**: Esta opción puede no funcionar si Supabase no tiene habilitada la función `exec_sql`. En ese caso, usa la Opción 1.

---

## ✅ Verificación Post-Migración

### 1. Verificar Tablas

En el Table Editor de Supabase, verifica que todas las tablas existen:

https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/editor

### 2. Verificar Triggers

Ve a: Database → Functions

Deberías ver estas funciones:
- `update_updated_at_column`
- `sync_referral_opportunity_status`
- `create_reward_on_closed_won`
- `update_owner_referral_count`
- `check_duplicate_referral`

### 3. Verificar RLS (Row Level Security)

Ve a: Authentication → Policies

Cada tabla debería tener políticas de seguridad configuradas.

### 4. Verificar Vistas

Ve a: Database → Views

Deberías ver:
- `v_pipeline_summary`
- `v_owner_performance`
- `v_sla_compliance`

---

## 🚀 Después de la Migración

Una vez que la migración esté completa:

### 1. Configurar Autenticación

Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/providers

- ✅ Asegúrate de que el proveedor **Email** esté habilitado
- ✅ Configura las URL de redirección:
  - Development: `http://localhost:3000/auth/callback`
  - Production: `https://tu-dominio.com/auth/callback` (cuando despliegues)

### 2. Probar la Aplicación

```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
npm run dev
```

Luego visita:
- http://localhost:3000/homeowner
- http://localhost:3000/homeguest

### 3. Probar Magic Link

1. Ve a http://localhost:3000/homeowner
2. Ingresa tu email
3. Haz clic en "Send Magic Link"
4. Revisa tu email
5. Haz clic en el enlace del email
6. Deberías ser redirigido al dashboard (cuando esté implementado)

---

## 🔍 Troubleshooting

### Error: "relation already exists"

Si ves este error, significa que algunas tablas ya existen. Opciones:

**Opción A: Eliminar tablas existentes** (⚠️ CUIDADO: Esto borra todos los datos)

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

Luego ejecuta la migración nuevamente.

**Opción B: Ejecutar solo las partes faltantes**

Revisa qué tablas ya existen y ejecuta solo las secciones del SQL que faltan.

### Error: "permission denied"

Asegúrate de estar usando el **Service Role Key** (no el Anon Key) si ejecutas desde la terminal.

### Error: "function does not exist"

Algunos triggers pueden fallar si las funciones no se crearon primero. Ejecuta el SQL en el orden correcto (el archivo ya está ordenado correctamente).

---

## 📊 Estructura de la Base de Datos

Una vez completada la migración, tendrás:

### Tablas Principales (11)
1. **users** - Usuarios con RBAC (4 roles)
2. **owners** - Perfil extendido de propietarios
3. **referrals** - Referidos de invitados
4. **opportunities** - Pipeline (1:1 con referrals)
5. **notes** - Notas internas
6. **rewards** - Recompensas ($200 F&B)
7. **notifications** - Cola de notificaciones
8. **audit_logs** - Registro de auditoría
9. **share_links** - Enlaces únicos de referidos
10. **magic_links** - Tokens de autenticación
11. **internal_tasks** - Tareas y SLA tracking

### Triggers Automáticos (5)
- Actualización automática de `updated_at`
- Sincronización de estados entre referrals y opportunities
- Creación automática de recompensas al cerrar ganado
- Actualización de estadísticas de propietarios
- Detección de referidos duplicados

### Row Level Security (RLS)
- Políticas por rol (owner, internal, dest_admin, super_admin)
- Acceso restringido por destino (Los Cabos / Mazatlán)
- Super Admin tiene acceso completo

### Vistas para Reportes (3)
- Pipeline summary por destino
- Performance de propietarios
- Cumplimiento de SLA

---

## ✨ ¡Listo!

Una vez que la migración esté completa, tu base de datos estará lista para:

- ✅ Autenticación con Magic Link
- ✅ Creación de referidos
- ✅ Gestión de pipeline
- ✅ Sistema de recompensas
- ✅ Notificaciones
- ✅ Auditoría completa

**Siguiente paso**: Ejecutar `npm run dev` y probar la aplicación!

---

## 📞 Ayuda

Si tienes problemas:

1. Verifica que las credenciales en `.env.local` sean correctas
2. Revisa los logs en el SQL Editor de Supabase
3. Consulta la documentación en `SETUP_INSTRUCTIONS.md`

---

**¡Éxito con la migración! 🚀**
