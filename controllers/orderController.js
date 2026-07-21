const Order = require("../models/order.model")
const Cart = require("../models/cart.model")
const AppError = require("../utils/AppError")

const createOrder = async (req, res, next) => {
  if (!req.body.shippingAddress) {
    return next(new AppError("Shipping address is required", 400))
  }

  const cart = await Cart.findOne().populate("items.product")

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400))
  }

  for (const item of cart.items) {
    if (!item.product) {
      return next(new AppError("A product in the cart no longer exists", 404))
    }

    if (!item.product.inStock || item.product.stock < item.quantity) {
      return next(
        new AppError(
          `Not enough stock for ${item.product.name}. Available stock: ${item.product.stock}`,
          400
        )
      )
    }
  }

  const items = cart.items.map((item) => {
    return {
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }
  })

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  for (const item of cart.items) {
    item.product.stock -= item.quantity
    await item.product.save()
  }

  const order = await Order.create({
    items,
    totalPrice,
    shippingAddress: req.body.shippingAddress
  })

  cart.items = []
  cart.totalPrice = 0
  await cart.save()

  res.status(201).json({
    status: "success",
    message: "Order created",
    data: order
  })
}

const getOrders = async (req, res) => {
  const orders = await Order.find()

  res.status(200).json({
    status: "success",
    message: "Orders found",
    data: orders
  })
}

const getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new AppError("Order not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Order found",
    data: order
  })
}

const updateOrderStatus = async (req, res, next) => {
  const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

  if (!statuses.includes(req.body.status)) {
    return next(new AppError("Invalid order status", 400))
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  )

  if (!order) {
    return next(new AppError("Order not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Order status updated",
    data: order
  })
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
}
