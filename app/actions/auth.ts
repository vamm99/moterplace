'use server';

import { redirect } from 'next/navigation';
import { apiPost } from '@/lib/api/client';
import { setSession, clearSession, getUserData } from '@/lib/auth/session';
import { ActionResult, LoginCredentials, LoginResponse, RegisterData } from '@/lib/types/api';

/**
 * Login de usuario
 */
export async function loginAction(
  credentials: LoginCredentials
): Promise<ActionResult<LoginResponse>> {
  try {
    const response = await apiPost<LoginResponse>('/auth/login', credentials);

    if (response.token && response.data) {
      await setSession(response.token, response.data);
    }

    return {
      success: true,
      data: response,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('401')) {
      return {
        success: false,
        error: 'Usuario o contraseña incorrectos.'
      };
    }
  
    return {
      success: false,
      error: 'Ha ocurrido un error inesperado. Intenta de nuevo.'
    };
  }
}

/**
 * Registro de usuario
 */
export async function registerAction(
  userData: RegisterData
): Promise<ActionResult<LoginResponse>> {
  try {
    // Asegurarse de que el rol sea 'customer' para el MonterPlace
    const customerData = {
      ...userData,
      role: 'customer',
      status: true,
    };

    const response = await apiPost<LoginResponse>('/auth/register', customerData);

    if (response.token && response.data) {
      await setSession(response.token, response.data);
    }

    return {
      success: true,
      data: response,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No pudimos completar tu registro. Por favor inténtalo nuevamente.',
    };
  }
}

/**
 * Registro de vendedor
 */
export async function registerSellerAction(
  userData: RegisterData
): Promise<ActionResult<{ message: string }>> {
  try {
    const sellerData = {
      ...userData,
      role: 'seller',
      status: true,
    };

    const response = await apiPost<{ message: string }>('/auth/register-seller', sellerData);

    return {
      success: true,
      data: response,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No pudimos completar tu registro como vendedor. Por favor inténtalo nuevamente.',
    };
  }
}

/**
 * Logout de usuario
 */
export async function logoutAction() {
  await clearSession();
  redirect('/');
}

/**
 * Obtener datos del usuario actual
 */
export async function getCurrentUserAction() {
  try {
    const user = await getUserData();
    
    if (!user) {
      return {
        success: false,
        error: 'No hay usuario autenticado',
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'No pudimos obtener tu información. Por favor inténtalo nuevamente.',
    };
  }
}
