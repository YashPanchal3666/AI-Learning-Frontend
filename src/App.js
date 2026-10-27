
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import {
    lazy,
    Suspense
} from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages
const Intro = lazy(() => import("./pages/Intro"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CoursePlayer = lazy(() => import("./pages/CoursePlayer"));
const Community = lazy(() => import("./pages/Community"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const ForgotPassword = lazy(
    () => import("./pages/ForgotPassword")
);
const GoogleSuccess = lazy(
    () => import("./pages/GoogleSuccess")
);

// Lazy-loaded AI tutor
const AiTutorWidget = lazy(
    () => import("./components/AiTutorWidget")
);

function MainLayout() {
    const location = useLocation();

    // Hide Navbar and Footer on authentication and admin pages
    const hideHeaderFooter =
        location.pathname.startsWith("/admin") ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/google-success";

    // Hide AI tutor on selected pages
    const hideChatbot =
        location.pathname.startsWith("/admin") ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname.startsWith("/learn/");

    return (
        <>
            <ScrollToTop />

            {!hideHeaderFooter && <Navbar />}

            <Suspense
                fallback={
                    <div className="loading">
                        Loading...
                    </div>
                }
            >
                <Routes>
                    {/* Root redirect */}
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/intro"
                                replace
                            />
                        }
                    />

                    {/* Public routes */}
                    <Route
                        path="/intro"
                        element={<Intro />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/google-success"
                        element={<GoogleSuccess />}
                    />

                    {/* Protected routes */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/courses"
                        element={
                            <ProtectedRoute>
                                <Courses />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/course/:id"
                        element={
                            <ProtectedRoute>
                                <CourseDetail />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/learn/:id"
                        element={
                            <ProtectedRoute>
                                <CoursePlayer />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/community"
                        element={
                            <ProtectedRoute>
                                <Community />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/contact"
                        element={
                            <ProtectedRoute>
                                <Contact />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />

                    {/* Invalid URL */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/intro"
                                replace
                            />
                        }
                    />
                </Routes>
            </Suspense>

            {!hideHeaderFooter && <Footer />}

            {!hideChatbot && (
                <Suspense
                    fallback={null}
                >
                    <AiTutorWidget />
                </Suspense>
            )}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <MainLayout />
        </BrowserRouter>
    );
}

export default App;
