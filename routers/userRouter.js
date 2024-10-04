const { getUser, loginUser, registerUser } = require("../controllers/userController");
const { getValidators, loginValidators, registerValidators } = require("../validators/userValidators");
const protect = require("../middleware/authMiddleware");
const { authValidators } = require("../validators/authValidators");
const resultValidation = require("../validators/resultValidation");

const router = require("express").Router();
router.get("/:id", getValidators, resultValidation, getUser);
router.get("/", authValidators, protect, getUser);
router.post("/login", loginValidators, resultValidation, loginUser);
router.post("/register", registerValidators, resultValidation, registerUser);

module.exports = router;