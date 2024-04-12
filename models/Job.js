const mongoose = require("mongoose")

const Job = new mongoose.model("Job", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 25
    },
    company: {
        type: String,
        required: true,
        maxlength: 25
    },
    model: {
        type: String,
        required: true,
        enum: ["Presencial", "Remoto", "Híbrido"]        
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    tags: {
        type: String,
        required: true,
        maxlength: 50
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}))

module.exports = Job