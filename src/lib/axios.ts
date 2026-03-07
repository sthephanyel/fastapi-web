import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth';

let isLoggingOut = false;

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000'
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (isLoggingOut || originalRequest.url?.includes('/logout')) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;
    const isForbidden = error.response?.status === 403;
    const hasNotRetried = !originalRequest._retry;

    if ((isUnauthorized || isForbidden) && hasNotRetried) {
      originalRequest._retry = true;
      isLoggingOut = true;

      try {
        useAuthStore.getState().clearAuth();
        useAuthStore.getState().clearUser();
      } finally {
        setTimeout(() => {
          isLoggingOut = false;
        }, 1000);
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 2000))
    );
    return config;
  });
}

export default api;
