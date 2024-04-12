const mongoose = require("mongoose")

const Profile = new mongoose.model("Profile", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        maxlength: 50
    },
    telephone: {
        type: String,
        maxlength: 20
    },
    website: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 30
    },
    education: {
        type: String,
        enum: ["Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Especialização", "Mestrado", "Doutorado"]
    },
    languages: {
        type: String,
        maxlength: 50
    },
    technologies: {
        type: String,
        maxlength: 50
    },
    experience: {
        type: String,
        maxlength: 300
    },
    extra: {
        type: String,
        maxlength: 300,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}))

module.exports = Profile