const { body, param } = require("express-validator");


const createValidators = [
    body("name")
    .notEmpty().withMessage("Field name is required").bail()
    .isAlphanumeric().withMessage("Name should only consists of alphanumeric characters"),
    body("pin")
    .notEmpty().withMessage("Field pin is required").bail()
    .matches(/^\d{4}$/).withMessage("Supply a 4 digit pin"),
];

const topupValidators = [
    body("amount")
    .notEmpty().withMessage("Field amount is required").bail()
    .matches(/^\d*\.\d\d$/).withMessage("Amount should be a decimal with 2 digits after the dot (.)"),
];

const getValidators = [
    param("id", "Supply a valid user id").isMongoId(),
];

const updateNameValidators = [
    body("name")
    .notEmpty().withMessage("Field name is required").bail()
    .isAlphanumeric().withMessage("Name should only consists of alphanumeric characters"),
];

const updatePinValidators = [
    body("pin")
    .notEmpty().withMessage("Field pin is required").bail()
    .matches(/^\d{4}$/).withMessage("Supply a 4 digit pin"),
    body("newPin")
    .notEmpty().withMessage("Field newPin is required").bail()
    .matches(/^\d{4}$/).withMessage("Supply a 4 digit new pin"),
];

module.exports = { createValidators, getValidators, topupValidators, updateNameValidators, updatePinValidators };