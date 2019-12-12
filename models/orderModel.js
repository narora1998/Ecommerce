const mongoose = require("mongoose");
const products = require("./productModel");

const orderSchema = mongoose.Schema({
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  purchasedOn: {
    type: Date
  },
  amount: {
    type: Number
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  qty: []
});

module.exports = mongoose.model("Order", orderSchema);
