
import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    FaRobot,
    FaSignInAlt,
    FaCompass,
    FaGraduationCap,
    FaUsers,
    FaEnvelope,
    FaHome,
    FaUser,
    FaBars,
    FaTimes,
    FaSignOutAlt,
} from "react-icons/fa";

import { logoutUser } from "./ProtectedRoute";

function Navbar({ isLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    // Automatically detect login state.
    const [loggedIn, setLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {
        setLoggedIn(
            Boolean(localStorage.getItem("token"))
        );
    }, [location.pathname]);

    // Highlight the active navigation link.
    const isActive = (path) =>
        location.pathname === path ? "active" : "";

    // Close mobile menu.
    const toggleMobileMenu = () => {
        setMobileMenuOpen((previous) => !previous);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {
        logoutUser();

        setLoggedIn(false);
        closeMobileMenu();

        navigate("/intro", {
            replace: true,
        });
    };

    // Use explicit prop when supplied, otherwise
    // detect the login state from the saved token.
    const showLoggedIn =
        typeof isLoggedIn === "boolean"
            ? isLoggedIn
            : loggedIn;

    return (
        <header className="navbar">

            {/* LOGO */}
            <Link
                to={showLoggedIn ? "/home" : "/intro"}
                className="logo"
                onClick={closeMobileMenu}
            >
                <div className="logo-icon-wrapper">
                    <FaRobot className="robot-icon" />
                </div>

                <span className="logo-text">
                    AI
                    <span className="logo-highlight">
                        Learn
                    </span>
                </span>
            </Link>

            {/* NAVIGATION */}
            <nav
                className={`nav-menu ${
                    mobileMenuOpen ? "open" : ""
                }`}
            >
                <Link
                    to="/home"
                    className={`nav-link ${isActive("/home")}`}
                    onClick={closeMobileMenu}
                >
                    <FaHome className="nav-icon" />
                    Home
                </Link>

                <Link
                    to="/courses"
                    className={`nav-link ${isActive("/courses")}`}
                    onClick={closeMobileMenu}
                >
                    <FaGraduationCap className="nav-icon" />
                    Courses
                </Link>

                <Link
                    to="/community"
                    className={`nav-link ${isActive("/community")}`}
                    onClick={closeMobileMenu}
                >
                    <FaUsers className="nav-icon" />
                    Community
                </Link>

                <Link
                    to="/about"
                    className={`nav-link ${isActive("/about")}`}
                    onClick={closeMobileMenu}
                >
                    <FaCompass className="nav-icon" />
                    About
                </Link>

                <Link
                    to="/contact"
                    className={`nav-link ${isActive("/contact")}`}
                    onClick={closeMobileMenu}
                >
                    <FaEnvelope className="nav-icon" />
                    Contact
                </Link>
            </nav>

            {/* ACTION BUTTONS */}
            <div className="nav-actions">

                {showLoggedIn ? (
                    <>
                        {/* USER DASHBOARD */}
                        <Link
                            to="/dashboard"
                            className="user-profile-btn"
                            title="User Dashboard"
                            onClick={closeMobileMenu}
                        >
                            <div className="avatar-wrapper">
                                <FaUser className="user-icon" />
                            </div>
                        </Link>

                        {/* LOGOUT */}
                        <button
                            type="button"
                            className="logout-btn"
                            onClick={handleLogout}
                            title="Sign Out"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="login-btn"
                        onClick={closeMobileMenu}
                    >
                        <FaSignInAlt />
                        Login
                    </Link>
                )}

                {/* MOBILE MENU */}
                <button
                    type="button"
                    className="mobile-toggle-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Navigation"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen
                        ? <FaTimes />
                        : <FaBars />
                    }
                </button>

            </div>
        </header>
    );
}

export default Navbar;
