const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchma = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    pRating: { type: Number, default: 0 },
    oRating: { type: Number, default: 0 },

    gId: { type: String, require: true },
    gName: { type: String, require: true },
    // replies: [{ name: { type: String }, reply: { type: String } }],

    product_id: {
      type: String,
    },

    // comments: [
    //   {
    //     gId: { type: String, require: true },
    //     gName: { type: String, require: true },
    //     email: { type: String, require: true },
    //     tp: { type: Number, require: true },
    //     pRating: { type: Number, default: 0 },
    //     oRating: { type: Number, default: 0 },
    //     text: { type: String, require: true },
    //     replies: [{ user: { type: String }, text: { type: String } }],
    //   },
    // ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchma);

module.exports = Comment;
