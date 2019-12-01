const mongoose = require("mongoose");
const reviews = require("../models/reviewModel");

const productSchema = mongoose.Schema({
  pid: {
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
  likes: {
    type: Number,
    required: false
  },
  qtySold: {
    type: Number,
    required: true
  },
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
