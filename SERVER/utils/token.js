const jwt = require("jsonwebtoken");
const createToken = (id, expiry) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: expiry
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {createToken,verifyToken};