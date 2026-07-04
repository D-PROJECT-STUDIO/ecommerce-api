const Product = require("../models/Product")
const Category = require("../models/Category")
const AppError = require("../utils/AppError")

const getProducts = async (req, res) => {
  const filter = {}

  if (req.query.category) {
    filter.category = req.query.category
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {}

    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice)
    }

    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice)
    }
  }

  if (req.query.inStock === "true") {
    filter.inStock = true
  }

  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } }
    ]
  }

  const products = await Product.find(filter)

  res.status(200).json({
    status: "success",
    message: "Products found",
    data: products
  })
}

const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name description"
  )

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product found",
    data: product
  })
}

const createProduct = async (req, res, next) => {
  const category = await Category.findById(req.body.category)

  if (!category) {
    return next(new AppError("Category not found", 404))
  }

  const product = await Product.create(req.body)

  res.status(201).json({
    status: "success",
    message: "Product created",
    data: product
  })
}

const updateProduct = async (req, res, next) => {
  if (req.body.category) {
    const category = await Category.findById(req.body.category)

    if (!category) {
      return next(new AppError("Category not found", 404))
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product updated",
    data: product
  })
}

const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted",
    data: null
  })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
