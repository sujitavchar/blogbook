import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://192.168.43.63:5000";
  const initialNotes = [];

  const [notes, setnotes] = useState(initialNotes);

  //Fecthin all notes form api
    const fetchAllNotes = async () => {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTkyMTZkNGVlMTg0MTVhMmY1ZTBkIn0sImlhdCI6MTcyMDYyNjgyOH0.0nyR8tNs-MvPlr57F_e098lk2NNmiTsHkMLuHl-nyH4",
        },
      });
      const json = await response.json();
      setnotes(json);
    };
 

  //Add a note
  const addNote = async (title, content, tag) => {
    //API call->
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwttoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTkyMTZkNGVlMTg0MTVhMmY1ZTBkIn0sImlhdCI6MTcyMDYyNjgyOH0.0nyR8tNs-MvPlr57F_e098lk2NNmiTsHkMLuHl-nyH4",
      },
      body: JSON.stringify({ title, content, tag }),
    });
    const json = response.json();

    setnotes(notes.concat(json));
    alert("Post Created Successfully✅")
  };
  //Edit notes
  const editNote = async (id, title, content, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "jwttoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTkyMTZkNGVlMTg0MTVhMmY1ZTBkIn0sImlhdCI6MTcyMDYyNjgyOH0.0nyR8tNs-MvPlr57F_e098lk2NNmiTsHkMLuHl-nyH4",
      },
      body: JSON.stringify({ title, content, tag }),
    });
    const json = response.json();
    console.log(json);
    
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].content = content;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    alert("Post Updated Successfully✅")
  };
  //delete note

  const deleteNote = async (id) => {
    console.log("deleting note of id", id);

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwttoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTkyMTZkNGVlMTg0MTVhMmY1ZTBkIn0sImlhdCI6MTcyMDYyNjgyOH0.0nyR8tNs-MvPlr57F_e098lk2NNmiTsHkMLuHl-nyH4",
      }
    });
    const json = response.json();
    console.log(json);

    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnotes);
    alert("Post Deleted Successfully✅")
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, editNote, deleteNote, fetchAllNotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
