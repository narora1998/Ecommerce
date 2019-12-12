const express = require("express");
const router = express.Router();
const Orders = require("../models/orderModel");
const User = require("../models/userModel");

//POST: Add order

router.post("/orders", function(req, res) {
  var obj = new Orders({
    purchasedBy: req.body.purchasedBy,
    purchashedOn: req.body,
    //purchasedOn,
    amount: req.body.amount,
    transactionStatus: req.body.transactionStatus
    //shippingAddress: req.body.shippingAddress
  });

  obj.save(function(err, order) {
    if (err) {
      res.send(err);
    } else {
      res.render("homepage.ejs");
    }
  });
});

//POST : Add a new order

// router.post("/", isUserLoggedIn, function(req, res) {
//   User.findById(req.user._id, function(err, user) {
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       var tempQty = [];
//       for (var i = 0; i < user.cart.qty.length; i++) {
//         tempQty[i] = user.cart.qty[i];
//       }
//       var obj = new Orders({
//         purchasedBy: user.name,
//         purchashedOn: Date.now(),
//         productList: user.cart,
//         qty: tempQty,
//         total: req.body.total
//       });

//       obj.save(function(err, order) {
//         if (err) {
//           console.log(err);
//           res.redirect("back");
//         } else {
//           res.render("orderPlaced.ejs");
//         }
//       });
//     }
//   });
// });

//GET : View Orders

router.get("/view", function(req, res) {
  res.render("orderPlaced.ejs");
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
