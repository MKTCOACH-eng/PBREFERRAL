# 📸 Cómo Agregar Imágenes Reales de los Resorts

## ✅ Lo que ya está implementado:

1. ✅ Logo de Pueblo Bonito con sunburst icon
2. ✅ Componente `PuebloBonitoLogo` reutilizable
3. ✅ Hero con imagen de fondo (actualmente usando placeholder)
4. ✅ Favicon actualizado con el logo
5. ✅ Diseño completo con estilo Pueblo Bonito

---

## 📸 Imágenes Necesarias

Para completar el diseño, necesitas agregar estas imágenes de los resorts:

### 1. **Hero Background (Homeowner)**
- **Ubicación**: `public/images/hero-homeowner.jpg`
- **Dimensiones recomendadas**: 2000x1200px
- **Tipo**: Vista panorámica del resort (playa, piscina, atardecer)
- **Ejemplos de las galerías**:
  - Mazatlán: Vista de la piscina con palmeras
  - Cabos: Vista de la playa con El Arco

### 2. **Hero Background (Guest)**
- **Ubicación**: `public/images/hero-guest.jpg`
- **Dimensiones recomendadas**: 2000x1200px
- **Tipo**: Vista acogedora del resort (habitaciones, amenidades)

### 3. **Logo Oficial** (opcional)
- **Ubicación**: `public/pueblo-bonito-logo.png`
- **Formato**: PNG con fondo transparente
- **Dimensiones**: 400x160px (aprox)

### 4. **Favicon** (opcional)
- **Ubicación**: `public/favicon.ico`
- **Dimensiones**: 32x32px, 64x64px
- **Formato**: ICO o PNG

---

## 🔧 Cómo Agregar las Imágenes

### Opción 1: Usar Imágenes Locales

1. **Crea la carpeta de imágenes**:
   ```bash
   cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
   mkdir -p public/images
   ```

2. **Copia tus imágenes** a la carpeta `public/images/`:
   - `hero-homeowner.jpg`
   - `hero-guest.jpg`
   - `resort-1.jpg` (opcional)
   - `resort-2.jpg` (opcional)

3. **Actualiza el Hero** en `src/features/auth/components/HomeownerHero.tsx`:
   
   Cambia esta línea:
   ```tsx
   backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000')`,
   ```
   
   Por:
   ```tsx
   backgroundImage: `url('/images/hero-homeowner.jpg')`,
   ```

### Opción 2: Usar URLs de Pueblo Bonito

Si tienes acceso a las imágenes en el servidor de Pueblo Bonito:

```tsx
backgroundImage: `url('https://www.pueblobonito.com.mx/path/to/image.jpg')`,
```

---

## 📋 Imágenes Sugeridas de las Galerías

### De Mazatlán:
- **Hero principal**: Vista de la piscina con palmeras
- **Secundaria**: Exterior del hotel con jardines
- **Detalles**: Habitaciones elegantes, restaurantes

### De Cabos:
- **Hero principal**: Vista de la playa con atardecer
- **Secundaria**: Piscina infinity con vista al mar
- **Detalles**: Campo de golf, spa, suites

---

## 🎨 Optimización de Imágenes

Para mejor rendimiento, optimiza las imágenes antes de subirlas:

### Herramientas Online:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/

### Configuración Recomendada:
- **Formato**: WebP o JPEG
- **Calidad**: 80-85%
- **Tamaño máximo**: 500KB por imagen

---

## 🔄 Actualizar Múltiples Componentes

Si quieres agregar imágenes en otros componentes:

### 1. Requirements Section
Agregar imagen de fondo sutil:

```tsx
<section 
  className="py-20 px-4 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/pattern-bg.jpg')`,
  }}
>
```

### 2. Login Section
Agregar imagen decorativa:

```tsx
<div className="grid md:grid-cols-2 gap-8">
  <div className="hidden md:block">
    <img 
      src="/images/resort-detail.jpg" 
      alt="Pueblo Bonito Resort"
      className="w-full h-full object-cover"
    />
  </div>
  <div>{/* Form */}</div>
</div>
```

---

## 📦 Estructura de Carpetas Recomendada

```
public/
├── images/
│   ├── hero/
│   │   ├── homeowner.jpg
│   │   └── guest.jpg
│   ├── resorts/
│   │   ├── mazatlan-1.jpg
│   │   ├── mazatlan-2.jpg
│   │   ├── cabos-1.jpg
│   │   └── cabos-2.jpg
│   └── details/
│       ├── pool.jpg
│       ├── beach.jpg
│       └── suite.jpg
├── pueblo-bonito-logo.svg
└── favicon.ico
```

---

## 🚀 Próximos Pasos

1. **Descarga las imágenes** de las galerías de Pueblo Bonito
2. **Optimiza las imágenes** con TinyPNG o Squoosh
3. **Copia las imágenes** a `public/images/`
4. **Actualiza las rutas** en los componentes
5. **Verifica** que se vean correctamente en http://localhost:3000

---

## 💡 Imagen Actual (Placeholder)

Actualmente estoy usando una imagen de Unsplash como placeholder:
```
https://images.unsplash.com/photo-1571896349842-33c89424de2d
```

Esta es una imagen genérica de resort de lujo. Reemplázala con las imágenes reales de Pueblo Bonito para el resultado final.

---

## 📞 Necesitas Ayuda?

Si necesitas ayuda para:
- Optimizar las imágenes
- Actualizar los componentes
- Agregar más secciones con imágenes

Avísame y te ayudo a implementarlo.

---

**🎨 Una vez que agregues las imágenes reales, el sitio tendrá el look completo de Pueblo Bonito!**
