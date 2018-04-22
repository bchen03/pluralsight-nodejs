const express = require("express")
const router = express.Router()

// orders resource

// GET route
router.get("/", (req, res, next) => {
    res.status(200).json({
        messsage: "Handling GET request to /orders"
    })
})

// POST route
router.post("/", (req, res, next) => {
    const order = {
        quantity: req.body.quantity
    }

    res.status(201).json({
        messsage: "Handling POST request to /orders",
        created: order
    })
})

// GET /id
router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId
    if (/^\d+$/.test(id)) {
        res.status(200).json({
            message: `Handling GET request to /orders/${id}`
        })
    }
    else {
        res.status(400).json({
            message: `GET request to /orders/${id} returned error: orderId is not a number`
        })
    }
})

// DELETE route
router.delete("/", (req, res, next) => {
    res.status(200).json({
        messsage: "Handling DELETE request to /orders"
    })
})


module.exports = router