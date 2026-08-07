import { useEffect, useState } from "react";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const today = new Date().toISOString().split("T")[0];

        const classes =
            JSON.parse(localStorage.getItem("classes")) || [];

        const assignments =
            JSON.parse(localStorage.getItem("assignments")) || [];

        const exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        const list = [];

        classes.forEach((item) => {

            if (item.date === today) {

                list.push({
                    id: item.id,
                    type: "Class",
                    message: `📅 ${item.subject} at ${item.time}`
                });

            }

        });

        assignments.forEach((item) => {

            if (item.dueDate === today) {

                list.push({
                    id: item.id,
                    type: "Assignment",
                    message: `📝 ${item.title} is due today`
                });

            }

        });

        exams.forEach((item) => {

            if (item.date === today) {

                list.push({
                    id: item.id,
                    type: "Exam",
                    message: `📝 ${item.subject} exam today`
                });

            }

        });

        setNotifications(list);

    }, []);

    return (

        <div className="notifications-page">

            <h1>🔔 Notifications</h1>

            {

                notifications.length === 0 ?

                    <p className="empty">

                        No notifications today.

                    </p>

                    :

                    notifications.map((item)=>(

                        <div
                            className="notification-card"
                            key={item.id}
                        >

                            <h3>{item.type}</h3>

                            <p>{item.message}</p>

                        </div>

                    ))

            }

        </div>

    );

}

export default Notifications;