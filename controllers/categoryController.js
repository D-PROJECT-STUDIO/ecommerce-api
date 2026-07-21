const Category = require("../models/category.model")
const AppError = require("../utils/AppError")

const getCategories = async (req, res) => {
  const categories = await Category.find()

  res.status(200).json({
    status: "success",
    message: "Categories found",
    data: categories
  })
}

const getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(new AppError("Category not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Category found",
    data: category
  })
}

const createCategory = async (req, res) => {
  const category = await Category.create(req.body)

  res.status(201).json({
    status: "success",
    message: "Category created",
    data: category
  })
}

const updateCategory = async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = req.body.name.trim().toLowerCase().replace(/\s+/g, "-")
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!category) {
    return next(new AppError("Category not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Category updated",
    data: category
  })
}

const deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id)

  if (!category) {
    return next(new AppError("Category not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted",
    data: null
  })
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
