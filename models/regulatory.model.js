const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RegulatoryLimit = db.define('RegulatoryLimit', {
    LimitID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MaxPrice: {
        type: DataTypes.DECIMAL(10, 2),
                                  allowNull: false
    },
    RegulationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'RegulatoryLimits' // 👈 Force Sequelize to use exact name
});

module.exports = RegulatoryLimit;
