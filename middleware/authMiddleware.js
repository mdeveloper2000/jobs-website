const jwt = require("jsonwebtoken")

const checkUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(token) {
            jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
                if(err) {
                    res.redirect("/login")
                }
                else {                
                    next()
                }
            })
        }
        else {
            res.redirect("/login")
        }
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    checkUser
}