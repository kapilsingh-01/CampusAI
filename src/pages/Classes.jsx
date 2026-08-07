import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    addClass,
    getClasses,
    deleteClass
} from "../services/classService";

function Classes() {

    const { currentUser } = useAuth();

    if (!currentUser) {

    return (
        <div className="classes-page">
            <h2>Loading user...</h2>
        </div>
    );

}

    const [classes, setClasses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [subject, setSubject] = useState("");

    const [day, setDay] = useState("");

    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    const [classroom, setClassroom] = useState("");

    const [building, setBuilding] = useState("");

    useEffect(() => {

        if (!currentUser) {

            setLoading(false);

            return;

        }

        loadClasses();

    }, [currentUser]);

    async function loadClasses() {

        try {

            const data = await getClasses(currentUser.uid);

            setClasses(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load classes.");

        } finally {

            setLoading(false);

        }

    }

    async function handleAddClass() {

        if (

            !subject ||

            !day ||

            !date ||

            !time ||

            !classroom ||

            !building

        ) {

            alert("Please fill all fields.");

            return;

        }

        const newClass = {

           uid: currentUser?.uid,
            subject,

            day,

            date,

            time,

            classroom,

            building

        };

        try {

            await addClass(newClass);

            await loadClasses();

            setSubject("");

            setDay("");

            setDate("");

            setTime("");

            setClassroom("");

            setBuilding("");

        } catch (error) {

            console.error(error);

            alert("Unable to add class.");

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Delete this class?"

        );

        if (!confirmDelete) return;

        try {

            await deleteClass(id);

            await loadClasses();

        } catch (error) {

            console.error(error);

            alert("Unable to delete class.");

        }

    }

    if (loading) {

        return (

            <div className="classes-page">

                <h2>Loading Classes...</h2>

            </div>

        );

    }

    return (

        <div className="classes-page">

            <h1>📅 Today's Classes</h1>

            <div className="add-class">

                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >

                    <option value="">Select Day</option>

                    <option>Monday</option>

                    <option>Tuesday</option>

                    <option>Wednesday</option>

                    <option>Thursday</option>

                    <option>Friday</option>

                    <option>Saturday</option>

                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Classroom"
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                />

                <button onClick={handleAddClass}>

                    Add Class

                </button>

                       </div>

            {

                classes.length === 0 ?

                    <p className="empty">

                        No classes added.

                    </p>

                    :

                    <div className="class-list">

                        {

                            classes.map((item) => (

                                <div
                                    className="class-card"
                                    key={item.id}
                                >

                                    <div>

                                        <h2>📚 {item.subject}</h2>

                                        <h3>📅 {item.day}</h3>

                                        <p>📆 {item.date}</p>

                                        <h3>🕒 {item.time}</h3>

                                        <p>🏫 Classroom: {item.classroom}</p>

                                        <p>🏢 Building: {item.building}</p>

                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(item.id)}
                                    >

                                        🗑 Delete

                                    </button>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default Classes;