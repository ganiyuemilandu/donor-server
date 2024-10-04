const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
    {
        donor: { type: mongoose.Types.ObjectId, index: true, ref: "User", required: [true, "Donor id is required"] },
        beneficiary: { type: mongoose.Types.ObjectId, ref: "User", required: [true, "Beneficiary id is required"] },
        donation: { type: String, required: [true, "Donation is required"] },
        date: { type: Date, default: Date.now }
    }
);

const donationModel = mongoose.model("Donation", donationSchema);
module.exports = donationModel;