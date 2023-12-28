const UserModel = require("../models/userModel");
const { verifyToken } = require("../utils/token");


const userAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw { status: 401, message: "Authorization required" };
        }
        let token = req.headers.authorization.split(" ")[1];
        if (!token || token === "null") {
            throw { status: 401, message: "User token required" };
        }
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.id, { password: 0 });
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        req.userId = user?._id.toString();
        next();
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            res.status(403).json(error);
        }else{
            res.status(error.status||500).json(error);
        }
    }
};

module.exports = userAuth;