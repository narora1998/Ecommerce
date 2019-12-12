const express = require("express");
const router = express.Router();
const Subscribers = require("../models/subscriberModel");

//POST : Add a subscriber
router.post("/", isUserLoggedIn, function(req, res) {
  var obj = new Subscribers({
    name: req.body.name,
    email: req.body.email,
    mobile: req.user.mobile
  });

  obj.save(function(err, subscriber) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("back");
    }
  });
});

//GET : View Subscribers

router.get("/view", isLoggedIn, function(req, res) {
  Subscribers.find({}, function(err, subscribers) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("viewSubscribers.ejs", { subscribers: subscribers });
    }
  });
});

//DELETE : Delete product

router.delete("/:id", isLoggedIn, function(req, res) {
  Subscribers.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/subscribers/view");
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
