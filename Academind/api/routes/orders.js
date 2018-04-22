const express = require("express")
const router = express.Router()

const Authorization = require("../middleware/auth")
const OrdersController = require("../controllers/orders")

// orders endpoints
router.get("/", Authorization.checkAuth, OrdersController.getOrders)
router.post("/", Authorization.checkAuth, OrdersController.createOrder)
router.get("/:orderId", Authorization.checkAuth, OrdersController.getOrderById)
router.delete("/", Authorization.checkAuth, OrdersController.deleteOrder)

module.exports = router