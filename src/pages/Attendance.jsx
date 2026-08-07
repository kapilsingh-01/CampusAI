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

    useEffect(() => {

        if (currentUser) {

            loadAttendance();

        }

    }, [currentUser]);

    async function loadAttendance() {

        try {

            const data = await getAttendance(currentUser.uid);

            setAttendance(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function addNewAttendance() {

        if (

            !subject ||

            !totalClasses ||

            !attendedClasses

        ) {

            alert("Please fill all fields.");

            return;

        }

        const percentage = (

            (Number(attendedClasses) /

                Number(totalClasses))

            * 100

        ).toFixed(1);

        const newAttendance = {

            uid: currentUser.uid,

            subject,

            totalClasses: Number(totalClasses),

            attendedClasses: Number(attendedClasses),

            percentage

        };

        try {

            await addAttendance(newAttendance);

            await loadAttendance();

            setSubject("");

            setTotalClasses("");

            setAttendedClasses("");

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Delete attendance?"

        );

        if (!confirmDelete) return;

        try {

            await deleteAttendance(id);

            await loadAttendance();

        }

        catch (error) {

            console.error(error);

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

                    placeholder="Total Classes"

                    value={totalClasses}

                    onChange={(e) =>

                        setTotalClasses(e.target.value)

                    }

                />

                <input

                    type="number"

                    placeholder="Attended Classes"

                    value={attendedClasses}

                    onChange={(e) =>

                        setAttendedClasses(e.target.value)

                    }

                />

                <button onClick={addNewAttendance}>

                    Save Attendance

                </button>

               </div>

            {

                attendance.length === 0 ?

                <p className="empty">

                    No Attendance Added.

                </p>

                :

                <div className="attendance-list">

                    {

                        attendance.map((item) => (

                            <div
                                className="attendance-card"
                                key={item.id}
                            >

                                <h2>📚 {item.subject}</h2>

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

export default Attendance;