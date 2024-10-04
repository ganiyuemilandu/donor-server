const jwt = require("jsonwebtoken");
 const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401);
        throw new Error("You're not authorized");
    }
});

module.exports = protect;