const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());

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
app.patch("/user", async (req, res) => {

    const userId = req.body.userId;
    const data = req.body;


    try {
        const beforeUpdate = await User.findByIdAndUpdate({ _id: userId }, data);

        res.send(beforeUpdate);
    }
    catch (err) {
        res.send("some error has been arised");
    }
})

//API TO SIGNUP
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User signup successfully");
    }
    catch (err) {
        res.status(400).send("User not signup successfully");
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





