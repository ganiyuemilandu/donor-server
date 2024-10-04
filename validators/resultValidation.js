const resultValidation = (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map(({ msg }) => msg);
        res.status(400).json({ message });
}
    else
    next();
};

module.exports = resultValidation;