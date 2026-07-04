require("dotenv").config()

const mongoose = require("mongoose")
const connectDB = require("./db/connectDB")
const Category = require("./models/Category")
const Product = require("./models/Product")
const Order = require("./models/Order")
const Cart = require("./models/Cart")

const seedDatabase = async () => {
  let categoryCount = 0
  let productCount = 0

  try {
    await connectDB()

    await Order.deleteMany()
    await Cart.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()

    const categories = await Category.insertMany([
      { name: "Phones", description: "Mobile phones", slug: "phones" },
      { name: "Laptops", description: "Laptop computers", slug: "laptops" },
      { name: "Clothes", description: "Men and women clothes", slug: "clothes" }
    ])

    const products = await Product.insertMany([
      { name: "Samsung Phone", description: "Android phone", price: 500, stock: 8, category: categories[0]._id, images: ["samsung.jpg"], inStock: true },
      { name: "iPhone", description: "Apple phone", price: 900, stock: 4, category: categories[0]._id, images: ["iphone.jpg"], inStock: true },
      { name: "Dell Laptop", description: "Laptop for studying", price: 700, stock: 5, category: categories[1]._id, images: ["dell.jpg"], inStock: true },
      { name: "HP Laptop", description: "Laptop for work", price: 650, stock: 3, category: categories[1]._id, images: ["hp.jpg"], inStock: true },
      { name: "Black Shirt", description: "Cotton shirt", price: 25, stock: 10, category: categories[2]._id, images: ["shirt.jpg"], inStock: true },
      { name: "Blue Jeans", description: "Regular jeans", price: 40, stock: 0, category: categories[2]._id, images: ["jeans.jpg"], inStock: false }
    ])

    categoryCount = categories.length
    productCount = products.length
  } catch (error) {
    console.log(error.message)
  } finally {
    await mongoose.disconnect()
    console.log(`Added ${categoryCount} categories and ${productCount} products`)
  }
}

seedDatabase()
