const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); 

const MetalPrice = sequelize.define(
    "MetalPrice",
    {
        gold_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        silver_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        timestamps: false, // Avoid sequelize auto-adding timestamps (createdAt, updatedAt)
    }
);

module.exports = MetalPrice;
