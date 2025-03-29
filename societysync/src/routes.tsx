import { Routes, Route } from "react-router-dom";
import { Dashboard, SignupPage, LoginPage } from "./pages";

const PublicRoute = () => {};

const PrivateRoute = () => {};

const AdminRoute = () => {};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<div>404 Not found</div>} />
    </Routes>
  );
};
