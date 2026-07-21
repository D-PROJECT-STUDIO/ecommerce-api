const express = require("express")
const asyncHandler = require("../utils/asyncHandler")
const productController = require("../controllers/productController")

const router = express.Router()

router
  .route("/")
  .get(asyncHandler(productController.getProducts))
  .post(asyncHandler(productController.createProduct))

router
  .route("/:id")
  .get(asyncHandler(productController.getProduct))
  .patch(asyncHandler(productController.updateProduct))
  .delete(asyncHandler(productController.deleteProduct))

module.exports = router
