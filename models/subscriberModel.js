const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

subscriberSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Subscriber", subscriberSchema);
