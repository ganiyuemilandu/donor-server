const { body } = require("express-validator");

const makeValidators = [
    body("amount")
    .notEmpty().withMessage("Field amount is required").bail()
    .matches(/^\d*\.\d\d$/).withMessage("Amount should be a decimal with 2 digits after the dot (.)").bail()
    .isFloat({ gt: 0 }).withMessage("Supply donation amount greater than 0.00").bail(),
    body("walletID")
    .notEmpty().withMessage("Field walletID is required").bail()
    .isMongoId().withMessage("Invalid wallet id"),
    body("pin")
    .notEmpty().withMessage("Field pin is required").bail()
    .matches(/^\d{4}$/).withMessage("Supply a 4 digit pin").bail(),
];

module.exports = { makeValidators };