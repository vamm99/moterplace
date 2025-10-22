'use server';

import { apiGet } from '@/lib/api/client';
import { ActionResult } from '@/lib/types/api';
import {
  Product,
  ProductFilters,
  ProductsListResponse,
  ProductResponse,
  CategoriesResponse,
} from '@/lib/types/product';

/**
 * Obtener todos los productos públicos con paginación y filtros
 */
export async function getProductsAction(
  page: number = 1,
  limit: number = 12,
  filters?: ProductFilters
): Promise<ActionResult<ProductsListResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.search) params.append('search', filters.search);
    if (filters?.category_id) params.append('category_id', filters.category_id);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

    const response = await apiGet<ProductsListResponse>(
      `/product?${params.toString()}`
    );

    // Aplicar ordenamiento en el cliente si es necesario
    let products = response.data || [];
    
    if (filters?.sortBy) {
      products = sortProducts(products, filters.sortBy);
    }

    return {
      success: true,
      data: {
        ...response,
        data: products,
      },
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener productos',
    };
  }
}

/**
 * Obtener un producto por ID
 */
export async function getProductByIdAction(
  productId: string
): Promise<ActionResult<ProductResponse>> {
  try {
    const response = await apiGet<ProductResponse>(`/product/${productId}`);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener producto',
    };
  }
}

/**
 * Obtener todas las categorías
 */
export async function getCategoriesAction(): Promise<ActionResult<CategoriesResponse>> {
  try {
    const response = await apiGet<CategoriesResponse>('/category');

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener categorías',
    };
  }
}

/**
 * Función auxiliar para ordenar productos
 */
function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price - (a.price * a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price - (b.price * b.discount / 100) : b.price;
        return priceA - priceB;
      });
    case 'price_desc':
      return sorted.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price - (a.price * a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price - (b.price * b.discount / 100) : b.price;
        return priceB - priceA;
      });
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return sorted;
  }
}
