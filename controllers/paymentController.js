const Payment = require('../models/paymentModal')
// const Category = require('../models/categoryModel')
// const Products = require('../models/productModel')

exports.savePayment = function(req,res){
    let payment = new Payment(req.body);
    console.log(req.body)
    payment.save(function(err,payment){
        if(err){
            return res.json({status:false,data:'Payment error'});
        }
        
        return res.json({status:true,data:payment});
    })
}

