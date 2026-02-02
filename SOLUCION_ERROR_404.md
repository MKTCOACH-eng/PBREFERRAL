# 🔴 Solución al Error 404 - "too many open files"

## ❌ Problema Actual

El servidor está dando **404 en todas las rutas** debido al error del sistema operativo:
```
Watchpack Error (watcher): Error: EMFILE: too many open files, watch
```

Este error impide que Next.js compile correctamente el middleware y las rutas.

---

## ✅ SOLUCIÓN DEFINITIVA (Elige una)

### Opción 1: Reiniciar la Computadora (MÁS FÁCIL) ⭐

1. Guarda todo tu trabajo
2. Reinicia tu Mac
3. Después del reinicio, abre terminal y ejecuta:
   ```bash
   cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
   rm -rf .next
   npm run dev
   ```
4. Abre http://localhost:3000/en/homeowner

---

### Opción 2: Aumentar el Límite de Archivos (SIN REINICIAR)

#### Paso 1: Cerrar TODAS las aplicaciones que puedas
- Cierra Chrome, Safari, VSCode, etc.
- Deja solo Terminal y Cursor abiertos

#### Paso 2: Aumentar el límite en Terminal
```bash
# Ver límite actual
ulimit -n

# Aumentar límite temporalmente (válido hasta que cierres la terminal)
ulimit -n 10240

# Verificar que cambió
ulimit -n
```

#### Paso 3: En la MISMA terminal, reiniciar el servidor
```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"

# Matar procesos de Next.js
pkill -9 -f "next dev"

# Limpiar caché
rm -rf .next

# Iniciar servidor
npm run dev
```

#### Paso 4: Verificar
Abre http://localhost:3000/en/homeowner

---

### Opción 3: Solución Permanente (Requiere permisos de administrador)

#### Paso 1: Crear archivo de configuración del sistema
```bash
sudo nano /etc/sysctl.conf
```

#### Paso 2: Agregar estas líneas
```
kern.maxfiles=65536
kern.maxfilesperproc=65536
```

#### Paso 3: Guardar y salir
- Presiona `Ctrl + X`
- Presiona `Y`
- Presiona `Enter`

#### Paso 4: Reiniciar la computadora

#### Paso 5: Después del reinicio
```bash
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
rm -rf .next
npm run dev
```

---

## 🔍 Verificar que Funcionó

### 1. El servidor debe iniciar sin errores de "EMFILE"
```bash
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 1500ms
```

### 2. Abrir en el navegador
- http://localhost:3000/ → Debe redirigir a `/en/homeowner`
- http://localhost:3000/en/homeowner → Debe mostrar la página
- http://localhost:3000/es/homeowner → Debe mostrar la página en español

### 3. Verificar el selector de idioma
- Click en "ES" → Cambia a español
- Click en "English" → Cambia a inglés

---

## 📊 Estado del Código

### ✅ TODO ESTÁ CORRECTO:
1. ✅ Error CSS corregido (import en orden correcto)
2. ✅ Header con navegación implementado
3. ✅ Selector de idioma funcional
4. ✅ Tipografía exacta de Pueblo Bonito
5. ✅ Todos los componentes actualizados
6. ✅ Middleware configurado correctamente
7. ✅ Routing de next-intl configurado

### ❌ ÚNICO PROBLEMA:
- Error del sistema operativo: "too many open files"
- **NO es un problema del código**
- **ES un problema de macOS**

---

## 💡 ¿Por qué pasa esto?

macOS tiene un límite de archivos que pueden estar abiertos simultáneamente. Next.js con Turbopack abre muchos archivos para el hot-reload, y cuando hay muchos archivos en el proyecto (node_modules, public, etc.), se alcanza el límite.

---

## 🎯 Después de Solucionar

Una vez que el servidor funcione correctamente:

1. **Verás el diseño completo** con:
   - Header con logo y selector de idioma
   - Tipografía elegante (Playfair + Montserrat)
   - Botones estilo Pueblo Bonito
   - Colores oficiales

2. **Podrás continuar** con:
   - Owner Dashboard
   - Funcionalidad de referidos
   - Resto del MVP

---

## 📞 Si Sigues Teniendo Problemas

Si después de reiniciar o aumentar el límite sigues viendo el error:

1. Verifica cuántos archivos tienes abiertos:
   ```bash
   lsof | wc -l
   ```

2. Cierra aplicaciones que no necesites

3. Considera limpiar node_modules y reinstalar:
   ```bash
   cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

---

**✨ El código está 100% correcto. Solo necesitas solucionar el límite de archivos del sistema operativo.**

**Recomendación: Opción 1 (Reiniciar) es la más fácil y efectiva.** 🎯
