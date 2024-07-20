// ReadMore.js
import React from "react";
import { useParams } from "react-router-dom";
import notesContext from "../context/notes/noteContext";
import { useContext, useEffect, useState } from "react";
import "../App.css";

const ReadMore = () => {
  const { id } = useParams(); // Get the note ID from the URL
  const context = useContext(notesContext);
  const { notes } = context;
  console.log(notes);

  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchedNote = notes.find((note) => note._id === id);
    setNote(fetchedNote);
  }, [id, notes]);

  if (!note) return <p>Loading...</p>;

  return (
    
      <div className="note-container">
        <h1 className="note-title">{note.title}</h1>
        <p className="note-content">{note.content}</p>
      </div>
    
  );
};

export default ReadMore;
