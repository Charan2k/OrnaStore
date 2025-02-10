const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuthMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findOne({ where: { id: decoded.id } });

        if (!admin || admin.role !== decoded.role) {
            return res.status(401).json({ error: "Unauthorized access. Please log in again.", loginFailed: true });
        }

        req.admin = {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token", loginFailed: true });
    }
};

module.exports = adminAuthMiddleware;
