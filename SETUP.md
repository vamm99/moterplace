# 🚀 Guía de Configuración y Ejecución

## 📋 Requisitos Previos

1. **Node.js 18+** instalado
2. **Backend NestJS** corriendo en `http://localhost:3005`
3. **MongoDB** con datos de prueba (seeders ejecutados)

## 🛠️ Instalación

```bash
# 1. Navegar al directorio del proyecto
cd /home/victor/NextJs/MonterPlace

# 2. Instalar dependencias (si no están instaladas)
npm install

# 3. Verificar que existe el archivo .env.local
cat .env.local
# Debe contener: NEXT_PUBLIC_API_URL=http://localhost:3005
```

## ▶️ Ejecutar el Proyecto

### 1. Iniciar el Backend (Terminal 1)

```bash
cd /home/victor/NestJs/Auth-Init
npm run dev
```

El backend debe estar corriendo en `http://localhost:3005`

### 2. Iniciar el Frontend (Terminal 2)

```bash
cd /home/victor/NextJs/MonterPlace
npm run dev
```

El MonterPlace estará disponible en `http://localhost:3000`

## 🧪 Credenciales de Prueba

### Para Login:
- **Admin**: `admin@test.com` / `password123`
- **Seller**: `seller@test.com` / `password123`

### Para Registro:
Puedes crear una nueva cuenta desde `/register`

## 📱 Funcionalidades Implementadas

### ✅ Páginas Públicas
- **/** - Página de inicio con productos destacados
- **/products** - Catálogo completo con filtros
- **/product/[id]** - Detalle de producto

### ✅ Carrito y Compras
- **/cart** - Carrito de compras
- **/wishlist** - Lista de deseos
- **/checkout** - Proceso de pago simulado

### ✅ Autenticación
- **/login** - Iniciar sesión
- **/register** - Crear cuenta
- **/account** - Perfil de usuario
- **/account/orders** - Historial de pedidos

## 🎯 Flujo de Uso Recomendado

1. **Explorar productos** en la página de inicio
2. **Buscar y filtrar** productos en `/products`
3. **Ver detalle** de un producto
4. **Agregar al carrito** o **lista de deseos**
5. **Proceder al checkout** desde el carrito
6. **Completar el pago simulado**
7. **Ver confirmación** del pedido

## 🔧 Características Técnicas

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **State Management**: Zustand (carrito y wishlist)
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

### Backend
- **Framework**: NestJS
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Puerto**: 3005

## 📂 Estructura de Archivos

```
MonterPlace/
├── app/
│   ├── actions/              # Server Actions
│   │   ├── auth.ts          # Login, registro, logout
│   │   └── products.ts      # Productos y categorías
│   ├── account/             # Páginas de cuenta
│   │   ├── page.tsx         # Perfil
│   │   └── orders/          # Historial
│   ├── cart/                # Carrito
│   ├── checkout/            # Proceso de pago
│   ├── login/               # Login
│   ├── product/[id]/        # Detalle de producto
│   ├── products/            # Catálogo
│   ├── register/            # Registro
│   ├── wishlist/            # Lista de deseos
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
├── components/
│   ├── layout/
│   │   ├── header.tsx       # Header con búsqueda
│   │   └── footer.tsx       # Footer
│   ├── products/
│   │   ├── product-card.tsx # Tarjeta de producto
│   │   └── product-detail.tsx # Detalle completo
│   └── ui/                  # Componentes UI base
├── lib/
│   ├── api/
│   │   └── client.ts        # Cliente HTTP
│   ├── auth/
│   │   └── session.ts       # Gestión de sesiones
│   ├── store/
│   │   ├── cart-store.ts    # Store del carrito
│   │   └── wishlist-store.ts # Store de wishlist
│   ├── types/               # Tipos TypeScript
│   └── utils.ts             # Utilidades
└── .env.local               # Variables de entorno
```

## 🐛 Solución de Problemas

### El frontend no se conecta al backend
- Verificar que el backend esté corriendo en el puerto 3005
- Revisar el archivo `.env.local`
- Verificar que no haya errores de CORS

### No aparecen productos
- Ejecutar los seeders del backend:
  ```bash
  cd /home/victor/NestJs/Auth-Init
  npm run seed
  ```

### Error al hacer login
- Verificar que las credenciales sean correctas
- Verificar que el backend esté respondiendo
- Revisar la consola del navegador para errores

### El carrito no persiste
- Verificar que el navegador permita LocalStorage
- Limpiar el caché del navegador si es necesario

## 📝 Notas Importantes

1. **Pago Simulado**: El proceso de checkout es completamente simulado. No se procesa ningún pago real.

2. **Persistencia**: El carrito y la wishlist se guardan en LocalStorage del navegador.

3. **Imágenes**: Las imágenes de productos vienen de las URLs configuradas en el backend.

4. **Responsive**: El diseño es completamente responsive (móvil, tablet, desktop).

## 🎨 Personalización

### Cambiar colores
Editar `tailwind.config.ts` para modificar la paleta de colores.

### Modificar el logo
Editar los componentes `Header` y `Footer` en `components/layout/`.

### Agregar más filtros
Modificar `app/products/page.tsx` y agregar los filtros deseados.

## 📞 Soporte

Si encuentras algún problema:
1. Revisar los logs del backend
2. Revisar la consola del navegador
3. Verificar que todas las dependencias estén instaladas
4. Reiniciar ambos servidores

## 🚀 Próximos Pasos

Para continuar el desarrollo:
1. Implementar sistema de reviews
2. Agregar búsqueda avanzada
3. Crear páginas de categorías
4. Integrar pasarela de pago real
5. Agregar sistema de notificaciones
