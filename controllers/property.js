const Comment = require("../models/comment");
const Product = require("../models/productModel");

exports.addProperty = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  //   const gid = req.body.gid;
  //   const gname = req.body.gname;
  //   const email = req.body.email;
  //   const tp = req.body.tp;
  //   const pRating = req.body.pRating;
  //   const oRating = req.body.oRating;
  //   const text = req.body.text;

  try {
    const comment = new Comment({ name: name, price: price });
    comment.save();
    res.status(201).json({
      message: "Property added!",
    });
    // Comment.insertMany(pId, {
    //   $push: {
    //     comments: [
    //       {
    //         guestId: gid,
    //         guestName: gname,
    //         email: email,
    //         tp: tp,
    //         pRating: pRating,
    //         oRating: oRating,
    //         text: text,
    //       },
    //     ],
    //   },
    // });
    // res.status(201).json({
    //   message: "Comment added!",
    // });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await Product.find({});
    console.log(properties);
    res.status(200).json({
      data: properties,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProperty = async (req, res, next) => {
  console.log("hereeeeeee");
  console.log(req.params.id);
  const id = req.params.id;
  try {
    const property = await Product.findById(id);
    console.log(property);
    res.status(200).json({
      data: property,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// exports.getTest = function(req,res){
//   console.log("test get")
//   console.log(req.body)
//   return res.json({status:true,data:'test'})
// }
