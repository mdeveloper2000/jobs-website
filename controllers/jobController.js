const Job = require("../models/Job")
const User = require("../models/User")
const Subscription = require("../models/Subscription")

const index_get = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")    
        const jobs = await Job.find({}).sort({ date: -1 }).limit(20)
        res.render("index", { page: "Início", jobs, user })
    }
    catch(error) {
        console.log(error)
    }
}

const jobs_list = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        const jobs = await Job.find({}).sort({ date: -1 }).limit(20)    
        res.render("jobs", { page: "Vagas", jobs, user })
    }
    catch(error) {
        console.log(error)
    }
}

const job_search = async (req, res) => {
    try {
        const search = req.params.search    
        const jobs = await Job.find({ tags: new RegExp(search, "i") }).limit(20)
        res.status(200).json({ jobs })
    }
    catch(error) {
        console.log(error)
    }
}

const job_show = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        const job = await Job.findOne({ _id: req.params.id })
        const subscription = await Subscription.findOne({ user_id: user._id, job_id: job._id })
        let subscribed = false
        if(subscription) {
            subscribed = true
        }
        const registered = await Subscription.countDocuments({ job_id: job._id })        
        res.render("job", { page: "Vaga", user, job, subscribed, registered })
    }
    catch(error) {        
        console.log(error)
    }
}

const subscribe_job = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        if(user) {
            const job_id = req.body.job_id
            const job = await Job.findOne({ _id: job_id })
            if(job) {
                const subscription = await Subscription.findOne({ user_id: user._id, job_id: job._id })
                if(!subscription) {
                    const newSubscription = await Subscription.create({ user_id: user._id, job_id })
                    if(newSubscription) {                
                        res.status(200).json({ message: null })
                    }
                }
                else {
                    const deleted = await Subscription.deleteOne({ _id: subscription._id })
                    if(deleted) {
                        res.status(200).json({ message: null })
                    }
                }
            }
        }
    }
    catch(error) {
        console.log(error)
    }
}

const subscriptions_list = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        const subscriptions = await Subscription.find({ user_id: user._id }).populate("job_id")
        res.render("subscriptions", { page: "Inscrições", user, subscriptions })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    index_get,
    jobs_list,
    job_search,
    job_show,
    subscribe_job,
    subscriptions_list
}