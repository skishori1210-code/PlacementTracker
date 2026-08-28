import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRole, children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("ProtectedRoute:", {
        allowedRole,
        role,
        token: token ? "EXISTS" : "MISSING"
    });

    // =====================================
    // NOT LOGGED IN
    // =====================================

    if (!token) {
        return <Navigate to="/login" replace />;
    }


    // =====================================
    // WRONG ROLE
    // =====================================

    if (role !== allowedRole) {

        if (role === "ADMIN") {
            return (
                <Navigate
                    to="/admin-dashboard"
                    replace
                />
            );
        }

        if (role === "STUDENT") {
            return (
                <Navigate
                    to="/student-dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // =====================================
    // AUTHORIZED
    // =====================================

    return children;
}

export default ProtectedRoute;