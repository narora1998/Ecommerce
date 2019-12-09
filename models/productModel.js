const mongoose = require("mongoose");
const reviews = require("../models/reviewModel");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: true
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
  likes: {
    type: Number,
    required: false
  },
  qtySold: {
    type: Number,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  reviewList: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ]
  }
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", productSchema);
