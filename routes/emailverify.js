const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guest = mongoose.model("Guest");
const Owner = mongoose.model("Owner");
const GuestAuth = require("../controllers/guestAuth");
const OwnerAuth = require("../controllers/ownerAuth");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { sendgridApiKey } = require("../config/keys");
// const { check } = require("express-validator");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendgridApiKey,
    },
  })
);

router.post("/emailverify", GuestAuth.activateEmail);
router.post("/emailverify/owner", OwnerAuth.activateEmail);

//FORGOT PASSWORD--GUEST
router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ error: "Please enter your email!" });
    }
    Guest.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Sorry, This email does not exist!" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "team.boardmein@gmail.com",
          subject: "Password Reset",
          html: `<p>You requested for a password reset</p>
          <p>Please click the below link to reset your password.</p>
          <a href="http://localhost:3000/guest/pwreset/${token}">Reset My Password</a>
            `,
        });
        res.json({ message: "Please check your email" });
      });
    });
  });
});

//New Password
router.post("/new-password", async (req, res) => {
  const newPassword = req.body.password;
  if (!newPassword) {
    return res.status(422).json({ error: "Please enter a password!" });
  }
  // if (check("password").isLength({ min: 6 })) {
  //   return res.status(422).json({ error: "Password must be at least 6 characters long!" });
  // }
  const sentToken = req.body.token;
  Guest.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(async (user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Session has expired.Please try again." });
      }

      const salt = await bcrypt.genSalt(10);
      user.newPassword = await bcrypt
        .hash(newPassword, salt)
        .then((hashedpassword) => {
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((saveduser) => {
            res.json({ message: "Password successfully updated!" });
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//FORGOT PASSWORD
router.post("/reset-password/owner", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ error: "Please enter your email!" });
    }
    Owner.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Sorry, This email does not exist!" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "team.boardmein@gmail.com",
          subject: "Password Reset",
          html: `<p>You requested for a password reset</p>
          <p>Please click the below link to reset your password.</p>
          <a href="http://localhost:3000/owner/pwreset/${token}">Reset My Password</a>
            `,
        });
        res.json({ message: "Please check your email" });
      });
    });
  });
});

//New Password
router.post("/new-password/owner", async (req, res) => {
  const newPassword = req.body.password;
  if (!newPassword) {
    return res.status(422).json({ error: "Please enter a password!" });
  }
  // if (check("password").isLength({ min: 6 })) {
  //   return res.status(422).json({ error: "Password must be at least 6 characters long!" });
  // }
  const sentToken = req.body.token;
  Owner.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(async (user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Session has expired.Please try again." });
      }

      const salt = await bcrypt.genSalt(10);
      user.newPassword = await bcrypt
        .hash(newPassword, salt)
        .then((hashedpassword) => {
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((saveduser) => {
            res.json({ message: "Password successfully updated!" });
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
