import { useEffect, useState } from "react";
import API_URL from "../api";
function ManageCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        companyName: "",
        location: "",
        packageOffered: "",
        minimumCGPA: "",
        eligibleBranch: "",
        jobRole: "",
        deadline: "",
        description: ""
    });

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const fetchCompanies = async () => {
        setLoading(true);
        setError("");

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/companies`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            companyName: "",
            location: "",
            packageOffered: "",
            minimumCGPA: "",
            eligibleBranch: "",
            jobRole: "",
            deadline: "",
            description: ""
        });

        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const token = getToken();

            const companyData = {
                companyName: formData.companyName,
                location: formData.location,
                packageOffered: Number(formData.packageOffered),
                minimumCGPA: Number(formData.minimumCGPA),
                eligibleBranch: formData.eligibleBranch,
                jobRole: formData.jobRole,
                deadline: formData.deadline,
                description: formData.description
            };

            const url = editingId
                ? `${API_URL}/companies/${editingId}`
                : `${API_URL}/companies`;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(companyData)
            });

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
                setMessage("Company updated successfully!");
            } else {
                setMessage("Company added successfully!");
            }

            resetForm();

            await fetchCompanies();

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (company) => {
        setEditingId(company.id);

        setFormData({
            companyName: company.companyName || "",
            location: company.location || "",
            packageOffered: company.packageOffered ?? "",
            minimumCGPA: company.minimumCGPA ?? "",
            eligibleBranch: company.eligibleBranch || "",
            jobRole: company.jobRole || "",
            deadline: company.deadline || "",
            description: company.description || ""
        });

        setShowForm(true);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmed) {
            return;
        }

        setMessage("");
        setError("");

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/companies/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete company");
            }

            setMessage("Company deleted successfully!");

            await fetchCompanies();

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (err) {
            setError(err.message);
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
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* HEADER */}

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
                            Manage Companies
                        </h1>

                        <p
                            style={{
                                color: "#CBD5E1",
                                margin: 0
                            }}
                        >
                            Add, edit, view and manage placement companies.
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
                            onClick={fetchCompanies}
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

                        <button
                            onClick={() => {
                                if (showForm) {
                                    resetForm();
                                } else {
                                    setShowForm(true);
                                    setEditingId(null);
                                }
                            }}
                            style={{
                                background: "#38BDF8",
                                color: "#020617",
                                border: "none",
                                padding: "11px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "700"
                            }}
                        >
                            {showForm ? "✕ Close Form" : "+ Add Company"}
                        </button>
                    </div>
                </div>

                {/* SUCCESS MESSAGE */}

                {message && (
                    <div
                        style={{
                            background: "rgba(34, 197, 94, 0.12)",
                            border: "1px solid #22C55E",
                            color: "#22C55E",
                            padding: "14px 18px",
                            borderRadius: "8px",
                            marginBottom: "20px"
                        }}
                    >
                        ✓ {message}
                    </div>
                )}

                {/* ERROR MESSAGE */}

                {error && (
                    <div
                        style={{
                            background: "rgba(239, 68, 68, 0.12)",
                            border: "1px solid #EF4444",
                            color: "#EF4444",
                            padding: "14px 18px",
                            borderRadius: "8px",
                            marginBottom: "20px"
                        }}
                    >
                        ⚠ {error}
                    </div>
                )}

                {/* ADD / EDIT FORM */}

                {showForm && (
                    <div
                        style={{
                            background: "#0F172A",
                            border: "1px solid #1E293B",
                            borderRadius: "14px",
                            padding: "25px",
                            marginBottom: "30px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
                        }}
                    >
                        <h2
                            style={{
                                color: "#F8FAFC",
                                marginTop: 0
                            }}
                        >
                            {editingId
                                ? "Edit Company"
                                : "Add New Company"}
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

                                {/* COMPANY NAME */}

                                <div>
                                    <label style={labelStyle}>
                                        Company Name
                                    </label>

                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Example: Infosys"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* LOCATION */}

                                <div>
                                    <label style={labelStyle}>
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="Example: Bangalore"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* PACKAGE */}

                                <div>
                                    <label style={labelStyle}>
                                        Package Offered
                                    </label>

                                    <input
                                        type="number"
                                        name="packageOffered"
                                        value={formData.packageOffered}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder="Example: 600000"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* MINIMUM CGPA */}

                                <div>
                                    <label style={labelStyle}>
                                        Minimum CGPA
                                    </label>

                                    <input
                                        type="number"
                                        name="minimumCGPA"
                                        value={formData.minimumCGPA}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="10"
                                        step="0.01"
                                        placeholder="Example: 7.5"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* ELIGIBLE BRANCH */}

                                <div>
                                    <label style={labelStyle}>
                                        Eligible Branch
                                    </label>

                                    <input
                                        type="text"
                                        name="eligibleBranch"
                                        value={formData.eligibleBranch}
                                        onChange={handleChange}
                                        required
                                        placeholder="Example: CSE, AIML"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* JOB ROLE */}

                                <div>
                                    <label style={labelStyle}>
                                        Job Role
                                    </label>

                                    <input
                                        type="text"
                                        name="jobRole"
                                        value={formData.jobRole}
                                        onChange={handleChange}
                                        required
                                        placeholder="Example: Software Developer"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* DEADLINE */}

                                <div>
                                    <label style={labelStyle}>
                                        Deadline
                                    </label>

                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* DESCRIPTION */}

                            <div
                                style={{
                                    marginTop: "18px"
                                }}
                            >
                                <label style={labelStyle}>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Enter company and placement details..."
                                    style={{
                                        ...inputStyle,
                                        resize: "vertical"
                                    }}
                                />
                            </div>

                            {/* FORM BUTTONS */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginTop: "20px"
                                }}
                            >
                                <button
                                    type="submit"
                                    style={{
                                        background: "#38BDF8",
                                        color: "#020617",
                                        border: "none",
                                        padding: "12px 22px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "700"
                                    }}
                                >
                                    {editingId
                                        ? "Update Company"
                                        : "Add Company"}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={{
                                        background: "#1E293B",
                                        color: "#F8FAFC",
                                        border: "1px solid #334155",
                                        padding: "12px 22px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* COMPANY LIST */}

                <div>

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
                            Companies
                        </h2>

                        <span
                            style={{
                                color: "#CBD5E1"
                            }}
                        >
                            Total: {companies.length}
                        </span>
                    </div>

                    {/* LOADING */}

                    {loading ? (
                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "12px",
                                padding: "40px",
                                textAlign: "center",
                                color: "#CBD5E1"
                            }}
                        >
                            Loading companies...
                        </div>
                    ) : companies.length === 0 ? (

                        /* NO COMPANIES */

                        <div
                            style={{
                                background: "#0F172A",
                                border: "1px solid #1E293B",
                                borderRadius: "12px",
                                padding: "40px",
                                textAlign: "center"
                            }}
                        >
                            <h3
                                style={{
                                    color: "#F8FAFC"
                                }}
                            >
                                No companies found
                            </h3>

                            <p
                                style={{
                                    color: "#CBD5E1"
                                }}
                            >
                                Click "Add Company" to create your first
                                company.
                            </p>
                        </div>

                    ) : (

                        /* COMPANY CARDS */

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "20px"
                            }}
                        >
                            {companies.map((company) => (
                                <div
                                    key={company.id}
                                    style={{
                                        background: "#0F172A",
                                        border: "1px solid #1E293B",
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
                                            gap: "10px",
                                            alignItems: "flex-start"
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#38BDF8",
                                                margin: "0 0 8px 0",
                                                fontSize: "21px"
                                            }}
                                        >
                                            {company.companyName}
                                        </h3>

                                        <span
                                            style={{
                                                color: "#94A3B8",
                                                fontSize: "13px"
                                            }}
                                        >
                                            #{company.id}
                                        </span>
                                    </div>

                                    <p
                                        style={{
                                            color: "#CBD5E1",
                                            margin: "8px 0"
                                        }}
                                    >
                                        📍 {company.location}
                                    </p>

                                    <p
                                        style={{
                                            color: "#CBD5E1",
                                            margin: "8px 0"
                                        }}
                                    >
                                        💼 {company.jobRole}
                                    </p>

                                    <p
                                        style={{
                                            color: "#22C55E",
                                            fontWeight: "700",
                                            margin: "8px 0"
                                        }}
                                    >
                                        💰 ₹{company.packageOffered}
                                    </p>

                                    <p
                                        style={{
                                            color: "#CBD5E1",
                                            margin: "8px 0"
                                        }}
                                    >
                                        🎓 Min CGPA:{" "}
                                        {company.minimumCGPA}
                                    </p>

                                    <p
                                        style={{
                                            color: "#CBD5E1",
                                            margin: "8px 0"
                                        }}
                                    >
                                        🧑‍💻 Branch:{" "}
                                        {company.eligibleBranch}
                                    </p>

                                    <p
                                        style={{
                                            color: "#CBD5E1",
                                            margin: "8px 0"
                                        }}
                                    >
                                        📅 Deadline:{" "}
                                        {company.deadline}
                                    </p>

                                    {company.description && (
                                        <p
                                            style={{
                                                color: "#94A3B8",
                                                lineHeight: "1.6",
                                                marginTop: "15px"
                                            }}
                                        >
                                            {company.description}
                                        </p>
                                    )}

                                    {/* ACTION BUTTONS */}

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginTop: "20px"
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleEdit(company)
                                            }
                                            style={{
                                                flex: 1,
                                                background: "#1E293B",
                                                color: "#38BDF8",
                                                border:
                                                    "1px solid #38BDF8",
                                                padding: "10px",
                                                borderRadius: "7px",
                                                cursor: "pointer",
                                                fontWeight: "600"
                                            }}
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(company.id)
                                            }
                                            style={{
                                                flex: 1,
                                                background:
                                                    "rgba(239,68,68,0.1)",
                                                color: "#EF4444",
                                                border:
                                                    "1px solid #EF4444",
                                                padding: "10px",
                                                borderRadius: "7px",
                                                cursor: "pointer",
                                                fontWeight: "600"
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
        </div>
    );
}


/* INPUT STYLE */

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


/* LABEL STYLE */

const labelStyle = {
    color: "#CBD5E1",
    fontSize: "14px",
    fontWeight: "600",
    display: "block"
};


export default ManageCompanies;