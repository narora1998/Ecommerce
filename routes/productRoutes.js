const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

//view photos

router.get("/view/photos", (req, res) => {
  Products.find({}, function(err, result) {
    const imgArray = result.map(element => element._id);
    console.log(imgArray);

    if (err) return console.log(err);
    console.log(imgArray);
    res.send(imgArray);
  });
});

//adding a new product

router.post("/add", upload.single("image"), function(req, res) {
  console.log(req.file);
  var obj = new Products({
    pid: req.body.pid,
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    image: req.file.filename,
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

router.delete("/delete", function(req, res) {
  Products.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/view");
    }
  });
});

//get route for delete product

router.get("/delete", function(req, res) {
  res.render("deleteProduct.ejs");
});
module.exports = router;
