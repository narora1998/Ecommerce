const express = require("express");
const router = express.Router();
const multer = require("multer");
const Reviews = require("../models/reviewModel");
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

// GET: Add product

router.get("/add", function(req, res) {
  res.render("addProduct.ejs");
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
    description: req.body.description,
    likes: 0,
    qtySold: 0
  });

  obj.save(function(err, product) {
    if (err) {
      res.send(err);
    } else {
      console.log(product);
      res.redirect("/products/add");
    }
  });
});

//GET: View a product by Id

router.get("/:id/view", function(req, res) {
  Products.findById(req.params.id)
    .populate("reviewList")
    .exec(function(err, product) {
      if (err) {
        res.send(err);
      } else {
        res.render("item.ejs", { product: product });
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
      res.render("editProduct.ejs", { product: product });
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
      price: req.body.price,
      description: req.body.description
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

//POST: Creating new review and adding it to a product

router.post("/:id/reviews", function(req, res) {
  Products.findById(req.params.id, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      Reviews.create(
        {
          postedOn: Date.now(),
          title: req.body.title,
          comment: req.body.comment
          //rating: req.body.rating
          //postedBy: req.user.name
        },
        function(err, newReview) {
          if (err) {
            console.log(err);
            //res.redirect("back");
          } else {
            product.reviewList.push(newReview);
            product.save();
            //res.json(product);
            res.redirect("/products/" + req.params.id + "/view");
          }
        }
      );
    }
  });
});

//GET: Review a particular product

router.get("/:id/reviews/view", function(req, res) {
  Products.findById(req.params.id)
    .populate("reviewList")
    .exec(function(err, product) {
      if (err) {
        res.send(err);
      } else {
        res.render("productReviews.ejs", { product: product });
      }
    });
});

//DELETE: Delete a review of a product and redirect to same page

router.delete("/:pid/reviews/:rid", function(req, res) {
  Reviews.findByIdAndDelete(req.params.rid, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/" + req.params.pid + "/reviews/view");
    }
  });
});

module.exports = router;
