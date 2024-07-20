import React, { useContext, useEffect, useState, useRef } from "react";
import notesContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
const Notes = () => {
  const context = useContext(notesContext);
  const { notes, fetchAllNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    etag: "",
    econtent: "",
  });

  const updatenote = (currnote) => {
    ref.current.click();

    setNote({
      id: currnote._id,
      etitle: currnote.title || "",
      etag: currnote.tag || "",
      econtent: currnote.content || "",
    });
  };

  const handleOnClick = (e) => {
    editNote(note.id, note.etitle, note.econtent, note.etag);
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit IT!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag - Single Word
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  aria-describedby="emailHelp"
                  value={note.etag}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="econtent" className="form-label">
                  Content
                </label>
                <textarea
                  onChange={onChange}
                  type="textarea"
                  className="form-control"
                  id="econtent"
                  name="econtent"
                  aria-describedby="emailHelp"
                  rows="8"
                  value={note.econtent}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      


      <div className="row my-3">
        <div className="container ">
            <h2  style={{color: "white"}} >{notes.length === 0 && "Nothing to Display ... Please Create your post"}</h2>
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updatenote={updatenote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
