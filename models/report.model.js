const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Report = db.define('Report', {
    ReportID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    GeneratedByUserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ReportType: {
        type: DataTypes.ENUM('PricingHistory', 'Compliance', 'SalesTrend'),
                         allowNull: false
    },
    GeneratedDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    FilePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Report;
