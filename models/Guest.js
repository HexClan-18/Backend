const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const GuestSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    // emailToken: {
    //   type: String,
    // },
    // isVerified: {
    //   type: Boolean,
    // },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    resetToken: String,
    expireToken: Date,
    role: {
      type: Number,
      default: 3,
      //   1 - admin // 2 - owner // 3 - guest
    },
    pic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerBR3bfynBVdF2gjoii3i_8yI4KOdK5_cxw&usqp=CAU",
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", GuestSchema);

module.exports = Guest;
