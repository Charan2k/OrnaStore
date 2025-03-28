const OrnamentItem = require("../models/OrnamentItem.js");
const Admin = require("../models/Admin.js");


const addOrnamentItem = async (req, res) => {
    try {
        const { ornamentName, description, category, type, metalType } = req.body;
        const adminId = req.admin.id;

        if (!ornamentName || !description || !category || !type || !metalType || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const imageBuffer = req.file.buffer;

        const ornament = await OrnamentItem.create({
            name: ornamentName,
            description,
            category,
            ornamentType: type,
            metalType,
            image: imageBuffer,
            adminId,
        });

        res.status(201).json({ message: "Ornament item added successfully", ornament });
    } catch (error) {
        console.error("Error adding ornament item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateOrnamentItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, ornamentType, metalType } = req.body;
        const image = req.file ? req.file.buffer : undefined;
        const admin = await Admin.findByPk(req.adminId);

        const ornament = await OrnamentItem.findByPk(id);
        if (!ornament) return res.status(404).json({ error: "Ornament item not found" });

        if (admin.role === "owner" || admin.role === "manager" || (admin.role === "contributor" && ornament.adminId === req.adminId)) {
            await ornament.update({
                name: name || ornament.name,
                description: description || ornament.description,
                category: category || ornament.category,
                ornamentType: ornamentType || ornament.ornamentType,
                metalType: metalType || ornament.metalType,
                image: image !== undefined ? image : ornament.image
            });
            return res.json({ message: "Ornament item updated successfully" });
        }
        res.status(403).json({ error: "Unauthorized" });
    } catch (error) {
        res.status(500).json({ error: "Error updating ornament item" });
    }
};

const deleteOrnamentItem = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByPk(req.admin.id);

        const ornament = await OrnamentItem.findByPk(id);
        if (!ornament) return res.status(404).json({ error: "Ornament item not found" });

        if (admin.role === "owner" || admin.role === "manager" || ornament.adminId===req.admin.id) {
            await ornament.destroy();
            return res.json({ message: "Ornament item deleted successfully" });
        }
        res.status(403).json({ error: "Unauthorized" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting ornament item" });
    }
};


module.exports = { addOrnamentItem, updateOrnamentItem,  deleteOrnamentItem};
