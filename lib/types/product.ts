import { ApiResponse } from './api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  cost: number;
  price: number;
  stock: number;
  discount: number;
  status: boolean;
  category_id: Category | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  search?: string;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
}

export interface ProductsListResponse extends ApiResponse<Product[]> {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductResponse extends ApiResponse<Product> {
  data: Product;
}

export interface CategoriesResponse extends ApiResponse<Category[]> {
  data: Category[];
}
