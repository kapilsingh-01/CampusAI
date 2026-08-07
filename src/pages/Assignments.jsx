import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getAssignments,
    addAssignment,
    deleteAssignment
} from "../services/assignmentService";

function Assignments() {

  const { currentUser } = useAuth();

const [assignments, setAssignments] = useState([]);

const [subject, setSubject] = useState("");
const [title, setTitle] = useState("");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("Medium");

useEffect(() => {

    if (currentUser) {

        loadAssignments();

    }

}, [currentUser]);

async function loadAssignments() {

    const data = await getAssignments(
        currentUser.uid
    );

    setAssignments(data);

}

 async function addNewAssignment() {

    if (!subject || !title || !dueDate) {

        alert("Please fill all fields.");

        return;

    }

    const newAssignment = {

        uid: currentUser.uid,

        subject,

        title,

        dueDate,

        priority,

        status: "Pending"

    };

    await addAssignment(newAssignment);

    await loadAssignments();

    setSubject("");

    setTitle("");

    setDueDate("");

    setPriority("Medium");

}

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
        "Delete this assignment?"
    );

    if (!confirmDelete) return;

    await deleteAssignment(id);

    await loadAssignments();

}

  function toggleStatus(id) {

    const updatedAssignments = assignments.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          status:
            item.status === "Pending"
              ? "Completed"
              : "Pending",
        };

      }

      return item;
    });

    setAssignments(updatedAssignments);

    localStorage.setItem(
      "assignments",
      JSON.stringify(updatedAssignments)
    );
  }

  return (
    <div className="assignments-page">

      <h1>📝 Assignment Manager</h1>

      <div className="assignment-form">

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

       <button onClick={addNewAssignment}>
    ADD
</button>

      </div>

      {assignments.length === 0 ? (

        <p className="empty">
          No assignments added.
        </p>

      ) : (

        <div className="assignment-list">

          {assignments.map((item) => (

            <div
              className="assignment-card"
              key={item.id}
            >

              <h2>📚 {item.subject}</h2>

              <h3>{item.title}</h3>

              <p>📅 Due: {item.dueDate}</p>

              <p>🔥 Priority: {item.priority}</p>

              <p
                className={
                  item.status === "Completed"
                    ? "completed"
                    : "pending"
                }
              >
                📌 {item.status}
              </p>

              <div className="assignment-buttons">

                <button
                  className="complete-btn"
                  onClick={() => toggleStatus(item.id)}
                >
                  {item.status === "Pending"
                    ? "✅ Complete"
                    : "↩ Mark Pending"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Assignments;