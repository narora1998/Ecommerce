const express = require("express");
const router = express.Router();
const Orders = require("../models/orderModel");

//POST: Add order

router.post("/orders", function(req, res) {
  var obj = new Orders({
    purchasedBy: req.body.purchasedBy,
    purchashedOn: req.body,
    purchasedOn,
    amount: req.body.amount,
    transactionStatus: req.body.transactionStatus,
    shippingAddress: req.body.shippingAddress
    //productList:
  });

  obj.save(function(err, order) {
    if (err) {
      res.send(err);
    } else {
      res.render("homepage.ejs");
    }
  });
});

module.exports = router;
