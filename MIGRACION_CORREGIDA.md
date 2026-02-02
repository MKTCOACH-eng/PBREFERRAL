# ✅ Migración Corregida - Lista para Ejecutar

## 🔧 Corrección Aplicada

Se corrigió el error en la vista `v_pipeline_summary`:

**Error anterior:**
```sql
SELECT destination, status, ...  -- ❌ columna no existe
```

**Corrección:**
```sql
SELECT destination_current as destination, status, ...  -- ✅ correcto
```

---

## 🚀 Ejecutar la Migración AHORA

### Paso 1: Ir al SQL Editor de Supabase

Abre este enlace: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/sql/new

### Paso 2: Copiar el SQL Corregido

El archivo corregido está en:
```
/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral/supabase/migrations/001_initial_schema.sql
```

**Opciones para copiar:**

**Opción A: Desde Cursor/Editor**
1. El archivo ya está abierto en tu editor
2. Selecciona todo (Cmd+A)
3. Copia (Cmd+C)

**Opción B: Desde Terminal**
```bash
cat "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral/supabase/migrations/001_initial_schema.sql" | pbcopy
```
Esto copia automáticamente el contenido al portapapeles.

### Paso 3: Pegar y Ejecutar en Supabase

1. Pega el contenido en el SQL Editor (Cmd+V)
2. Haz clic en "Run" (o presiona Cmd+Enter)
3. Espera 10-20 segundos
4. Deberías ver: **"Success. No rows returned"** ✅

### Paso 4: Verificar las Tablas

Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/editor

Deberías ver **11 tablas**:
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

## 🔍 Verificar las Vistas

Ve a: Database → Views

Deberías ver **3 vistas**:
- ✅ `v_pipeline_summary` (corregida)
- ✅ `v_owner_performance`
- ✅ `v_sla_compliance`

---

## ✅ Después de la Migración

### 1. Configurar Autenticación Email

Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/providers

- ✅ Verifica que **Email** esté habilitado
- ✅ Configura las plantillas de email (opcional)

### 2. Configurar URL de Redirección

Ve a: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/auth/url-configuration

Agrega estas URLs:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/**` (para desarrollo)

### 3. Probar la Aplicación

El servidor ya está corriendo en: http://localhost:3000

Visita:
- **Homeowner**: http://localhost:3000/homeowner
- **Guest**: http://localhost:3000/homeguest
- **Homeowner (ES)**: http://localhost:3000/es/homeowner

### 4. Probar Magic Link

1. Ve a http://localhost:3000/homeowner
2. Ingresa tu email
3. Haz clic en "Send Magic Link"
4. Revisa tu email (puede tardar 1-2 minutos)
5. Haz clic en el enlace del email
6. Deberías ser redirigido (cuando el dashboard esté implementado)

---

## 🎯 Checklist Final

```
✅ Archivo SQL corregido
✅ Commit realizado en Git
✅ Servidor de desarrollo corriendo
⏳ Ejecutar migración en Supabase
⏳ Configurar autenticación
⏳ Probar magic link
⏳ Verificar que todo funcione
```

---

## 🆘 Si Hay Errores

### Error: "relation already exists"

Si ves este error, significa que ya ejecutaste la migración antes. Opciones:

**Opción A: Limpiar y volver a ejecutar**
```sql
-- ⚠️ CUIDADO: Esto borra TODAS las tablas y datos
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

Luego ejecuta la migración completa de nuevo.

**Opción B: Ejecutar solo las vistas**

Si solo las vistas fallaron, ejecuta solo esta parte:

```sql
-- View: Referral Pipeline Summary by Destination
CREATE OR REPLACE VIEW v_pipeline_summary AS
SELECT 
    destination_current as destination,
    status,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE submitted_at > NOW() - INTERVAL '30 days') as count_last_30_days
FROM referrals
GROUP BY destination_current, status;

-- View: Owner Performance
CREATE OR REPLACE VIEW v_owner_performance AS
SELECT 
    u.id,
    u.email,
    u.name_first || ' ' || u.name_last as owner_name,
    o.referrals_total_count,
    o.referrals_won_count,
    o.rewards_total_amount,
    o.last_referral_at,
    CASE 
        WHEN o.referrals_total_count > 0 
        THEN ROUND((o.referrals_won_count::DECIMAL / o.referrals_total_count) * 100, 2)
        ELSE 0 
    END as conversion_rate
FROM users u
JOIN owners o ON o.owner_user_id = u.id
WHERE u.role = 'owner' AND u.status = 'active';

-- View: SLA Compliance
CREATE OR REPLACE VIEW v_sla_compliance AS
SELECT 
    r.destination_current,
    COUNT(*) as total_referrals,
    COUNT(*) FILTER (WHERE r.status = 'new' AND r.submitted_at < NOW() - INTERVAL '24 hours') as overdue_new,
    ROUND(
        (COUNT(*) FILTER (WHERE r.status != 'new' OR r.submitted_at >= NOW() - INTERVAL '24 hours')::DECIMAL / COUNT(*)) * 100, 
        2
    ) as sla_compliance_rate
FROM referrals r
WHERE r.submitted_at > NOW() - INTERVAL '30 days'
GROUP BY r.destination_current;
```

### Otros Errores

Si encuentras otros errores:
1. Copia el mensaje de error completo
2. Revisa la línea específica en el archivo SQL
3. Verifica que las tablas referenciadas existan
4. Consulta la documentación de PostgreSQL

---

## ✨ Una Vez Completado

Cuando la migración esté exitosa:

1. ✅ Todas las tablas creadas
2. ✅ Triggers funcionando
3. ✅ RLS policies activas
4. ✅ Vistas disponibles
5. ✅ Autenticación configurada

**¡Estarás listo para usar la aplicación!** 🎉

---

## 📞 Siguiente Paso

Una vez que la migración esté completa y la autenticación configurada:

1. Prueba el magic link en http://localhost:3000/homeowner
2. Prueba el formulario de invitados en http://localhost:3000/homeguest
3. Revisa `PROJECT_STATUS.md` para continuar con el desarrollo

---

**¡Éxito con la migración! 🚀**
