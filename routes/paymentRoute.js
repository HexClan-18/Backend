const express = require("express");

const router = express.Router();

const paymenttController = require("../controllers/paymentController");


router.post("/payment/", paymenttController.savePayment);



module.exports = router;                                          