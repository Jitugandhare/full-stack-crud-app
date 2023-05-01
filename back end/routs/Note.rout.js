const express = require("express");
const { NoteModel } = require("../models/Note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  
  try {
    const notes = await NoteModel.find({user});
    res.send("All the notes");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "Note created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    await NoteModel.findByIdAndDelete({ _id: noteID });

    res.send("Deleted");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
    res.status(200).send({ msg: `The note with id:${noteID} has been updated` });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  noteRouter,
};
