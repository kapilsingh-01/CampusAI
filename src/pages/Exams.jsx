import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getExams,
    addExam,
    deleteExam
} from "../services/examService";

function Exams() {
    const { currentUser } = useAuth();

    const [exams, setExams] = useState([]);

    const [subject, setSubject] = useState("");
    const [examName, setExamName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [hall, setHall] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadExams();
        }
    }, [currentUser]);

    async function loadExams() {
        try {
            const data = await getExams(currentUser.uid);

            setExams(data);
        } catch (error) {
            console.error("Error loading exams:", error);

            alert("Failed to load exams. Please try again.");
        }
    }

    async function addNewExam() {
        const cleanSubject = subject.trim();
        const cleanExamName = examName.trim();
        const cleanHall = hall.trim();

        if (
            !cleanSubject ||
            !cleanExamName ||
            !date ||
            !time
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const newExam = {
            uid: currentUser.uid,
            subject: cleanSubject,
            examName: cleanExamName,
            date,
            time,
            hall: cleanHall
        };

        try {
            setLoading(true);

            await addExam(newExam);

            await loadExams();

            setSubject("");
            setExamName("");
            setDate("");
            setTime("");
            setHall("");

            alert("Exam added successfully.");
        } catch (error) {
            console.error("Error adding exam:", error);

            alert("Failed to add exam. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this exam?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setLoading(true);

            await deleteExam(id);

            await loadExams();
        } catch (error) {
            console.error("Error deleting exam:", error);

            alert("Failed to delete exam. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="exams-page">

            <h1>📝 Exam Planner</h1>

            <div className="exam-form">

                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) =>
                        setSubject(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Exam Name"
                    value={examName}
                    onChange={(e) =>
                        setExamName(e.target.value)
                    }
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                        setTime(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Exam Hall (Optional)"
                    value={hall}
                    onChange={(e) =>
                        setHall(e.target.value)
                    }
                />

                <button
                    onClick={addNewExam}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Add Exam"}
                </button>

            </div>

            {exams.length === 0 ? (

                <p className="empty">
                    No exams added.
                </p>

            ) : (

                <div className="exam-list">

                    {exams.map((item) => (

                        <div
                            className="exam-card"
                            key={item.id}
                        >

                            <h2>
                                📚 {item.subject}
                            </h2>

                            <h3>
                                📝 {item.examName}
                            </h3>

                            <p>
                                📅 {item.date}
                            </p>

                            <p>
                                🕒 {item.time}
                            </p>

                            <p>
                                🏫 {item.hall || "Not Assigned"}
                            </p>

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

export default Exams;