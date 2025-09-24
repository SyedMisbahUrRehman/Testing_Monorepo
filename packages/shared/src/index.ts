// Shared types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Shared utilities
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Constants
export const API_BASE_URL = process.env.API_BASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;

// Environment helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
