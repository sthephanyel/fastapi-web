import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
// import { useLoadingBar } from 'react-top-loading-bar';
import { AppRoutingSetup } from './app-routing-setup';
import { AppRoutingAuthentication } from './app-routing-authentication';
import { useAuthStore } from '@/store/auth';
import { useAuthentication } from '@/hooks/use-authentication';

export function AppRouting() {
  // const { start, complete } = useLoadingBar({
  //   color: 'var(--color-primary)',
  //   shadow: false,
  //   waitingTime: 400,
  //   transitionTime: 200,
  //   height: 2,
  // });

  const [previousLocation, setPreviousLocation] = useState('');
  // const [firstLoad, setFirstLoad] = useState(true);
  // const location = useLocation();
  // const path = location.pathname.trim();

  const { isAuthentication, loading } = useAuthentication();
  // console.log('isAuthentication', isAuthentication)
  // console.log('loading', loading)
  useEffect(() => {
    if (!CSS.escape(window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [previousLocation]);

  if (loading) {
    return <></>;
  }
  return isAuthentication ? <AppRoutingAuthentication/> : <AppRoutingSetup />;
}
