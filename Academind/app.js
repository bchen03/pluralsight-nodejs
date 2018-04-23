const express = require("express")
const app = express()

const logger = require("morgan")    // Shows logging in console
const bodyParser = require("body-parser")

const mongoose = require("mongoose")

const authRoutes = require("./api/routes/auth")
const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")

// Mongo DB
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PWD}@bennycluster-stn3j.mongodb.net/test`, (err) => {
    if (err) {
        console.log("mongo error: " + err.toString())
    }
    else {
        console.log("mongo connected, ready for use...")
    }
})

// First attempt to make sure it works
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "It works"
//     })
// })

// logging
app.use(logger("dev"))

// Body parser for urlencoded/json data in body
app.use(bodyParser.urlencoded({extended: false}))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())                          // parse application/json

// CORS support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
        return res.status(200).json({})
    }

    next()
})

// Route mappings
app.use("/", authRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

// if no route handles the request, then fall through to here
app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

// Error handler 
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app