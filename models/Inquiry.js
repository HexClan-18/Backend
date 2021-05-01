var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InquirySchema = new Schema({
  userid: {
    type: String,
    //required : true ,
  },

  inquirytype: {
    type: String,
    //required: true,
  },

  reason: {
    type: String,
    //required : true ,
  },
});

module.exports = mongoose.model("Inquiry", InquirySchema);
