/**
 * Auth Store - Zustand
 * 
 * Global state management for authentication
 * Synchronized with localStorage via helpers
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  setAuth: (token: string, refreshToken?: string) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      refreshToken: null,
      setAuth: (token: string, refreshToken?: string) =>
        set({ token, refreshToken: refreshToken || token }),
      clearAuth: () => set({ token: null, refreshToken: null }),
      logout: () => set({ token: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Alias for compatibility with copied pages that use useAuth
export const useAuth = useAuthStore;
