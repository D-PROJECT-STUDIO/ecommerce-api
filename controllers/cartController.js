const Cart = require("../models/Cart")
const Product = require("../models/Product")
const AppError = require("../utils/AppError")

const calculateTotal = (cart) => {
  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
}

const getCart = async (req, res) => {
  let cart = await Cart.findOne().populate("items.product", "name stock inStock")

  if (!cart) {
    cart = await Cart.create({ items: [] })
  }

  res.status(200).json({
    status: "success",
    message: "Cart found",
    data: cart
  })
}

const addItem = async (req, res, next) => {
  const quantity = Number(req.body.quantity || 1)
  const product = await Product.findById(req.body.product)

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  if (quantity < 1) {
    return next(new AppError("Quantity must be at least 1", 400))
  }

  let cart = await Cart.findOne()

  if (!cart) {
    cart = new Cart({ items: [] })
  }

  const item = cart.items.find((cartItem) => {
    return cartItem.product.toString() === product._id.toString()
  })

  const wantedQuantity = item ? item.quantity + quantity : quantity

  if (!product.inStock || product.stock < wantedQuantity) {
    return next(new AppError("Not enough product stock", 400))
  }

  if (item) {
    item.quantity = wantedQuantity
    item.price = product.price
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price
    })
  }

  calculateTotal(cart)
  await cart.save()

  res.status(201).json({
    status: "success",
    message: "Item added to cart",
    data: cart
  })
}

const updateItem = async (req, res, next) => {
  const quantity = Number(req.body.quantity)
  const cart = await Cart.findOne()

  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  const item = cart.items.find((cartItem) => {
    return cartItem.product.toString() === req.params.productId
  })

  if (!item) {
    return next(new AppError("Item not found in cart", 404))
  }

  if (quantity < 1) {
    return next(new AppError("Quantity must be at least 1", 400))
  }

  const product = await Product.findById(item.product)

  if (!product || !product.inStock || product.stock < quantity) {
    return next(new AppError("Not enough product stock", 400))
  }

  item.quantity = quantity
  item.price = product.price
  calculateTotal(cart)
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Cart item updated",
    data: cart
  })
}

const deleteItem = async (req, res, next) => {
  const cart = await Cart.findOne()

  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  const itemExists = cart.items.some((item) => {
    return item.product.toString() === req.params.productId
  })

  if (!itemExists) {
    return next(new AppError("Item not found in cart", 404))
  }

  cart.items = cart.items.filter((item) => {
    return item.product.toString() !== req.params.productId
  })

  calculateTotal(cart)
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    data: cart
  })
}

const clearCart = async (req, res) => {
  let cart = await Cart.findOne()

  if (!cart) {
    cart = new Cart({ items: [] })
  }

  cart.items = []
  cart.totalPrice = 0
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Cart cleared",
    data: cart
  })
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem,
  clearCart
}
