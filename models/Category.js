const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Category description is required"]
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)
