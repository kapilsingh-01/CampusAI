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

    useEffect(() => {

        if (currentUser) {

            loadExams();

        }

    }, [currentUser]);

    async function loadExams() {

        try {

            const data = await getExams(currentUser.uid);

            setExams(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function addNewExam() {

        if (

            !subject ||

            !examName ||

            !date ||

            !time

        ) {

            alert("Please fill all fields.");

            return;

        }

        const newExam = {

            uid: currentUser.uid,

            subject,

            examName,

            date,

            time,

            hall

        };

        try {

            await addExam(newExam);

            await loadExams();

            setSubject("");

            setExamName("");

            setDate("");

            setTime("");

            setHall("");

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Delete this exam?"

        );

        if (!confirmDelete) return;

        try {

            await deleteExam(id);

            await loadExams();

        }

        catch (error) {

            console.error(error);

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
                    onChange={(e)=>setSubject(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Exam Name"
                    value={examName}
                    onChange={(e)=>setExamName(e.target.value)}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e)=>setTime(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Exam Hall (Optional)"
                    value={hall}
                    onChange={(e)=>setHall(e.target.value)}
                />

                <button onClick={addNewExam}>

                    Add Exam

                </button>

                       </div>

            {

                exams.length === 0 ?

                <p className="empty">

                    No exams added.

                </p>

                :

                <div className="exam-list">

                    {

                        exams.map((item) => (

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

export default Exams;