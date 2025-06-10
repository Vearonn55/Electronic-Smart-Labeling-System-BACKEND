const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ESLStatus = db.define('ESLStatus', {
    StatusID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ESLTagID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    Status: {
        type: DataTypes.STRING, // e.g., 'ONLINE', 'OFFLINE'
        allowNull: false,
    },
    BatteryLevel: {
        type: DataTypes.INTEGER, // assuming percentage
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = ESLStatus;
