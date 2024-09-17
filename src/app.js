const express = require("express");

const app = express();



app.use("/hello", (req, res) => {
    res.send("Hello World");
})


app.use("/test", (req, res) => {
    res.send("Hello World test");
})
app.use("/", (req, res) => {
    res.send("vishal Kumar");
})

app.listen(3000);


