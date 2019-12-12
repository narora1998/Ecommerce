const mongoose = require("mongoose");
const Orders = require("./orderModel");
const passportLocalMongoose = require("passport-local-mongoose");
const Products = require("../models/productModel.js");

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  qty: [Number]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
