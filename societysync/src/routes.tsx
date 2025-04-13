import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import { useAppSelector } from "./hooks/hooks";
import { lazy, Suspense } from "react";
import Layout from "./components/common/layout/Layout";

// Lazy-loaded pages for better performance
const ResidentDashboard = lazy(
  () => import("./pages/dashboard/ResidentDashboard")
);
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const SecurityDashboard = lazy(
  () => import("./pages/dashboard/SecurityDashboard")
);
const ThemeSettingsPage = lazy(
  () => import("./pages/setting/ThemeSettingsPage")
);
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));
// const UserManagementPage = lazy(() => import("./pages/user/UserManagementPage"))

const PublicRoute = () => {
  return <Outlet />;
};

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Protected route wrapper for authenticated users
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Admin route wrapper
const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

// Resident route wrapper
const ResidentRoute = () => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated || user?.role !== "resident") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

// Security route wrapper
const SecurityRoute = () => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated || user?.role !== "security") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>404 Not found</div>} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/theme-settings" element={<ThemeSettingsPage />} />
            </Route>
            {/* Resident Routes */}
            <Route element={<ResidentRoute />}>
              <Route path="/dashboard" element={<ResidentDashboard />} />
            </Route>

            {/* Security Routes */}
            <Route element={<SecurityRoute />}>
              <Route
                path="/security-dashboard"
                element={<SecurityDashboard />}
              />
            </Route>

            {/* Common Routes for all authenticated users */}
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
