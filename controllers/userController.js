const User = require("../models/User")
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login_get = async (req, res) => {
    try {
        res.render("login", { page: "Login", user: null })
    }
    catch(error) {
        console.log(error)
    }
}

const login_post = async (req, res) => {
    try {
        const { email, password } = req.body    
        const user = await User.findOne({ email })
        if(user) {
            const auth = await bcrypt.compare(password, user.password)
            if(auth) {
                const id = user._id
                const token = jwt.sign({ id }, process.env.TOKEN, {
                    expiresIn: "1d"
                })
                res.cookie("_id", id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
                res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
                res.status(200).json({ message: null })
            }
            else {
                res.status(500).json({ message: "Erro ao fazer login" })
            }
        } 
        else {
            res.status(500).json({ message: "Erro ao fazer login" })
        }
    }
    catch(error) {
        console.log(error)
    }    
}

const register_get = async (req, res) => {
    try {
        res.render("register", { page: "Registro", user: null })
    }
    catch(error) {
        console.log(error)
    }
}

const register_post = async (req, res) => {    
    try {
        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const exists = await User.findOne({ email })
        if(!exists) {
            const user = await User.create({ name, email, password: hash })
            if(user) {
                const profile = await Profile.create({ name, user_id: user._id })
                res.status(201).json({ message: null })
            } 
            else {
                res.status(500).json({ message: "Erro ao tentar registrar usuário" })
            }
        }
        else {
            res.status(500).json({ message: "E-mail já registrado" })
        }
    }
    catch(error) {
        console.log(error)
    }
}

const profile_get = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        res.render("profile", { page: "Perfil", user })
    }
    catch(error) {
        console.log(error)
    }
}

const logout_get = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.cookie("_id", "", { maxAge: 1 })
        res.redirect("/")
    }
    catch(error) {
        console.log(error)
    }
}

const not_found = async (req, res) => {
    try {
        const id = req.cookies._id
        const user = await User.findById(id, "-password")
        res.render("404", { page: "404", user })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    profile_get,
    logout_get,
    not_found
}