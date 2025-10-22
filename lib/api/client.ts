// Cliente HTTP para consumir la API de NestJS

import { ApiError } from '@/lib/types/api';

// URL base de tu API NestJS
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Cliente API genérico para hacer peticiones HTTP
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  token?: string
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options?.headers) {
    const additionalHeaders = new Headers(options.headers);
    additionalHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store', // Importante para marketplace con datos dinámicos
    });

    const clonedResponse = response.clone();
    
    let data: any = null;
    let rawText: string | null = null;

    try {
        data = await response.json();
    } catch (e) {
        rawText = await clonedResponse.text().catch(() => null);
    }
    
    if (!response.ok) {
      let errorMessage = response.statusText;

      if (data && typeof data === 'object' && 'message' in data) {
        errorMessage = (data as ApiError).message;
      } else if (rawText) {
        errorMessage = rawText;
      }
      
      throw new Error(`Error ${response.status} en la API: ${errorMessage}`);
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión con el servidor');
  }
}

export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'GET' }, token);
}

export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  token?: string
): Promise<T> {
  return apiClient<T>(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    token
  );
}

export async function apiPut<T>(
  endpoint: string,
  body: unknown,
  token?: string
): Promise<T> {
  return apiClient<T>(
    endpoint,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    },
    token
  );
}

export async function apiDelete<T>(endpoint: string, token?: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'DELETE' }, token);
}
