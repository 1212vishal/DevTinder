const express = require("express");
const app = express();
const { auth } = require("./middleware/auth");


app.get("/admin/userData", auth,

    (req, res, next) => {
        next();
        //res.send("User data has been sent");
    },
    (req, res) => {
        throw new console.error();

        //res.send("User data has been sent form 3");
    },
    (err, req, res, nex) => {
        if (err) {
            res.send("Error Please check it");
        }
    }
)
app.get("/admin/userLogin", auth, (req, res) => {
    res.send("User Login Successfully");
})

app.listen(3000);


