import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        branch: "",
        year: "",
        cgpa: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================================
    // REGISTER
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Basic validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.branch ||
            !formData.year ||
            !formData.cgpa
        ) {

            setError("Please fill all fields.");
            return;
        }


        try {

            setLoading(true);


            const response = await axios.post(
                `${API_URL}/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    branch: formData.branch,
                    year: formData.year,
                    cgpa: formData.cgpa
                }
            );


            setSuccess(
                response.data.message ||
                "Registration successful!"
            );


            // Clear form
            setFormData({
                name: "",
                email: "",
                password: "",
                branch: "",
                year: "",
                cgpa: ""
            });


            // Go to login after 2 seconds
            setTimeout(() => {

                navigate("/login");

            }, 2000);


        } catch (err) {

            console.error("Registration Error:", err);


            if (err.response) {

                setError(
                    typeof err.response.data === "string"
                        ? err.response.data
                        : err.response.data.message ||
                          "Registration failed."
                );

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
                    maxWidth: "500px",
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
                    Student Registration
                </h1>


                <p
                    style={{
                        textAlign: "center",
                        color: "#94A3B8",
                        marginBottom: "30px"
                    }}
                >
                    Create your Placement Tracker account
                </p>


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
                        {error}
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
                        {success}
                    </div>

                )}


                <form onSubmit={handleSubmit}>


                    {/* NAME */}

                    <label style={labelStyle}>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        style={inputStyle}
                    />


                    {/* EMAIL */}

                    <label style={labelStyle}>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={inputStyle}
                    />


                    {/* PASSWORD */}

                    <label style={labelStyle}>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        style={inputStyle}
                    />


                    {/* BRANCH */}

                    <label style={labelStyle}>
                        Branch
                    </label>

                    <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="Example: CSE (AI & ML)"
                        style={inputStyle}
                    />


                    {/* YEAR */}

                    <label style={labelStyle}>
                        Year
                    </label>

                    <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        style={inputStyle}
                    >

                        <option value="">
                            Select Year
                        </option>

                        <option value="1">
                            1st Year
                        </option>

                        <option value="2">
                            2nd Year
                        </option>

                        <option value="3">
                            3rd Year
                        </option>

                        <option value="4">
                            4th Year
                        </option>

                    </select>


                    {/* CGPA */}

                    <label style={labelStyle}>
                        CGPA
                    </label>

                    <input
                        type="number"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        placeholder="Example: 8.5"
                        step="0.01"
                        min="0"
                        max="10"
                        style={inputStyle}
                    />


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "13px",
                            marginTop: "15px",
                            background: loading
                                ? "#475569"
                                : "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >

                        {loading
                            ? "Registering..."
                            : "Create Account"}

                    </button>

                </form>


                {/* ==========================================
                    LOGIN LINK
                ========================================== */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "25px",
                        color: "#94A3B8"
                    }}
                >

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        style={{
                            color: "#38BDF8",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Login here
                    </Link>

                </p>

            </div>

        </div>
    );
}


// ==========================================
// STYLES
// ==========================================

const labelStyle = {
    display: "block",
    color: "#CBD5E1",
    marginBottom: "7px",
    marginTop: "15px",
    fontWeight: "bold"
};


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


export default Register;