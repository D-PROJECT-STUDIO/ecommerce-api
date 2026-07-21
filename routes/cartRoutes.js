const express = require("express")
const asyncHandler = require("../utils/asyncHandler")
const cartController = require("../controllers/cartController")

const router = express.Router()

router
  .route("/")
  .get(asyncHandler(cartController.getCart))
  .delete(asyncHandler(cartController.clearCart))

router
  .route("/items")
  .post(asyncHandler(cartController.addItem))

router
  .route("/items/:productId")
  .patch(asyncHandler(cartController.updateItem))
  .delete(asyncHandler(cartController.deleteItem))

module.exports = router
