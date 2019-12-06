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

//GET : Add a new user.

router.get("/signup", function(req, res) {
  res.render("signup.ejs");
});

//POST : Add a new user

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
      res.render("login.ejs");
    }
  });
});

//GET : View all users

router.get("/view", function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.render("viewUsers.ejs", { users: users });
    }
  });
});

//GET : Update a user

router.get("/:id/edit", function(req, res) {
  Users.findById(req.params.id, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.render("editUser.ejs", { user: user });
    }
  });
});

// PUT : Update a user

router.put("/:id", function(req, res) {
  //console.log(req.body);
  Users.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
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

router.delete("/:id", function(req, res) {
  Users.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/users/view");
    }
  });
});
module.exports = router;
