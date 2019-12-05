const express = require("express");
const router = express.Router();
const Admins = require("../models/adminModel");
const Users = require("../models/userModel");

//get route for user login

router.get("/login", function(req, res) {
  res.render("login.ejs");
});

//logging in a user

router.post("/login", function(req, res) {
  console.log(req.body);
  res.render("homepage.ejs");
});

//get route for user Signup

router.get("/signup", function(req, res) {
  res.render("signup.ejs");
});

//add a new user

router.post("/signup", function(req, res) {
  var obj = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address
  });

  obj.save(function(err, user) {
    if (err) {
      res.send(err);
    } else {
      //res.render("homepage.ejs");
    }
  });
});

//view all users
router.get("/view", function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewUsers.ejs", { users: users });
    }
  });
});
module.exports = router;
