// database validations
const Guest = require("../models/Guest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");
const sgMail = require("@sendgrid/mail");
const { sendgridApiKey, activationTokenSecret } = require("../config/keys");
sgMail.setApiKey(sendgridApiKey);

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

    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);

    const newGuest = {
      firstname,
      lastname,
      email,
      password: hashPassword,
    };

    const activation_token = createActivationToken(newGuest);

    const msg = {
      from: "bhnsandu69@gmail.com",
      to: newGuest.email,
      subject: "Board Me In - verify your email",
      text: `
          Hello, Thanks for registering on Board-Me-In.
          Please copy and paste the address below to verify your account.
          http://localhost:3000/guest/emailverify/${activation_token}`,
      html: `<h1>Hello ${newGuest.firstname},</h1>
          <p>Thanks for registering on Board-Me-In.</p>
          <p>Please click the below link to verify your account.</p>
          <a href="http://localhost:3000/guest/emailverify/${activation_token}"> Verify My Account </a>
          `,
    };

    //sending the response to frontend
    res.json({
      successMessage:
        "Thank You for Registering on BoardMeIn! We have sent a verification link to your email address provided. Please click on the link to verify your account. Please note that the verification link will expire within 10 minutes. ",
    });

    //sending the mail
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, activationTokenSecret);

    const { firstname, lastname, email, password, isverified } = user;

    const check = await Guest.findOne({ email });
    if (check)
      return res.status(400).json({
        errorMessage:
          "You have already activated your account!, Please Login using your email and password. ",
      });

    const newGuest = new Guest({
      firstname,
      lastname,
      email,
      password,
      isverified,
    });

    await newGuest.save();

    res.json({
      successMessage:
        "Your account has been successfully activated!, Please Login using your email and password.",
    });
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};

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

const createActivationToken = (payload) => {
  return jwt.sign(payload, activationTokenSecret, {
    expiresIn: "60m",
  });
};
