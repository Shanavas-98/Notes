const NoteModel = require("../models/noteModel");

const getUserNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const search = req.query.search || "";
        const notes = await NoteModel.find({
            $and: [{ owner: userId }, { title: { $regex: search, $options: "i" } }],
        });
        if (!notes) {
            throw { status: 404, message: "user notes not found" };
        }
        res.status(200).json(notes);
    } catch (error) {
        console.log("user notes", error);
        res.status(error.status || 500).json(error);
    }
};

const getNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const note = await NoteModel.findById(noteId);
        if (!note) {
            throw { status: 404, message: "note not found" };
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("get note", error);
        res.status(error.status || 500).json(error);
    }
};

const addNote = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description } = req.body;
        if (!title || !description) {
            throw { status: 400, message: "title and description required" };
        }
        await NoteModel.create({
            owner: userId,
            title,
            description,
        });
        res.status(201).json({ success: true, message: "new note created" });
    } catch (error) {
        console.log("add note", error);
        res.status(error.status || 500).json(error);
    }
};

const editNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { title, description } = req.body;
        if (!title || !description) {
            throw { status: 400, message: "title and description required" };
        }
        await NoteModel.findByIdAndUpdate(noteId, {
            $set: {
                title,
                description,
            },
        });
        res.status(200).json({ success: true, message: "note edited successfully" });
    } catch (error) {
        console.log("edit note", error);
        res.status(error.status || 500).json(error);
    }
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        await NoteModel.findByIdAndDelete(noteId);
        res.status(200).json({ success: true, message: "note deleted successfully" });
    } catch (error) {
        console.log("edit note", error);
        res.status(error.status || 500).json(error);
    }
};

module.exports = {
    getUserNotes,
    getNote,
    addNote,
    editNote,
    deleteNote,
};
