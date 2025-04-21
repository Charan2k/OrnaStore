const OrnamentItem = require("../models/OrnamentItem.js");

const fetchOrnaments = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, id, ornamentType, metalType } = req.query;
        const offset = (page - 1) * limit;

        const whereConditions = {};
        if (category) whereConditions.category = category;
        if (id) whereConditions.id = id;
        if (ornamentType) whereConditions.ornamentType = ornamentType;
        if (metalType) whereConditions.metalType = metalType;

        console.log(whereConditions);

        const ornaments = await OrnamentItem.findAndCountAll({ 
            where: whereConditions,
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        res.json({ total: ornaments.count, ornaments: ornaments.rows });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving ornaments" });
    }
};

const getAvailableOrnamentTypes = async (req, res) => {
    try {
        const { metalType } = req.query;
        const whereConditions = {};
        if (metalType) whereConditions.metalType = metalType;

        const ornaments = await OrnamentItem.findAll({
            where: whereConditions,
            attributes: ['ornamentType'],
            group: ['ornamentType'],
            raw: true
        });

        const types = ornaments.map(item => item.ornamentType);
        res.json({ types });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving ornament types" });
    }
};

module.exports = { fetchOrnaments, getAvailableOrnamentTypes };
