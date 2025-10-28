'use server';

import { cookies } from 'next/headers';
import { apiGet } from '@/lib/api/client';
import { ActionResult } from '@/lib/types/api';

// Interfaz actualizada para coincidir con Payment de la API (con productos populados)
export interface Order {
  _id: string;
  products: Array<{
    product_id: {
      _id: string;
      name: string;
      price: number;
      image_url?: string;
    };
    quantity: number;
    price: number;
  }>;
  total: number;
  payment_method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function getUserOrdersAction(): Promise<ActionResult<Order[]>> {
  try {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        error: 'No estás autenticado. Por favor inicia sesión.',
      };
    }

    // Cambiar de /sales/user a /payment/user
    // Los customers ven sus pagos/pedidos, no las ventas de los sellers
    const response = await apiGet<{ data: Order[] }>('/payment/user', token);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener pedidos',
    };
  }
}

export interface Payment {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUserPaymentsAction(): Promise<ActionResult<Payment[]>> {
  try {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        error: 'No estás autenticado. Por favor inicia sesión.',
      };
    }

    const response = await apiGet<{ data: Payment[] }>('/payment/user', token);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener pagos',
    };
  }
}
