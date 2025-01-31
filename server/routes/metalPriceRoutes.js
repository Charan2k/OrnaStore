const express = require("express");
const router = express.Router();
const { getLatestMetalPrices } = require("../controllers/metalPriceController.js");

router.get("/metal/latest/prices", getLatestMetalPrices);

module.exports = router;
