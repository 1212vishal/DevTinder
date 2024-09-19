const mongoose = require('mongoose');



const connectDb = async () => {
    await mongoose.connect("mongodb+srv://vk1047920:OI4QoXCGEWXRbCY5@cluster0.exfoo.mongodb.net/devTinder");
}



module.exports = { connectDb };