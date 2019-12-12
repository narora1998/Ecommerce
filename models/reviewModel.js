const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  postedByName: {
    type: String
  },
  postedByEmail: {
    type: String
  },
  title: {
    type: String
  },
  comment: {
    type: String
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
