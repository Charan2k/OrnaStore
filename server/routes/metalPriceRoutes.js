const express = require("express");
const router = express.Router();
const { getLatestMetalPrices, getHistoricalMetalPrices } = require("../controllers/metalPriceController.js");

router.get("/metal/latest/prices", getLatestMetalPrices);
router.get("/metal/historical/prices", getHistoricalMetalPrices);

module.exports = router;
