const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
    // Run the validation checks
    const errors = validationResult(req);
  
    // If there are validation errors, send a response with the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ validationErrors: errors.array() });
    }
  
    // If there are no errors, move to the next middleware
    next();
};

module.exports = validation;