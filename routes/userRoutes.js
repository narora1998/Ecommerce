const express = require("express");
const router = express.Router();
const Admins = require("../models/adminModel");
const User = require("../models/userModel");
const passport = require("passport");
const Products = require("../models/productModel.js");

//logging in a user

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// //GET : Add a new user.

// router.get("/signup", function(req, res) {
//   res.render("signup.ejs");
// });

//POST : Add a new user

router.post("/", function(req, res) {
  console.log(req.body);
  User.register(
    new User({
      username: req.body.username,
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      qty: [0]
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        res.redirect("/login");
      }
    }
  );
});

//GET : View all users

router.get("/view", isLoggedIn, function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewUsers.ejs", { users: users });
    }
  });
});

//GET : Update a user

router.get("/:id/edit", isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.render("editUser.ejs", { user: user });
    }
  });
});

// PUT : Update a user

router.put("/:id", isLoggedIn, function(req, res) {
  //console.log(req.body);
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address
    },
    function(err) {
      if (err) {
        res.flash(err);
      } else {
        res.redirect("/users/view");
      }
    }
  );
});

// DELETE : Delete a user

router.delete("/:id", isLoggedIn, function(req, res) {
  User.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/users/view");
    }
  });
});

//GET: Cart

router.get("/cart", isUserLoggedIn, function(req, res) {
  User.findById(req.user._id)
    .populate("cart")
    .exec(function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        var subtotal = 0;
        for (var i = 0; i < user.cart.length; i++) {
          subtotal += user.cart[i].price * user.qty[i + 1];
        }
        var shipping = 500;
        if (subtotal > 50000 || subtotal == 0) {
          shipping = 0;
        }
        var tax = 0.18 * subtotal;
        var total = subtotal + shipping + tax;
        res.render("cart.ejs", {
          products: user.cart,
          qty: user.qty,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total
        });
      }
    });
});

// Check if user is logged in
function isUserLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Check if admin is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.username == "admin@ecommerce.in") {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
