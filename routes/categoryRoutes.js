const express = require("express")
const asyncHandler = require("../utils/asyncHandler")
const categoryController = require("../controllers/categoryController")

const router = express.Router()

router
  .route("/")
  .get(asyncHandler(categoryController.getCategories))
  .post(asyncHandler(categoryController.createCategory))

router
  .route("/:id")
  .get(asyncHandler(categoryController.getCategory))
  .patch(asyncHandler(categoryController.updateCategory))
  .delete(asyncHandler(categoryController.deleteCategory))

module.exports = router
