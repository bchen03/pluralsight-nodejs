const express = require("express")
const router = express.Router()

const Authorization = require("../middleware/auth")
const AuthController = require("../controllers/auth")

// auth endpoints
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.get("/users", Authorization.checkAuth, AuthController.getUsers)


module.exports = router