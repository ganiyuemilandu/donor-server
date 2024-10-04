const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Registers a new user.
 * 
 */
const registerUser = asyncHandler( async (req, res) => {
    if (!(await User.findOne({ email: req.body.email }))) {
        const { first, last, email, password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        const user = await User.create({ first, last, email, password: hash });
        const data = { userID: user.id, name: user.name, email };
        res.status(201).json(data);
    }
    else {
        res.status(400);
        throw new Error("Email already in use");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user && (await bcryptjs.compare(password, user.password))) {
        const data = { userID: user.id, name: user.name, email, token: generateToken(user.id) };
        res.status(200).json(data);
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id || req.user.id);
    if (!user) {
        res.status(400);
        throw new Error("User doesn't exist");
    }
    if (req.params.id)
        res.status(200).json({ userID: user.id, name: user.name });
    else
        res.status(200).json({ userID: user.id, name: user.name, email: user.email });
});

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

module.exports = { getUser, loginUser, registerUser };