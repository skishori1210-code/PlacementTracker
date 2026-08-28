import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const [email, setEmail] = useState(
        localStorage.getItem("email")
    );

    const login = (loginData) => {

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("role", loginData.role);
        localStorage.setItem("email", loginData.email);

        setToken(loginData.token);
        setRole(loginData.role);
        setEmail(loginData.email);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        setToken(null);
        setRole(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                email,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}