const Admin = require("../models/Admin.js");
const jwt = require("jsonwebtoken");

const generateToken = (admin) =>
    jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

const findAdminByEmail = async (email) => await Admin.findOne({ where: { email } });

const adminSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await findAdminByEmail(email);
        if (!admin || !(await admin.validPassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "Sign-in successful", token: generateToken(admin) });
    } catch (error) {
        console.log
        res.status(500).json({ error: "Error signing in" });
    }
};

const adminSignup = async (req, res) => {
    const { email, password, role, secretKey } = req.body;
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    try {
        if (await findAdminByEmail(email)) {
            return res.status(400).json({ error: "Admin already exists" });
        }
        const admin = await Admin.create({ email, password, role });
        res.status(201).json({ message: "Owner account created successfully", adminId: admin.id });
    } catch (error) {
        res.status(500).json({ error: "Error creating admin" });
    }
};

const registerOrUpdateAdmin = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (req.admin.role !== "owner") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            existingAdmin.email = email;
            existingAdmin.role = role;
            await existingAdmin.save();
            return res.status(200).json({ message: "Admin updated successfully", adminId: existingAdmin.id });
        }

        const admin = await Admin.create({ email, password, role });
        res.status(201).json({ message: "Admin created successfully", adminId: admin.id });
    } catch (error) {
        res.status(500).json({ error: "Error registering or updating admin" });
    }
};

const fetchAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            attributes: ["id", "email", "role"],
        });
        res.json({ admins, role: req.admin.role, adminId: req.admin.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error retrieving admins" });
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.admin.role !== "owner") {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        await admin.destroy();
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting admin" });
    }
};

module.exports = { adminSignup, adminSignin, registerOrUpdateAdmin, fetchAdmins, deleteAdmin };
