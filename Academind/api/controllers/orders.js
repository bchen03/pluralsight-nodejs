const getOrders = (req, res, next) => {
    console.log("req.user: " + JSON.stringify(req.user))

    res.status(200).json({
        messsage: "Handling GET request to /orders"
    })
}

const createOrder = (req, res, next) => {
    const order = {
        quantity: req.body.quantity
    }

    res.status(201).json({
        messsage: "Handling POST request to /orders",
        created: order
    })
}

const getOrderById = (req, res, next) => {
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
}

 const deleteOrder = (req, res, next) => {
    res.status(200).json({
        messsage: "Handling DELETE request to /orders"
    })
}

module.exports = { 
    getOrders,
    createOrder,
    getOrderById,
    deleteOrder
}
