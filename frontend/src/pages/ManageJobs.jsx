import { useEffect, useState } from "react";
import API_URL from "../api";
function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        jobTitle: "",
        jobType: "",
        salary: "",
        vacancies: "",
        lastDate: "",
        companyId: ""
    });


    // ==============================
    // GET JWT TOKEN
    // ==============================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // ==============================
    // FETCH COMPANIES
    // ==============================

    const fetchCompanies = async () => {

        try {

            const token = getToken();

            const response = await fetch(
                `${API_URL}/companies`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch companies");
            }

            const data = await response.json();

            setCompanies(data);

        } catch (err) {

            setError(err.message);

        }
    };


    // ==============================
    // FETCH JOBS
    // ==============================

    const fetchJobs = async () => {

        setLoading(true);
        setError("");

        try {

            const token = getToken();

            const response = await fetch(
                `${API_URL}/jobs`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();

            setJobs(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };


    // ==============================
    // LOAD DATA
    // ==============================

    useEffect(() => {

        fetchJobs();
        fetchCompanies();

    }, []);


    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ==============================
    // RESET FORM
    // ==============================

    const resetForm = () => {

        setFormData({
            jobTitle: "",
            jobType: "",
            salary: "",
            vacancies: "",
            lastDate: "",
            companyId: ""
        });

        setEditingId(null);

        setShowForm(false);

    };


    // ==============================
    // ADD / UPDATE JOB
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        if (!formData.companyId) {

            setError("Please select a company.");

            return;
        }


        try {

            const token = getToken();


            // IMPORTANT:
            // Backend Job entity expects:
            //
            // company: {
            //     id: companyId
            // }

            const jobData = {

                jobTitle: formData.jobTitle,

                jobType: formData.jobType,

                salary: Number(formData.salary),

                vacancies: Number(formData.vacancies),

                lastDate: formData.lastDate,

                company: {
                    id: Number(formData.companyId)
                }

            };


            const url = editingId
                ? `${API_URL}/jobs/${editingId}`
                : `${API_URL}/jobs`;


            const method = editingId
                ? "PUT"
                : "POST";


            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(jobData)
                }
            );


            if (!response.ok) {

                let errorMessage = "Operation failed";

                try {

                    const errorData = await response.json();

                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }

                } catch {
                    // Ignore JSON parsing error
                }

                throw new Error(errorMessage);
            }


            if (editingId) {

                setMessage("Job updated successfully!");

            } else {

                setMessage("Job added successfully!");

            }


            resetForm();

            await fetchJobs();


            setTimeout(() => {

                setMessage("");

            }, 3000);


        } catch (err) {

            setError(err.message);

        }

    };


    // ==============================
    // EDIT JOB
    // ==============================

    const handleEdit = (job) => {

        setEditingId(job.id);

        setFormData({

            jobTitle: job.jobTitle || "",

            jobType: job.jobType || "",

            salary: job.salary ?? "",

            vacancies: job.vacancies ?? "",

            lastDate: job.lastDate || "",

            companyId: job.company?.id
                ? String(job.company.id)
                : ""

        });


        setShowForm(true);

        setMessage("");
        setError("");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==============================
    // DELETE JOB
    // ==============================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this job?"
        );


        if (!confirmed) {
            return;
        }


        setMessage("");
        setError("");


        try {

            const token = getToken();


            const response = await fetch(
                `${API_URL}/jobs/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );


            if (!response.ok) {
                throw new Error("Failed to delete job");
            }


            setMessage("Job deleted successfully!");


            await fetchJobs();


            setTimeout(() => {

                setMessage("");

            }, 3000);


        } catch (err) {

            setError(err.message);

        }

    };


    // ==============================
    // REFRESH
    // ==============================

    const handleRefresh = async () => {

        setMessage("");
        setError("");

        await fetchJobs();
        await fetchCompanies();

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
                    maxWidth: "1200px",
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
                            Manage Jobs
                        </h1>

                        <p
                            style={{
                                color: "#CBD5E1",
                                margin: 0
                            }}
                        >
                            Create and manage placement opportunities.
                        </p>

                    </div>


                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap"
                        }}
                    >

                        <button
                            onClick={handleRefresh}
                            style={secondaryButton}
                        >
                            🔄 Refresh
                        </button>


                        <button
                            onClick={() => {

                                if (showForm) {

                                    resetForm();

                                } else {

                                    setEditingId(null);

                                    setShowForm(true);

                                }

                            }}
                            style={primaryButton}
                        >
                            {showForm
                                ? "✕ Close Form"
                                : "+ Add Job"}
                        </button>

                    </div>

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
                {/* ADD / EDIT FORM */}
                {/* ========================= */}

                {showForm && (

                    <div
                        style={{
                            background: "#0F172A",
                            border:
                                "1px solid #1E293B",
                            borderRadius: "14px",
                            padding: "25px",
                            marginBottom: "30px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.25)"
                        }}
                    >

                        <h2
                            style={{
                                marginTop: 0
                            }}
                        >
                            {editingId
                                ? "Edit Job"
                                : "Add New Job"}
                        </h2>


                        <form onSubmit={handleSubmit}>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(250px, 1fr))",
                                    gap: "18px"
                                }}
                            >

                                {/* JOB TITLE */}

                                <div>

                                    <label style={labelStyle}>
                                        Job Title
                                    </label>

                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        required
                                        placeholder="Software Developer"
                                        style={inputStyle}
                                    />

                                </div>


                                {/* JOB TYPE */}

                                <div>

                                    <label style={labelStyle}>
                                        Job Type
                                    </label>

                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    >

                                        <option value="">
                                            Select Job Type
                                        </option>

                                        <option value="Full Time">
                                            Full Time
                                        </option>

                                        <option value="Part Time">
                                            Part Time
                                        </option>

                                        <option value="Internship">
                                            Internship
                                        </option>

                                        <option value="Contract">
                                            Contract
                                        </option>

                                    </select>

                                </div>


                                {/* SALARY */}

                                <div>

                                    <label style={labelStyle}>
                                        Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder="600000"
                                        style={inputStyle}
                                    />

                                </div>


                                {/* VACANCIES */}

                                <div>

                                    <label style={labelStyle}>
                                        Vacancies
                                    </label>

                                    <input
                                        type="number"
                                        name="vacancies"
                                        value={formData.vacancies}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        placeholder="5"
                                        style={inputStyle}
                                    />

                                </div>


                                {/* LAST DATE */}

                                <div>

                                    <label style={labelStyle}>
                                        Last Date
                                    </label>

                                    <input
                                        type="date"
                                        name="lastDate"
                                        value={formData.lastDate}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />

                                </div>


                                {/* COMPANY */}

                                <div>

                                    <label style={labelStyle}>
                                        Company
                                    </label>

                                    <select
                                        name="companyId"
                                        value={formData.companyId}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    >

                                        <option value="">
                                            Select Company
                                        </option>


                                        {companies.map((company) => (

                                            <option
                                                key={company.id}
                                                value={company.id}
                                            >
                                                {company.companyName}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginTop: "22px"
                                }}
                            >

                                <button
                                    type="submit"
                                    style={primaryButton}
                                >
                                    {editingId
                                        ? "Update Job"
                                        : "Add Job"}
                                </button>


                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={secondaryButton}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* ========================= */}
                {/* JOB LIST HEADER */}
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
                        Jobs
                    </h2>


                    <span
                        style={{
                            color: "#CBD5E1"
                        }}
                    >
                        Total: {jobs.length}
                    </span>

                </div>


                {/* ========================= */}
                {/* LOADING */}
                {/* ========================= */}

                {loading ? (

                    <div style={emptyBoxStyle}>

                        <h3>
                            Loading jobs...
                        </h3>

                    </div>

                ) : jobs.length === 0 ? (

                    /* ========================= */
                    /* NO JOBS */
                    /* ========================= */

                    <div style={emptyBoxStyle}>

                        <h3>
                            No jobs found
                        </h3>

                        <p
                            style={{
                                color: "#CBD5E1"
                            }}
                        >
                            Click "Add Job" to create your
                            first placement opportunity.
                        </p>

                    </div>

                ) : (

                    /* ========================= */
                    /* JOB CARDS */
                    /* ========================= */

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "20px"
                        }}
                    >

                        {jobs.map((job) => (

                            <div
                                key={job.id}
                                style={{
                                    background: "#0F172A",
                                    border:
                                        "1px solid #1E293B",
                                    borderRadius: "14px",
                                    padding: "22px",
                                    boxShadow:
                                        "0 8px 25px rgba(0,0,0,0.2)"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "flex-start",
                                        gap: "10px"
                                    }}
                                >

                                    <h3
                                        style={{
                                            color: "#38BDF8",
                                            margin:
                                                "0 0 8px 0",
                                            fontSize: "21px"
                                        }}
                                    >
                                        {job.jobTitle}
                                    </h3>


                                    <span
                                        style={{
                                            color: "#94A3B8",
                                            fontSize: "13px"
                                        }}
                                    >
                                        #{job.id}
                                    </span>

                                </div>


                                <p style={infoTextStyle}>
                                    🏢{" "}
                                    {job.company?.companyName ||
                                        "Unknown Company"}
                                </p>


                                <p style={infoTextStyle}>
                                    💼 {job.jobType}
                                </p>


                                <p
                                    style={{
                                        color: "#22C55E",
                                        fontWeight: "700",
                                        margin: "8px 0"
                                    }}
                                >
                                    💰 ₹{job.salary}
                                </p>


                                <p style={infoTextStyle}>
                                    👥 Vacancies:{" "}
                                    {job.vacancies}
                                </p>


                                <p style={infoTextStyle}>
                                    📅 Last Date:{" "}
                                    {job.lastDate}
                                </p>


                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "20px"
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            handleEdit(job)
                                        }
                                        style={{
                                            flex: 1,
                                            background:
                                                "#1E293B",
                                            color:
                                                "#38BDF8",
                                            border:
                                                "1px solid #38BDF8",
                                            padding:
                                                "10px",
                                            borderRadius:
                                                "7px",
                                            cursor:
                                                "pointer",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        ✏️ Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(job.id)
                                        }
                                        style={{
                                            flex: 1,
                                            background:
                                                "rgba(239,68,68,0.1)",
                                            color:
                                                "#EF4444",
                                            border:
                                                "1px solid #EF4444",
                                            padding:
                                                "10px",
                                            borderRadius:
                                                "7px",
                                            cursor:
                                                "pointer",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}


// ==============================
// STYLES
// ==============================

const inputStyle = {

    width: "100%",

    boxSizing: "border-box",

    background: "#020617",

    color: "#F8FAFC",

    border: "1px solid #334155",

    borderRadius: "8px",

    padding: "12px",

    marginTop: "7px",

    outline: "none",

    fontSize: "14px"

};


const labelStyle = {

    color: "#CBD5E1",

    fontSize: "14px",

    fontWeight: "600"

};


const primaryButton = {

    background: "#38BDF8",

    color: "#020617",

    border: "none",

    padding: "11px 18px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "700"

};


const secondaryButton = {

    background: "#1E293B",

    color: "#F8FAFC",

    border: "1px solid #334155",

    padding: "11px 18px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600"

};


const infoTextStyle = {

    color: "#CBD5E1",

    margin: "8px 0"

};


const emptyBoxStyle = {

    background: "#0F172A",

    border: "1px solid #1E293B",

    borderRadius: "12px",

    padding: "40px",

    textAlign: "center",

    color: "#CBD5E1"

};


export default ManageJobs;