import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getNotes,
    addNote,
    deleteNote
} from "../services/noteService";

function Notes() {

    const { currentUser } = useAuth();

    const [notes, setNotes] = useState([]);

    const [subject, setSubject] = useState("");

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {

        if (currentUser) {

            loadNotes();

        }

    }, [currentUser]);

    async function loadNotes() {

        try {

            const data = await getNotes(currentUser.uid);

            setNotes(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load notes.");

        }

    }

    async function addNewNote() {

        if (!subject || !title || !content) {

            alert("Please fill all fields.");

            return;

        }

        const newNote = {

            uid: currentUser.uid,

            subject,

            title,

            content

        };

        try {

            await addNote(newNote);

            await loadNotes();

            setSubject("");

            setTitle("");

            setContent("");

        } catch (error) {

            console.error(error);

            alert("Unable to save note.");

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this note?"
        );

        if (!confirmDelete) return;

        try {

            await deleteNote(id);

            await loadNotes();

        } catch (error) {

            console.error(error);

            alert("Unable to delete note.");

        }

    }

    const filteredNotes = notes.filter((item) =>

        item.subject.toLowerCase().includes(search.toLowerCase()) ||

        item.title.toLowerCase().includes(search.toLowerCase()) ||

        item.content.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="notes-page">

            <h1>📚 Smart Notes</h1>

            <input
                type="text"
                placeholder="🔍 Search Notes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="note-form">

                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Write your notes here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={addNewNote}>

                    Save Note

                </button>

                                  </div>

            {

                filteredNotes.length === 0 ?

                <p className="empty">

                    No Notes Found.

                </p>

                :

                <div className="note-list">

                    {

                        filteredNotes.map((item) => (

                            <div
                                className="note-card"
                                key={item.id}
                            >

                                <h2>📚 {item.subject}</h2>

                                <h3>📝 {item.title}</h3>

                                <p>{item.content}</p>

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

export default Notes;