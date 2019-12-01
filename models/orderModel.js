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
  billingAddress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  product: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      }
    ]
  }
});

module.exports = mongoose.model("order", orderSchema);
