const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Guest = require("../models/Guest");
const Products = require("../models/product");

router.get("/allproducts", requireLogin, (req, res) => {
  Products.find()
    .populate("owner_id", "_id name")
    .sort("-createdAt")
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/allguests", requireLogin, (req, res) => {
//   // const Collection = collection("db");
//   Guest.countDocuments()
//     // .count()

//     .then((coll) => {
//       res.json({ coll });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
