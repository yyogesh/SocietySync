import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import { Dashboard } from "./pages";

const PublicRoute = () => {
  return <Outlet />;
};

const PrivateRoute = () => {};

const AdminRoute = () => {
  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 Not found</div>} />
        {/* <Route index element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<div>404 Not found</div>} /> */}
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
