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
      trim: true
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true
    }
  },
  { timestamps: true }
)

categorySchema.pre("validate", function () {
  if (this.isModified("name")) {
    this.slug = this.name.trim().toLowerCase().replace(/\s+/g, "-")
  }
})

module.exports = mongoose.model("Category", categorySchema)
