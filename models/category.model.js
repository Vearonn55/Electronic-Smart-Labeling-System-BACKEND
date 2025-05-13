const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ProductCategory = db.define('ProductCategory', {
    CategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

module.exports = ProductCategory;
