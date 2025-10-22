# 🛒 MonterPlace - E-commerce Platform

MonterPlace completo estilo Amazon construido con Next.js 15, TypeScript, Tailwind CSS y Zustand.

## ✨ Características

- 🏪 **Catálogo de productos** con búsqueda y filtros avanzados
- 🛒 **Carrito de compras** persistente
- ❤️ **Lista de deseos** (Wishlist)
- 🔍 **Búsqueda en tiempo real** con debounce
- 📱 **Diseño responsive** y moderno
- 🔐 **Autenticación** de usuarios
- 💳 **Proceso de checkout** simulado
- ⭐ **Sistema de reviews** y calificaciones
- 📦 **Detalle de producto** completo
- 👤 **Perfil de usuario** con historial de compras

## 🚀 Tecnologías

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Zustand** - State management
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast

## 📋 Requisitos previos

- Node.js 18+ 
- Backend NestJS corriendo en `http://localhost:3005`

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## 📁 Estructura del proyecto

```
MonterPlace/
├── app/                    # App Router de Next.js
│   ├── actions/           # Server Actions
│   ├── (auth)/           # Rutas de autenticación
│   ├── (shop)/           # Rutas del MonterPlace
│   └── layout.tsx        # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizables
│   ├── products/         # Componentes de productos
│   ├── cart/             # Componentes del carrito
│   └── layout/           # Componentes de layout
├── lib/                   # Utilidades y configuración
│   ├── api/              # Cliente API
│   ├── auth/             # Autenticación
│   ├── store/            # Zustand stores
│   └── types/            # Tipos TypeScript
└── public/               # Archivos estáticos
```

## 🔗 API Backend

Este proyecto consume la API de NestJS ubicada en `/home/victor/NestJs/Auth-Init`.

Endpoints principales:
- `GET /product` - Listar productos
- `GET /product/:id` - Detalle de producto
- `GET /category` - Listar categorías
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

## 📝 Variables de entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3005
```

## 🎨 Características del UI

- Diseño moderno y limpio
- Animaciones suaves
- Feedback visual inmediato
- Optimizado para móviles y desktop
- Modo oscuro (próximamente)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
