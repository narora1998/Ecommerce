const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
//const bootstrap = require("bootstrap");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/ecommerceWebsite", {
  useNewUrlParser: true
});

var port = process.env.port || 8000;

app.get("/", function(req, res) {
  res.render("addproduct.ejs");
});
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(methodOverride("_method"));

app.use(function(req, res) {
  res.render("pagenotfound.ejs");
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
