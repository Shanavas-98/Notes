const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps:true
});

const NoteModel = new mongoose.model("note",noteSchema);

module.exports = NoteModel;