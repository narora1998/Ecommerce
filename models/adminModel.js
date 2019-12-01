const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminID: {
    type: String,
    required: true
  }
  adminName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  phone: {
    type: Number,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  sellerAddress: {
    type: String,
    required: true
  },
  regNumber: {
    type: String,
    required: true
  },
  scale: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("admin", adminSchema);
