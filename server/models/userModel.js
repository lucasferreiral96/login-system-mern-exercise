const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const usermodel = mongoose.model("userData", userschema);

module.exports = usermodel;
