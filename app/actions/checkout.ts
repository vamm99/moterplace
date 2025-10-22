'use server';

import { cookies } from 'next/headers';
import { apiPost } from '@/lib/api/client';
import { ActionResult } from '@/lib/types/api';

export interface CheckoutData {
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentInfo: {
    method: 'bamcolombia' | 'paypal';
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
  products: Array<{
    product_id: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function processCheckoutAction(
  data: CheckoutData
): Promise<ActionResult<{ orderId: string; paymentId: string }>> {
  try {
    console.log('🛒 Iniciando checkout...');
    console.log('Datos:', data);
    
    const token = await getToken();
    console.log('Token obtenido:', token ? 'SÍ' : 'NO');
    
    if (!token) {
      return {
        success: false,
        error: 'Debes iniciar sesión para completar tu compra. Por favor inicia sesión e inténtalo nuevamente.',
      };
    }

    // 1. Crear el pago
    console.log('💳 Creando pago...');
    const paymentResponse = await apiPost<{ data: { _id: string } }>('/payment', {
      products: data.products,
      total: data.total,
      payment_method: data.paymentInfo.method,
    }, token);
    console.log('✅ Pago creado:', paymentResponse);

    const paymentId = paymentResponse.data._id;

    // 2. Crear la venta
    console.log('📦 Creando venta...');
    const salesResponse = await apiPost<{ data: { _id: string } }>('/sales', {
      products: data.products,
      total: data.total,
      payment_id: paymentId,
    }, token);
    console.log('✅ Venta creada:', salesResponse);

    const orderId = salesResponse.data._id;

    console.log('🎉 Checkout completado exitosamente');
    return {
      success: true,
      data: {
        orderId,
        paymentId,
      },
    };
  } catch (error) {
    console.error('❌ Error en checkout:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No pudimos procesar tu pago. Por favor verifica tu información e inténtalo nuevamente.',
    };
  }
}
