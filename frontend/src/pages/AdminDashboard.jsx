import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import API_URL from "../api";

function AdminDashboard() {

    const [studentsCount, setStudentsCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [jobsCount, setJobsCount] = useState(0);
    const [applicationsCount, setApplicationsCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // GET TOKEN
    // =====================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================
    // AXIOS CONFIG
    // =====================================

    const getConfig = () => {

        const token = getToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
    };


    // =====================================
    // LOAD DASHBOARD DATA
    // =====================================

    const loadDashboardData = async () => {

        try {

            setLoading(true);
            setError("");

            const config = getConfig();


            // =================================
            // LOAD STUDENTS
            // =================================

            try {

                const response =
                    await axios.get(
                        `${API_URL}/students`,
                        config
                    );

                if (Array.isArray(response.data)) {

                    setStudentsCount(
                        response.data.length
                    );

                }

            } catch (err) {

                console.error(
                    "Students Error:",
                    err
                );

                setStudentsCount(0);
            }


            // =================================
            // LOAD COMPANIES
            // =================================

            try {

                const response =
                    await axios.get(
                        `${API_URL}/companies`,
                        config
                    );

                if (Array.isArray(response.data)) {

                    setCompaniesCount(
                        response.data.length
                    );

                }

            } catch (err) {

                console.error(
                    "Companies Error:",
                    err
                );

                setCompaniesCount(0);
            }


            // =================================
            // LOAD JOBS
            // =================================

            try {

                const response =
                    await axios.get(
                        `${API_URL}/jobs`,
                        config
                    );

                if (Array.isArray(response.data)) {

                    setJobsCount(
                        response.data.length
                    );

                }

            } catch (err) {

                console.error(
                    "Jobs Error:",
                    err
                );

                setJobsCount(0);
            }


            // =================================
            // LOAD APPLICATIONS
            // =================================

            try {

                const response =
                    await axios.get(
                        `${API_URL}/applications`,
                        config
                    );

                if (Array.isArray(response.data)) {

                    setApplicationsCount(
                        response.data.length
                    );

                }

            } catch (err) {

                console.error(
                    "Applications Error:",
                    err
                );

                setApplicationsCount(0);
            }

        } catch (err) {

            console.error(
                "Dashboard Error:",
                err
            );

            setError(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================
    // LOAD WHEN PAGE OPENS
    // =====================================

    useEffect(() => {

        loadDashboardData();

    }, []);


    // =====================================
    // REFRESH
    // =====================================

    const handleRefresh = () => {

        loadDashboardData();

    };


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
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "40px 20px"
                }}
            >

                {/* =====================================
                    HEADER
                ===================================== */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "35px"
                    }}
                >

                    <div>

                        <p
                            style={{
                                color: "#A78BFA",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "1px",
                                margin: "0 0 8px"
                            }}
                        >
                            ADMIN PANEL
                        </p>

                        <h1
                            style={{
                                margin: "0 0 10px",
                                fontSize: "32px",
                                fontWeight: "800"
                            }}
                        >
                            🛡️ Admin Dashboard
                        </h1>

                        <p
                            style={{
                                color: "#94A3B8",
                                margin: 0,
                                fontSize: "15px"
                            }}
                        >
                            Manage students, companies, jobs and
                            placement applications.
                        </p>

                    </div>


                    {/* REFRESH */}

                    <button
                        onClick={handleRefresh}
                        style={{
                            background: "#0F172A",
                            color: "#F8FAFC",
                            border: "1px solid #334155",
                            padding: "11px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "14px"
                        }}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div
                        style={{
                            background:
                                "rgba(239,68,68,0.1)",
                            border:
                                "1px solid #EF4444",
                            color: "#EF4444",
                            padding: "14px",
                            borderRadius: "10px",
                            marginBottom: "25px"
                        }}
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* =====================================
                    STATISTICS
                ===================================== */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                        marginBottom: "40px"
                    }}
                >

                    {/* STUDENTS */}

                    <StatCard
                        icon="👨‍🎓"
                        title="Total Students"
                        value={
                            loading
                                ? "..."
                                : studentsCount
                        }
                        color="#38BDF8"
                    />


                    {/* COMPANIES */}

                    <StatCard
                        icon="🏢"
                        title="Total Companies"
                        value={
                            loading
                                ? "..."
                                : companiesCount
                        }
                        color="#A78BFA"
                    />


                    {/* JOBS */}

                    <StatCard
                        icon="💼"
                        title="Total Jobs"
                        value={
                            loading
                                ? "..."
                                : jobsCount
                        }
                        color="#22C55E"
                    />


                    {/* APPLICATIONS */}

                    <StatCard
                        icon="📄"
                        title="Total Applications"
                        value={
                            loading
                                ? "..."
                                : applicationsCount
                        }
                        color="#F59E0B"
                    />

                </div>


                {/* =====================================
                    MANAGEMENT
                ===================================== */}

                <h2
                    style={{
                        fontSize: "22px",
                        marginBottom: "20px"
                    }}
                >
                    ⚙️ Management
                </h2>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "22px",
                        marginBottom: "40px"
                    }}
                >

                    {/* =================================
                        MANAGE STUDENTS
                    ================================= */}

                    <ManagementCard
                        to="/manage-students"
                        icon="👨‍🎓"
                        title="Manage Students"
                        description="View, approve, update and manage registered students."
                    />


                    {/* =================================
                        MANAGE COMPANIES
                    ================================= */}

                    <ManagementCard
                        to="/manage-companies"
                        icon="🏢"
                        title="Manage Companies"
                        description="Add, edit and manage companies participating in placements."
                    />


                    {/* =================================
                        MANAGE JOBS
                    ================================= */}

                    <ManagementCard
                        to="/manage-jobs"
                        icon="💼"
                        title="Manage Jobs"
                        description="Create, update and manage available job opportunities."
                    />


                    {/* =================================
                        ALL APPLICATIONS
                    ================================= */}

                    <ManagementCard
                        to="/all-applications"
                        icon="📄"
                        title="Manage Applications"
                        description="View all student applications and update their status."
                    />

                </div>


                {/* =====================================
                    QUICK OVERVIEW
                ===================================== */}

                <div
                    style={{
                        background: "#0F172A",
                        border: "1px solid #1E293B",
                        borderRadius: "14px",
                        padding: "28px",
                        marginBottom: "30px"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            marginBottom: "10px",
                            fontSize: "22px"
                        }}
                    >
                        📊 Placement Overview
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8",
                            marginTop: 0,
                            lineHeight: "1.6"
                        }}
                    >
                        Use the management sections above to
                        control the placement system.
                    </p>


                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "15px",
                            marginTop: "25px"
                        }}
                    >

                        <OverviewItem
                            label="Students"
                            value={studentsCount}
                        />

                        <OverviewItem
                            label="Companies"
                            value={companiesCount}
                        />

                        <OverviewItem
                            label="Jobs"
                            value={jobsCount}
                        />

                        <OverviewItem
                            label="Applications"
                            value={applicationsCount}
                        />

                    </div>

                </div>


                {/* =====================================
                    ADMIN INFORMATION
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
                            marginTop: 0,
                            fontSize: "20px"
                        }}
                    >
                        🔐 Administrator Access
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8",
                            lineHeight: "1.7",
                            marginBottom: 0
                        }}
                    >
                        As an administrator, you can manage students,
                        companies, job opportunities and student
                        applications from this dashboard.
                    </p>

                </div>

            </div>

        </div>
    );
}


// =====================================
// STAT CARD
// =====================================

function StatCard({
    icon,
    title,
    value,
    color
}) {

    return (

        <div
            style={{
                background: "#0F172A",
                border: "1px solid #1E293B",
                borderRadius: "14px",
                padding: "25px",
                boxShadow:
                    "0 8px 25px rgba(0,0,0,0.2)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <p
                        style={{
                            color: "#94A3B8",
                            margin: "0 0 8px",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    >
                        {title}
                    </p>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "30px",
                            color: color
                        }}
                    >
                        {value}
                    </h2>

                </div>


                <div
                    style={{
                        fontSize: "38px"
                    }}
                >
                    {icon}
                </div>

            </div>

        </div>

    );
}


// =====================================
// MANAGEMENT CARD
// =====================================

function ManagementCard({
    to,
    icon,
    title,
    description
}) {

    return (

        <Link
            to={to}
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
                    minHeight: "170px",
                    boxSizing: "border-box",
                    transition: "0.2s"
                }}
            >

                <div
                    style={{
                        fontSize: "38px",
                        marginBottom: "15px"
                    }}
                >
                    {icon}
                </div>


                <h3
                    style={{
                        color: "#F8FAFC",
                        margin: "0 0 10px",
                        fontSize: "19px"
                    }}
                >
                    {title}
                </h3>


                <p
                    style={{
                        color: "#94A3B8",
                        margin: 0,
                        lineHeight: "1.6",
                        fontSize: "14px"
                    }}
                >
                    {description}
                </p>

            </div>

        </Link>

    );
}


// =====================================
// OVERVIEW ITEM
// =====================================

function OverviewItem({
    label,
    value
}) {

    return (

        <div
            style={{
                background: "#020617",
                border: "1px solid #1E293B",
                borderRadius: "10px",
                padding: "18px"
            }}
        >

            <p
                style={{
                    color: "#64748B",
                    margin: "0 0 5px",
                    fontSize: "13px"
                }}
            >
                {label}
            </p>

            <strong
                style={{
                    color: "#F8FAFC",
                    fontSize: "24px"
                }}
            >
                {value}
            </strong>

        </div>

    );
}


export default AdminDashboard;