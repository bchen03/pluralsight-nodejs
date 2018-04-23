const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

const SALT_ROUNDS = 10

let users = []


// The hashes will be different since a salt is used to create unique tokens
// You can use bcrypt.compare() to see if the original value is equal to salted token
function hashIt(key) {
    return bcrypt.hashSync(key, SALT_ROUNDS);
}

console.log("(1) HASH: " + hashIt("password"))
console.log("(2) HASH: " + hashIt("password"))


const register = (req, res, next) => {
    if (!req.body.username || req.body.username.length === 0) {
        return res.status(400).json({ message: "Invalid request" })
    }

    if (!req.body.password || req.body.password.length === 0) {
        return res.status(400).json({ message: "Invalid request" })
    }

    if (users.find(ele => {
        return ele.username.toLowerCase() === req.body.username.toLowerCase() 
    })) {
        return res.status(400).json({ message: "Invalid request" })
    }

    bcrypt
        .hash(req.body.password, SALT_ROUNDS)
        .then(hash => {
            const isadmin = req.body.isadmin && req.body.isadmin.toLowerCase() === "true" ? true : false
            const user = new User(req.body.username, req.body.password, hash, isadmin)
            console.log("Registered User: " + JSON.stringify(user))
            users.push(user)

            res.status(200).json({
                message: "register successful",
                user: user      // TODO: Just for testing
            })
        })
        .catch(err => {
            return res.status(400).json({ message: err.toString() })
        })
}

const login = (req, res, next) => {
    if (!req.body.username || req.body.username.length === 0) {
        return res.status(400).json({ message: "Invalid request" })
    }

    if (!req.body.password || req.body.password.length === 0) {
        return res.status(400).json({ message: "Invalid request" })
    }

    const user = (users.find(ele => {
        return ele.username.toLowerCase() === req.body.username.toLowerCase() 
    })) 
    
    if (!user) {
        return res.status(400).json({ message: "Invalid request" })
    }

    bcrypt
        .compare(req.body.password, user.hash)
        .then(result => {
            if (!result) {
                return res.status(400).json({ message: "Invalid request" })
            }
            
            const token = jwt.sign({
                user: user      // TODO: For testing only
            }, 
            process.env.JWT_SECRET,
            { 
                expiresIn: '1h' 
            });

            console.log("Login user: " + JSON.stringify(user))

            res.status(200).json({
                message: "login successful",
                user: user,
                token: token
            })
        })
        .catch(err => {
            return res.status(400).json({ message: err.toString() })
        })
}

const getUsers = (req, res, next) => {
    res.status(200).json({
        users: users
    })
}

module.exports = {
    register,
    login,
    getUsers
}