const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

//adding a new product

router.post("/add", upload.single("image"), function(req, res) {
  console.log(req.body);
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // var finalImg = {
  //   contentType: req.file.mimetype,
  //   image: new Buffer(encode_image, "base64")
  // };
  var obj = new Products({
    pid: req.body.pid,
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    image: encode_image,
    likes: 0,
    qtySold: 0
  });

  obj.save(function(err, product) {
    if (err) {
      res.send(err);
    } else {
      console.log(product);
      res.redirect("/");
    }
  });
});

//view all products

router.get("/view", function(req, res) {
  Products.find({}, function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewProducts.ejs", { products: products });
    }
  });
});

//view a product

router.get("/view/:id", function(req, res) {
  Products.findById(req.params.id, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewProduct.ejs", { product: product });
    }
  });
});

// post route for delete a product

router.delete("/delete/:id", function(req, res) {
  Products.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/view");
    }
  });
});
module.exports = router;

//get route for delete product

router.get("/delete", function(req, res) {
  res.render("deleteProduct.ejs");
});
