const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Donation = require("../models/donationModel");
const Wallet = require("../models/walletModel");

const makeDonation = asyncHandler(async (req, res) => {
    const donor = await Wallet.findOne({ owner: req.user.id }).select("+pin");
    if (!donor)
        return res.status(400).json({ message: "No wallet associated with this user" });
        if (req.body.walletID === donor.id)
    return res.status(400).json({ message: "Cannot donate to self" });
    if (!(await bcryptjs.compare(req.body.pin, donor.pin)))
        return res.status(400).json({ message: "Incorrect pin" });
    const amount = Number.parseFloat(req.body.amount);
    const balance = Number.parseFloat(donor.balance);
    if (amount > balance)
        return res.status(400).json({ message: "Insufficient balance" });
    const beneficiary = await Wallet.findById(req.body.walletID);
    if (!beneficiary)
        return res.status(400).json({ message: "Invalid wallet id" });
    donor.balance = (balance - amount).toFixed(2);
    beneficiary.balance = (Number.parseFloat(beneficiary.balance) + amount).toFixed(2);
    const session = await require("mongoose").startSession();
    try {
        await session.startTransaction();
        await donor.save({ session });
        await beneficiary.save({ session });
        const donation = await Donation.create([{ donor: donor.owner, beneficiary: beneficiary.owner, donation: req.body.amount }], { session });
        await session.commitTransaction();
        res.status(200).json({ donor: donation.donor, beneficiary: donation.beneficiary, donation: donation.donation, date: donation.date });
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
});

const getDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find({ owner: req.user.id });
    res.status(200).json(donations);
});

module.exports = { getDonations, makeDonation };