import { ErrorRouting } from '@/errors/error-routing';
import AuthLayout from '@/layouts/auth-layout';
import Home from '@/pages/home/home';
import { Navigate, Route, Routes } from 'react-router';

export function AppRoutingAuthentication() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route element={<AuthLayout />}>
        <Route index element={<Home />} />
      </Route> */}
      <Route path="error/*" element={<ErrorRouting />} />
    </Routes>
  );
}
