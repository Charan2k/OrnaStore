const express = require("express");
const { fetchOrnaments } = require("../controllers/ornaments.js");

const router = express.Router();

router.get("/fetch-ornaments", fetchOrnaments);

module.exports = router;
