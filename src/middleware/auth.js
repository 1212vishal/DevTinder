
const auth = (req, res, next) => {
    //console.log("I,m come back")
    const token = "1234";
    const flag = token === "1234";
    if (flag) {
        next();
    }
    else {
        res.status(404).send("Not Authorised");
    }
};

module.exports = { auth };