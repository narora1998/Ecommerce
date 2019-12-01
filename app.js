const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/ecommerceWebsite", {
  useNewUrlParser: true
});

var port = process.env.port || 8000;

app.get("/", function(req, res) {
  res.render("landing.ejs", {name: "Manay Shankar"});
});

app.use("/order", orderRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/review", reviewRoutes);


app.listen(port, () => {
  console.log("Listening on port ", port);
});
