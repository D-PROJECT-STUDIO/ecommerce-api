require("dotenv").config()

const express = require("express")
const mongoSanitize = require("express-mongo-sanitize")
const connectDB = require("./db/connectDB")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const AppError = require("./utils/AppError")
const errorHandler = require("./middleware/errorHandler")

const app = express()

app.use(express.json())
app.use(mongoSanitize())

app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.all("*", (req, res, next) => {
  next(new AppError("Route not found", 404))
})

app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
