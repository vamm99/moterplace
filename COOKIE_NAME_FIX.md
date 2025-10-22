# 🍪 Corrección: Nombre de Cookie Incorrecto

## Problema

**Error**: "No estás autenticado" aunque el usuario había iniciado sesión.

**Causa**: Las Server Actions buscaban la cookie `'token'` pero el sistema guarda el token con el nombre `'auth_token'`.

---

## Solución

### Cambio en 3 archivos:

#### 1. `/app/actions/reviews.ts`
```typescript
// ANTES ❌
return cookieStore.get('token')?.value;

// DESPUÉS ✅
return cookieStore.get('auth_token')?.value;
```

#### 2. `/app/actions/orders.ts`
```typescript
// ANTES ❌
return cookieStore.get('token')?.value;

// DESPUÉS ✅
return cookieStore.get('auth_token')?.value;
```

#### 3. `/app/actions/checkout.ts`
```typescript
// ANTES ❌
return cookieStore.get('token')?.value;

// DESPUÉS ✅
return cookieStore.get('auth_token')?.value;
```

---

## Verificación

El nombre correcto está definido en `/lib/auth/session.ts`:
```typescript
const SESSION_COOKIE_NAME = 'auth_token'; // ✅ Este es el nombre correcto
```

---

## Ahora Funciona

1. ✅ Iniciar sesión → Guarda cookie `auth_token`
2. ✅ Crear reseña → Lee cookie `auth_token` → Funciona
3. ✅ Ver pedidos → Lee cookie `auth_token` → Funciona
4. ✅ Realizar compra → Lee cookie `auth_token` → Funciona

**¡Problema resuelto!** 🎉
