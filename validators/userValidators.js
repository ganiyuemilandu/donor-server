const { body, param } = require("express-validator");

const capitalize = (str) => str[0].toUpperCase() + str.substring(1).toLowerCase();

const registerValidators = [
    body("first")
    .notEmpty().withMessage("Field first is required").bail()
    .isAlpha().withMessage("Supply a valid first name").escape().customSanitizer(capitalize),
    body("last")
    .notEmpty().withMessage("Field last is required").bail()
    .isAlpha().withMessage("Supply a valid last name").escape().customSanitizer(capitalize),
    body("email")
    .notEmpty().withMessage("Field email is required").bail()
    .isEmail().withMessage("Supply a valid email").bail().toLowerCase(),
    body("password")
    .notEmpty().withMessage("Field password is required").bail()
    .isStrongPassword({ minLength: 8 }).withMessage("Supply a password of at least 8 characters consisting of 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol").escape(),
];

const loginValidators = [
    body("email")
    .notEmpty().withMessage("Field email is required").bail()
    .isEmail().withMessage("Supply a valid email").toLowerCase(),
    body("password", "Field password is required").notEmpty().escape(),
];

const getValidators = [
    param("id", "Supply a valid user id").isMongoId(),
];

module.exports = { getValidators, loginValidators, registerValidators };