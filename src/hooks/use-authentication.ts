import { useAuthStore } from '@/store/auth';
import { useCallback, useMemo, useState } from 'react';

export function useAuthentication() {
  const { token, refreshToken, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const isAuthentication = useMemo(
    () => {
      if (loading) return;
      setLoading(true);

      try {
        if (!token || !refreshToken) {
          clearAuth();
          return false;
        }
        return true;
      } catch (err) {
        console.warn('isAuthentication: ', err);
        return false;
      } 
      finally {
        setLoading(false);
        // clearAuth();
      }
    },
    [token, clearAuth]
  );

  return { isAuthentication, loading };
}
