const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/ecommerceWebsite", {
  useNewUrlParser: true
});

var port = process.env.port || 8000;

app.get("/", function(req, res) {
  res.render();
});
app.listen(port, () => {
  console.log("Listening on port ", port);
});
