const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //to fetch notes of specific user
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 : end point: api/notes/fetchallnotes  Login required

router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Notes.find();

    res.json(notes);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ error: err.message });
  }
});

//Route 2: end point: api/notes/createnote Login required

router.post(
  "/createnote",
  fetchuser,
  [
    body("title", "Title is required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { title, content, tag } = req.body; //body destructuring
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        user: req.user.id,
        title,
        content,
        tag,
      });

      const savednote = await note.save();
      res.send(savednote);
    } catch (err) {
      console.error("Error creating note:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

//Route 3: end point: api/notes/updatenote Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, content, tag } = req.body;

  try {
    //create a new note object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (content) {
      newnote.content = content;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //Find note to update and update

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found"); //Notes not  found error
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to Update");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(400).json({ error: err.message });
  }
});

//Route 4: end point: api/notes/deletenote Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //Find note to delete

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found"); //Notes not  found error
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to Update");
    }
    // else Note found, delete it
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Succes: "Note deleted", deletednote: note });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
