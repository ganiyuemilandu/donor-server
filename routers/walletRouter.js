const { createWallet, getWallet, topupWallet, updateWalletName, updateWalletPin } = require("../controllers/walletController");
const protect = require("../middleware/authMiddleware");
const { authValidators } = require("../validators/authValidators");
const { createValidators, getValidators, topupValidators, updateNameValidators, updatePinValidators } = require("../validators/walletValidators");
const resultValidation = require("../validators/resultValidation");

const router = require("express").Router();
router.get("/:id", getValidators, resultValidation, getWallet);
router.get("/", authValidators, resultValidation, protect, getWallet);
router.post("/create", authValidators, createValidators, resultValidation, protect, createWallet);
router.put("/topup", authValidators, topupValidators, resultValidation, protect, topupWallet);
router.put("/update/name", authValidators, updateNameValidators, resultValidation, protect, updateWalletName);
router.put("/update/pin", authValidators, updatePinValidators, resultValidation, protect, updateWalletPin);

module.exports = router;