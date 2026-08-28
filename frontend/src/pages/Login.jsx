import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Login() {

    const navigate = useNavigate();

    const [loginType, setLoginType] = useState("STUDENT");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // CHANGE LOGIN TYPE
    // ==========================================

    const handleLoginTypeChange = (type) => {

        setLoginType(type);

        setError("");
        setSuccess("");

        setEmail("");
        setPassword("");
    };


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!email.trim() || !password.trim()) {

            setError(
                "Please enter email and password."
            );

            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // SELECT LOGIN API
            // ==========================================

            const loginEndpoint =
                loginType === "ADMIN"
                    ? "/auth/admin-login"
                    : "/auth/login";


            const response = await axios.post(
                `${API_URL}${loginEndpoint}`,
                {
                    email: email.trim(),
                    password: password
                }
            );


            console.log(
                "Login Response:",
                response.data
            );


            // ==========================================
            // SAVE LOGIN INFORMATION
            // ==========================================

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "role",
                response.data.role
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            setSuccess(
                `${loginType === "ADMIN"
                    ? "Admin"
                    : "Student"} login successful! Redirecting...`
            );


            // ==========================================
            // ADMIN
            // ==========================================

            if (
                response.data.role === "ADMIN"
            ) {

                setTimeout(() => {

                    navigate(
                        "/admin-dashboard"
                    );

                }, 500);

                return;
            }


            // ==========================================
            // STUDENT
            // ==========================================

            if (
                response.data.role === "STUDENT"
            ) {

                setTimeout(() => {

                    navigate(
                        "/student-dashboard"
                    );

                }, 500);

                return;
            }


            // ==========================================
            // UNKNOWN ROLE
            // ==========================================

            setError(
                "Unknown user role."
            );


        } catch (err) {

            console.error(
                "Login Error:",
                err
            );


            // ==========================================
            // BACKEND ERROR
            // ==========================================

            if (err.response) {

                if (
                    typeof err.response.data ===
                    "string"
                ) {

                    setError(
                        err.response.data
                    );

                } else {

                    setError(
                        err.response.data?.message ||
                        "Login failed."
                    );

                }

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    background: "#0F172A",
                    padding: "35px",
                    borderRadius: "15px",
                    boxShadow:
                        "0 0 25px rgba(0,0,0,0.5)"
                }}
            >

                {/* ==========================================
                    TITLE
                ========================================== */}

                <h1
                    style={{
                        textAlign: "center",
                        color: "#38BDF8",
                        marginBottom: "10px"
                    }}
                >
                    Placement Tracker
                </h1>


                <p
                    style={{
                        textAlign: "center",
                        color: "#94A3B8",
                        marginBottom: "25px"
                    }}
                >
                    Login to your account
                </p>


                {/* ==========================================
                    LOGIN TYPE BUTTONS
                ========================================== */}

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "25px"
                    }}
                >

                    {/* STUDENT */}

                    <button
                        type="button"
                        onClick={() =>
                            handleLoginTypeChange(
                                "STUDENT"
                            )
                        }
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background:
                                loginType === "STUDENT"
                                    ? "#2563EB"
                                    : "#1E293B",
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            cursor: "pointer",
                            fontSize: "15px"
                        }}
                    >
                        🎓 Student
                    </button>


                    {/* ADMIN */}

                    <button
                        type="button"
                        onClick={() =>
                            handleLoginTypeChange(
                                "ADMIN"
                            )
                        }
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background:
                                loginType === "ADMIN"
                                    ? "#7C3AED"
                                    : "#1E293B",
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            cursor: "pointer",
                            fontSize: "15px"
                        }}
                    >
                        🛡️ Admin
                    </button>

                </div>


                {/* ==========================================
                    CURRENT LOGIN TYPE
                ========================================== */}

                <h2
                    style={{
                        textAlign: "center",
                        color:
                            loginType === "ADMIN"
                                ? "#A78BFA"
                                : "#38BDF8",
                        marginBottom: "20px"
                    }}
                >
                    {loginType === "ADMIN"
                        ? "Admin Login"
                        : "Student Login"}
                </h2>


                {/* ==========================================
                    ERROR
                ========================================== */}

                {error && (

                    <div
                        style={{
                            background: "#7F1D1D",
                            color: "#FCA5A5",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center"
                        }}
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* ==========================================
                    SUCCESS
                ========================================== */}

                {success && (

                    <div
                        style={{
                            background: "#14532D",
                            color: "#86EFAC",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center"
                        }}
                    >
                        ✅ {success}
                    </div>

                )}


                {/* ==========================================
                    LOGIN FORM
                ========================================== */}

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}

                    <label
                        style={labelStyle}
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder={
                            loginType === "ADMIN"
                                ? "Enter admin email"
                                : "Enter student email"
                        }
                        style={inputStyle}
                    />


                    {/* PASSWORD */}

                    <label
                        style={labelStyle}
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter your password"
                        style={inputStyle}
                    />


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "13px",
                            marginTop: "20px",
                            background:
                                loading
                                    ? "#475569"
                                    : loginType === "ADMIN"
                                        ? "#7C3AED"
                                        : "#2563EB",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor:
                                loading
                                    ? "not-allowed"
                                    : "pointer"
                        }}
                    >

                        {loading
                            ? "Logging in..."
                            : loginType === "ADMIN"
                                ? "Login as Admin"
                                : "Login as Student"}

                    </button>

                </form>


                {/* ==========================================
                    REGISTER
                ========================================== */}

                {loginType === "STUDENT" && (

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "25px",
                            color: "#94A3B8"
                        }}
                    >

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            style={{
                                color: "#38BDF8",
                                textDecoration:
                                    "none",
                                fontWeight: "bold"
                            }}
                        >
                            Register here
                        </Link>

                    </p>

                )}


                {/* ==========================================
                    SWITCH LOGIN
                ========================================== */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "15px",
                        color: "#64748B",
                        fontSize: "13px"
                    }}
                >
                    {loginType === "ADMIN"
                        ? "Are you a student? Select Student above."
                        : "Are you an administrator? Select Admin above."}
                </p>

            </div>

        </div>

    );

}


// ==========================================
// LABEL STYLE
// ==========================================

const labelStyle = {

    display: "block",

    color: "#CBD5E1",

    marginBottom: "7px",

    marginTop: "15px",

    fontWeight: "bold"

};


// ==========================================
// INPUT STYLE
// ==========================================

const inputStyle = {

    width: "100%",

    padding: "12px",

    background: "#1E293B",

    color: "white",

    border: "1px solid #334155",

    borderRadius: "7px",

    outline: "none",

    fontSize: "15px",

    boxSizing: "border-box"

};


export default Login;