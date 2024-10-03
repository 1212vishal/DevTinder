const express = require("express");
const authRoutes = express.Router();
const { signUpValidation, signInValidation } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");



authRoutes.post("/signup", async (req, res) => {
    //validate the data
    try {
        signUpValidation(req);

        const { firstName, lastName, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword;
        // console.log(hashPassword);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword,
        });

        await user.save();
        res.send("User signup successfully");
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

authRoutes.post("/login", async (req, res) => {

    try {
        signInValidation(req);
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("emailId is not valid");
        }
        const isPassWordValid = await user.validatePassword(password);
        if (isPassWordValid) {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("User login successfully");
        }
        else {
            throw new Error("password is not valid");
        }

    }
    catch (err) {
        res.send(err.message);
    }

})

authRoutes.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successfully");
})

module.exports = authRoutes;