const { DataTypes } = require('sequelize');
const db = require('../config/db');

const PriceChange = db.define('PriceChange', {
    ChangeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    OldPrice: {
        type: DataTypes.DECIMAL(10, 2),
                              allowNull: false
    },
    NewPrice: {
        type: DataTypes.DECIMAL(10, 2),
                              allowNull: false
    },
    ChangeDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ChangedByUserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = PriceChange;
