const mongoose = require("mongoose");
const products = require("./productModel");

const orderSchema = mongoose.Schema({
  purchasedBy: {
    type: String,
    required: true
  },
  purchasedOn: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tranStatus: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  product: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  }
});

module.exports = mongoose.model("Order", orderSchema);
