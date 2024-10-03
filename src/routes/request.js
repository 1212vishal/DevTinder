const express = require("express");
const requestRoutes = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");


requestRoutes.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {

        const fromUserId = req.user._id;
        const toUserId = req?.params?.toUserId;
        const status = req?.params?.status;

        //CHECK FOR STATUS
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Status is not allowed");
        }


        //CHECK TO USERID PRESENT IN DATABASE OR NOT
        const isToUserIdPresent = await User.findById(toUserId);
        if (!isToUserIdPresent) {
            throw new Error("toUserId is not present in database");
        }

        //CHECK FOR DUPLICACY
        const isAlreadyRequestSend = await ConnectionRequest.findOne({
            $or: [{ fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }]
        })
        if (isAlreadyRequestSend) {
            throw new Error("Request is already send");
        }


        const newRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });


        const data = await newRequest.save();
        res.json({
            message: req.user.firstName + " " + status + " " + isToUserIdPresent.firstName
        });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});


module.exports = requestRoutes;