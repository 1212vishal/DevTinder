const validator = require('validator');

const signUpValidation = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
        throw new Error("Email Id is Not Valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
};
const signInValidation = (req) => {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
        throw new Error("Email Id is Not Valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
};

const editValidation = (req) => {
    const ALLOWED_UPDATES = ["age", "skill", "gender", "about", "photoURL"];
    // console.log("I'm here");
    // console.log(req.body);
    const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));
    //console.log(isUpdateAllowed);
    return isUpdateAllowed;
};

module.exports = { signUpValidation, signInValidation, editValidation };