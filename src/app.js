const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const { signUpValidation, signInValidation } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

// API TO FIND ONE USER
app.get("/user", async (req, res) => {
    //const emailId = req.body.emailId;
    //const user = await User.find({ emailId: emailId });

    try {
        const user = await User.find(req.body);
        // console.log(user);
        if (user.length === 0) {
            res.send("User Not found");
        }
        else {
            res.send(user);
        }
    }
    catch (err) {
        res.send("some error has been arised")
    }

})

//API TO FIND ALL USER
app.get("/feed", async (req, res) => {

    try {
        const user = await User.find({});
        // console.log(user);
        if (user.length === 0) {
            res.send("User Not found");
        }
        else {
            res.send(user);
        }
    }
    catch (err) {
        res.send("some error has been arised");
    }


})


//API FOR DELETE A USER
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete({ _id: userId });
        res.send("user Deleted Successfully");
    }
    catch (err) {
        res.send("some error has been arised");
    }
})

//API FOR UPDATE USER INFORMATION   
app.patch("/user/:userId", async (req, res) => {

    const userId = req.params?.userId;
    const data = req.body;


    try {
        const ALLOWED_UPDATES = ["age", "skill", "gender", "about", "photoURL"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        console.log(isUpdateAllowed);

        if (!isUpdateAllowed) {
            throw new Error("Updates not Allowed");
        }
        if (data.skill?.length() > 10) {
            throw new Error("Skill size greater than 10 not allowed");
        }
        const beforeUpdate = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true, });
        //  console.log(beforeUpdate);

        res.send("Update successfully");
    }
    catch (err) {
        res.send(err.message);
    }
})

//API TO SIGNUP
app.post("/signup", async (req, res) => {
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

// API FOR LOGIN
app.post("/login", async (req, res) => {

    try {
        signInValidation(req);
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("emailId is not valid");
        }
        const isPassWordValid = await bcrypt.compare(password, user.password);
        if (isPassWordValid) {
            token = jwt.sign({ _id: user._id }, "secretkeyappearshere");
            res.cookie("token", token);
            console.log("token send");
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

app.get("/profile", async (req, res) => {
    try {
        const { token } = req.cookies;
        //console.log(token);
        if (!token) {
            throw new Error("token is not valid");
        }
        const decodedToken = await jwt.verify(token, "secretkeyappearshere");
        //console.log(decodedToken);
        const user = await User.find({ _id: token._id });
        res.send(user);
    }
    catch (err) {
        res.send(err.message);
    }
})


connectDb()
    .then(() => {
        console.log("DataBase connect successfully");
        app.listen(3000, () => {
            console.log("Server is started");
        });
    })
    .catch((err) => {
        console.error("Database connot be connected");
    })





