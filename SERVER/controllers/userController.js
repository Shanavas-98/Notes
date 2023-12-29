const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { createToken, verifyToken } = require("../utils/token");

const sendVerifyLink = async (email) => {
    try {
        const expiry = 60 * 60;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        const token = createToken(user?._id, expiry);
        const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
        const subject = "Email Verification Link";
        const text = `Welcome to Notes. Click this link to verify your email ${url}. This link will expire in one hour`;
        const result = await sendEmail(email, subject, text);
        return result;
    } catch (error) {
        console.log("send verify link",error);
        return false;
    }
};

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            throw { status: 400, message: "Every field is required" };
        }
        const isEmail = await UserModel.findOne({ email: email });
        if (isEmail) {
            throw { status: 409, message: "User email already exists" };
        }
        const salt = await bcrypt.genSalt(10);
        const newUser = await UserModel.create({
            name: fullName,
            email: email,
            password: await bcrypt.hash(password, salt)
        });
        const linkSend = await sendVerifyLink(newUser?.email);
        if (!linkSend) {
            throw { status: 503, message: "verfication link sending failed" };
        }
        res.status(201).json({ success: linkSend, message: "verification link send to email" });
    } catch (error) {
        // res.status(error.status || 500).json(error);
        console.log("register",error);
        res.json({success:false, message:error.message});
    }
};

const resendLink = async (req, res) => {
    try {
        const linkSend = await sendVerifyLink(req.body.email);
        if (!linkSend) {
            throw { status: 503, message: "verfication link sending failed" };
        }
        res.status(200).json({ success: linkSend, message: "verification link send to email" });
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === "null") {
            throw { status: 401, message: "Verification token required" };
        }
        const decoded = verifyToken(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp !== undefined && now > decoded.exp) {
            throw { status: 403, message: "Verification link expired" };
        }
        await UserModel.updateOne({ _id: decoded.id }, {
            $set: { verified: true }
        });
        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message:error.message});
    }
};

const authUser = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw { status: 401, message: "Authorization required" };
        }
        let token = req.headers.authorization.split(" ")[1];
        if (!token || token == "null") {
            throw { status: 401, message: "User token required" };
        }
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.id, { password: 0 });
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        // res.status(200).json({ id: user._id, name: user.name, email: user.email, token: token });
        const userData = {id: user._id, name: user.name, email: user.email};
        res.status(200).json({ success:true, userData, token });
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            res.status(403).json(error);
        }else{
            // res.status(error.status||500).json(error);
            res.json({success:false, message:error.message});
        }
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw { status: 400, message: "Email and password are required." };
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw { status: 404, message: "User not found." };
        }
        if (!user?.verified) {
            const linkSend = sendVerifyLink(user?.email);
            if (linkSend) {
                throw { status: 403, message: "email not verified. click on the link send to your email" };
            }
        }
        const auth = await bcrypt.compare(password, user?.password);
        if (!auth) {
            throw { status: 401, message: "Incorrect password." };
        }
        const expiry = 24 * 60 * 60;
        const token = createToken(user._id, expiry);
        const userData = {id: user._id, name: user.name, email: user.email};
        res.status(200).json({ success:true, userData, token });
    } catch (error) {
        console.log("login",error);
        // res.status(error.status || 500).json(error);
        res.json({success:false, message:error.message});
    }
};

module.exports = {
    register,
    verifyEmail,
    resendLink,
    authUser,
    login,
};