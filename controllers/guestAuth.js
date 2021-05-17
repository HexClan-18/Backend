// database validations
const Guest = require("../models/Guest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

/************************************
 *SENDGRID*
 ************************************/
/* API KEY */
//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

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

/************************************
 *SIGNUP CONTROLLER
 ************************************/

exports.signupController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await Guest.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newGuest = new Guest();
    newGuest.firstname = firstname;
    newGuest.lastname = lastname;
    newGuest.email = email;

    const salt = await bcrypt.genSalt(10);
    newGuest.password = await bcrypt.hash(password, salt);

    await newGuest
      .save()

      /************************************
       *SENDGRID*
       ************************************/
      .then((guest) => {
        transporter.sendMail({
          to: guest.email,
          from: "team.boardmein@gmail.com",
          subject: "Signup Success",
          html: "<h1> Welcome to BoardMeIn Family</h1>",
        });
      });

    //sending the response to frontend
    res.json({
      successMessage: "Registration success. Please Login.",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });

    // console.log(newGuest.password);
    //   } catch (err) {
    //     console.log("signupController error:", err);
    //   }
  }
};
// };

/************************************
 *LOGIN CONTROLLER
 ************************************/

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Guest.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    jwt.sign(
      { _id: user._id },
      jwtSecret,
      { expiresIn: jwtExpire },
      (err, token) => {
        if (err) console.log("jwt error: ", err);
        const { _id, firstname, lastname, email, role, bio, location, pic } =
          user;

        //the response that sending back to the client
        res.json({
          token,
          user: { _id, firstname, lastname, email, role, bio, location, pic },
        });
      }
    );
  } catch (err) {
    console.log("loginController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
