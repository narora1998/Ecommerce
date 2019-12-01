const mongoose = require("mongoose");
const reviews = require("./reviewModel");
const admins = require("./adminModels");

const productSchema = mongoose.Schema({
  productId: {
    type: String,
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
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  qtyAvailable: {
    type: Number,
    required: true
  },
  qtySold: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    required: false
  },
  adminId: {
    type: String,
    required: true
  },
  productSeller: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
      }
    ]
  }
  review: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review"
      }
    ]
  }
});

module.exports = mongoose.model("product", productSchema);
