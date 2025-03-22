import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"

const PublicRoute = () => {}

const PrivateRoute = () => {}

const AdminRoute = () => {}

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
    )
}