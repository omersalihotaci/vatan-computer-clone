import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("accessToken");
    const location = useLocation();

    if (!token) {
        return (
            <Navigate
                to="auth?tab=login"
                replace
                state={{
                    from: location.pathname,
                    message: "Sepeti görüntülemek için giriş yapmalısın",
                }}
            />
        );
    }

    return children;
}
