const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());


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





