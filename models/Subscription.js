const mongoose = require("mongoose")

const Subscription = new mongoose.model("Subscription", new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    }
}))

module.exports = Subscription