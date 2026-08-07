import { useEffect, useState } from "react";

function Calendar() {

    const today = new Date();

    const [currentDate] = useState(today);

    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const [classes, setClasses] = useState([]);

    const [assignments, setAssignments] = useState([]);

    const [exams, setExams] = useState([]);

    useEffect(() => {

        const savedClasses =
            JSON.parse(localStorage.getItem("classes")) || [];

        const savedAssignments =
            JSON.parse(localStorage.getItem("assignments")) || [];

        const savedExams =
            JSON.parse(localStorage.getItem("exams")) || [];

        setClasses(savedClasses);

        setAssignments(savedAssignments);

        setExams(savedExams);

    }, []);

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const monthName = currentDate.toLocaleString("default", {
        month: "long",
    });

    const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

    const todaysClasses = classes.filter(
        (item) => item.date === selectedDate
    );

    const todaysAssignments = assignments.filter(
        (item) => item.dueDate === selectedDate
    );

    const todaysExams = exams.filter(
        (item) => item.date === selectedDate
    );

    const days = [];

    for (let i = 0; i < firstDay; i++) {

        days.push(
            <div
                key={"blank" + i}
                className="calendar-cell empty"
            ></div>
        );

    }

    for (let day = 1; day <= totalDays; day++) {

        const isToday = day === today.getDate();

        const isSelected = day === selectedDay;

        days.push(

            <div
                key={day}
                className={`calendar-cell ${isToday ? "today" : ""} ${isSelected ? "selected-day" : ""}`}
                onClick={() => setSelectedDay(day)}
            >
                {day}
            </div>

        );

    }

    return (

        <div className="calendar-page">

            <h1>📅 Calendar Planner</h1>

            <h2>{monthName} {year}</h2>

            <div className="calendar-header">

                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>

            </div>

            <div className="calendar-grid">

                {days}

            </div>

            <div className="selected-date-panel">

                <h2>📌 Selected Date</h2>

                <h3>
                    {selectedDay} {monthName} {year}
                </h3>

                <hr />

                <h3>📅 Classes</h3>

                {
                    todaysClasses.length === 0 ?

                        <p>No classes on this day.</p>

                        :

                        todaysClasses.map((item) => (

                            <div
                                className="calendar-event"
                                key={item.id}
                            >

                                <strong>{item.subject}</strong>

                                <p>🕒 {item.time}</p>

                                <p>🏫 {item.classroom}</p>

                                <p>🏢 {item.building}</p>

                            </div>

                        ))
                }

                <hr />

                <h3>📝 Assignments</h3>

                {
                    todaysAssignments.length === 0 ?

                        <p>No assignments on this day.</p>

                        :

                        todaysAssignments.map((item) => (

                            <div
                                className="calendar-event"
                                key={item.id}
                            >

                                <strong>{item.subject}</strong>

                                <p>📝 {item.title}</p>

                                <p>🔥 Priority: {item.priority}</p>

                                <p>📌 Status: {item.status}</p>

                            </div>

                        ))
                }

                <hr />

                <h3>📝 Exams</h3>

                {
                    todaysExams.length === 0 ?

                        <p>No exams on this day.</p>

                        :

                        todaysExams.map((item) => (

                            <div
                                className="calendar-event"
                                key={item.id}
                            >

                                <strong>{item.subject}</strong>

                                <p>📅 {item.date}</p>

                            </div>

                        ))
                }

            </div>

        </div>

    );

}

export default Calendar;