import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "../components/PageContainer";
import API_URL from "../api";
function Profile() {

    const [student, setStudent] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        branch: "",
        year: "",
        cgpa: "",
        skills: "",
        resumeUrl: ""
    });


    // =====================================
    // LOAD PROFILE
    // =====================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setErrorMessage("");

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/students/me`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const profile = response.data;

            setStudent(profile);

            setFormData({
                name: profile.name || "",
                phone: profile.phone || "",
                branch: profile.branch || "",
                year: profile.year || "",
                cgpa: profile.cgpa || "",
                skills: profile.skills || "",
                resumeUrl: profile.resumeUrl || ""
            });

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Unable to load your profile."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
        setErrorMessage("");

    };


    // =====================================
    // SAVE PROFILE
    // =====================================

    const handleSave = async (event) => {

        event.preventDefault();

        if (!student) return;

        try {

            setSaving(true);
            setMessage("");
            setErrorMessage("");

            const token =
                localStorage.getItem("token");

            await axios.put(

                `${API_URL}/students/${student.id}`,

                formData,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    }
                }

            );

            setMessage(
                "Profile updated successfully!"
            );

            await loadProfile();

        } catch (error) {

            console.error(error);

            if (
                error.response &&
                error.response.data
            ) {

                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    setErrorMessage(
                        error.response.data
                    );

                } else {

                    setErrorMessage(
                        error.response.data.message ||
                        "Unable to update profile."
                    );

                }

            } else {

                setErrorMessage(
                    "Unable to connect to server."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <PageContainer title="My Profile">

                <div
                    style={{
                        background: "#1E293B",
                        color: "#F8FAFC",
                        borderRadius: "16px",
                        padding: "40px",
                        textAlign: "center"
                    }}
                >

                    <h2>
                        Loading profile...
                    </h2>

                </div>

            </PageContainer>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (!student) {

        return (

            <PageContainer title="My Profile">

                <div
                    style={{
                        background: "#1E293B",
                        color: "#F8FAFC",
                        borderRadius: "16px",
                        padding: "40px"
                    }}
                >

                    <h2>
                        Unable to load profile
                    </h2>

                    <p
                        style={{
                            color: "#CBD5E1"
                        }}
                    >
                        {errorMessage}
                    </p>

                </div>

            </PageContainer>

        );

    }


    // =====================================
    // PAGE
    // =====================================

    return (

        <PageContainer title="My Profile">

            {/* ===============================
                PROFILE HEADER
            =============================== */}

            <div
                style={{
                    background: "#1E293B",
                    borderRadius: "16px",
                    padding: "30px",
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "25px"
                }}
            >

                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        background: "#2563EB",
                        color: "#FFFFFF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "34px",
                        fontWeight: "bold"
                    }}
                >
                    {student.name
                        ? student.name
                              .charAt(0)
                              .toUpperCase()
                        : "S"}
                </div>

                <div>

                    <h2
                        style={{
                            color: "#FFFFFF",
                            marginBottom: "8px"
                        }}
                    >
                        {student.name || "Student"}
                    </h2>

                    <p
                        style={{
                            color: "#CBD5E1",
                            marginBottom: "10px"
                        }}
                    >
                        {student.email}
                    </p>

                    <span
                        style={{
                            background: "#2563EB",
                            color: "#FFFFFF",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        {student.role}
                    </span>

                </div>

            </div>

            {/* SUCCESS / ERROR MESSAGE */}

            {message && (
                <div
                    style={{
                        background: "#14532D",
                        border: "1px solid #22C55E",
                        color: "#BBF7D0",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "20px"
                    }}
                >
                    ✅ {message}
                </div>
            )}

            {errorMessage && (
                <div
                    style={{
                        background: "#450A0A",
                        border: "1px solid #EF4444",
                        color: "#FCA5A5",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "20px"
                    }}
                >
                    ⚠️ {errorMessage}
                </div>
            )}

            {/* FORM START */}

            <form onSubmit={handleSave}>
                                {/* =====================================
                    PERSONAL INFORMATION
                ===================================== */}

                <div
                    style={{
                        background: "#1E293B",
                        padding: "30px",
                        borderRadius: "16px",
                        marginBottom: "25px"
                    }}
                >

                    <h3
                        style={{
                            color: "#FFFFFF",
                            marginBottom: "20px"
                        }}
                    >
                        👤 Personal Information
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                            gap: "20px"
                        }}
                    >

                        <InputField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                        />

                        <InputField
                            label="Email"
                            value={student.email || ""}
                            disabled
                        />

                        <InputField
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                        />

                    </div>

                </div>


                {/* =====================================
                    ACADEMIC INFORMATION
                ===================================== */}

                <div
                    style={{
                        background: "#1E293B",
                        padding: "30px",
                        borderRadius: "16px",
                        marginBottom: "25px"
                    }}
                >

                    <h3
                        style={{
                            color: "#FFFFFF",
                            marginBottom: "20px"
                        }}
                    >
                        🎓 Academic Information
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap: "20px"
                        }}
                    >

                        <InputField
                            label="Branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            placeholder="Computer Science"
                        />

                        <InputField
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="3"
                        />

                        <InputField
                            label="CGPA"
                            name="cgpa"
                            value={formData.cgpa}
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            placeholder="8.50"
                        />

                    </div>

                </div>


                {/* =====================================
                    SKILLS
                ===================================== */}

                <div
                    style={{
                        background: "#1E293B",
                        padding: "30px",
                        borderRadius: "16px",
                        marginBottom: "25px"
                    }}
                >

                    <h3
                        style={{
                            color: "#FFFFFF",
                            marginBottom: "20px"
                        }}
                    >
                        💻 Skills
                    </h3>

                    <label
                        style={{
                            display: "block",
                            color: "#94A3B8",
                            marginBottom: "10px"
                        }}
                    >
                        Technical Skills
                    </label>

                    <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Java, Spring Boot, React, MySQL..."
                        style={{
                            ...inputStyle,
                            resize: "vertical",
                            minHeight: "120px"
                        }}
                    />

                </div>


                {/* =====================================
                    RESUME
                ===================================== */}

                <div
                    style={{
                        background: "#1E293B",
                        padding: "30px",
                        borderRadius: "16px",
                        marginBottom: "25px"
                    }}
                >

                    <h3
                        style={{
                            color: "#FFFFFF",
                            marginBottom: "20px"
                        }}
                    >
                        📄 Resume
                    </h3>

                    <InputField
                        label="Resume URL"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/..."
                    />

                    {formData.resumeUrl && (

                        <a
                            href={formData.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "inline-block",
                                marginTop: "15px",
                                color: "#38BDF8",
                                textDecoration: "none",
                                fontWeight: "600"
                            }}
                        >
                            📄 View Resume
                        </a>

                    )}

                </div>
                                {/* =====================================
                    SAVE BUTTON
                ===================================== */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "30px"
                    }}
                >

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            background:
                                saving
                                    ? "#475569"
                                    : "#2563EB",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "13px 28px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor:
                                saving
                                    ? "not-allowed"
                                    : "pointer",
                            transition:
                                "0.2s"
                        }}
                    >
                        {saving
                            ? "Saving..."
                            : "💾 Save Changes"}
                    </button>

                </div>

            </form>

        </PageContainer>

    );

}


// =====================================
// REUSABLE INPUT FIELD
// =====================================

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    step
}) {

    return (

        <div>

            <label
                style={{
                    display: "block",
                    color: "#94A3B8",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600"
                }}
            >
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                step={step}
                style={{
                    ...inputStyle,
                    opacity:
                        disabled
                            ? 0.7
                            : 1,
                    cursor:
                        disabled
                            ? "not-allowed"
                            : "text"
                }}
            />

        </div>

    );

}


// =====================================
// COMMON INPUT STYLE
// =====================================

const inputStyle = {

    width: "100%",

    boxSizing: "border-box",

    background: "#0F172A",

    border: "1px solid #334155",

    color: "#F8FAFC",

    padding: "12px 14px",

    borderRadius: "8px",

    fontSize: "15px",

    outline: "none"

};


export default Profile;