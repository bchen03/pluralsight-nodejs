const express = require("express")
const router = express.Router()

const Authorization = require("../middleware/auth")
const ProductsController = require("../controllers/products")

// products endpoints
router.get("/", ProductsController.getProducts)
router.post("/", Authorization.checkAuthIsAdmin, ProductsController.createProduct)
router.get("/:productId", ProductsController.getProductById)
router.patch("/", Authorization.checkAuthIsAdmin, ProductsController.updateProduct)
router.delete("/", Authorization.checkAuthIsAdmin, ProductsController.deleteProduct)

module.exports = router