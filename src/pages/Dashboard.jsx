import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

    const [classCount, setClassCount] = useState(0);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [examCount, setExamCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);

    const [attendancePercentage, setAttendancePercentage] = useState(0);

    const [notificationCount, setNotificationCount] = useState(0);

    const [recentNotes, setRecentNotes] = useState([]);

    const [upcomingExams, setUpcomingExams] = useState([]);

    const [todayClasses, setTodayClasses] = useState([]);

    const [quote, setQuote] = useState("");
    const navigate = useNavigate();

    const [studyStreak, setStudyStreak] = useState(() => {

        const saved = localStorage.getItem("studyStreak");

        return saved ? Number(saved) : 0;

    });

    useEffect(() => {

        const classes =
            JSON.parse(localStorage.getItem("classes")) || [];

        const assignments =
            JSON.parse(localStorage.getItem("assignments")) || [];

        const exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        const notes =
            JSON.parse(localStorage.getItem("notes")) || [];

        const attendance =
            JSON.parse(localStorage.getItem("attendance")) || [];

        setClassCount(classes.length);

        setAssignmentCount(assignments.length);

        setExamCount(exams.length);

        setNoteCount(notes.length);

        setRecentNotes(
            notes.slice(-3).reverse()
        );

        if (attendance.length > 0) {

            const total = attendance.reduce(

                (sum, item) =>

                    sum + Number(item.percentage),

                0

            );

            setAttendancePercentage(

                (total / attendance.length).toFixed(1)

            );

        }

        else {

            setAttendancePercentage(0);

        }

        const currentDay =
            new Date().toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                }
            );

        setTodayClasses(

            classes.filter(

                item => item.day === currentDay

            )

        );

        const sortedExams =
            [...exams].sort(

                (a, b) =>

                    new Date(a.date) -

                    new Date(b.date)

            );

        setUpcomingExams(

            sortedExams.slice(0,3)

        );

        const today =
            new Date().toISOString().split("T")[0];

        const notifications =

            classes.filter(

                item => item.date === today

            ).length +

            assignments.filter(

                item => item.dueDate === today

            ).length +

            exams.filter(

                item => item.date === today

            ).length;

        setNotificationCount(notifications);

        const quotes = [

            "Success is the sum of small efforts repeated every day.",

            "Discipline beats motivation.",

            "Dream big. Start small. Stay consistent.",

            "Small progress is still progress.",

            "Consistency creates success.",

            "Study while others are sleeping.",

            "The future depends on what you do today."

        ];

        setQuote(

            quotes[

                Math.floor(

                    Math.random() *

                    quotes.length

                )

            ]

        );

    }, []);

    function increaseStreak() {

        const streak = studyStreak + 1;

        setStudyStreak(streak);

        localStorage.setItem(

            "studyStreak",

            streak

        );

    }

    function resetStreak() {

        setStudyStreak(0);

        localStorage.setItem(

            "studyStreak",

            0

        );

    }
    
    const hour = new Date().getHours();

let greeting = "Good Evening 🌙";

if (hour < 12) {
    greeting = "Good Morning ☀️";
} else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
}

const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {

    const timer = setInterval(() => {

        setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

}, []);






        return (

<div className="dashboard">

    <h1 className="dashboard-greeting">
        {greeting}, Kapil 👋
    </h1>

    <p className="dashboard-subtitle">
        Your AI College Companion
    </p>

    <p className="dashboard-date">
        {currentTime.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })}
    </p>

    <p className="dashboard-time">
        {currentTime.toLocaleTimeString("en-IN")}
    </p>

    <div className="quote-box">

        <h3>💡 Daily Motivation</h3>

        <p>{quote}</p>

    </div>
                
        <div className="study-streak">

            <div className="stat-box">

                <h3>🔥 Study Streak</h3>

                <h1>{studyStreak} Days</h1>

            </div>

            <div className="streak-buttons">

                <button onClick={increaseStreak}>
                    ➕ Increase
                </button>

                <button onClick={resetStreak}>
                    🔄 Reset
                </button>

            </div>

        </div>

       

        <div className="dashboard-grid">

            <Link to="/classes">

                <DashboardCard
                    icon="📅"
                    title="Classes"
                    value={classCount}
                    description="Total Classes"
                />

            </Link>

            <Link to="/assignments">

                <DashboardCard
                    icon="📝"
                    title="Assignments"
                    value={assignmentCount}
                    description="Total Assignments"
                />

            </Link>

            <Link to="/attendance">

                <DashboardCard
                    icon="📊"
                    title="Attendance"
                    value={`${attendancePercentage}%`}
                    description="Current Attendance"
                />

            </Link>

            <Link to="/assistant">

                <DashboardCard
                    icon="🤖"
                    title="AI Assistant"
                    value="24/7"
                    description="Always Ready"
                />

            </Link>

        </div>

        <div className="dashboard-stats">

            <div className="stat-box">

                <h3>📚 Notes</h3>

                <h1>{noteCount}</h1>

            </div>

            <div className="stat-box">

                <h3>📝 Exams</h3>

                <h1>{examCount}</h1>

            </div>

            <div className="stat-box">

                <h3>🔔 Notifications</h3>

                <h1>{notificationCount}</h1>

            </div>

        </div>

        <div className="today-schedule">

            <h2>📅 Today's Schedule</h2>

            {

                todayClasses.length === 0 ?

                    <p>No classes today.</p>

                    :

                    todayClasses.map((item) => (

                        <div
                            key={item.id}
                            className="schedule-card"
                        >

                            <h3>{item.subject}</h3>

                            <p>🕒 {item.time}</p>

                            <p>🏫 {item.classroom}</p>

                            <p>🏢 {item.building}</p>

                        </div>

                    ))

            }

        </div>

        <div className="quick-actions">

            <h2>⚡ Quick Actions</h2>

            <div className="quick-action-grid">

                <Link
                    to="/classes"
                    className="quick-action-btn"
                >
                    ➕ Add Class
                </Link>

                <Link
                    to="/assignments"
                    className="quick-action-btn"
                >
                    📝 Add Assignment
                </Link>

                <Link
                    to="/notes"
                    className="quick-action-btn"
                >
                    📚 Add Note
                </Link>

                <Link
                    to="/exams"
                    className="quick-action-btn"
                >
                    📅 Add Exam
                </Link>

            </div>

        </div>

        <div className="recent-notes">

            <h2>📚 Recent Notes</h2>

            {

                recentNotes.length === 0 ?

                    <p>No notes yet.</p>

                    :

                    recentNotes.map((note) => (

                        <div
                            key={note.id}
                            className="recent-note"
                        >

                            <h3>{note.subject}</h3>

                            <p>{note.title}</p>

                        </div>

                    ))

            }

        </div>

        <div className="upcoming-exams">

            <h2>📝 Upcoming Exams</h2>

            {

                upcomingExams.length === 0 ?

                    <p>No exams added.</p>

                    :

                    upcomingExams.map((exam) => (

                        <div
                            key={exam.id}
                            className="recent-note"
                        >

                            <h3>{exam.subject}</h3>

                            <p>{exam.date}</p>

                        </div>

                    ))

            }

        </div>

    </div>

);

}

export default Dashboard;