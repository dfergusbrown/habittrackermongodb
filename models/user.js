const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
    username: String,
    password: String,
    habits: {}
});


User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)