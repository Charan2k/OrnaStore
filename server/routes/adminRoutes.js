const express = require("express");
const { addOrnamentItem, updateOrnamentItem, deleteOrnamentItem } = require("../controllers/adminController.js");
const upload = require("../middlewares/uploadImageMiddleware.js");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware.js");

const router = express.Router();

router.post("/admin/add-ornament-item", adminAuthMiddleware, upload.single("image"), addOrnamentItem);

router.put("/admin/update-ornament-item/:id", adminAuthMiddleware, upload.single("image") ,updateOrnamentItem);

router.delete("/admin/delete-ornament-item/:id", adminAuthMiddleware, deleteOrnamentItem);

module.exports = router;
