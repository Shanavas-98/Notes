const { checkSchema } = require("express-validator");

const registerSchema = checkSchema({
    fullName: {
        in: ["body"],
        trim: true,
        notEmpty: true,
        errorMessage:"full name required",
        isLength: { options: { min:3, max: 20 }, errorMessage:"min 3 and max 20 characters" },
        matches: {
            options: /^[A-Za-z ]*$/,
            errorMessage: "please enter a valid name"
        }
    },
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
        isLength: { options: { min: 6, max:20 }, errorMessage:"min 6 and max 20 characters" },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
            errorMessage: "should contain uppercase, lowercase, special characters, numbers"
        },
    },
    confirm: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Passwords must match",
        custom: {
            options: (value, { req }) => value === req.body.password,
        },
    },
});



module.exports = registerSchema;