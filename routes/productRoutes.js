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

router.get("/:id/view", function(req, res) {
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

//GET: Review of a particular product

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

//GET: Televisions

router.get("/televisions", function(req, res) {
  Products.aggregate([{ $match: { category: "Tv" } }], function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("televisions.ejs", { products: products });
    }
  });
});

//GET: Refrigerators

router.get("/refrigerators", function(req, res) {
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

router.get("/acs", function(req, res) {
  Products.aggregate([{ $match: { category: "Ac" } }], function(err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("acs.ejs", { products: products });
    }
  });
});

//GET: Mobiles

router.get("/mobiles", function(req, res) {
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

router.get("/cameras", function(req, res) {
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

router.get("/speaker-headphones", function(req, res) {
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

router.get("/laptops", function(req, res) {
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

router.get("/washing-machines", function(req, res) {
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

router.get("/kitchen-peripherals", function(req, res) {
  Products.aggregate(
    [{ $match: { category: "Kitchen Peripherals" } }],
    function(err, products) {
      if (err) {
        res.send(err);
      } else {
        res.render("kitchenPeripherals.ejs", { products: products });
      }
    }
  );
});

module.exports = router;
