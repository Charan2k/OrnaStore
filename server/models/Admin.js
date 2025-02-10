const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const bcrypt = require("bcryptjs");

const Admin = sequelize.define("Admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        // owner can manage admins & ornaments, manager can manage ornaments, contributor can manage their own ornaments
        type: DataTypes.ENUM("owner", "manager", "contributor"), 
        allowNull: false,
        defaultValue: "contributor",
    }
});

Admin.beforeCreate(async (admin) => {
    admin.password = await bcrypt.hash(admin.password, 10);
});

Admin.prototype.validPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error("Error comparing password");
    }
};

module.exports = Admin;
