const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
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
    required: true
  },
  datePosted: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Review", reviewSchema);
