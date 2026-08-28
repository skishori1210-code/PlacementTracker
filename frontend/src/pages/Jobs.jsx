import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [applicationsLoading, setApplicationsLoading] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    // =====================================
    // GET TOKEN
    // =====================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================
    // GET AUTH HEADERS
    // =====================================

    const getHeaders = () => {

        const token = getToken();

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    };


    // =====================================
    // LOAD JOBS
    // =====================================

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {

                setError("You are not logged in.");

                return;
            }


            const response = await axios.get(
                `${API_URL}/jobs`,
                {
                    headers: getHeaders()
                }
            );


            setJobs(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (err) {

            console.error("Load Jobs Error:", err);

            if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view jobs."
                );

            } else {

                setError(
                    "Unable to load jobs."
                );
            }

        } finally {

            setLoading(false);

        }
    };


    // =====================================
    // LOAD MY APPLICATIONS
    // IMPORTANT:
    // STUDENT MUST USE /applications/my
    // NOT /applications
    // =====================================

    const loadApplications = async () => {

        try {

            setApplicationsLoading(true);

            const token = getToken();

            if (!token) {
                return;
            }


            const response = await axios.get(
                `${API_URL}/applications/my`,
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
                "Load My Applications Error:",
                err
            );


            if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view your applications."
                );

            } else {

                setError(
                    "Unable to load your applications."
                );

            }

        } finally {

            setApplicationsLoading(false);

        }
    };


    // =====================================
    // LOAD DATA WHEN PAGE OPENS
    // =====================================

    useEffect(() => {

        loadJobs();
        loadApplications();

    }, []);


    // =====================================
    // CHECK IF ALREADY APPLIED
    // =====================================

    const hasApplied = (jobId) => {

        return applications.some(
            (application) => {

                return application.job?.id === jobId;

            }
        );

    };


    // =====================================
    // APPLY FOR JOB
    // =====================================

    const applyForJob = async (jobId) => {

        try {

            setSuccess("");
            setError("");


            // ---------------------------------
            // CHECK LOGIN
            // ---------------------------------

            const token = getToken();

            if (!token) {

                setError(
                    "Please login before applying."
                );

                return;
            }


            // ---------------------------------
            // CHECK DUPLICATE APPLICATION
            // ---------------------------------

            if (hasApplied(jobId)) {

                setError(
                    "You have already applied for this job."
                );

                return;
            }


            // ---------------------------------
            // SEND APPLICATION
            // ---------------------------------

            await axios.post(
                `${API_URL}/applications`,
                {
                    jobId: jobId
                },
                {
                    headers: getHeaders()
                }
            );


            // ---------------------------------
            // SUCCESS MESSAGE
            // ---------------------------------

            setSuccess(
                "Application submitted successfully!"
            );


            // ---------------------------------
            // RELOAD MY APPLICATIONS
            // ---------------------------------

            await loadApplications();

        } catch (err) {

            console.error(
                "Apply For Job Error:",
                err
            );


            if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You are not allowed to apply for this job."
                );

            } else if (
                err.response &&
                err.response.data
            ) {

                if (
                    typeof err.response.data === "string"
                ) {

                    setError(
                        err.response.data
                    );

                } else {

                    setError(
                        err.response.data.message ||
                        "Unable to apply for this job."
                    );

                }

            } else {

                setError(
                    "Unable to apply for this job."
                );

            }

        }

    };


    // =====================================
    // FORMAT SALARY
    // =====================================

    const formatSalary = (salary) => {

        if (
            salary === null ||
            salary === undefined ||
            salary === ""
        ) {

            return "N/A";

        }


        const numberSalary = Number(salary);


        if (Number.isNaN(numberSalary)) {

            return salary;

        }


        return `₹${numberSalary.toLocaleString("en-IN")}`;

    };


    // =====================================
    // SEARCH JOBS
    // =====================================

    const filteredJobs = jobs.filter((job) => {

        const search =
            searchTerm
                .trim()
                .toLowerCase();


        if (!search) {

            return true;

        }


        const jobTitle =
            job.jobTitle
                ? String(job.jobTitle).toLowerCase()
                : "";


        const companyName =
            job.company?.companyName
                ? String(
                    job.company.companyName
                ).toLowerCase()
                : "";


        const jobType =
            job.jobType
                ? String(job.jobType).toLowerCase()
                : "";


        const location =
            job.company?.location
                ? String(
                    job.company.location
                ).toLowerCase()
                : "";


        return (
            jobTitle.includes(search) ||
            companyName.includes(search) ||
            jobType.includes(search) ||
            location.includes(search)
        );

    });


    // =====================================
    // CLEAR SEARCH
    // =====================================

    const clearSearch = () => {

        setSearchTerm("");

    };


    // =====================================
    // REFRESH
    // =====================================

    const handleRefresh = async () => {

        setSuccess("");
        setError("");

        await loadJobs();
        await loadApplications();

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

                {/* =================================
                    HEADER
                ================================= */}

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
                        PLACEMENT OPPORTUNITIES
                    </p>


                    <h1
                        style={{
                            margin: "5px 0 10px",
                            fontSize: "32px"
                        }}
                    >
                        💼 Available Jobs
                    </h1>


                    <p
                        style={{
                            color: "#CBD5E1",
                            margin: 0
                        }}
                    >
                        Explore the latest placement
                        opportunities and apply for
                        suitable positions.
                    </p>

                </div>


                {/* =================================
                    SEARCH BAR
                ================================= */}

                <div
                    style={{
                        background: "#0F172A",
                        border: "1px solid #1E293B",
                        borderRadius: "14px",
                        padding: "20px",
                        marginBottom: "25px",
                        boxShadow:
                            "0 8px 25px rgba(0,0,0,0.2)"
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            color: "#CBD5E1",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "10px"
                        }}
                    >
                        🔍 Search Jobs
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
                            placeholder="Search by job title, company, job type or location..."
                            style={{
                                flex: 1,
                                minWidth: "250px",
                                background: "#020617",
                                border:
                                    "1px solid #334155",
                                color: "#F8FAFC",
                                padding: "13px 15px",
                                borderRadius: "8px",
                                fontSize: "15px",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />


                        {searchTerm && (

                            <button
                                onClick={clearSearch}
                                style={{
                                    background:
                                        "#334155",
                                    color:
                                        "#F8FAFC",
                                    border:
                                        "none",
                                    padding:
                                        "0 20px",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "600"
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
                                fontSize: "13px",
                                margin:
                                    "12px 0 0"
                            }}
                        >

                            {searchTerm

                                ? `${filteredJobs.length} job${
                                    filteredJobs.length === 1
                                        ? ""
                                        : "s"
                                } found`

                                : `${jobs.length} job${
                                    jobs.length === 1
                                        ? ""
                                        : "s"
                                } available`

                            }

                        </p>

                    )}

                </div>


                {/* =================================
                    SUCCESS MESSAGE
                ================================= */}

                {success && (

                    <div
                        style={{
                            background:
                                "rgba(34,197,94,0.1)",
                            border:
                                "1px solid #22C55E",
                            color:
                                "#22C55E",
                            padding:
                                "14px",
                            borderRadius:
                                "10px",
                            marginBottom:
                                "20px"
                        }}
                    >
                        ✅ {success}
                    </div>

                )}


                {/* =================================
                    ERROR MESSAGE
                ================================= */}

                {error && (

                    <div
                        style={{
                            background:
                                "rgba(239,68,68,0.1)",
                            border:
                                "1px solid #EF4444",
                            color:
                                "#EF4444",
                            padding:
                                "14px",
                            borderRadius:
                                "10px",
                            marginBottom:
                                "20px"
                        }}
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* =================================
                    REFRESH
                ================================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px"
                    }}
                >

                    <button
                        onClick={handleRefresh}
                        style={{
                            background: "#0F172A",
                            border:
                                "1px solid #334155",
                            color:
                                "#F8FAFC",
                            padding:
                                "10px 18px",
                            borderRadius:
                                "8px",
                            cursor:
                                "pointer",
                            fontWeight:
                                "600"
                        }}
                    >
                        🔄 Refresh Jobs
                    </button>

                </div>


                {/* =================================
                    LOADING
                ================================= */}

                {loading && (

                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px",
                            color: "#CBD5E1"
                        }}
                    >

                        <h3>
                            Loading jobs...
                        </h3>

                    </div>

                )}


                {/* =================================
                    NO JOBS
                ================================= */}

                {!loading &&
                    jobs.length === 0 &&
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
                                    "50px",
                                textAlign:
                                    "center"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "45px"
                                }}
                            >
                                💼
                            </div>


                            <h3>
                                No jobs available
                            </h3>


                            <p
                                style={{
                                    color:
                                        "#94A3B8"
                                }}
                            >
                                Please check again
                                later for new
                                opportunities.
                            </p>

                        </div>

                    )}


                {/* =================================
                    NO SEARCH RESULTS
                ================================= */}

                {!loading &&
                    jobs.length > 0 &&
                    filteredJobs.length === 0 && (

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
                                    fontSize: "45px"
                                }}
                            >
                                🔍
                            </div>


                            <h3>
                                No matching jobs found
                            </h3>


                            <p
                                style={{
                                    color:
                                        "#94A3B8"
                                }}
                            >
                                Try a different job
                                title, company,
                                job type or location.
                            </p>


                            <button
                                onClick={clearSearch}
                                style={{
                                    marginTop: "10px",
                                    background:
                                        "#2563EB",
                                    color:
                                        "#FFFFFF",
                                    border:
                                        "none",
                                    padding:
                                        "11px 20px",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "600"
                                }}
                            >
                                Clear Search
                            </button>

                        </div>

                    )}


                {/* =================================
                    JOB CARDS
                ================================= */}

                {!loading &&
                    jobs.length > 0 &&
                    filteredJobs.length > 0 && (

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "22px"
                            }}
                        >

                            {filteredJobs.map((job) => {

                                const alreadyApplied =
                                    hasApplied(job.id);


                                return (

                                    <div
                                        key={job.id}
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
                                                "0 8px 25px rgba(0,0,0,0.2)"
                                        }}
                                    >

                                        {/* JOB TITLE */}

                                        <h2
                                            style={{
                                                color:
                                                    "#38BDF8",
                                                marginTop: 0,
                                                marginBottom:
                                                    "8px",
                                                fontSize:
                                                    "21px"
                                            }}
                                        >
                                            {job.jobTitle ||
                                                "Untitled Job"}
                                        </h2>


                                        {/* COMPANY */}

                                        <p
                                            style={{
                                                color:
                                                    "#F8FAFC",
                                                fontWeight:
                                                    "600",
                                                marginBottom:
                                                    "18px"
                                            }}
                                        >
                                            🏢{" "}
                                            {job.company?.companyName ||
                                                "Company not specified"}
                                        </p>


                                        {/* LOCATION */}

                                        {job.company?.location && (

                                            <p
                                                style={{
                                                    color:
                                                        "#94A3B8",
                                                    fontSize:
                                                        "14px",
                                                    marginBottom:
                                                        "18px"
                                                }}
                                            >
                                                📍{" "}
                                                {job.company.location}
                                            </p>

                                        )}


                                        {/* DETAILS */}

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
                                                label="Job Type"
                                                value={
                                                    job.jobType ||
                                                    "N/A"
                                                }
                                            />


                                            <Detail
                                                label="Salary"
                                                value={
                                                    formatSalary(
                                                        job.salary
                                                    )
                                                }
                                            />


                                            <Detail
                                                label="Vacancies"
                                                value={
                                                    job.vacancies ??
                                                    "N/A"
                                                }
                                            />


                                            <Detail
                                                label="Last Date"
                                                value={
                                                    job.lastDate ||
                                                    "N/A"
                                                }
                                            />

                                        </div>


                                        {/* =================================
                                            APPLY BUTTON
                                        ================================= */}

                                        {applicationsLoading ? (

                                            <button
                                                disabled
                                                style={{
                                                    width:
                                                        "100%",
                                                    background:
                                                        "#334155",
                                                    color:
                                                        "#94A3B8",
                                                    border:
                                                        "1px solid #475569",
                                                    padding:
                                                        "12px",
                                                    borderRadius:
                                                        "8px",
                                                    cursor:
                                                        "not-allowed",
                                                    fontWeight:
                                                        "800",
                                                    fontSize:
                                                        "14px"
                                                }}
                                            >
                                                Checking application...
                                            </button>

                                        ) : alreadyApplied ? (

                                            <button
                                                disabled
                                                style={{
                                                    width:
                                                        "100%",
                                                    background:
                                                        "#334155",
                                                    color:
                                                        "#94A3B8",
                                                    border:
                                                        "1px solid #475569",
                                                    padding:
                                                        "12px",
                                                    borderRadius:
                                                        "8px",
                                                    cursor:
                                                        "not-allowed",
                                                    fontWeight:
                                                        "800",
                                                    fontSize:
                                                        "14px"
                                                }}
                                            >
                                                ✓ Already Applied
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    applyForJob(
                                                        job.id
                                                    )
                                                }
                                                style={{
                                                    width:
                                                        "100%",
                                                    background:
                                                        "#38BDF8",
                                                    color:
                                                        "#020617",
                                                    border:
                                                        "none",
                                                    padding:
                                                        "12px",
                                                    borderRadius:
                                                        "8px",
                                                    cursor:
                                                        "pointer",
                                                    fontWeight:
                                                        "800",
                                                    fontSize:
                                                        "14px"
                                                }}
                                            >
                                                Apply Now
                                            </button>

                                        )}

                                    </div>

                                );

                            })}

                        </div>

                    )}


                {/* =================================
                    BACK TO DASHBOARD
                ================================= */}

                <div
                    style={{
                        marginTop: "35px"
                    }}
                >

                    <Link
                        to="/student-dashboard"
                        style={{
                            color:
                                "#38BDF8",
                            textDecoration:
                                "none",
                            fontWeight:
                                "600"
                        }}
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        </div>

    );

}


// =====================================
// JOB DETAIL COMPONENT
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
                paddingBottom:
                    "8px",
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
                    textAlign:
                        "right"
                }}
            >
                {value}
            </strong>

        </div>

    );

}


export default Jobs;