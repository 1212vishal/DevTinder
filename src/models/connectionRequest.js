const mongoose = require('mongoose');
const validator = require('validator');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["interested", "ignored", "rejected", "accepted"],
            message: `{value} is incorrect status type`
        },
        required: true,

    },
},
    {
        timestamps: true,
    }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
    const connectionData = this;
    if (connectionData.fromUserId.equals(connectionData.toUserId)) {
        throw new Error("You can't send request to yourself");
    }
    next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);