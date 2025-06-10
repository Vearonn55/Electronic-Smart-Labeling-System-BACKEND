const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ESLTag = db.define('ESLTag', {
    ESLTagID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    MacAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    LastStatusUpdate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Status: {
        type: DataTypes.STRING, // e.g., 'ONLINE', 'OFFLINE'
        allowNull: false,
        defaultValue: 'OFFLINE',
    },
    BatteryLevel: {
        type: DataTypes.INTEGER, // assuming percentage
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = ESLTag;
