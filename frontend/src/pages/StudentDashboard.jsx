import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API_URL from "../api";

function StudentDashboard() {

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    // =====================================
    // GET TOKEN
    // =====================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================
    // LOAD STUDENT
    // =====================================

    const loadStudent = async () => {

        try {

            const token = getToken();

            if (!token) {
                return;
            }

            const response = await axios.get(
                `${API_URL}/students/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStudent(response.data);

        } catch (error) {

            console.error(
                "Unable to load student:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================
    // LOAD DATA
    // =====================================

    useEffect(() => {

        loadStudent();

    }, []);


    // =====================================
    // STUDENT NAME
    // =====================================

    const studentName =
        student?.name ||
        student?.studentName ||
        student?.fullName ||
        student?.firstName ||
        localStorage.getItem("name") ||
        localStorage.getItem("email")?.split("@")[0] ||
        "Student";


    // =====================================
    // DASHBOARD
    // =====================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "#F8FAFC"
            }}
        >

            {/* =====================================
                OLD NAVBAR
            ===================================== */}

            <Navbar />


            {/* =====================================
                MAIN CONTENT
            ===================================== */}

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 20px"
                }}
            >

                {/* =====================================
                    WELCOME SECTION
                ===================================== */}

                <div
                    style={{
                        background:
                            "linear-gradient(135deg, #0F172A, #111827)",
                        border:
                            "1px solid #1E293B",
                        borderRadius: "16px",
                        padding: "30px",
                        marginBottom: "35px",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.25)"
                    }}
                >

                    <p
                        style={{
                            color: "#38BDF8",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            margin: "0 0 10px"
                        }}
                    >
                        STUDENT PORTAL
                    </p>


                    <h1
                        style={{
                            margin: "0 0 10px",
                            fontSize: "32px",
                            fontWeight: "800"
                        }}
                    >

                        👋 Welcome, {loading ? "Student" : studentName}!

                    </h1>


                    <p
                        style={{
                            color: "#CBD5E1",
                            margin: 0,
                            fontSize: "15px",
                            lineHeight: "1.6"
                        }}
                    >

                        Welcome to your Placement Tracker dashboard.
                        Explore jobs, manage your profile and track
                        your applications.

                    </p>

                </div>


                {/* =====================================
                    QUICK ACTIONS
                ===================================== */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px",
                        marginBottom: "35px"
                    }}
                >

                    {/* =================================
                        JOBS
                    ================================= */}

                    <Link
                        to="/jobs"
                        style={{
                            textDecoration: "none"
                        }}
                    >

                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "14px",
                                padding: "25px",
                                minHeight: "170px"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "35px",
                                    marginBottom: "12px"
                                }}
                            >
                                💼
                            </div>


                            <h2
                                style={{
                                    color: "#38BDF8",
                                    margin: "0 0 8px",
                                    fontSize: "21px"
                                }}
                            >
                                Browse Jobs
                            </h2>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: 0,
                                    lineHeight: "1.6"
                                }}
                            >
                                Explore available placement
                                opportunities and apply for
                                suitable jobs.
                            </p>

                        </div>

                    </Link>


                    {/* =================================
                        APPLICATIONS
                    ================================= */}

                    <Link
                        to="/applications"
                        style={{
                            textDecoration: "none"
                        }}
                    >

                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "14px",
                                padding: "25px",
                                minHeight: "170px"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "35px",
                                    marginBottom: "12px"
                                }}
                            >
                                📄
                            </div>


                            <h2
                                style={{
                                    color: "#38BDF8",
                                    margin: "0 0 8px",
                                    fontSize: "21px"
                                }}
                            >
                                My Applications
                            </h2>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: 0,
                                    lineHeight: "1.6"
                                }}
                            >
                                View your submitted applications
                                and check their current status.
                            </p>

                        </div>

                    </Link>


                    {/* =================================
                        PROFILE
                    ================================= */}

                    <Link
                        to="/profile"
                        style={{
                            textDecoration: "none"
                        }}
                    >

                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "14px",
                                padding: "25px",
                                minHeight: "170px"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "35px",
                                    marginBottom: "12px"
                                }}
                            >
                                👤
                            </div>


                            <h2
                                style={{
                                    color: "#38BDF8",
                                    margin: "0 0 8px",
                                    fontSize: "21px"
                                }}
                            >
                                My Profile
                            </h2>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: 0,
                                    lineHeight: "1.6"
                                }}
                            >
                                Update your personal information,
                                skills and academic details.
                            </p>

                        </div>

                    </Link>

                </div>


                {/* =====================================
                    PROFILE COMPLETION
                ===================================== */}

                <div
                    style={{
                        background: "#0F172A",
                        border: "1px solid #1E293B",
                        borderRadius: "14px",
                        padding: "25px",
                        marginBottom: "30px"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            color: "#F8FAFC"
                        }}
                    >
                        📊 Placement Preparation
                    </h2>


                    <p
                        style={{
                            color: "#94A3B8",
                            lineHeight: "1.6"
                        }}
                    >
                        Keep your profile updated so you can
                        make the most of placement opportunities.
                    </p>


                    <Link
                        to="/profile"
                        style={{
                            display: "inline-block",
                            marginTop: "10px",
                            background: "#38BDF8",
                            color: "#020617",
                            padding: "11px 18px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "700"
                        }}
                    >
                        Update Profile
                    </Link>

                </div>


                {/* =====================================
                    GETTING STARTED
                ===================================== */}

                <div
                    style={{
                        background: "#0F172A",
                        border: "1px solid #1E293B",
                        borderRadius: "14px",
                        padding: "25px"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0
                        }}
                    >
                        🚀 Getting Started
                    </h2>


                    <div
                        style={{
                            display: "grid",
                            gap: "15px"
                        }}
                    >

                        <div>

                            <strong
                                style={{
                                    color: "#38BDF8"
                                }}
                            >
                                1. Complete your profile
                            </strong>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: "5px 0 0"
                                }}
                            >
                                Add your education, skills and
                                other information.
                            </p>

                        </div>


                        <div>

                            <strong
                                style={{
                                    color: "#38BDF8"
                                }}
                            >
                                2. Explore jobs
                            </strong>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: "5px 0 0"
                                }}
                            >
                                Search through available placement
                                opportunities.
                            </p>

                        </div>


                        <div>

                            <strong
                                style={{
                                    color: "#38BDF8"
                                }}
                            >
                                3. Apply for suitable jobs
                            </strong>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: "5px 0 0"
                                }}
                            >
                                Submit applications directly from
                                the Jobs page.
                            </p>

                        </div>


                        <div>

                            <strong
                                style={{
                                    color: "#38BDF8"
                                }}
                            >
                                4. Track your applications
                            </strong>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    margin: "5px 0 0"
                                }}
                            >
                                Check whether your applications
                                are applied, shortlisted, selected
                                or rejected.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default StudentDashboard;