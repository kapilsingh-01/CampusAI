import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import AIAssistant from "./pages/AIAssistant";
import Exams from "./pages/Exams";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ---------- PUBLIC ROUTES ---------- */}

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />

                {/* ---------- PROTECTED ROUTES ---------- */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Home />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <About />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/classes"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Classes />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assignments"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Assignments />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Notes />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Attendance />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assistant"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AIAssistant />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Calendar />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exams"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Exams />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Settings />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Notifications />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;