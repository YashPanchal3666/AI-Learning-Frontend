import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const token = searchParams.get("token");
        const userString = searchParams.get("user");

        if (!token || !userString) {

            console.error(
                "Google authentication data missing"
            );

            navigate("/login", {
                replace: true
            });

            return;
        }

        try {

            const user = JSON.parse(userString);

            // ==========================================
            // SAVE JWT TOKEN
            // ==========================================

            localStorage.setItem(
                "token",
                token
            );

            console.log(
                "Google JWT Token saved successfully."
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
                "Google Current User:",
                currentUser
            );


            // ==========================================
            // ADMIN
            // ==========================================

            if (
                user.role === "superadmin"
            ) {

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

            navigate(
                "/home",
                {
                    replace: true
                }
            );

        } catch (error) {

            console.error(
                "Google Login Error:",
                error
            );

            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");

            navigate(
                "/login",
                {
                    replace: true
                }
            );
        }

    }, [navigate, searchParams]);


    return (

        <div
            className="auth-page-wrapper"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >

            <div className="auth-card-glass">

                <div className="auth-header">

                    <h2>
                        Signing you in...
                    </h2>

                    <p>
                        Please wait while Google authentication is completed.
                    </p>

                    <div className="btn-spinner"></div>

                </div>

            </div>

        </div>
    );
};

export default GoogleSuccess;