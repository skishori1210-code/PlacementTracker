import { Routes, Route, Navigate } from "react-router-dom";

// =====================================
// AUTH
// =====================================
import Login from "./pages/Login";
import Register from "./pages/Register";

// =====================================
// DASHBOARDS
// =====================================
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// =====================================
// STUDENT PAGES
// =====================================
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";

// =====================================
// ADMIN PAGES
// =====================================
import ManageStudents from "./pages/ManageStudents";
import ManageCompanies from "./pages/ManageCompanies";
import ManageJobs from "./pages/ManageJobs";
import ManageApplications from "./pages/ManageApplications";

// =====================================
// PROTECTED ROUTE
// =====================================
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <Routes>

            {/* =================================================
                DEFAULT ROUTE
            ================================================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />


            {/* =================================================
                AUTHENTICATION
            ================================================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =================================================
                STUDENT DASHBOARD
            ================================================= */}

            <Route
                path="/student-dashboard"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                STUDENT - JOBS
            ================================================= */}

            <Route
                path="/jobs"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <Jobs />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                STUDENT - APPLICATIONS
            ================================================= */}

            <Route
                path="/applications"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <Applications />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                STUDENT - PROFILE
            ================================================= */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRole="STUDENT">
                        <Profile />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                ADMIN DASHBOARD
            ================================================= */}

            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                ADMIN - MANAGE STUDENTS
            ================================================= */}

            <Route
                path="/manage-students"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageStudents />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                ADMIN - MANAGE COMPANIES
            ================================================= */}

            <Route
                path="/manage-companies"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageCompanies />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                ADMIN - MANAGE JOBS
            ================================================= */}

            <Route
                path="/manage-jobs"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageJobs />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                ADMIN - MANAGE APPLICATIONS
            ================================================= */}

            <Route
                path="/all-applications"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageApplications />
                    </ProtectedRoute>
                }
            />


            {/* =================================================
                UNKNOWN ROUTE
            ================================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>

    );

}


export default App;