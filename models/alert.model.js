const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Alert = db.define('Alert', {
    AlertID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AlertType: {
        type: DataTypes.ENUM('PriceExceeded', 'NearExpiry'),
                        allowNull: false
    },
    AlertDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('Pending', 'Resolved'),
                        allowNull: false,
                        defaultValue: 'Pending'
    }
}, {
    timestamps: false,
    tableName: 'Alerts' // ✅ Explicit table name
});

module.exports = Alert;
