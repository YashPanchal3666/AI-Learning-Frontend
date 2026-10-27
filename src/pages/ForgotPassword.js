import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // ==========================================
    // STEP 1: SEND OTP TO EMAIL
    // ==========================================
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim() || !emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(" https://ai-learning-backend-o3m1.onrender.com/api/forgot-password", {
                email: email.trim()
            });

            if (response.data.status === 1) {
                setStep(2);
            } else {
                setError(response.data.message || "Could not send OTP. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errorMessage || "Unable to send OTP. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // STEP 2: VERIFY OTP & RESET PASSWORD
    // ==========================================
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp.trim()) {
            setError("Please enter the 6-digit OTP sent to your email.");
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(" https://ai-learning-backend-o3m1.onrender.com/api/reset-password", {
                email: email.trim(),
                otp: otp.trim(),
                newPassword,
                confirmPassword
            });

            if (response.data.status === 1) {
                setSuccess(true);
            } else {
                setError(response.data.message || "Failed to reset password. Please check OTP.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errorMessage || "Password reset failed. Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // SUCCESS STATE
    // ==========================================
    if (success) {
        return (
            <div className="auth-page-wrapper">
                <div className="glow-circle glow-1"></div>
                <div className="glow-circle glow-2"></div>

                <div className="auth-card-glass">
                    <div className="auth-header">
                        <div className="success-icon-wrapper">
                            <span className="success-icon">✅</span>
                        </div>
                        <h2>Password Updated</h2>
                        <p>
                            Your password has been reset successfully. You can now sign in
                            with your new password.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="auth-submit-btn"
                        onClick={() => navigate("/login", { replace: true })}
                    >
                        Go to Sign In
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // FORM STATE
    // ==========================================
    return (
        <div className="auth-page-wrapper">
            <div className="glow-circle glow-1"></div>
            <div className="glow-circle glow-2"></div>

            <div className="auth-card-glass">
                {/* HEADER */}
                <div className="auth-header">
                    <h2>{step === 1 ? "Forgot Password" : "Enter Verification OTP"}</h2>
                    <p>
                        {step === 1
                            ? "Enter your registered email to receive a 6-digit reset OTP."
                            : `OTP has been sent to ${email}. Enter the code and set your new password.`}
                    </p>
                </div>

                {/* ERROR */}
                {error && <div className="auth-error-toast">{error}</div>}

                {/* STEP 1: ENTER EMAIL TO GET OTP */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="auth-form">
                        <div className="auth-form-group">
                            <label htmlFor="email">
                                Email Address
                                <span className="required">*</span>
                            </label>
                            <div className="input-with-icon">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? <span className="btn-spinner"></span> : "Send Reset OTP"}
                        </button>
                    </form>
                )}

                {/* STEP 2: ENTER OTP & NEW PASSWORD */}
                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="auth-form">
                        {/* OTP INPUT */}
                        <div className="auth-form-group">
                            <label htmlFor="otp">
                                6-Digit OTP Code
                                <span className="required">*</span>
                            </label>
                            <div className="input-with-icon">
                                <span className="input-icon">🔑</span>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                    placeholder="e.g. 123456"
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        {/* NEW PASSWORD */}
                        <div className="auth-form-group">
                            <label htmlFor="newPassword">
                                New Password
                                <span className="required">*</span>
                            </label>
                            <div className="input-with-icon">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? "👁️" : "🙈"}
                                </button>
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="auth-form-group">
                            <label htmlFor="confirmPassword">
                                Confirm New Password
                                <span className="required">*</span>
                            </label>
                            <div className="input-with-icon">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "👁️" : "🙈"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? <span className="btn-spinner"></span> : "Verify OTP & Reset Password"}
                        </button>

                        <button
                            type="button"
                            style={{
                                background: "none",
                                border: "none",
                                color: "#6366F1",
                                cursor: "pointer",
                                marginTop: "10px",
                                fontSize: "14px",
                                textAlign: "center"
                            }}
                            onClick={() => {
                                setStep(1);
                                setError("");
                            }}
                        >
                            ← Change Email or Resend OTP
                        </button>
                    </form>
                )}

                {/* FOOTER */}
                <div className="auth-footer">
                    <p>
                        Remember your password?{" "}
                        <Link to="/login">Back to Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;