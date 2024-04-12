const User = require("../models/User")
const Profile = require("../models/Profile")

const profile_get = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")    
        if(user) {
            const profile = await Profile.findOne({ user_id: user._id })
            const languages = process.env.LANGUAGES
            const technologies = process.env.technologies
            let progress = 0
            if(profile.name !== undefined && profile.name !== "") {
                progress += 10                
            }
            if(profile.email !== undefined && profile.email !== "") {
                progress += 10                
            }
            if(profile.telephone !== undefined && profile.telephone !== "") {
                progress += 10                
            }
            if(profile.website !== undefined && profile.website !== "") {
                progress += 10                
            }
            if(profile.city !== undefined && profile.city !== "") {
                progress += 10
            }
            if(profile.education !== undefined && profile.education !== "") {
                progress += 10                
            }
            if(profile.languages !== undefined && profile.languages !== "") {
                progress += 10                
            }
            if(profile.technologies !== undefined && profile.technologies !== "") {
                progress += 10                
            }
            if(profile.experience !== undefined && profile.experience !== "") {
                progress += 10                
            }
            if(profile.extra !== undefined && profile.extra !== "") {
                progress += 10                
            }
            res.render("profile", { page: "Perfil", user, profile, languages, technologies, progress })
        }
    }
    catch(error) {
        console.log(error)
    }
}

const profile_post = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        if(user) {
            const { name, email, telephone, website, city, education, languages, technologies, experience, extra } = req.body
            const profile = await Profile.findOne({ user_id: user._id })
            profile.name = name
            profile.email = email
            profile.telephone = telephone
            profile.website = website
            profile.city = city
            profile.education = education
            profile.languages = languages.toString()
            profile.technologies = technologies.toString()
            profile.experience = experience
            profile.extra = extra
            const save = await profile.save()
            if(save) {
                res.status(201).json({ message: null })
            }
        }
    }
    catch(error) {
        console.log(error)
    }
    
}

module.exports = {
    profile_get,
    profile_post
}