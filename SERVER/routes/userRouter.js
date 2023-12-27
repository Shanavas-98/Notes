const express = require("express");
const { register, login, authUser, verifyEmail } = require("../controllers/userController");
const validation = require("../validations/validation");
const registerSchema = require("../validations/registerValidation");
const loginSchema = require("../validations/loginValidation");
const userAuth = require("../middlewares/userAuth");
const { getUserNotes, getNote, addNote, editNote, deleteNote } = require("../controllers/noteControllers");
const userRouter = express.Router();

userRouter.post("/register",registerSchema,validation, register);
userRouter.post("/login",loginSchema,validation, login);
userRouter.get("/auth-user", authUser);
userRouter.get("/verify-email/:token",verifyEmail);


userRouter.get("/notes", userAuth, getUserNotes);
userRouter.get("/notes/:noteId", userAuth, getNote);
userRouter.post("/add-note", userAuth, addNote);
userRouter.put("/edit-note/:noteId", userAuth, editNote);
userRouter.delete("/delete-note/:noteId", userAuth, deleteNote);

module.exports = userRouter;
