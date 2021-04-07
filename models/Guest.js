const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 3,
      //   1 - admin // 2 - owner // 3 - guest
    },
    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png",
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", GuestSchema);

module.exports = Guest;
