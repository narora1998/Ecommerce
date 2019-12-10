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
const Products = require("./models/productModel");

app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect(
//   "mongodb+srv://nikhil:nikhil123@ecommerce-gnofa.mongodb.net/test?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true
//   }
// );

mongoose.connect("mongodb://localhost/ecommerceWebsite", {
  useNewUrlParser: true
});

app.use(methodOverride("_method"));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", function(req, res) {
  res.render("homepage.ejs");
});

app.use(function(req, res) {
  res.render("pagenotfound.ejs");
});

// app.listen(process.env.PORT, process.env.IP, () => {
//   console.log("Listening on port ", port);
// });

var port = process.env.port || 8000;

app.listen(port, () => {
  console.log("Listening on port ", port);
});
