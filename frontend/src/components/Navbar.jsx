import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");


    // =====================================
    // DON'T SHOW NAVBAR WHEN LOGGED OUT
    // =====================================

    if (!token) {
        return null;
    }


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        setMenuOpen(false);

        navigate("/login");

    };


    // =====================================
    // CHECK ACTIVE LINK
    // =====================================

    const isActive = (path) => {

        return location.pathname === path;

    };


    // =====================================
    // CLOSE MOBILE MENU
    // =====================================

    const handleNavigation = () => {

        setMenuOpen(false);

    };


    return (

        <>

            <nav
                style={{
                    background: "#0F172A",
                    borderBottom:
                        "1px solid #1E293B",
                    boxShadow:
                        "0 4px 20px rgba(0,0,0,0.35)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000
                }}
            >

                <div
                    style={{
                        maxWidth: "1400px",
                        margin: "0 auto",
                        padding:
                            "13px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        gap: "20px"
                    }}
                >

                    {/* ================================= */}
                    {/* LOGO */}
                    {/* ================================= */}

                    <Link
                        to={
                            role === "ADMIN"
                                ? "/admin-dashboard"
                                : "/student-dashboard"
                        }
                        onClick={
                            handleNavigation
                        }
                        style={{
                            color: "#38BDF8",
                            textDecoration:
                                "none",
                            fontSize: "21px",
                            fontWeight: "800",
                            whiteSpace: "nowrap",
                            letterSpacing:
                                "0.2px"
                        }}
                    >

                        🎓 Placement Tracker

                    </Link>


                    {/* ================================= */}
                    {/* DESKTOP NAVIGATION */}
                    {/* ================================= */}

                    <div
                        className="desktop-navigation"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                        }}
                    >

                        {/* ========================= */}
                        {/* STUDENT */}
                        {/* ========================= */}

                        {role === "STUDENT" && (
                            <>

                                <NavLink
                                    to="/student-dashboard"
                                    icon="🏠"
                                    text="Dashboard"
                                    active={
                                        isActive(
                                            "/student-dashboard"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/jobs"
                                    icon="💼"
                                    text="Jobs"
                                    active={
                                        isActive(
                                            "/jobs"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/applications"
                                    icon="📄"
                                    text="Applications"
                                    active={
                                        isActive(
                                            "/applications"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/profile"
                                    icon="👤"
                                    text="Profile"
                                    active={
                                        isActive(
                                            "/profile"
                                        )
                                    }

                                />

                            </>
                        )}


                        {/* ========================= */}
                        {/* ADMIN */}
                        {/* ========================= */}

                        {role === "ADMIN" && (
                            <>

                                <NavLink
                                    to="/admin-dashboard"
                                    icon="🏠"
                                    text="Dashboard"
                                    active={
                                        isActive(
                                            "/admin-dashboard"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/manage-students"
                                    icon="👨‍🎓"
                                    text="Students"
                                    active={
                                        isActive(
                                            "/manage-students"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/manage-companies"
                                    icon="🏢"
                                    text="Companies"
                                    active={
                                        isActive(
                                            "/manage-companies"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/manage-jobs"
                                    icon="💼"
                                    text="Jobs"
                                    active={
                                        isActive(
                                            "/manage-jobs"
                                        )
                                    }
                                />


                                <NavLink
                                    to="/all-applications"
                                    icon="📄"
                                    text="Applications"
                                    active={
                                        isActive(
                                            "/all-applications"
                                        )
                                    }
                                />

                            </>
                        )}


                        {/* ================================= */}
                        {/* ROLE BADGE */}
                        {/* ================================= */}

                        <div
                            style={{
                                marginLeft:
                                    "12px",
                                padding:
                                    "7px 12px",
                                borderRadius:
                                    "20px",
                                background:
                                    role === "ADMIN"
                                        ? "rgba(139,92,246,0.15)"
                                        : "rgba(56,189,248,0.12)",
                                border:
                                    role === "ADMIN"
                                        ? "1px solid rgba(139,92,246,0.4)"
                                        : "1px solid rgba(56,189,248,0.3)",
                                color:
                                    role === "ADMIN"
                                        ? "#A78BFA"
                                        : "#38BDF8",
                                fontSize:
                                    "12px",
                                fontWeight:
                                    "700"
                            }}
                        >

                            {role === "ADMIN"
                                ? "🛡️ ADMIN"
                                : "🎓 STUDENT"}

                        </div>


                        {/* ================================= */}
                        {/* LOGOUT */}
                        {/* ================================= */}

                        <button
                            onClick={
                                handleLogout
                            }
                            style={{
                                background:
                                    "#EF4444",
                                color:
                                    "#FFFFFF",
                                border:
                                    "none",
                                padding:
                                    "9px 16px",
                                borderRadius:
                                    "8px",
                                cursor:
                                    "pointer",
                                fontWeight:
                                    "700",
                                marginLeft:
                                    "8px",
                                transition:
                                    "0.2s"
                            }}
                            onMouseEnter={(
                                e
                            ) => {

                                e.currentTarget.style.background =
                                    "#DC2626";

                            }}
                            onMouseLeave={(
                                e
                            ) => {

                                e.currentTarget.style.background =
                                    "#EF4444";

                            }}
                        >

                            Logout

                        </button>

                    </div>


                    {/* ================================= */}
                    {/* MOBILE MENU BUTTON */}
                    {/* ================================= */}

                    <button
                        onClick={() =>
                            setMenuOpen(
                                !menuOpen
                            )
                        }
                        className="mobile-menu-button"
                        style={{
                            display: "none",
                            background:
                                "transparent",
                            border:
                                "1px solid #334155",
                            color:
                                "#F8FAFC",
                            borderRadius:
                                "8px",
                            padding:
                                "8px 12px",
                            fontSize:
                                "20px",
                            cursor:
                                "pointer"
                        }}
                    >

                        {menuOpen
                            ? "✕"
                            : "☰"}

                    </button>

                </div>


                {/* ================================= */}
                {/* MOBILE NAVIGATION */}
                {/* ================================= */}

                {menuOpen && (

                    <div
                        className="mobile-navigation"
                        style={{
                            padding:
                                "10px 20px 20px",
                            borderTop:
                                "1px solid #1E293B",
                            background:
                                "#0B1120"
                        }}
                    >

                        {role === "STUDENT" && (
                            <>

                                <MobileNavLink
                                    to="/student-dashboard"
                                    icon="🏠"
                                    text="Dashboard"
                                    active={
                                        isActive(
                                            "/student-dashboard"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/jobs"
                                    icon="💼"
                                    text="Jobs"
                                    active={
                                        isActive(
                                            "/jobs"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/applications"
                                    icon="📄"
                                    text="Applications"
                                    active={
                                        isActive(
                                            "/applications"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/profile"
                                    icon="👤"
                                    text="Profile"
                                    active={
                                        isActive(
                                            "/profile"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />

                            </>
                        )}


                        {role === "ADMIN" && (
                            <>

                                <MobileNavLink
                                    to="/admin-dashboard"
                                    icon="🏠"
                                    text="Dashboard"
                                    active={
                                        isActive(
                                            "/admin-dashboard"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/manage-students"
                                    icon="👨‍🎓"
                                    text="Students"
                                    active={
                                        isActive(
                                            "/manage-students"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/manage-companies"
                                    icon="🏢"
                                    text="Companies"
                                    active={
                                        isActive(
                                            "/manage-companies"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/manage-jobs"
                                    icon="💼"
                                    text="Jobs"
                                    active={
                                        isActive(
                                            "/manage-jobs"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />


                                <MobileNavLink
                                    to="/all-applications"
                                    icon="📄"
                                    text="Applications"
                                    active={
                                        isActive(
                                            "/all-applications"
                                        )
                                    }
                                    onClick={
                                        handleNavigation
                                    }
                                />

                            </>
                        )}


                        <div
                            style={{
                                marginTop:
                                    "10px",
                                paddingTop:
                                    "10px",
                                borderTop:
                                    "1px solid #1E293B"
                            }}
                        >

                            <button
                                onClick={
                                    handleLogout
                                }
                                style={{
                                    width: "100%",
                                    background:
                                        "#EF4444",
                                    color:
                                        "#FFFFFF",
                                    border:
                                        "none",
                                    padding:
                                        "12px",
                                    borderRadius:
                                        "8px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "700"
                                }}
                            >

                                🚪 Logout

                            </button>

                        </div>

                    </div>

                )}

            </nav>


            {/* ================================= */}
            {/* RESPONSIVE CSS */}
            {/* ================================= */}

            <style>
                {`

                @media (max-width: 900px) {

                    .desktop-navigation {
                        display: none !important;
                    }

                    .mobile-menu-button {
                        display: block !important;
                    }

                }

                @media (min-width: 901px) {

                    .mobile-navigation {
                        display: none !important;
                    }

                }

                @media (max-width: 500px) {

                    nav a {
                        font-size: 18px !important;
                    }

                }

                `}
            </style>

        </>

    );

}


// =====================================
// DESKTOP NAV LINK
// =====================================

function NavLink({
    to,
    icon,
    text,
    active
}) {

    return (

        <Link
            to={to}
            style={{
                color: active
                    ? "#38BDF8"
                    : "#CBD5E1",
                textDecoration:
                    "none",
                padding:
                    "9px 11px",
                borderRadius:
                    "8px",
                fontSize:
                    "14px",
                fontWeight:
                    active
                        ? "700"
                        : "500",
                background:
                    active
                        ? "rgba(56,189,248,0.1)"
                        : "transparent",
                border:
                    active
                        ? "1px solid rgba(56,189,248,0.2)"
                        : "1px solid transparent",
                transition:
                    "0.2s",
                whiteSpace:
                    "nowrap"
            }}
        >

            {icon} {text}

        </Link>

    );

}


// =====================================
// MOBILE NAV LINK
// =====================================

function MobileNavLink({
    to,
    icon,
    text,
    active,
    onClick
}) {

    return (

        <Link
            to={to}
            onClick={onClick}
            style={{
                display: "block",
                color: active
                    ? "#38BDF8"
                    : "#CBD5E1",
                textDecoration:
                    "none",
                padding:
                    "13px 12px",
                borderRadius:
                    "8px",
                marginBottom:
                    "5px",
                fontWeight:
                    active
                        ? "700"
                        : "500",
                background:
                    active
                        ? "rgba(56,189,248,0.1)"
                        : "transparent"
            }}
        >

            {icon} {text}

        </Link>

    );

}


export default Navbar;