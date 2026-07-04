const express = require("express")
const asyncHandler = require("../middleware/asyncHandler")
const cartController = require("../controllers/cartController")

const router = express.Router()

router
  .route("/")
  .get(asyncHandler(cartController.getCart))
  .post(asyncHandler(cartController.addItem))
  .delete(asyncHandler(cartController.clearCart))

router
  .route("/:productId")
  .patch(asyncHandler(cartController.updateItem))
  .delete(asyncHandler(cartController.deleteItem))

module.exports = router
