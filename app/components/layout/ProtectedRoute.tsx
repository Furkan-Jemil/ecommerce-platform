import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../lib/hooks/useAuth";

interface ProtectedRouteProps {
    adminOnly?: boolean;
}

export const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (adminOnly && user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
