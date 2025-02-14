const { DataTypes } = require("sequelize");
const Admin = require("./Admin.js");
const sequelize = require("../config/database.js");

const OrnamentItem = sequelize.define(
    "OrnamentItem",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM("male", "female", "both"),
            allowNull: false,
        },
        ornamentType: {
            type: DataTypes.ENUM("chain", "bracelet", "ring"),
            allowNull: false,
        },
        metalType: {
            type: DataTypes.ENUM("gold", "silver"),
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB("long"),
            allowNull: false,
        },
        adminId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Admin,
                key: "id",
            },
            onDelete: "SET NULL", 
        }
    },
    {
        timestamps: true,
        tableName: "ornament_items",
    }
);

Admin.hasMany(OrnamentItem, { foreignKey: "adminId", onDelete: "SET NULL" });
OrnamentItem.belongsTo(Admin, { foreignKey: "adminId" });

module.exports = OrnamentItem;
