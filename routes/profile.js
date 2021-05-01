const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guest = mongoose.model("Guest");
const requireLogin = require("../middleware/requireLogin");

const { authenticatateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");

router.get("/profile", requireLogin, (req, res) => {
  Guest.find({ _id: req.user._id })

    .then((profile) => {
      res.json({ profile });
    })
    .catch((err) => {
      console.log(err);
    });
});

/*********************
    UPDATE PIC
*********************/

// const { createProfile } = require("../controllers/profile");
// router.post(
//   "/",
//   authenticatateJWT,
//   upload.single("profilePic"),
//   profileController.create,
//   profileController.createProfile
// );

// router.put("/", async (req, res) => {
//   await profileController.createProfile(req, res);
// });

// router.post("/createProfile", createProfile);

// router.put("/createProfile", async (req, res) => {
//   await profileController.createProfile(req, res);
// });

// //to update
// router.put("/username/:userId", async (req, res) => {
//   await profileController.createProfile(req, res);
// });

const { createProfile } = require("../controllers/profile");
router.patch("/username", authenticatateJWT, createProfile);

// router.put("/username/:email", async (req, res) => {
//   await profileController.createProfile(req, res);
// });

/********************
  UPDATE PASSWORD
*********************/

// router.put("/updatepic", guestAuth, (req, res) => {
//   Guest.findByIdAndUpdate(
//     req.user._id,
//     { $set: { pic: req.body.pic } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: "picture can not post" });
//       }
//       res.json(result);
//     }
//   );
// });

// router.put("/updatepic", guestAuth, (req, res) => {
//   Guest.findByIdAndUpdate(
//     req.user._id,
//     { $set: { pic: req.body.pic } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: "picture can not post" });
//       }
//       res.json(result);
//     }
//   );
// });

module.exports = router;
