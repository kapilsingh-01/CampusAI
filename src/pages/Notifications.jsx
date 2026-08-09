import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { getClasses } from "../services/classService";
import { getAssignments } from "../services/assignmentService";
import { getExams } from "../services/examService";

function Notifications() {
    const { currentUser } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadNotifications();
        }
    }, [currentUser]);

    async function loadNotifications() {
        try {
            setLoading(true);

            const today = new Date()
                .toISOString()
                .split("T")[0];

            const [
                classes,
                assignments,
                exams
            ] = await Promise.all([
                getClasses(currentUser.uid),
                getAssignments(currentUser.uid),
                getExams(currentUser.uid)
            ]);

            const list = [];

            // Today's Classes
            classes.forEach((item) => {
                if (item.date === today) {
                    list.push({
                        id: `class-${item.id}`,
                        type: "Class",
                        message: `📅 ${item.subject} at ${item.time}`
                    });
                }
            });

            // Today's Assignments
            assignments.forEach((item) => {
                if (item.dueDate === today) {
                    list.push({
                        id: `assignment-${item.id}`,
                        type: "Assignment",
                        message: `📝 ${item.title} is due today`
                    });
                }
            });

            // Today's Exams
            exams.forEach((item) => {
                if (item.date === today) {
                    list.push({
                        id: `exam-${item.id}`,
                        type: "Exam",
                        message: `📝 ${item.subject} exam today`
                    });
                }
            });

            setNotifications(list);

        } catch (error) {
            console.error(
                "Error loading notifications:",
                error
            );

            alert(
                "Failed to load notifications. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="notifications-page">

            <h1>🔔 Notifications</h1>

            {loading ? (

                <p className="empty">
                    Loading notifications...
                </p>

            ) : notifications.length === 0 ? (

                <p className="empty">
                    No notifications today.
                </p>

            ) : (

                notifications.map((item) => (

                    <div
                        className="notification-card"
                        key={item.id}
                    >

                        <h3>
                            {item.type}
                        </h3>

                        <p>
                            {item.message}
                        </p>

                    </div>

                ))

            )}

        </div>
    );
}

export default Notifications;