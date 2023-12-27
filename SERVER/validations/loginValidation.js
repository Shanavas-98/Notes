const { checkSchema } = require("express-validator");

const loginSchema = checkSchema({
    email: {
        in: ["body"],
        trim: true,
        notEmpty: true,
        isEmail: true,
        errorMessage:"invalid email address"
    },
    password: {
        in: ["body"],
        notEmpty: true,
    },
});

module.exports = loginSchema;
