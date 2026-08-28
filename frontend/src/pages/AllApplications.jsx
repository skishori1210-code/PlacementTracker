import { useEffect, useState } from "react";

function AllApplications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");

    const [updatingId, setUpdatingId] = useState(null);


    // ==============================
    // GET JWT TOKEN
    // ==============================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // ==============================
    // FETCH ALL APPLICATIONS
    // ==============================

    const fetchApplications = async () => {

        setLoading(true);

        setError("");
        setMessage("");

        try {

            const token = getToken();

            const response = await fetch(
                `${API_URL}/applications`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );


            if (!response.ok) {

                let errorMessage =
                    "Failed to fetch applications.";

                try {

                    const errorData =
                        await response.json();

                    if (errorData.message) {
                        errorMessage =
                            errorData.message;
                    }

                } catch {
                    // Ignore JSON parsing error
                }

                throw new Error(errorMessage);
            }


            const data = await response.json();

            setApplications(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // LOAD APPLICATIONS
    // ==============================

    useEffect(() => {

        fetchApplications();

    }, []);


    // ==============================
    // REFRESH
    // ==============================

    const handleRefresh = async () => {

        setMessage("");

        setError("");

        await fetchApplications();

    };


    // ==============================
    // UPDATE APPLICATION STATUS
    // ==============================

    const updateStatus = async (
        applicationId,
        newStatus
    ) => {

        setUpdatingId(applicationId);

        setError("");

        setMessage("");

        try {

            const token = getToken();

            const response = await fetch(
                `${API_URL}/applications/${applicationId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );


            if (!response.ok) {

                let errorMessage =
                    "Failed to update application status.";

                try {

                    const errorData =
                        await response.text();

                    if (errorData) {
                        errorMessage =
                            errorData;
                    }

                } catch {
                    // Ignore parsing error
                }

                throw new Error(errorMessage);
            }


            const updatedApplication =
                await response.json();


            // ==============================
            // UPDATE UI
            // ==============================

            setApplications((previousApplications) =>
                previousApplications.map(
                    (application) =>
                        application.id ===
                        applicationId
                            ? updatedApplication
                            : application
                )
            );


            setMessage(
                `Application #${applicationId} status updated to ${newStatus}.`
            );


        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setUpdatingId(null);

        }

    };


    // ==============================
    // STATUS COLOR
    // ==============================

    const getStatusColor = (status) => {

        switch (status) {

            case "SELECTED":
                return "#22C55E";

            case "REJECTED":
                return "#EF4444";

            case "SHORTLISTED":
                return "#F59E0B";

            case "APPLIED":
                return "#38BDF8";

            default:
                return "#CBD5E1";
        }

    };


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
                    maxWidth: "1250px",
                    margin: "0 auto"
                }}
            >

                {/* ========================= */}
                {/* HEADER */}
                {/* ========================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "30px"
                    }}
                >

                    <div>

                        <h1
                            style={{
                                color: "#38BDF8",
                                margin: "0 0 8px 0",
                                fontSize: "32px"
                            }}
                        >
                            All Applications
                        </h1>

                        <p
                            style={{
                                color: "#CBD5E1",
                                margin: 0
                            }}
                        >
                            View and manage all student
                            placement applications.
                        </p>

                    </div>


                    <button
                        onClick={handleRefresh}
                        style={{
                            background: "#1E293B",
                            color: "#F8FAFC",
                            border: "1px solid #334155",
                            padding: "11px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* ========================= */}
                {/* SUCCESS MESSAGE */}
                {/* ========================= */}

                {message && (

                    <div
                        style={{
                            background:
                                "rgba(34, 197, 94, 0.12)",
                            border:
                                "1px solid #22C55E",
                            color:
                                "#22C55E",
                            padding:
                                "14px 18px",
                            borderRadius:
                                "8px",
                            marginBottom:
                                "20px"
                        }}
                    >
                        ✓ {message}
                    </div>

                )}


                {/* ========================= */}
                {/* ERROR MESSAGE */}
                {/* ========================= */}

                {error && (

                    <div
                        style={{
                            background:
                                "rgba(239, 68, 68, 0.12)",
                            border:
                                "1px solid #EF4444",
                            color:
                                "#EF4444",
                            padding:
                                "14px 18px",
                            borderRadius:
                                "8px",
                            marginBottom:
                                "20px"
                        }}
                    >
                        ⚠ {error}
                    </div>

                )}


                {/* ========================= */}
                {/* SUMMARY */}
                {/* ========================= */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "18px",
                        marginBottom: "30px"
                    }}
                >

                    <div style={summaryCardStyle}>

                        <div style={summaryTitleStyle}>
                            Total Applications
                        </div>

                        <div style={summaryNumberStyle}>
                            {applications.length}
                        </div>

                    </div>


                    <div style={summaryCardStyle}>

                        <div style={summaryTitleStyle}>
                            Selected
                        </div>

                        <div
                            style={{
                                ...summaryNumberStyle,
                                color: "#22C55E"
                            }}
                        >
                            {
                                applications.filter(
                                    (application) =>
                                        application.status ===
                                        "SELECTED"
                                ).length
                            }
                        </div>

                    </div>


                    <div style={summaryCardStyle}>

                        <div style={summaryTitleStyle}>
                            Shortlisted
                        </div>

                        <div
                            style={{
                                ...summaryNumberStyle,
                                color: "#F59E0B"
                            }}
                        >
                            {
                                applications.filter(
                                    (application) =>
                                        application.status ===
                                        "SHORTLISTED"
                                ).length
                            }
                        </div>

                    </div>


                    <div style={summaryCardStyle}>

                        <div style={summaryTitleStyle}>
                            Rejected
                        </div>

                        <div
                            style={{
                                ...summaryNumberStyle,
                                color: "#EF4444"
                            }}
                        >
                            {
                                applications.filter(
                                    (application) =>
                                        application.status ===
                                        "REJECTED"
                                ).length
                            }
                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* APPLICATION LIST */}
                {/* ========================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "18px"
                    }}
                >

                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        Applications
                    </h2>

                    <span
                        style={{
                            color: "#CBD5E1"
                        }}
                    >
                        Total: {applications.length}
                    </span>

                </div>


                {/* ========================= */}
                {/* LOADING / EMPTY / LIST */}
                {/* ========================= */}

                {loading ? (

                    <div style={emptyBoxStyle}>

                        <h3>
                            Loading applications...
                        </h3>

                    </div>

                ) : applications.length === 0 ? (

                    <div style={emptyBoxStyle}>

                        <h3>
                            No applications found
                        </h3>

                        <p
                            style={{
                                color: "#CBD5E1"
                            }}
                        >
                            Student applications will
                            appear here.
                        </p>

                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(340px, 1fr))",
                            gap: "20px"
                        }}
                    >

                        {applications.map(
                            (application) => (

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
                                            "22px",
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,0.2)"
                                    }}
                                >

                                    {/* APPLICATION ID */}

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "flex-start",
                                            marginBottom:
                                                "15px"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color:
                                                    "#38BDF8",
                                                margin:
                                                    0,
                                                fontSize:
                                                    "20px"
                                            }}
                                        >
                                            Application
                                        </h3>

                                        <span
                                            style={{
                                                color:
                                                    "#94A3B8",
                                                fontSize:
                                                    "13px"
                                            }}
                                        >
                                            #{application.id}
                                        </span>

                                    </div>


                                    {/* STUDENT */}

                                    <div
                                        style={
                                            detailBoxStyle
                                        }
                                    >

                                        <div
                                            style={
                                                detailLabelStyle
                                            }
                                        >
                                            STUDENT
                                        </div>

                                        <div
                                            style={
                                                detailValueStyle
                                            }
                                        >
                                            {application.student
                                                ?.name ||
                                                "N/A"}
                                        </div>

                                    </div>


                                    {/* EMAIL */}

                                    <div
                                        style={
                                            detailBoxStyle
                                        }
                                    >

                                        <div
                                            style={
                                                detailLabelStyle
                                            }
                                        >
                                            EMAIL
                                        </div>

                                        <div
                                            style={{
                                                ...detailValueStyle,
                                                wordBreak:
                                                    "break-word"
                                            }}
                                        >
                                            {application.student
                                                ?.email ||
                                                "N/A"}
                                        </div>

                                    </div>


                                    {/* JOB */}

                                    <div
                                        style={
                                            detailBoxStyle
                                        }
                                    >

                                        <div
                                            style={
                                                detailLabelStyle
                                            }
                                        >
                                            JOB
                                        </div>

                                        <div
                                            style={
                                                detailValueStyle
                                            }
                                        >
                                            {application.job
                                                ?.jobTitle ||
                                                "N/A"}
                                        </div>

                                    </div>


                                    {/* COMPANY */}

                                    <div
                                        style={
                                            detailBoxStyle
                                        }
                                    >

                                        <div
                                            style={
                                                detailLabelStyle
                                            }
                                        >
                                            COMPANY
                                        </div>

                                        <div
                                            style={
                                                detailValueStyle
                                            }
                                        >
                                            {application.job
                                                ?.company
                                                ?.companyName ||
                                                "N/A"}
                                        </div>

                                    </div>


                                    {/* APPLICATION DATE */}

                                    <div
                                        style={
                                            detailBoxStyle
                                        }
                                    >

                                        <div
                                            style={
                                                detailLabelStyle
                                            }
                                        >
                                            APPLIED DATE
                                        </div>

                                        <div
                                            style={
                                                detailValueStyle
                                            }
                                        >
                                            {application
                                                .applicationDate ||
                                                "N/A"}
                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div
                                        style={{
                                            marginTop:
                                                "18px",
                                            paddingTop:
                                                "15px",
                                            borderTop:
                                                "1px solid #1E293B"
                                        }}
                                    >

                                        <div
                                            style={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "11px",
                                                fontWeight:
                                                    "700",
                                                marginBottom:
                                                    "8px",
                                                letterSpacing:
                                                    "0.5px"
                                            }}
                                        >
                                            APPLICATION STATUS
                                        </div>


                                        <select
                                            value={
                                                application.status ||
                                                "APPLIED"
                                            }
                                            disabled={
                                                updatingId ===
                                                application.id
                                            }
                                            onChange={(event) =>
                                                updateStatus(
                                                    application.id,
                                                    event.target.value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                padding:
                                                    "11px 12px",
                                                borderRadius:
                                                    "8px",
                                                border:
                                                    `1px solid ${getStatusColor(
                                                        application.status
                                                    )}`,
                                                background:
                                                    "#020617",
                                                color:
                                                    getStatusColor(
                                                        application.status
                                                    ),
                                                fontWeight:
                                                    "700",
                                                fontSize:
                                                    "14px",
                                                cursor:
                                                    updatingId ===
                                                    application.id
                                                        ? "not-allowed"
                                                        : "pointer",
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


                                        {updatingId ===
                                            application.id && (

                                            <p
                                                style={{
                                                    color:
                                                        "#94A3B8",
                                                    fontSize:
                                                        "12px",
                                                    marginTop:
                                                        "8px",
                                                    marginBottom:
                                                        0
                                                }}
                                            >
                                                Updating status...
                                            </p>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


// ==============================
// STYLES
// ==============================

const summaryCardStyle = {

    background: "#0F172A",

    border: "1px solid #1E293B",

    borderRadius: "12px",

    padding: "20px",

    boxShadow:
        "0 8px 20px rgba(0,0,0,0.18)"

};


const summaryTitleStyle = {

    color: "#CBD5E1",

    fontSize: "14px",

    marginBottom: "8px"

};


const summaryNumberStyle = {

    color: "#38BDF8",

    fontSize: "30px",

    fontWeight: "700"

};


const detailBoxStyle = {

    background: "#020617",

    border: "1px solid #1E293B",

    borderRadius: "8px",

    padding: "11px 13px",

    marginBottom: "10px"

};


const detailLabelStyle = {

    color: "#64748B",

    fontSize: "11px",

    fontWeight: "700",

    marginBottom: "4px",

    letterSpacing: "0.5px"

};


const detailValueStyle = {

    color: "#F8FAFC",

    fontSize: "15px",

    fontWeight: "600"

};


const emptyBoxStyle = {

    background: "#0F172A",

    border: "1px solid #1E293B",

    borderRadius: "12px",

    padding: "40px",

    textAlign: "center",

    color: "#CBD5E1"

};


export default AllApplications;