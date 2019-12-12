const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");
const Reviews = require("../models/reviewModel");

//GET: View All Reviews.

router.get("/view", function(req, res) {
  Products.find({})
    .populate("reviewList")
    .exec(function(err, products) {
      if (err) {
        res.send(err);
      } else {
        res.render("viewReviews.ejs", { products: products });
      }
    });
});

//POST: Add a review.

router.post("/add", isUserLoggedIn, function(req, res) {
  var obj = new Reviews({
    name: req.body.name,
    title: req.body.title,
    comment: req.body.comment,
    rating: req.body.rating
  });

  obj.save(function(err, review) {
    if (err) {
      res.send(err);
    } else {
      console.log("Added review");
      res.json({ message: "Review Added", data: review });
      //res.redirect("/reviews/view");
    }
  });
});

//DELETE: Delete a review

router.delete("/:id", isLoggedIn, function(req, res) {
  Reviews.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/reviews/view");
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
