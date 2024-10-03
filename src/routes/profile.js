const express = require("express");
const profileRoutes = express.Router();
const { userAuth } = require("../middleware/auth");
const { editValidation } = require("../utils/validate");

profileRoutes.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        res.send(user);
    }
    catch (err) {
        res.send(err.message);
    }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        const isValidationRight = editValidation(req);
        if (!isValidationRight) {
            throw new Error("Unauthorized validation");
        }
        const loggedInUser = req.user;
        //console.log(loggedInUser);
        Object.keys(req.body).every((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        // console.log(loggedInUser);
        const { firstName } = loggedInUser;

        res.json({
            message: firstName + "  Profile updated",
            data: loggedInUser
        });
    }
    catch (err) {
        res.send(err.message);
    }

})


module.exports = profileRoutes;