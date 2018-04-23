const mongoose = require("mongoose")
const Product = require("../models/product")

const getProducts = (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
}

const createProduct = (req, res, next) => {
    console.log("products post body: " + JSON.stringify(req.body))

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
        .save()
        .then(result => {
            console.log("product save result: " + JSON.stringify(result))
        })
        .catch(err => {
            console.log("product save error: " + err.toString())
        })

    res.status(201).json({
        message: "Handling POST request to /products",
        created: product    // Should return url: /products/:productid 
    })
}

const getProductById = (req, res, next) => {
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
}

const updateProduct = (req, res, next) => {
    res.status(200).json({
        message: "Handling PATCH request to /products"
    })
}

const deleteProduct = (req, res, next) => {
    res.status(200).json({
        message: "Handling DELETE request to /products"
    })
}

// You can also define and export the functions like: 
//
//      module.exports.getProducts = (req, res, next) => {}
//
// But I prefer this:
module.exports = {
    getProducts,
    createProduct,    
    getProductById,
    updateProduct,
    deleteProduct
}

