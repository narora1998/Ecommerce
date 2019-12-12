const express = require("express");
const router = express.Router();
const multer = require("multer");
const Reviews = require("../models/reviewModel");
const Products = require("../models/productModel");
const User = require("../models/userModel.js");
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

router.get("/add", isLoggedIn, function(req, res) {
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
    modelNo: req.body.model,
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

router.get("/:id/view", isUserLoggedIn, function(req, res) {
  Products.findById(req.params.id)
    .populate("reviewList")
    .exec(function(err, product) {
      if (err) {
        res.send(err);
      } else {
        console.log(product);
        res.render("item.ejs", { product: product });
      }
    });
});

//GET: View all products

router.get("/view", isLoggedIn, function(req, res) {
  Products.find({}, function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewProducts.ejs", { products: products });
    }
  });
});

//DELETE : Delete product

router.delete("/:id", isLoggedIn, function(req, res) {
  Products.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/view");
    }
  });
});

//GET : Edit product

router.get("/:id/edit", isLoggedIn, function(req, res) {
  Products.findById(req.params.id, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.render("editProduct.ejs", { product: product });
    }
  });
});

//PUT : Edit product

router.put("/:id", isLoggedIn, function(req, res) {
  //console.log(req.body);
  Products.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      //brand: req.body.brand,
      price: req.body.price,
      modelNo: req.body.model,
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

router.post("/:id/reviews", isUserLoggedIn, function(req, res) {
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

//GET: Review of a particular product

router.get("/:id/reviews/view", isLoggedIn, function(req, res) {
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

router.delete("/:pid/reviews/:rid", isLoggedIn, function(req, res) {
  Reviews.findByIdAndDelete(req.params.rid, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/" + req.params.pid + "/reviews/view");
    }
  });
});

//GET: Filter Products

router.post("/search", isLoggedIn, function(req, res) {
  console.log("HERE");
  console.log(req.body);
  Products.find(
    { $and: [{ brand: req.body.brand }, { category: req.body.category }] },
    function(err, products) {
      if (err) {
        res.send(err);
      } else {
        console.log(products);
        res.render("viewProducts.ejs", { products: products });
      }
    }
  );
});

//GET: Televisions

router.get("/televisions", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Tv" } }], function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("televisions.ejs", { products: products });
    }
  });
});

//GET: Refrigerators

router.get("/refrigerators", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Refrigerators" } }], function(
    err,
    products
  ) {
    if (err) {
      res.send(err);
    } else {
      res.render("refrigerators.ejs", { products: products });
    }
  });
});

//GET: Ac's

router.get("/acs", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Ac" } }], function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("acs.ejs", { products: products });
    }
  });
});

//GET: Mobiles

router.get("/mobiles", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Mobile" } }], function(
    err,
    products
  ) {
    if (err) {
      res.send(err);
    } else {
      res.render("mobiles.ejs", { products: products });
    }
  });
});

//GET: Camera's

router.get("/cameras", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Camera" } }], function(
    err,
    products
  ) {
    if (err) {
      res.send(err);
    } else {
      res.render("cameras.ejs", { products: products });
    }
  });
});

//GET: Speaker Headphones

router.get("/speaker-headphones", isUserLoggedIn, function(req, res) {
  Products.aggregate(
    [{ $match: { category: "Speakers/Headphones" } }],
    function(err, products) {
      if (err) {
        res.send(err);
      } else {
        res.render("speakerHeadphones.ejs", { products: products });
      }
    }
  );
});

//GET: Laptops

router.get("/laptops", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Laptop" } }], function(
    err,
    products
  ) {
    if (err) {
      res.send(err);
    } else {
      //res.json({ data: televisions });
      res.render("laptops.ejs", { products: products });
    }
  });
});

//GET: Washing Machines

router.get("/washing-machines", isUserLoggedIn, function(req, res) {
  Products.aggregate([{ $match: { category: "Washing Machine" } }], function(
    err,
    products
  ) {
    if (err) {
      res.send(err);
    } else {
      res.render("washingMachines.ejs", { products: products });
    }
  });
});

//GET: Kitchen Peripherals

// router.get("/kitchen-peripherals", isUserLoggedIn, function(req, res) {
//   Products.aggregate(
//     [{ $match: { category: "Kitchen Peripherals" } }],
//     function(err, products) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.render("kitchenPeripherals.ejs", { products: products });
//       }
//     }
//   );
// });

// Add item to cart

router.get("/:id/add-to-cart", isUserLoggedIn, function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      Products.findById(req.params.id, function(err, product) {
        if (err) {
          console.log(err);
        } else {
          var flag = 0;
          var n = user.cart.length;

          for (var i = 0; i < n; i++) {
            if (user.cart[i] == req.params.id) {
              var temp = user.qty;
              temp[i + 1] += 1;
              User.findByIdAndUpdate(user._id, { qty: temp }, function(
                err,
                updated
              ) {});
              flag = 1;
              break;
            }
          }
          if (flag == 0) {
            user.cart.push(product);
            user.qty.push(1);
            user.save();
          }
          res.redirect("back");
        }
      });
    }
  });
});

router.get("/:id/remove-from-cart", isUserLoggedIn, function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      var idx = user.cart.indexOf(req.params.id);
      if (user.qty[idx + 1] == 1) {
        user.qty.splice(idx + 1, 1);
        user.cart.splice(idx, 1);
        user.save();
      } else {
        var temp = user.qty;
        temp[idx + 1] -= 1;
        User.findByIdAndUpdate(user._id, { qty: temp }, function(
          err,
          updated
        ) {});
      }
      res.redirect("back");
    }
  });
});

router.get("/:id/removed-from-cart", isUserLoggedIn, function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      var idx = user.cart.indexOf(req.params.id);
      user.qty.splice(idx + 1, 1);
      user.cart.splice(idx, 1);
      user.save();
      res.redirect("back");
    }
  });
});

// Check if admin is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.username == "admin@ecommerce.in") {
    return next();
  }
  res.redirect("/login");
}

// Check if user is logged in
function isUserLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
