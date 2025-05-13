const { DataTypes } = require('sequelize');
const db = require('../config/db');
const QRCode = require('qrcode');  // Import qrcode library

const Product = db.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT
    },
    NutritionalFacts: {
        type: DataTypes.TEXT
    },
    CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
                          allowNull: false
    },
    ExpiryDate: {
        type: DataTypes.DATE
    },
    StockQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
            allowNull: false
    },
    QRCode: {
        type: DataTypes.TEXT,
        allowNull: true  // Allow null until the QR code is generated
    }
}, {
    timestamps: false
});

// Hook to generate and save QR code after product is created
Product.afterCreate(async (product, options) => {
    try {
        const qrCodeData = await QRCode.toDataURL(product.ProductID.toString()); // QR code based on ProductID
        product.QRCode = qrCodeData; // Save QR code to the product's QRCode field
        await product.save(); // Save the updated product with the QR code
    } catch (error) {
        console.error("Error generating QR Code:", error);
    }
});

module.exports = Product;
