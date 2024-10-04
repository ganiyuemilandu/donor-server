const express = require("express");
const config = require("dotenv").config();
const connect = require("./util/mongoClient").connect();
const app = express();

// Middleware to handle json requests
app.use(express.json());
// Middleware to handle URL encoded form submissions
app.use(express.urlencoded({ extended: false }));

/**
 * Define API roots and routers
 * for various endpoints.
 */
app.use("/api/users", require("./routers/userRouter"));
app.use("/api/wallets", require("./routers/walletRouter"));
app.use("/api/donations", require("./routers/donationRouter"));

/**
 * Handle any undefined routes.
 */
app.use("*", (req, res) => {
    res.status(404);
    throw new Error("Invalid URL");
});

/**
 * Bind to an error handler
 * to handle any thrown errors.
 */
app.use(require("./middleware/errorMiddleware"));

/**
 * Connect to a port.
 */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));