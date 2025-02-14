const OrnamentItem = require("../models/OrnamentItem.js");

const fetchOrnaments = async (req, res) => {
    try {
        console.log(req.query);
        const { page = 1, limit = 10, category, id } = req.query;
        const offset = (page - 1) * limit;

        const whereConditions = {};
        if (category) whereConditions.category = category;
        if (id) whereConditions.id = id;

        const ornaments = await OrnamentItem.findAndCountAll({ 
            where: whereConditions,
            limit,
            offset 
        });

        res.json({ total: ornaments.count, ornaments: ornaments.rows });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving ornaments" });
    }
};

module.exports = { fetchOrnaments };
