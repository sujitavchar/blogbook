import React, { useContext, useState } from "react";
import notescontext from "../context/notes/noteContext";
import "../App.css";
import { useNavigate } from "react-router-dom";


const Createblog = () => {
  const context = useContext(notescontext);
  const { addNote } = context;
  const navigate = useNavigate(); // Get the navigate function


  const [note, setnote] = useState({ title: "", content: "", tag: "default" });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.content, note.tag);
    navigate("/");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <h2 className="contanier headings"> Create Your Blog</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag - Single Word
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label" onChange={onChange}>
              Content
            </label>
            <textarea
              type="textarea"
              className="form-control"
              id="content"
              name="content"
              aria-describedby="emailHelp"
              rows="8"
              onChange={onChange}
              required
            />
          </div>

          <button
            type="create"
            className="btn btn-success"
            onClick={handleOnClick}
            disabled={note.title.length===0 || note.content.length===0 || note.tag.length===0}
          >
            Create
          </button>
          <h5 style={{color: "red"}}> *All fields are required*</h5>
        </form>
      </div>
    </>
  );
};

export default Createblog;
