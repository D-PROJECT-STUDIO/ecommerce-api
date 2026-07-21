const express = require("express")
const asyncHandler = require("../utils/asyncHandler")
const orderController = require("../controllers/orderController")

const router = express.Router()

router
  .route("/")
  .get(asyncHandler(orderController.getOrders))
  .post(asyncHandler(orderController.createOrder))

router.get("/:id", asyncHandler(orderController.getOrder))
router.patch("/:id/status", asyncHandler(orderController.updateOrderStatus))

module.exports = router
