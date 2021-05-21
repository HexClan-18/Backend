const Owner = require("../models/Owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

/************************************
 *SIGNUP CONTROLLER
 ************************************/
exports.ownerSignupController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await Owner.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newOwner = new Owner();
    newOwner.firstname = firstname;
    newOwner.lastname = lastname;
    newOwner.email = email;

    const salt = await bcrypt.genSalt(10);
    newOwner.password = await bcrypt.hash(password, salt);

    await newOwner.save();

    res.json({
      successMessage: "Registration success. Please Login.",
    });
  } catch (err) {
    console.log("ownerSignupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

/************************************
 *LOGIN CONTROLLER
 ************************************/
exports.ownerLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Owner.findOne({ email });
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
    console.log("ownerLoginController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
