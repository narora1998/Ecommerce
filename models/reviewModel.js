const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  commentTitle: {
    type: String,
    required: true
  },
  commentBody: {
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

module.exports = mongoose.model("review", reviewSchema);
