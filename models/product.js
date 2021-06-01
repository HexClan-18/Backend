const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
    },
    images: {
      type: Object,
      required: true,
    },
    location: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
