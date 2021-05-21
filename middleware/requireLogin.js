const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const mongoose = require("mongoose");
const Guest = mongoose.model("Guest");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    Guest.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
