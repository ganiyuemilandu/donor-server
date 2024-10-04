const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
    {
        name: { type: String, required: [true, "Wallet name is required"] },
        balance: { type: String, default: "0.00" },
        pin: { type: String, required: true, select: false },
        owner: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: "User" }
    },
    { timestamps: true }
);

const walletModel = mongoose.model("Wallet", walletSchema);
module.exports = walletModel;