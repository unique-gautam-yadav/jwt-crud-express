const mongoose = require("mongoose");

var s = mongoose.Schema({
    mail: String,
    password: String,
    displayName: String,
});

const model = mongoose.model('User', s)

module.exports = model
