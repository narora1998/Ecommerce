const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
//const bootstrap = require("bootstrap");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const Products = require("./models/productModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/userModel.js");
const Orders = require("./models/orderModel.js");
const subscriberRoutes = require("./routes/subscriberRoutes");

mongoose.connect(
  "mongodb+srv://nikhil:nikhil123@ecommerce-gnofa.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// mongoose.connect("mongodb://localhost/ecommerceWebsite", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  require("express-session")({
    secret: "I am developing Ecommerce",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(function(req, res, next) {
  Products.find({}, function(err, products) {
    if (err) {
      conbsole.log(err);
    } else {
      res.locals.allproducts = products;
      next();
    }
  });
});

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/subscribers", subscriberRoutes);

app.post("/search", function(req, res) {
  res.redirect("/products/" + req.body.product + "/view");
});

app.get("/", isUserLoggedIn, function(req, res) {
  res.render("homepage.ejs");
});

User.register(
  new User({
    username: "admin@ecommerce.in",
    name: "Admin",
    mobile: "9810546831"
  }),
  "admin123",
  function(err, admin) {
    if (err) {
      console.log(err);
    }
  }
);

// app.get("/", function(req, res) {
//   Products.find({}, function(err, products) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.render("homepage.ejs", { products: products });
//     }
//   });
// });

//GET : FAQ's
app.get("/faqs", function(req, res) {
  res.render("faq.ejs");
});

//GET: Route for login

app.get("/login", function(req, res) {
  res.render("login.ejs");
});

// POST: Admin login
app.post(
  "/admin/login",
  passport.authenticate("local", {
    successRedirect: "/products/view",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//GET: User logout
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

//GET : Admin logout
app.get("/admin/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

//GET: Route for signup
app.get("/signup", function(req, res) {
  res.render("signup.ejs");
});

app.post("/orders", function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      Orders.create(
        {
          purchasedBy: user,
          purchasedOn: Date.now(),
          amount: req.body.amount,
          products: user.cart,
          qty: user.qty
        },
        function(err, order) {
          if (err) {
            console.log(err);
            res.redirect("back");
          } else {
            res.redirect("/orders/" + order._id);
          }
        }
      );
    }
  });
});

app.get("/orders/:id", function(req, res) {
  Orders.findById(req.params.id)
    .populate("purchasedBy")
    .exec(function(err, order) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("paymentredirect.ejs", { order: order });
      }
    });
});

app.post("/payment/success", function(req, res) {
  console.log(req.body);
});

// Check if user is logged in
function isUserLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//Page not foumd
app.use(function(req, res) {
  res.render("pagenotfound.ejs");
});

var port = process.env.port || 8000;

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Listening on port ", port);
});

// app.listen(port, () => {
//   console.log("Listening on port ", port);
// });
