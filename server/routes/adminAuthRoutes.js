const express = require("express");
const { adminSignup, adminSignin, registerOrUpdateAdmin, fetchAdmins, deleteAdmin } = require("../controllers/adminAuthController.js");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware.js");

const router = express.Router();

router.post("/admin/signup", adminSignup);

router.post("/admin/register-or-update-admin", adminAuthMiddleware, registerOrUpdateAdmin);

router.post("/admin/signin", adminSignin);

router.get("/admin/fetch-admins", adminAuthMiddleware, fetchAdmins);

router.delete("/admin/delete-admin/:id", adminAuthMiddleware, deleteAdmin);

module.exports = router;
