import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";
import Navbar from "../components/Navbar";

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================
    // LOAD ALL APPLICATIONS
    // =====================================

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");


            const response = await axios.get(
                `${API_URL}/applications`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );


        } catch (err) {

            console.error(
                "Load Applications Error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "Access denied. Please login as Admin."
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
    // LOAD WHEN PAGE OPENS
    // =====================================

    useEffect(() => {

        loadApplications();

    }, []);


    // =====================================
    // UPDATE APPLICATION STATUS
    // =====================================

    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            setError("");
            setSuccess("");


            const token =
                localStorage.getItem("token");


            await axios.put(
                `${API_URL}/applications/${applicationId}/status`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );


            setSuccess(
                "Application status updated successfully."
            );


            await loadApplications();


        } catch (err) {

            console.error(err);

            setError(
                "Unable to update application status."
            );

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

            default:
                return "#38BDF8";

        }

    };


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


            <div
                style={{
                    maxWidth: "1300px",
                    margin: "0 auto",
                    padding: "40px 20px"
                }}
            >

                {/* =====================================
                    HEADER
                ===================================== */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <p
                        style={{
                            color: "#A78BFA",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px"
                        }}
                    >
                        ADMIN PANEL
                    </p>


                    <h1
                        style={{
                            margin: "6px 0 10px",
                            fontSize: "32px"
                        }}
                    >
                        📄 Manage Applications
                    </h1>


                    <p
                        style={{
                            color: "#CBD5E1"
                        }}
                    >
                        View and manage all student job applications.
                    </p>

                </div>


                {/* =====================================
                    REFRESH
                ===================================== */}

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
                            border: "1px solid #334155",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* =====================================
                    SUCCESS
                ===================================== */}

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


                {/* =====================================
                    LOADING
                ===================================== */}

                {loading && (

                    <div
                        style={{
                            background: "#0F172A",
                            border: "1px solid #1E293B",
                            borderRadius: "14px",
                            padding: "50px",
                            textAlign: "center"
                        }}
                    >

                        <h3>
                            Loading applications...
                        </h3>

                    </div>

                )}


                {/* =====================================
                    NO APPLICATIONS
                ===================================== */}

                {!loading &&
                    applications.length === 0 && (

                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "14px",
                                padding: "60px",
                                textAlign: "center"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "50px"
                                }}
                            >
                                📄
                            </div>

                            <h2>
                                No applications yet
                            </h2>

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


                {/* =====================================
                    APPLICATIONS
                ===================================== */}

                {!loading &&
                    applications.length > 0 && (

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(350px, 1fr))",
                                gap: "22px"
                            }}
                        >

                            {applications.map(
                                (application) => {

                                    const student =
                                        application.student;

                                    const job =
                                        application.job;

                                    const company =
                                        job?.company;


                                    return (

                                        <div
                                            key={application.id}
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
                                                    marginTop: 0,
                                                    marginBottom:
                                                        "8px"
                                                }}
                                            >
                                                {job?.jobTitle ||
                                                    "Unknown Job"}
                                            </h2>


                                            <p
                                                style={{
                                                    color:
                                                        "#CBD5E1",
                                                    fontWeight:
                                                        "600",
                                                    marginBottom:
                                                        "20px"
                                                }}
                                            >
                                                🏢{" "}
                                                {company?.companyName ||
                                                    "Unknown Company"}
                                            </p>


                                            {/* STUDENT */}

                                            <div
                                                style={{
                                                    background:
                                                        "#020617",
                                                    border:
                                                        "1px solid #1E293B",
                                                    borderRadius:
                                                        "10px",
                                                    padding:
                                                        "15px",
                                                    marginBottom:
                                                        "18px"
                                                }}
                                            >

                                                <p
                                                    style={{
                                                        margin:
                                                            "0 0 8px",
                                                        color:
                                                            "#38BDF8",
                                                        fontWeight:
                                                            "700"
                                                    }}
                                                >
                                                    👨‍🎓 Student
                                                </p>


                                                <p
                                                    style={{
                                                        margin:
                                                            "5px 0",
                                                        color:
                                                            "#F8FAFC"
                                                    }}
                                                >
                                                    <strong>
                                                        Name:
                                                    </strong>{" "}
                                                    {student?.name ||
                                                        "N/A"}
                                                </p>


                                                <p
                                                    style={{
                                                        margin:
                                                            "5px 0",
                                                        color:
                                                            "#CBD5E1"
                                                    }}
                                                >
                                                    <strong>
                                                        Email:
                                                    </strong>{" "}
                                                    {student?.email ||
                                                        "N/A"}
                                                </p>


                                                <p
                                                    style={{
                                                        margin:
                                                            "5px 0",
                                                        color:
                                                            "#CBD5E1"
                                                    }}
                                                >
                                                    <strong>
                                                        Branch:
                                                    </strong>{" "}
                                                    {student?.branch ||
                                                        "N/A"}
                                                </p>


                                                <p
                                                    style={{
                                                        margin:
                                                            "5px 0",
                                                        color:
                                                            "#CBD5E1"
                                                    }}
                                                >
                                                    <strong>
                                                        CGPA:
                                                    </strong>{" "}
                                                    {student?.cgpa ??
                                                        "N/A"}
                                                </p>

                                            </div>


                                            {/* APPLICATION DETAILS */}

                                            <div
                                                style={{
                                                    display:
                                                        "grid",
                                                    gap:
                                                        "10px",
                                                    marginBottom:
                                                        "20px"
                                                }}
                                            >

                                                <Detail
                                                    label="Application ID"
                                                    value={
                                                        application.id
                                                    }
                                                />


                                                <Detail
                                                    label="Applied On"
                                                    value={
                                                        application.applicationDate ||
                                                        "N/A"
                                                    }
                                                />


                                                <Detail
                                                    label="Job Type"
                                                    value={
                                                        job?.jobType ||
                                                        "N/A"
                                                    }
                                                />


                                                <Detail
                                                    label="Salary"
                                                    value={
                                                        job?.salary
                                                            ? `₹${Number(
                                                                  job.salary
                                                              ).toLocaleString(
                                                                  "en-IN"
                                                              )}`
                                                            : "N/A"
                                                    }
                                                />

                                            </div>


                                            {/* STATUS */}

                                            <div
                                                style={{
                                                    marginBottom:
                                                        "15px"
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        display:
                                                            "inline-block",
                                                        background:
                                                            getStatusColor(
                                                                application.status
                                                            ),
                                                        color:
                                                            "#020617",
                                                        padding:
                                                            "7px 14px",
                                                        borderRadius:
                                                            "999px",
                                                        fontSize:
                                                            "12px",
                                                        fontWeight:
                                                            "800"
                                                    }}
                                                >
                                                    {application.status}
                                                </span>

                                            </div>


                                            {/* STATUS BUTTONS */}

                                            <div
                                                style={{
                                                    display:
                                                        "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr",
                                                    gap:
                                                        "8px"
                                                }}
                                            >

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            application.id,
                                                            "SHORTLISTED"
                                                        )
                                                    }
                                                    style={
                                                        statusButton
                                                    }
                                                >
                                                    Shortlist
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            application.id,
                                                            "SELECTED"
                                                        )
                                                    }
                                                    style={{
                                                        ...statusButton,
                                                        background:
                                                            "#16A34A"
                                                    }}
                                                >
                                                    Select
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            application.id,
                                                            "REJECTED"
                                                        )
                                                    }
                                                    style={{
                                                        ...statusButton,
                                                        background:
                                                            "#DC2626"
                                                    }}
                                                >
                                                    Reject
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            application.id,
                                                            "APPLIED"
                                                        )
                                                    }
                                                    style={{
                                                        ...statusButton,
                                                        background:
                                                            "#475569"
                                                    }}
                                                >
                                                    Reset
                                                </button>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

            </div>

        </div>

    );

}


// =====================================
// DETAIL
// =====================================

function Detail({
    label,
    value
}) {

    return (

        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                gap: "15px",
                paddingBottom: "8px",
                borderBottom:
                    "1px solid #1E293B"
            }}
        >

            <span
                style={{
                    color: "#64748B",
                    fontSize: "13px"
                }}
            >
                {label}
            </span>


            <strong
                style={{
                    color: "#CBD5E1",
                    fontSize: "13px",
                    textAlign: "right"
                }}
            >
                {value}
            </strong>

        </div>

    );

}


// =====================================
// STATUS BUTTON
// =====================================

const statusButton = {

    background: "#CA8A04",
    color: "#FFFFFF",
    border: "none",
    padding: "10px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700"

};


export default ManageApplications;