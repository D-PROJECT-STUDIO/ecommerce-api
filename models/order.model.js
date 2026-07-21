const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${Date.now()}`
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    shippingAddress: {
      street: {
        type: String,
        required: [true, "Street is required"]
      },
      city: {
        type: String,
        required: [true, "City is required"]
      },
      country: {
        type: String,
        required: [true, "Country is required"]
      }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)
