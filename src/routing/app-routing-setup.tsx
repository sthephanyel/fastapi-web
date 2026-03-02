import AuthLayout from '@/layouts/auth-layout';
import LoginPage from '@/pages/login/login';
import { Navigate, Route, Routes } from 'react-router';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      {/* <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route> */}
    </Routes>
  );
}
