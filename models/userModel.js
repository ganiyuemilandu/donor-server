const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        first: { type: String, required: [true, "First name is required"] },
        last: { type: String, required: [true, "Last name is required"] },
        email: { type: String, unique: true, required: [true, "Email address is required"] },
        password: { type: String, select: false, required: [true, "Provide a hashed password"] },
    }
);

userSchema.virtual("name").get(function() { return `${this.first} ${this.last}`});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;