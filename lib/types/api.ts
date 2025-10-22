// Tipos para la API

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// Usuario
export interface User {
  _id: string;
  name: string;
  lastName: string;
  idNumber: string;
  typeDocument: 'cc' | 'ce' | 'ti' | 'nit' | 'passport';
  phone: string;
  email: string;
  role: 'admin' | 'seller' | 'customer';
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  lastName: string;
  idNumber: string;
  typeDocument: 'cc' | 'ce' | 'ti' | 'nit' | 'passport';
  phone: string;
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<User> {
  token: string;
  data: User;
}
