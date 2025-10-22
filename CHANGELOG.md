# 📝 Changelog - MonterPlace

## [1.1.0] - 2025-10-15

### ✅ Arreglado
- **Error 401 en detalle de producto**: Cambiado endpoint `/product/:id` de protegido a público en el backend
  - Archivo: `/home/victor/NestJs/Auth-Init/src/modules/product/controller/product.controller.ts`
  - Cambio: `@Roles('admin', 'seller')` → `@Public()`

### 🎨 Mejorado - Nueva Paleta de Colores
- **Colores Primarios**: Azul cielo moderno (#0ea5e9)
- **Colores Accent**: Magenta vibrante (#d946ef)
- **Diseño más moderno y atractivo**

#### Archivos Actualizados:
1. **tailwind.config.ts** - Nueva configuración de colores
2. **components/ui/button.tsx** - Botones con nuevos colores y sombras
3. **components/layout/header.tsx** - Header con paleta actualizada
4. **components/layout/footer.tsx** - Footer con colores modernos
5. **app/page.tsx** - Página de inicio con gradientes vibrantes

### 🎯 Cambios de Color Específicos:

#### Botones
- **Default**: `bg-primary-600` (azul cielo)
- **Secondary**: `bg-accent-600` (magenta)
- **Outline**: `border-primary-600` con hover `bg-primary-50`
- Agregadas sombras sutiles para mejor profundidad

#### Hero Section
- Gradiente: `from-primary-600 via-primary-700 to-accent-600`
- Texto más legible con `text-primary-50`

#### Badges y Notificaciones
- Carrito: `bg-primary-600`
- Wishlist: `bg-accent-600`
- Transiciones suaves en todos los elementos

#### Categorías
- Bordes: `border-2` para mayor énfasis
- Hover: `hover:border-primary-600` con `hover:shadow-lg`

## [1.0.0] - 2025-10-15

### ✨ Lanzamiento Inicial
- MonterPlace completo con todas las funcionalidades
- 11 páginas implementadas
- Sistema de carrito y wishlist
- Autenticación completa
- Proceso de checkout simulado
- Diseño responsive
- Integración con backend NestJS

---

## 🚀 Cómo Aplicar los Cambios

### Backend (NestJS)
```bash
cd /home/victor/NestJs/Auth-Init
# Reiniciar el servidor para aplicar cambios
npm run dev
```

### Frontend (Next.js)
```bash
cd /home/victor/NextJs/MonterPlace
# Reiniciar el servidor
npm run dev
```

## 📊 Impacto Visual

### Antes
- Azul estándar (#3b82f6)
- Diseño plano
- Colores básicos

### Después
- Azul cielo vibrante (#0ea5e9)
- Magenta accent (#d946ef)
- Sombras y profundidad
- Gradientes modernos
- Mejor contraste y legibilidad

## 🎨 Paleta de Colores Completa

```css
/* Primary (Azul Cielo) */
primary-50:  #f0f9ff
primary-100: #e0f2fe
primary-200: #bae6fd
primary-300: #7dd3fc
primary-400: #38bdf8
primary-500: #0ea5e9  ← Color principal
primary-600: #0284c7
primary-700: #0369a1
primary-800: #075985
primary-900: #0c4a6e

/* Accent (Magenta) */
accent-50:  #fdf4ff
accent-100: #fae8ff
accent-200: #f5d0fe
accent-300: #f0abfc
accent-400: #e879f9
accent-500: #d946ef  ← Color accent
accent-600: #c026d3
accent-700: #a21caf
accent-800: #86198f
accent-900: #701a75
```

## 🔄 Próximas Mejoras

- [ ] Modo oscuro
- [ ] Animaciones de transición
- [ ] Efectos de hover más elaborados
- [ ] Skeleton loaders personalizados
