import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://13.222.186.45:5000");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load notes when page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a new note
  const addNote = async () => {
    try {
      await fetch("http://13.222.186.45:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`http://13.222.186.45:5000/${id}`, {
        method: "DELETE",
      });

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  // Fill the form for editing
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  // Update a note
  const updateNote = async () => {
    try {
      await fetch(`http://13.222.186.45:5000/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      setTitle("");
      setContent("");
      setEditingId(null);

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="container">
    <h1>📝 Notes App</h1>

    <div className="form">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="add-btn"
        onClick={editingId ? updateNote : addNote}
      >
        {editingId ? "Update Note" : "Add Note"}
      </button>
    </div>

    {notes.map((note) => (
      <div className="note-card" key={note._id}>
        <h3>{note.title}</h3>

        <p>{note.content}</p>

        <button
          className="edit-btn"
          onClick={() => editNote(note)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

export default App;