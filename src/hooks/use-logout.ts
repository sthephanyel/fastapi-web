import { useAuthStore } from '@/store/auth';
import { useCallback, useState } from 'react';

export function useLogout() {
  const { token, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      // TODO: criar endpoint para invalidar as chaves refreshtoken
      console.log('LOGOUT')
    } catch (err) {
      console.warn('useLogout: ', err);
    } finally {
      clearAuth();
    }
  }, [token, clearAuth, loading]);

  return { logout, loading };
}
