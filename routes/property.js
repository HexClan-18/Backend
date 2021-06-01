const express = require("express");

const router = express.Router();

const propertyController = require("../controllers/property");

router.post("/property", propertyController.addProperty);

router.get("/property", propertyController.getAllProperties);

router.get("/property/:id", propertyController.getProperty);



module.exports = router;
