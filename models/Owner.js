const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      default: "",
      // required: true,
    },
    location: {
      type: String,
      default: "",
      //required: true,
    },
    resetToken: String,
    expireToken: Date,
    role: {
      type: Number,
      default: 2,
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

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;
