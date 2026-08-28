import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";
import Navbar from "../components/Navbar";

function Applications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    // =====================================
    // LOAD MY APPLICATIONS
    // =====================================

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");


            const token =
                localStorage.getItem("token");


            if (!token) {

                setError(
                    "You are not logged in."
                );

                return;
            }


            const response = await axios.get(
                `${API_URL}/applications/my`,
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
                    "Access denied. Please login as a Student."
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
    // SEARCH
    // =====================================

    const filteredApplications =
        applications.filter(
            (application) => {

                const search =
                    searchTerm
                        .trim()
                        .toLowerCase();


                if (!search) {
                    return true;
                }


                const jobTitle =
                    application.job?.jobTitle
                        ? application.job.jobTitle
                            .toLowerCase()
                        : "";


                const companyName =
                    application.job?.company
                        ?.companyName
                        ? application.job.company
                            .companyName
                            .toLowerCase()
                        : "";


                return (
                    jobTitle.includes(search) ||
                    companyName.includes(search)
                );

            }
        );


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


    // =====================================
    // CLEAR SEARCH
    // =====================================

    const clearSearch = () => {

        setSearchTerm("");

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
                    maxWidth: "1200px",
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
                            color: "#38BDF8",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px"
                        }}
                    >
                        MY APPLICATIONS
                    </p>


                    <h1
                        style={{
                            margin: "6px 0"
                        }}
                    >
                        📄 Applied Jobs
                    </h1>


                    <p
                        style={{
                            color: "#CBD5E1"
                        }}
                    >
                        Track every job you have
                        applied for and monitor
                        your application status.
                    </p>

                </div>


                {/* =====================================
                    SEARCH
                ===================================== */}

                <div
                    style={{
                        background: "#0F172A",
                        border: "1px solid #1E293B",
                        borderRadius: "14px",
                        padding: "20px",
                        marginBottom: "25px"
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#CBD5E1",
                            fontWeight: "600"
                        }}
                    >
                        🔍 Search Applications
                    </label>


                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap"
                        }}
                    >

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search by company or job title..."
                            style={{
                                flex: 1,
                                minWidth: "260px",
                                background: "#020617",
                                color: "#F8FAFC",
                                border:
                                    "1px solid #334155",
                                padding: "12px 15px",
                                borderRadius: "8px",
                                outline: "none"
                            }}
                        />


                        {searchTerm && (

                            <button
                                onClick={clearSearch}
                                style={{
                                    background:
                                        "#334155",
                                    color:
                                        "#FFFFFF",
                                    border: "none",
                                    padding:
                                        "0 20px",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer"
                                }}
                            >
                                Clear
                            </button>

                        )}

                    </div>


                    {!loading && (

                        <p
                            style={{
                                color: "#64748B",
                                marginTop: "12px",
                                fontSize: "13px"
                            }}
                        >
                            {searchTerm
                                ? `${filteredApplications.length} application${filteredApplications.length === 1 ? "" : "s"} found`
                                : `${applications.length} application${applications.length === 1 ? "" : "s"}`
                            }
                        </p>

                    )}

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
                            border:
                                "1px solid #334155",
                            padding:
                                "10px 18px",
                            borderRadius:
                                "8px",
                            cursor:
                                "pointer"
                        }}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* =====================================
                    LOADING
                ===================================== */}

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


                {/* =====================================
                    NO APPLICATIONS
                ===================================== */}

                {!loading &&
                    applications.length === 0 &&
                    !error && (

                        <div
                            style={{
                                background:
                                    "#0F172A",
                                border:
                                    "1px solid #1E293B",
                                borderRadius:
                                    "14px",
                                padding:
                                    "60px",
                                textAlign:
                                    "center"
                            }}
                        >

                            <div
                                style={{
                                    fontSize:
                                        "45px"
                                }}
                            >
                                📄
                            </div>


                            <h3>
                                No applications yet
                            </h3>


                            <p
                                style={{
                                    color:
                                        "#94A3B8"
                                }}
                            >
                                Apply for a job to
                                see it here.
                            </p>


                            <Link
                                to="/jobs"
                                style={{
                                    display:
                                        "inline-block",
                                    marginTop:
                                        "15px",
                                    background:
                                        "#2563EB",
                                    color:
                                        "#FFFFFF",
                                    padding:
                                        "11px 20px",
                                    borderRadius:
                                        "8px",
                                    textDecoration:
                                        "none",
                                    fontWeight:
                                        "700"
                                }}
                            >
                                Browse Jobs
                            </Link>

                        </div>

                    )}


                {/* =====================================
                    NO SEARCH RESULTS
                ===================================== */}

                {!loading &&
                    applications.length > 0 &&
                    filteredApplications.length === 0 && (

                        <div
                            style={{
                                background:
                                    "#0F172A",
                                border:
                                    "1px solid #1E293B",
                                borderRadius:
                                    "14px",
                                padding:
                                    "50px",
                                textAlign:
                                    "center"
                            }}
                        >

                            <div
                                style={{
                                    fontSize:
                                        "45px"
                                }}
                            >
                                🔍
                            </div>


                            <h3>
                                No matching applications found
                            </h3>


                            <button
                                onClick={clearSearch}
                                style={{
                                    marginTop:
                                        "15px",
                                    background:
                                        "#2563EB",
                                    color:
                                        "#FFFFFF",
                                    border: "none",
                                    padding:
                                        "11px 20px",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer"
                                }}
                            >
                                Clear Search
                            </button>

                        </div>

                    )}


                {/* =====================================
                    APPLICATION CARDS
                ===================================== */}

                {!loading &&
                    filteredApplications.length > 0 && (

                        <div
                            style={{
                                display:
                                    "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(340px,1fr))",
                                gap: "22px"
                            }}
                        >

                            {filteredApplications.map(
                                (application) => (

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

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                gap:
                                                    "15px",
                                                marginBottom:
                                                    "15px"
                                            }}
                                        >

                                            <div>

                                                <h2
                                                    style={{
                                                        color:
                                                            "#38BDF8",
                                                        margin:
                                                            0
                                                    }}
                                                >
                                                    {application
                                                        .job
                                                        ?.jobTitle ||
                                                        "Untitled Job"}
                                                </h2>


                                                <p
                                                    style={{
                                                        color:
                                                            "#CBD5E1",
                                                        fontWeight:
                                                            "600"
                                                    }}
                                                >
                                                    🏢{" "}
                                                    {application
                                                        .job
                                                        ?.company
                                                        ?.companyName ||
                                                        "Unknown Company"}
                                                </p>

                                            </div>


                                            <span
                                                style={{
                                                    background:
                                                        getStatusColor(
                                                            application.status
                                                        ),
                                                    color:
                                                        "#020617",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "999px",
                                                    fontSize:
                                                        "12px",
                                                    fontWeight:
                                                        "700",
                                                    height:
                                                        "fit-content"
                                                }}
                                            >
                                                {application.status}
                                            </span>

                                        </div>


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
                                                application
                                                    .job
                                                    ?.jobType ||
                                                "N/A"
                                            }
                                        />


                                        <Detail
                                            label="Location"
                                            value={
                                                application
                                                    .job
                                                    ?.company
                                                    ?.location ||
                                                "N/A"
                                            }
                                        />


                                        <Detail
                                            label="Salary"
                                            value={
                                                application
                                                    .job
                                                    ?.salary
                                                    ? `₹${Number(
                                                          application.job.salary
                                                      ).toLocaleString(
                                                          "en-IN"
                                                      )}`
                                                    : "N/A"
                                            }
                                        />

                                    </div>

                                )
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
                padding:
                    "10px 0",
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


export default Applications;