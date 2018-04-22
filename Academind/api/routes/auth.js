const express = require("express")
const router = express.Router()

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


// register
router.post("/register", (req, res, next) => {
    if (!req.body.username || req.body.username.length === 0 ||
        !req.body.password || req.body.password.length === 0) {
        return res.status(401).json({ error: "(1) Not Authorized" })
    }

    if (users.find(ele => {
        return ele.username.toLowerCase() === req.body.username.toLowerCase() 
    })) {
        return res.status(401).json({ error: "(2) Not Authorized" })
    }

    bcrypt
        .hash(req.body.password, SALT_ROUNDS)
        .then(hash => {
            const user = new User(req.body.username, req.body.password, hash, false)
            console.log("(1) Registered User: " + JSON.stringify(user))
            users.push(user)

            res.status(200).json({
                message: "register successful",
                user: user 
            })
        })
        .catch(err => {
            return res.status(401).json({ error: err.toString() })
        })
})

// login
router.post("/login", (req, res, next) => {
    if (!req.body.username || req.body.username.length === 0 ||
        !req.body.password || req.body.password.length === 0) {
        return res.status(401).json({ error: "(1) Not Authorized" })
    }

    const user = (users.find(ele => {
        return ele.username.toLowerCase() === req.body.username.toLowerCase() 
    })) 
    
    if (!user) {
        return res.status(401).json({ error: "(2) Not Authorized" })
    }

    bcrypt
        .compare(req.body.password, user.hash)
        .then(result => {
            if (!result) {
                return res.status(401).json({ error: "(3) Not Authorized" })
            }
            
            const token = jwt.sign({
                user: user
            }, 
            process.env.JWT_SECRET,
            { 
                expiresIn: '1h' 
            });

            user.token = token

            res.status(200).json({
                message: "login successful",
                user: user 
            })
        })
        .catch(err => {
            return res.status(401).json({ error: err.toString() })
        })
})

// GET users
router.get("/users", (req, res, next) => {
    res.status(200).json({
        users: users
    })
})


module.exports = router