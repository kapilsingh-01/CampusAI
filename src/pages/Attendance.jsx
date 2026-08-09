import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getAttendance,
    addAttendance,
    deleteAttendance
} from "../services/attendanceService";

function Attendance() {
    const { currentUser } = useAuth();

    const [attendance, setAttendance] = useState([]);

    const [subject, setSubject] = useState("");
    const [totalClasses, setTotalClasses] = useState("");
    const [attendedClasses, setAttendedClasses] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadAttendance();
        }
    }, [currentUser]);

    async function loadAttendance() {
        try {
            setLoading(true);

            const data = await getAttendance(currentUser.uid);

            setAttendance(data);
        } catch (error) {
            console.error("Error loading attendance:", error);

            alert("Failed to load attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function addNewAttendance() {
        const total = Number(totalClasses);
        const attended = Number(attendedClasses);

        // Basic validation
        if (!subject.trim() || !totalClasses || !attendedClasses) {
            alert("Please fill all fields.");
            return;
        }

        if (total <= 0) {
            alert("Total classes must be greater than 0.");
            return;
        }

        if (attended < 0) {
            alert("Attended classes cannot be negative.");
            return;
        }

        if (attended > total) {
            alert("Attended classes cannot be greater than total classes.");
            return;
        }

        const percentage = (
            (attended / total) * 100
        ).toFixed(1);

        const newAttendance = {
            uid: currentUser.uid,
            subject: subject.trim(),
            totalClasses: total,
            attendedClasses: attended,
            percentage
        };

        try {
            setLoading(true);

            await addAttendance(newAttendance);

            await loadAttendance();

            // Clear form
            setSubject("");
            setTotalClasses("");
            setAttendedClasses("");

            alert("Attendance saved successfully.");
        } catch (error) {
            console.error("Error adding attendance:", error);

            alert("Failed to save attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this attendance?"
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);

            await deleteAttendance(id);

            await loadAttendance();
        } catch (error) {
            console.error("Error deleting attendance:", error);

            alert("Failed to delete attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="attendance-page">

            <h1>📊 Attendance Manager</h1>

            <div className="attendance-form">

                <input
                    type="text"
                    placeholder="Subject Name"
                    value={subject}
                    onChange={(e) =>
                        setSubject(e.target.value)
                    }
                />

                <input
                    type="number"
                    min="1"
                    placeholder="Total Classes"
                    value={totalClasses}
                    onChange={(e) =>
                        setTotalClasses(e.target.value)
                    }
                />

                <input
                    type="number"
                    min="0"
                    placeholder="Attended Classes"
                    value={attendedClasses}
                    onChange={(e) =>
                        setAttendedClasses(e.target.value)
                    }
                />

                <button
                    onClick={addNewAttendance}
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save Attendance"}
                </button>

            </div>

            {loading && attendance.length === 0 ? (
                <p className="empty">
                    Loading attendance...
                </p>
            ) : attendance.length === 0 ? (
                <p className="empty">
                    No Attendance Added.
                </p>
            ) : (
                <div className="attendance-list">

                    {attendance.map((item) => (

                        <div
                            className="attendance-card"
                            key={item.id}
                        >

                            <h2>
                                📚 {item.subject}
                            </h2>

                            <p>
                                Total Classes :
                                {item.totalClasses}
                            </p>

                            <p>
                                Attended :
                                {item.attendedClasses}
                            </p>

                            <h3
                                className={
                                    Number(item.percentage) >= 75
                                        ? "good"
                                        : "bad"
                                }
                            >
                                Attendance :
                                {item.percentage}%
                            </h3>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(item.id)
                                }
                                disabled={loading}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Attendance;