const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");

const createWallet = asyncHandler(async (req, res) => {
    if (!(await Wallet.findOne({ owner: req.user.id }))) {
        const salt = await bcryptjs.genSalt(10);
        const pinHash = await bcryptjs.hash(req.body.pin, salt);
        const wallet = await Wallet.create({ name: req.body.name, pin: pinHash, owner: req.user.id });
        res.status(201).json({ walletID: wallet.id, name: wallet.name, balance: wallet.balance, owner: wallet.owner, createdAt: wallet.createdAt, updatedAt: wallet.updatedAt });
    }
    else {
        res.status(400);
        throw new Error("User already owns a wallet");
    }
});

const getWallet = asyncHandler(async (req, res) => {
    const wallet = await Wallet.findOne({ owner: req.params.id || req.user.id });
    if (!wallet) {
        res.status(404);
        throw new Error("User has no wallet");
    }
    if (req.params.id)
        res.status(200).json({ walletID: wallet.id, owner: wallet.owner });
    else
        res.status(200).json({ walletID: wallet.id, name: wallet.name, balance: wallet.balance, owner: wallet.owner, createdAt: wallet.createdAt, updatedAt: wallet.updatedAt });
});

const topupWallet = asyncHandler(async (req, res) => {
    let wallet = await Wallet.findOne({ owner: req.user.id });
    if (!wallet) {
        res.status(400);
        throw new Error("User wallet not created yet");
    }
    let balance = Number.parseFloat(wallet.balance);
    balance += Number.parseFloat(req.body.amount);
    wallet = await Wallet.findByIdAndUpdate(wallet.id, { balance: balance.toFixed(2) }, { new: true });
    res.status(200).json({ walletID: wallet.id, name: wallet.name, balance: wallet.balance, owner: wallet.owner, createdAt: wallet.createdAt, updatedAt: wallet.updatedAt });
});

const updateWalletName = asyncHandler(async (req, res) => {
    const update = await Wallet.updateOne({ owner: req.user.id }, { name: req.body.name });
    if (update.modifiedCount === 1)
        res.status(200).json({ message: "Success! Wallet name updated" });
    else
        res.status(400).json({ message: "No wallet associated with this user" });
});

const updateWalletPin = asyncHandler(async (req, res) => {
    const { pin, newPin } = req.body;
    const wallet = await Wallet.findOne({ owner: req.user.id }).select("pin");
    if (!wallet) {
        res.status(400);
        throw new Error("No wallet associated with this user");
    }
    if (await bcryptjs.compare(pin, wallet.pin)) {
        const salt = await bcryptjs.genSalt(10);
        const newPinHash = await bcryptjs.hash(newPin, salt);
        const update = await Wallet.updateOne({ owner: req.user.id }, { pin: newPinHash });
        if (update.modifiedCount === 1)
            res.status(200).json({ message: "Success! Wallet pin updated" });
        else
            res.status(400).json({ message: "No wallet associated with this user" });
    }
    else
        res.status(400).json({ message: "Supplied pin is incorrect" });
});

module.exports = { createWallet, getWallet, topupWallet, updateWalletName, updateWalletPin };