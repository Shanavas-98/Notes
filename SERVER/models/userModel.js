const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    verified:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
});

const UserModel = new mongoose.model("user",userSchema);

module.exports = UserModel;