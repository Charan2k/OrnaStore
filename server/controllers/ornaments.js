const OrnamentItem = require("../models/OrnamentItem.js");

const fetchOrnaments = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const ornaments = await OrnamentItem.findAndCountAll({ limit, offset });
        res.json({ total: ornaments.count, ornaments: ornaments.rows });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving ornaments" });
    }
};

module.exports = { fetchOrnaments };