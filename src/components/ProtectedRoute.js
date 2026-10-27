
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = " https://ai-learning-backend-o3m1.onrender.com/api";
const NOT_LOGGED_IN_REDIRECT = "/intro";

// =====================================
// AUTHENTICATION CACHE
// =====================================

const authCache = {
    token: null,
    user: null,
};

// =====================================
// TOKEN HELPERS
// =====================================

const isTokenExpired = (token) => {
    try {
        const payload = token.split(".")[1];

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const decoded = atob(
            base64.padEnd(
                base64.length + (4 - base64.length % 4) % 4,
                "="
            )
        );

        const { exp } = JSON.parse(decoded);

        // Require an expiry timestamp.
        if (!exp) return true;

        return exp * 1000 <= Date.now();
    } catch {
        return true;
    }
};

// =====================================
// CLEAR AUTHENTICATION
// =====================================

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    // Clear cached authentication too.
    authCache.token = null;
    authCache.user = null;
};

// =====================================
// PROTECTED ROUTE
// =====================================

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    const token = localStorage.getItem("token");

    const [result, setResult] = useState({
        token: null,
        status: "checking",
        user: null,
    });

    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const verifyToken = async () => {
            if (!token) {
                setResult({
                    token: null,
                    status: "unauthenticated",
                    user: null,
                });
                return;
            }

            if (isTokenExpired(token)) {
                logoutUser();

                setResult({
                    token,
                    status: "unauthenticated",
                    user: null,
                });
                return;
            }

            // Use the cache only for this exact token.
            if (
                authCache.token === token &&
                authCache.user
            ) {
                setResult({
                    token,
                    status: "authenticated",
                    user: authCache.user,
                });
                return;
            }

            setResult({
                token,
                status: "checking",
                user: null,
            });

            try {
                const response = await axios.get(
                    `${API_URL}/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (cancelled) return;

                if (
                    response.data?.status === 1 &&
                    response.data?.data
                ) {
                    const user = response.data.data;

                    // Do not cache a result for a token that
                    // has been replaced or logged out.
                    if (
                        localStorage.getItem("token") !== token
                    ) {
                        setResult({
                            token,
                            status: "unauthenticated",
                            user: null,
                        });
                        return;
                    }

                    authCache.token = token;
                    authCache.user = user;

                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(user)
                    );

                    setResult({
                        token,
                        status: "authenticated",
                        user,
                    });
                } else {
                    logoutUser();

                    setResult({
                        token,
                        status: "unauthenticated",
                        user: null,
                    });
                }
            } catch (error) {
                if (cancelled) return;

                // Ignore a response for an old token.
                if (
                    localStorage.getItem("token") !== token
                ) {
                    setResult({
                        token,
                        status: "unauthenticated",
                        user: null,
                    });
                    return;
                }

                const code = error.response?.status;

                if (code === 401 || code === 403) {
                    logoutUser();

                    setResult({
                        token,
                        status: "unauthenticated",
                        user: null,
                    });
                } else {
                    console.error(
                        "PROTECTED ROUTE ERROR:",
                        error.response?.data || error.message
                    );

                    setResult({
                        token,
                        status: "error",
                        user: null,
                    });
                }
            }
        };

        verifyToken();

        return () => {
            cancelled = true;
        };
    }, [token, retry]);

    // =====================================
    // NO TOKEN / EXPIRED TOKEN
    // =====================================

    if (!token || isTokenExpired(token)) {
        return (
            <Navigate
                to={NOT_LOGGED_IN_REDIRECT}
                replace
                state={{ from: location }}
            />
        );
    }

    // Ignore state belonging to an older token.
    const current =
        result.token === token ? result : null;

    const cachedUser =
        authCache.token === token
            ? authCache.user
            : null;

    const status = cachedUser
        ? "authenticated"
        : current?.status || "checking";

    const user = cachedUser || current?.user;

    // =====================================
    // CHECKING
    // =====================================

    if (status === "checking") {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Checking authentication...
            </div>
        );
    }

    // =====================================
    // SERVER / NETWORK ERROR
    // =====================================

    if (status === "error") {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p>
                    Server is not reachable.
                    Please try again.
                </p>

                <button
                    onClick={() => setRetry((n) => n + 1)}
                >
                    Retry
                </button>
            </div>
        );
    }

    // =====================================
    // UNAUTHENTICATED
    // =====================================

    if (status !== "authenticated" || !user) {
        return (
            <Navigate
                to={NOT_LOGGED_IN_REDIRECT}
                replace
                state={{ from: location }}
            />
        );
    }

    // =====================================
    // ADMIN PROTECTION
    // =====================================

    if (
        location.pathname.startsWith("/admin") &&
        user.role !== "superadmin"
    ) {
        return <Navigate to="/home" replace />;
    }

    // =====================================
    // AUTHENTICATED
    // =====================================

    return children;
};

export default ProtectedRoute;
