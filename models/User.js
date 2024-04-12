const mongoose = require("mongoose")

const User = new mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 60
    }
}))

module.exports = User