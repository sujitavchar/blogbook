import React, { useContext } from "react";
import { Link } from "react-router-dom";
import notescontext from "../context/notes/noteContext";
import "../App.css";

const Noteitem = (props) => {
  const { note, updatenote } = props;
  const context = useContext(notescontext);
  const { deleteNote } = context;
  const content = note.content || "";

  return (
    <div className="col-md-3 my-3 noteitem-card">
      <div className="card " style={{ width: "18rem" }}>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {note.tag}
          <span class="visually-hidden">unread messages</span>
        </span>
        <div className="card-body note">
          <h5 className="card-title">{note.title}</h5>
          {/*<h6 className="card-subtitle mb-2 text-body-secondary">
            {Date(note.date)}
          </h6>*/}
          <p className="card-text">{content.substring(0, 200)}...</p>
          <Link to={`/readmore/${note._id}`} className="card-link">
            Read More
          </Link>
          <br />
          <i
            className="bx bxs-edit bx-md mx-2"
            onClick={() => {
              updatenote(note);
            }}
          ></i>
          <i
            className="bx bx-trash bx-md mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
