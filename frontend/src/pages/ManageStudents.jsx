import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";
function ManageStudents() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/students`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStudents(response.data);

        } catch (err) {

            console.error(err);
            alert("Unable to load students.");

        } finally {

            setLoading(false);

        }
    };

    // ==========================
    // APPROVE STUDENT
    // ==========================

    const approveStudent = async (id) => {

        try {

            await axios.put(
                `${API_URL}/students/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Student approved successfully.");

            loadStudents();

        } catch (err) {

            console.error(err);

            alert("Unable to approve student.");
        }
    };

    // ==========================
    // DELETE STUDENT
    // ==========================

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${API_URL}/students/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Student deleted successfully.");

            loadStudents();

        } catch (err) {

            console.error(err);

            alert("Unable to delete student.");
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "white",
                padding: "40px"
            }}
        >

            <h1
                style={{
                    color: "#38BDF8",
                    marginBottom: "30px"
                }}
            >
                👨‍🎓 Manage Students
            </h1>

            {loading ? (

                <h3>Loading Students...</h3>

            ) : (

                <div
                    style={{
                        overflowX: "auto",
                        background: "#0F172A",
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: "0 0 15px rgba(0,0,0,.4)"
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                        <tr
                            style={{
                                background: "#1E293B"
                            }}
                        >
                            <th style={th}>ID</th>
                            <th style={th}>Name</th>
                            <th style={th}>Email</th>
                            <th style={th}>Branch</th>
                            <th style={th}>Year</th>
                            <th style={th}>CGPA</th>
                            <th style={th}>Status</th>
                            <th style={th}>Approve</th>
                            <th style={th}>Delete</th>
                        </tr>

                        </thead>

                        <tbody>

                        {students.map((student) => (

                            <tr key={student.id}>

                                <td style={td}>{student.id}</td>

                                <td style={td}>{student.name}</td>

                                <td style={td}>{student.email}</td>

                                <td style={td}>{student.branch}</td>

                                <td style={td}>{student.year}</td>

                                <td style={td}>{student.cgpa}</td>

                                <td style={td}>

                                    {student.approved ? (

                                        <span
                                            style={{
                                                background: "#15803D",
                                                color: "white",
                                                padding: "6px 12px",
                                                borderRadius: "20px"
                                            }}
                                        >
                                            Approved
                                        </span>

                                    ) : (

                                        <span
                                            style={{
                                                background: "#B45309",
                                                color: "white",
                                                padding: "6px 12px",
                                                borderRadius: "20px"
                                            }}
                                        >
                                            Pending
                                        </span>

                                    )}

                                </td>

                                <td style={td}>

                                    {student.approved ? (

                                        <button
                                            disabled
                                            style={{
                                                background: "#16A34A",
                                                color: "white",
                                                border: "none",
                                                padding: "10px 18px",
                                                borderRadius: "6px",
                                                opacity: ".8"
                                            }}
                                        >
                                            Approved
                                        </button>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                approveStudent(student.id)
                                            }
                                            style={approveBtn}
                                        >
                                            Approve
                                        </button>

                                    )}

                                </td>

                                <td style={td}>

                                    <button
                                        onClick={() =>
                                            deleteStudent(student.id)
                                        }
                                        style={deleteBtn}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

const th = {
    padding: "15px",
    borderBottom: "1px solid #334155",
    color: "#38BDF8",
    textAlign: "left"
};

const td = {
    padding: "15px",
    borderBottom: "1px solid #1E293B",
    color: "#F8FAFC"
};

const approveBtn = {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
};

const deleteBtn = {
    background: "#DC2626",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
};

export default ManageStudents;