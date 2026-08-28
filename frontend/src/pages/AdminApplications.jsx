import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function AdminApplications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // =====================================
    // GET TOKEN
    // =====================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================
    // HEADERS
    // =====================================

    const getHeaders = () => {

        return {
            Authorization:
                `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        };

    };


    // =====================================
    // LOAD ALL APPLICATIONS
    // =====================================

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_URL}/applications`,
                {
                    headers: getHeaders()
                }
            );

            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (err) {

            console.error(
                "Admin Applications Error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "Access denied. Admin access required."
                );

            } else if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else {

                setError(
                    "Unable to load applications."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // PAGE LOAD
    // =====================================

    useEffect(() => {

        loadApplications();

    }, []);


    // =====================================
    // UPDATE STATUS
    // =====================================

    const updateStatus = async (
        applicationId,
        newStatus
    ) => {

        try {

            setError("");
            setSuccess("");

            await axios.put(
                `${API_URL}/applications/${applicationId}/status`,
                {
                    status: newStatus
                },
                {
                    headers: getHeaders()
                }
            );

            setSuccess(
                `Application status changed to ${newStatus}.`
            );

            await loadApplications();

        } catch (err) {

            console.error(
                "Update Status Error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "You are not allowed to update application status."
                );

            } else if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else {

                setError(
                    err.response?.data ||
                    "Unable to update application status."
                );

            }

        }

    };


    // =====================================
    // STATUS COLOR
    // =====================================

    const getStatusColor = (status) => {

        switch (status) {

            case "SELECTED":
                return "#22C55E";

            case "SHORTLISTED":
                return "#FACC15";

            case "REJECTED":
                return "#EF4444";

            case "APPLIED":
                return "#38BDF8";

            default:
                return "#94A3B8";
        }

    };


    // =====================================
    // PAGE
    // =====================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "#F8FAFC",
                padding: "40px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <p
                        style={{
                            color: "#38BDF8",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px"
                        }}
                    >
                        ADMIN PANEL
                    </p>

                    <h1>
                        📋 Student Applications
                    </h1>

                    <p
                        style={{
                            color: "#94A3B8"
                        }}
                    >
                        Review student applications and
                        update their status.
                    </p>

                </div>


                {/* SUCCESS */}

                {success && (

                    <div
                        style={{
                            background:
                                "rgba(34,197,94,0.1)",
                            border:
                                "1px solid #22C55E",
                            color:
                                "#22C55E",
                            padding: "14px",
                            borderRadius: "10px",
                            marginBottom: "20px"
                        }}
                    >
                        ✅ {success}
                    </div>

                )}


                {/* ERROR */}

                {error && (

                    <div
                        style={{
                            background:
                                "rgba(239,68,68,0.1)",
                            border:
                                "1px solid #EF4444",
                            color:
                                "#EF4444",
                            padding: "14px",
                            borderRadius: "10px",
                            marginBottom: "20px"
                        }}
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* REFRESH */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px"
                    }}
                >

                    <button
                        onClick={loadApplications}
                        style={{
                            background: "#0F172A",
                            color: "#FFFFFF",
                            border:
                                "1px solid #334155",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* LOADING */}

                {loading && (

                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px"
                        }}
                    >

                        <h3>
                            Loading applications...
                        </h3>

                    </div>

                )}


                {/* NO APPLICATIONS */}

                {!loading &&
                    applications.length === 0 &&
                    !error && (

                        <div
                            style={{
                                background: "#0F172A",
                                border:
                                    "1px solid #1E293B",
                                borderRadius: "14px",
                                padding: "60px",
                                textAlign: "center"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "45px"
                                }}
                            >
                                📄
                            </div>

                            <h3>
                                No applications found
                            </h3>

                            <p
                                style={{
                                    color: "#94A3B8"
                                }}
                            >
                                Students have not applied
                                for any jobs yet.
                            </p>

                        </div>

                    )}


                {/* APPLICATIONS */}

                {!loading &&
                    applications.length > 0 && (

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(340px, 1fr))",
                                gap: "22px"
                            }}
                        >

                            {applications.map(
                                (application) => {

                                    const status =
                                        application.status ||
                                        "APPLIED";

                                    return (

                                        <div
                                            key={
                                                application.id
                                            }
                                            style={{
                                                background:
                                                    "#0F172A",
                                                border:
                                                    "1px solid #1E293B",
                                                borderRadius:
                                                    "14px",
                                                padding:
                                                    "24px",
                                                boxShadow:
                                                    "0 8px 25px rgba(0,0,0,0.25)"
                                            }}
                                        >

                                            {/* JOB */}

                                            <h2
                                                style={{
                                                    color:
                                                        "#38BDF8",
                                                    marginTop: 0
                                                }}
                                            >
                                                {application
                                                    .job
                                                    ?.jobTitle ||
                                                    "Untitled Job"}
                                            </h2>


                                            {/* STUDENT */}

                                            <div
                                                style={{
                                                    marginBottom:
                                                        "18px"
                                                }}
                                            >

                                                <p
                                                    style={{
                                                        color:
                                                            "#F8FAFC",
                                                        fontWeight:
                                                            "700",
                                                        margin:
                                                            "5px 0"
                                                    }}
                                                >
                                                    👨‍🎓 Student
                                                </p>

                                                <p
                                                    style={{
                                                        color:
                                                            "#CBD5E1",
                                                        margin:
                                                            "5px 0"
                                                    }}
                                                >
                                                    {application
                                                        .student
                                                        ?.name ||
                                                        "Unknown Student"}
                                                </p>

                                                <p
                                                    style={{
                                                        color:
                                                            "#94A3B8",
                                                        fontSize:
                                                            "13px",
                                                        margin:
                                                            "5px 0"
                                                    }}
                                                >
                                                    {application
                                                        .student
                                                        ?.email ||
                                                        "No email"}
                                                </p>

                                            </div>


                                            {/* COMPANY */}

                                            <p
                                                style={{
                                                    color:
                                                        "#CBD5E1"
                                                }}
                                            >
                                                🏢{" "}
                                                {application
                                                    .job
                                                    ?.company
                                                    ?.companyName ||
                                                    "Unknown Company"}
                                            </p>


                                            {/* DATE */}

                                            <p
                                                style={{
                                                    color:
                                                        "#94A3B8"
                                                }}
                                            >
                                                📅 Applied:{" "}
                                                {application
                                                    .applicationDate ||
                                                    "N/A"}
                                            </p>


                                            {/* STATUS */}

                                            <div
                                                style={{
                                                    marginTop:
                                                        "20px"
                                                }}
                                            >

                                                <label
                                                    style={{
                                                        display:
                                                            "block",
                                                        color:
                                                            "#CBD5E1",
                                                        fontWeight:
                                                            "600",
                                                        marginBottom:
                                                            "8px"
                                                    }}
                                                >
                                                    Application Status
                                                </label>


                                                <select
                                                    value={status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            application.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        width:
                                                            "100%",
                                                        padding:
                                                            "12px",
                                                        background:
                                                            "#020617",
                                                        color:
                                                            getStatusColor(
                                                                status
                                                            ),
                                                        border:
                                                            `1px solid ${getStatusColor(
                                                                status
                                                            )}`,
                                                        borderRadius:
                                                            "8px",
                                                        fontWeight:
                                                            "700",
                                                        outline:
                                                            "none"
                                                    }}
                                                >

                                                    <option value="APPLIED">
                                                        APPLIED
                                                    </option>

                                                    <option value="SHORTLISTED">
                                                        SHORTLISTED
                                                    </option>

                                                    <option value="SELECTED">
                                                        SELECTED
                                                    </option>

                                                    <option value="REJECTED">
                                                        REJECTED
                                                    </option>

                                                </select>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}


                {/* BACK */}

                <div
                    style={{
                        marginTop: "35px"
                    }}
                >

                    <a
                        href="/admin-dashboard"
                        style={{
                            color: "#38BDF8",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        ← Back to Admin Dashboard
                    </a>

                </div>

            </div>

        </div>

    );

}

export default AdminApplications;