import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    async function logout() {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    }

    return (
        <nav className="navbar">

            <h2 className="logo">
                CampusAI
            </h2>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/about">About</Link>

                {currentUser && (
                    <>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/notes">
                            Notes
                        </Link>

                        <Link to="/calendar">
                            Calendar
                        </Link>

                        <Link to="/attendance">
                            Attendance
                        </Link>

                        <Link to="/exams">
                            Exams
                        </Link>

                        <Link to="/assistant">
                            AI Assistant
                        </Link>

                        <Link to="/notifications">
                            Notifications
                        </Link>

                        <span className="welcome-user">
                            👋 Welcome,{" "}
                            {currentUser.displayName ||
                                currentUser.email?.split("@")[0]}
                        </span>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            🚪 Logout
                        </button>
                    </>
                )}

                {!currentUser && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;