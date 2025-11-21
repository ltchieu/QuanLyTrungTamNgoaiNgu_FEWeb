import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // Kiểm tra xem có accessToken không
    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;