import React, { useState } from "react";

import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import axios from "axios";

import "../styles/Auth.css";


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const navigate = useNavigate();

    const location = useLocation();


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        // ==========================================
        // EMAIL VALIDATION
        // ==========================================

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(formData.email)) {

            setError(
                "Please enter a valid email address."
            );

            setLoading(false);

            return;
        }


        // ==========================================
        // PASSWORD VALIDATION
        // ==========================================

        if (!formData.password) {

            setError(
                "Password is required."
            );

            setLoading(false);

            return;
        }


        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response = await axios.post(
  "https://ai-learning-backend-o3m1.onrender.com/api/login",
  {
    email: formData.email,
    password: formData.password
  }
);


            console.log(
                "Login Response:",
                response.data
            );


            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            if (response.data.status === 1) {

                const user = response.data.data;

                const token = response.data.token;


                // ==========================================
                // CHECK TOKEN
                // ==========================================

                if (!token) {

                    setError(
                        "Login successful, but authentication token was not received."
                    );

                    setLoading(false);

                    return;
                }


                // ==========================================
                // SAVE JWT TOKEN
                // ==========================================

                localStorage.setItem(
                    "token",
                    token
                );


                console.log(
                    "JWT Token saved successfully."
                );


                // ==========================================
                // SAVE CURRENT USER
                // ==========================================

                const currentUser = {

                    ...user,

                    fullName:
                        user.role === "superadmin"
                            ? "Super Admin"
                            : user.name

                };


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );


                console.log(
                    "Current User:",
                    currentUser
                );


                // ==========================================
                // SUPER ADMIN
                // ==========================================

                if (
                    user.role === "superadmin"
                ) {

                    console.log(
                        "Super Admin Login Successful"
                    );


                    navigate(
                        "/admin",
                        {
                            replace: true
                        }
                    );


                    return;
                }


                // ==========================================
                // NORMAL USER
                // ==========================================

                const redirectPath =
                    location.state?.from?.pathname ||
                    "/home";


                navigate(
                    redirectPath,
                    {
                        replace: true
                    }
                );


            } else {

                setError(
                    response.data.message ||
                    "Login failed."
                );
            }


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            if (error.response) {

                setError(

                    error.response.data.message ||

                    error.response.data.errorMessage ||

                    "Incorrect email or password."

                );

            } else {

                setError(
                    "Unable to connect to server. Please make sure the backend is running."
                );
            }


        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    
const handleGoogleLogin = () => {
  window.location.href =
    "https://ai-learning-backend-o3m1.onrender.com/api/auth/google";
};



    return (

        <div className="auth-page-wrapper">

            <div className="glow-circle glow-1"></div>

            <div className="glow-circle glow-2"></div>


            <div className="auth-card-glass">


                {/* ================================= */}
                {/* HEADER                            */}
                {/* ================================= */}

                <div className="auth-header">

                    <h2>
                        Welcome Back
                    </h2>

                    <p>
                        Please enter your details to sign in.
                    </p>

                </div>


                {/* ================================= */}
                {/* ERROR                             */}
                {/* ================================= */}

                {error && (

                    <div className="auth-error-toast">

                        {error}

                    </div>

                )}


                {/* ================================= */}
                {/* GOOGLE LOGIN                      */}
                {/* ================================= */}

                <button
    type="button"
    className="google-auth-btn"
    onClick={handleGoogleLogin}
>

                    <svg
                        className="google-icon"
                        viewBox="0 0 24 24"
                    >

                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />

                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />

                        <path
                            fill="#FBBC05"
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                        />

                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />

                    </svg>

                    Sign in with Google

                </button>


                {/* ================================= */}
                {/* DIVIDER                           */}
                {/* ================================= */}

                <div className="auth-divider">

                    <span>
                        or continue with email
                    </span>

                </div>


                {/* ================================= */}
                {/* LOGIN FORM                        */}
                {/* ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >


                    {/* EMAIL */}

                    <div className="auth-form-group">

                        <label htmlFor="email">

                            Email Address

                            <span className="required">
                                *
                            </span>

                        </label>


                        <div className="input-with-icon">

                            <span className="input-icon">
                                ✉️
                            </span>


                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@company.com"
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="auth-form-group">

                        <div className="label-row">

                            <label htmlFor="password">

                                Password

                                <span className="required">
                                    *
                                </span>

                            </label>


                            <Link
                                to="/forgot-password"
                                className="forgot-link"
                            >
                                Forgot password?
                            </Link>

                        </div>


                        <div className="input-with-icon">

                            <span className="input-icon">
                                🔒
                            </span>


                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />


                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {
                                    showPassword
                                        ? "👁️"
                                        : "🙈"
                                }

                            </button>

                        </div>

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >

                        {loading ? (

                            <span className="btn-spinner"></span>

                        ) : (

                            "Sign In"

                        )}

                    </button>


                </form>


                {/* ================================= */}
                {/* FOOTER                            */}
                {/* ================================= */}

                <div className="auth-footer">

                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">
                            Sign up
                        </Link>

                    </p>

                </div>


            </div>

        </div>
    );
};


export default Login;