const { getDonations, makeDonation } = require("../controllers/donationController");
const protect = require("../middleware/authMiddleware");
const { authValidators } = require("../validators/authValidators");
const { makeValidators } = require("../validators/donationValidators");
const resultValidation = require("../validators/resultValidation");

const router = require("express").Router();
router.get("/", getDonations);
router.post("/donate", authValidators, makeValidators, resultValidation, protect, makeDonation);

module.exports = router;