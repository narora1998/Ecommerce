const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");

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

//POST: Add product

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

//GET: View all products

router.get("/view", function(req, res) {
  Products.find({}, function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewProducts.ejs", { products: products });
    }
  });
});

//DELETE : Delete product

router.delete("/:id", function(req, res) {
  Products.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/view");
    }
  });
});

//GET : Edit product

router.get("/:id/edit", function(req, res) {
  Products.findById(req.params.id, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.render("editUser.ejs", { user: user });
    }
  });
});

//PUT : Edit product

router.put("/:id", function(req, res) {
  //console.log(req.body);
  Products.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      brand: req.body.brand,
      // category: req.body.category,
      price: req.body.price
    },
    function(err, product) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/products/view");
      }
    }
  );
});

module.exports = router;
