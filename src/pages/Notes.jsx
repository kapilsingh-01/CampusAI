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

    const [selectedNote, setSelectedNote] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (currentUser) {
            loadNotes();
        }

    }, [currentUser]);

    async function loadNotes() {

        try {

            setLoading(true);

            const data = await getNotes(currentUser.uid);

            setNotes(data);

        } catch (error) {

            console.error(
                "Error loading notes:",
                error
            );

            alert("Unable to load notes.");

        } finally {

            setLoading(false);

        }

    }

    async function addNewNote() {

        const cleanSubject = subject.trim();
        const cleanTitle = title.trim();
        const cleanContent = content.trim();

        if (
            !cleanSubject ||
            !cleanTitle ||
            !cleanContent
        ) {

            alert("Please fill all fields.");

            return;

        }

        const newNote = {

            uid: currentUser.uid,

            subject: cleanSubject,

            title: cleanTitle,

            content: cleanContent

        };

        try {

            setLoading(true);

            await addNote(newNote);

            await loadNotes();

            setSubject("");
            setTitle("");
            setContent("");

            alert("Note saved successfully.");

        } catch (error) {

            console.error(
                "Error saving note:",
                error
            );

            alert("Unable to save note.");

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this note?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setLoading(true);

            await deleteNote(id);

            if (
                selectedNote &&
                selectedNote.id === id
            ) {

                setSelectedNote(null);

            }

            await loadNotes();

        } catch (error) {

            console.error(
                "Error deleting note:",
                error
            );

            alert("Unable to delete note.");

        } finally {

            setLoading(false);

        }

    }

    function handleOpenNote(note) {

        setSelectedNote(note);

    }

    function handleCloseNote() {

        setSelectedNote(null);

    }

    const searchText = search
        .trim()
        .toLowerCase();

    const filteredNotes = notes.filter((item) => {

        const itemSubject =
            String(item.subject || "").toLowerCase();

        const itemTitle =
            String(item.title || "").toLowerCase();

        const itemContent =
            String(item.content || "").toLowerCase();

        return (
            itemSubject.includes(searchText) ||
            itemTitle.includes(searchText) ||
            itemContent.includes(searchText)
        );

    });

    return (

        <div className="notes-page">

            <h1>📚 Smart Notes</h1>

            <input
                type="text"
                placeholder="🔍 Search Notes"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div className="note-form">

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
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Write your notes here..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <button
                    onClick={addNewNote}
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save Note"}
                </button>

            </div>

            {loading && notes.length === 0 ? (

                <p className="empty">
                    Loading notes...
                </p>

            ) : filteredNotes.length === 0 ? (

                <p className="empty">
                    No Notes Found.
                </p>

            ) : (

                <div className="note-list">

                    {filteredNotes.map((item) => (

                        <div
                            className="note-card"
                            key={item.id}
                        >

                            <h2>
                                📚 {item.subject}
                            </h2>

                            <h3>
                                📝 {item.title}
                            </h3>

                            <p>
                                {item.content.length > 150
                                    ? `${item.content.substring(
                                        0,
                                        150
                                    )}...`
                                    : item.content}
                            </p>

                            <div className="note-actions">

                                <button
                                    onClick={() =>
                                        handleOpenNote(item)
                                    }
                                    disabled={loading}
                                >
                                    📖 Open Note
                                </button>

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

                        </div>

                    ))}

                </div>

            )}

            {selectedNote && (

                <div className="note-viewer">

                    <div className="note-viewer-content">

                        <h2>
                            📚 {selectedNote.subject}
                        </h2>

                        <h3>
                            📝 {selectedNote.title}
                        </h3>

                        <div className="note-full-content">
                            {selectedNote.content}
                        </div>

                        <button
                            onClick={handleCloseNote}
                        >
                            ✖ Close Note
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Notes;