const express = require("express");
const profileRoutes = express.Router();
const { userAuth } = require("../middleware/auth");

profileRoutes.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = profileRoutes;