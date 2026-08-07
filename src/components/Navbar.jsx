import { Link, useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();

    const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

   function logout() {

    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("currentUser");

    navigate("/login");

}

    return (

        <nav className="navbar">

            <h2 className="logo">

                CampusAI

            </h2>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/about">About</Link>

                {

                    currentUser && (

                        <>

                            <Link to="/dashboard">Dashboard</Link>

                           

                           
                            <Link to="/notes">Notes</Link>

                            <Link to="/calendar">Calendar</Link>

                            <Link to="/attendance">Attendance</Link>

                            <Link to="/exams">Exams</Link>

                            <Link to="/assistant">AI Assistant</Link>

                            <Link to="/notifications">Notifications</Link>

                           <span className="welcome-user">
    👋 Welcome, {currentUser?.name}
</span>

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >

                                🚪 Logout

                            </button>

                        </>

                    )

                }

                {

                    !currentUser && (

                        <>

                            <Link to="/login">Login</Link>

                            <Link to="/register">Register</Link>

                        </>

                    )

                }

            </div>

        </nav>

    );

}

export default Navbar;