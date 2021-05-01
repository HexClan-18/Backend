const Guest = require("../models/Guest");

exports.create = async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("req.file: ", req.file);
  console.log("req.user: ", req.user);
  res.json({
    message: "inside profileController",
  });
};

exports.createProfile = async (req, res) => {
  try {
    console.log(req.body);

    Guest.findByIdAndUpdate(
      req.body.userId,
      req.body,
      { new: true },
      function (err, user) {
        if (err) {
          res.status(400).json({
            status: false,
            data: "Unable to update!",
          });
        }
        return res.status(200).json({
          status: true,
          data: user,
        });
      }
    );
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err.message,
    });
  }
};
