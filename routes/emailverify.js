const express = require("express");
const router = express.Router();
const GuestAuth = require("../controllers/guestAuth");

router.post("/emailverify", GuestAuth.activateEmail);

module.exports = router;
