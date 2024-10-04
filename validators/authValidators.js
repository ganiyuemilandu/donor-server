const { header } = require("express-validator");

const authValidators = [
    header("authorization")
    .notEmpty().withMessage("Missing auth token").bail()
    .matches(/^Bearer /).withMessage("Prefix auth token with 'Bearer '").bail()
    .customSanitizer((val) => val.substring(7)).isJWT().withMessage("Invalid auth token"),
];

module.exports = { authValidators };