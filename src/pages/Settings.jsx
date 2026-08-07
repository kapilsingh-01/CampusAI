import { useState } from "react";

function Settings() {

    const [name, setName] = useState(
        localStorage.getItem("userName") || ""
    );

    const [university, setUniversity] = useState(
        localStorage.getItem("university") || ""
    );

    const [course, setCourse] = useState(
        localStorage.getItem("course") || ""
    );

    const [semester, setSemester] = useState(
        localStorage.getItem("semester") || ""
    );

    function saveProfile() {

        localStorage.setItem("userName", name);
        localStorage.setItem("university", university);
        localStorage.setItem("course", course);
        localStorage.setItem("semester", semester);

        alert("Profile Saved Successfully!");
    }

    return (

        <div className="settings-page">

            <h1>⚙ Settings</h1>

            <div className="settings-form">

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="University"
                    value={university}
                    onChange={(e)=>setUniversity(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e)=>setCourse(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Semester"
                    value={semester}
                    onChange={(e)=>setSemester(e.target.value)}
                />

                <button onClick={saveProfile}>
                    Save Profile
                </button>

            </div>

        </div>

    );

}

export default Settings;