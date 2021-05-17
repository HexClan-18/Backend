const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guest = mongoose.model("Guest");
const requireLogin = require("../middleware/requireLogin");
const bcrypt = require("bcryptjs");
const equals = require("validator/lib/equals");

/***************************
  GETTING LOGGEDIN USER 
***************************/
router.get("/profile", requireLogin, (req, res) => {
  Guest.find({ _id: req.user._id })

    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

/*******************************
  UPDATE AND DELETE PROFILE PIC
********************************/
router.put("/updatepic", requireLogin, (req, res) => {
  Guest.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

// router.delete("/deletepic/:picId", requireLogin, (req, res) => {
//   Guest.findOne({ _id: req.user._id }).exec((err, pic) => {
//     if (err || !pic) {
//       return res.status(422).json({ error: err });
//     }
//     if (pic._id.toString() === req.user._id.toString()) {
//       pic
//         .remove()
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
// });

/*********************
  UPDATE USERNAME
*********************/
router.put("/username", requireLogin, (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname && !lastname) {
    return res.status(422).json();
  } else {
    Guest.findByIdAndUpdate(
      req.user._id,
      { $set: { firstname: req.body.firstname, lastname: req.body.lastname } },

      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  }
});

/********************
  UPDATE BIO
*********************/
router.put("/bio", requireLogin, (req, res) => {
  const { bio } = req.body;

  if (!bio) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    req.user._id,
    { $set: { bio: req.body.bio } },

    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

/********************
  UPDATE LOCATION
*********************/
router.put("/location", requireLogin, (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    req.user._id,
    { $set: { location: req.body.location } },

    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

/********************
  UPDATE PASSWORD
*********************/
router.put("/password", requireLogin, async (req, res) => {
  const { password, password2 } = req.body;

  if (!equals(password, password2)) {
    return res.status(422).json();
  }
  // } else if (isLength({ min: 6 })) {
  //   return res.status(423).json();
  // }
  const newPassword = new Guest();

  const salt = await bcrypt.genSalt(10);
  newPassword.password = await bcrypt.hash(password, salt);
  await Guest.findByIdAndUpdate(
    req.user._id,
    { $set: { password: newPassword.password } },

    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
