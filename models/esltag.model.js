const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ESLTag = db.define('ESLTag', {
    ESLID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MACAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'ESLTag',
    timestamps: false
});

module.exports = ESLTag;
