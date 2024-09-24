const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Id Is not valid");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender is not valid");

            }
        },
    },
    skill: {
        type: [String],
    },
    about: {
        type: String,
        default: "This user about default",
    },
    photoURL: {
        type: String,
        default: "https://icon-library.com/images/admin-icon/admin-icon-12.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("URL Is not valid");
            }
        }
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);