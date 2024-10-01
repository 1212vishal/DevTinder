const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("token is not valid");
        }
        const decodedToken = await jwt.verify(token, "secretkeyappearshere");

        const { _id } = decodedToken;
        const user = await User.findById(_id);
        req.user = user;
        next();
    }
    catch (err) {
        res.send(err.message);
    }
};

module.exports = { userAuth };