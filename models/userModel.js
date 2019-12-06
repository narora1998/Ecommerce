const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Orders = require("./orderModel");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  orderList: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
