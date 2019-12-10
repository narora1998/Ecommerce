const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: false
  },
  postedOn: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("Review", reviewSchema);
