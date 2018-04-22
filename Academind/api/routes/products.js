const express = require("express")
const router = express.Router()

// products resource

// GET route
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
})

// POST route
router.post("/", (req, res, next) => {

    console.log("products post body: " + JSON.stringify(req.body))

    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json({
        message: "Handling POST request to /products",
        created: product    // Should return url: /products/:productid 
    })
})

// GET /id
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId
    if (/^\d+$/.test(id)) {
        res.status(200).json({
            message: `Handling GET request to /products/${id}`
        })
    }
    else {
        res.status(400).json({
            message: `GET request to /products/${id} returned error: productId is not a number`
        })
    }
})

// PATCH route
router.patch("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling PATCH request to /products"
    })
})

// DELETE route
router.delete("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling DELETE request to /products"
    })
})


module.exports = router