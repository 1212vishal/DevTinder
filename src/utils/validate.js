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

module.exports = { signUpValidation, signInValidation };