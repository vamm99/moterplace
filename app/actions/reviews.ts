'use server';

import { cookies } from 'next/headers';
import { apiGet, apiPost } from '@/lib/api/client';
import { ActionResult } from '@/lib/types/api';

export interface Review {
  _id: string;
  comment: string;
  qualification: number;
  user?: {
    _id: string;
    name: string;
    lastName: string;
  };
  createdAt: string;
}

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function getProductReviewsAction(
  productId: string
): Promise<ActionResult<{ data: Review[] }>> {
  try {
    const response = await apiGet<{ data: Review[] }>(`/review/product/${productId}`);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener reseñas',
    };
  }
}

export async function createReviewAction(
  productId: string,
  comment: string,
  qualification: number
): Promise<ActionResult<Review>> {
  try {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        error: 'No estás autenticado. Por favor inicia sesión.',
      };
    }

    const response = await apiPost<Review>(`/review/product/${productId}`, {
      comment,
      qualification,
    }, token);
    
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error al crear reseña:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear reseña',
    };
  }
}
