const express = require("express");
const { fetchOrnaments, getAvailableOrnamentTypes } = require("../controllers/ornaments.js");

const router = express.Router();

router.get("/fetch-ornaments", fetchOrnaments);
router.get("/available-ornament-types", getAvailableOrnamentTypes);

module.exports = router;
