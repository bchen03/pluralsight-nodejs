const mongoose = require("mongoose")
const Product = require("../models/product")

const getProducts = (req, res, next) => {
    Product
        .find()
        .exec()
        .then(products => {
            res.status(200).json({
                message: "Products retrieved successfully",
                products: products
            })
        })
        .catch(err => {
            console.log("product get error: " + err.toString())
            res.status(400).json({
                message: err.toString()
            })
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
            res.status(201).json({
                message: "Product added successfully",
                created: product    // Should return url: /products/:productid 
            })
        })
        .catch(err => {
            console.log("product save error: " + err.toString())
            res.status(400).json({
                message: err.toString()
            })
        })
}

const getProductById = (req, res, next) => {
    const id = req.params.productId
//    if (/^\d+$/.test(id)) {
        Product
            .findById(id)
            .exec()
            .then(product => {
                res.status(200).json({
                    message: `GET request for /products/${id} successful`,
                    product: product
                })
        
            })
            .catch(err => {
                console.log("product get by id error: " + err.toString())
                res.status(400).json({
                    message: err.toString()
                })
            })
    // }
    // else {
    //     res.status(400).json({
    //         message: `GET request to /products/${id} returned error: productId is not a number`
    //     })
    // }
}

const updateProduct = (req, res, next) => {
    const id = req.params.productId

    const updateObj = { ...req.body }

    console.log("updateProduct: " + JSON.stringify(updateObj))

    Product
        .update({ _id: id }, { $set: updateObj })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "PATCH request to /products succcessful",
                result: result
            })
        })
        .catch(err => {
            console.log("product update by id error: " + err.toString())
            res.status(400).json({
                message: err.toString()
            })
        })

}

const deleteProduct = (req, res, next) => {
    const id = req.params.productId
    Product
        .remove({ _id: id })
        .exec()
        .then(product => {
            res.status(200).json({
                message: "DELETE request to /products succcessful",
                product: product
            })
        })
        .catch(err => {
            console.log("product delete by id error: " + err.toString())
            res.status(400).json({
                message: err.toString()
            })
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

