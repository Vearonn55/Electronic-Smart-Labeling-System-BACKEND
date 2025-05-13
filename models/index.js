const db = require('../config/db');

// Import models
const User = require('./user.model');
const Product = require('./product.model');
const ProductCategory = require('./category.model');
const PriceChange = require('./pricechange.model');
const RegulatoryLimit = require('./regulatory.model');
const Alert = require('./alert.model');
const Sale = require('./sale.model');
const Report = require('./report.model');

// Define associations
Product.belongsTo(ProductCategory, { foreignKey: 'CategoryID' });
ProductCategory.hasMany(Product, { foreignKey: 'CategoryID' });

PriceChange.belongsTo(Product, { foreignKey: 'ProductID' });
PriceChange.belongsTo(User, { foreignKey: 'ChangedByUserID' });

RegulatoryLimit.belongsTo(ProductCategory, { foreignKey: 'ProductCategoryID' });

Alert.belongsTo(Product, { foreignKey: 'ProductID' });

Sale.belongsTo(Product, { foreignKey: 'ProductID' });

Report.belongsTo(User, { foreignKey: 'GeneratedByUserID' });

// Sync all models in dependency-safe order
const syncDB = async () => {
    try {
        await ProductCategory.sync();     // no alter
        await Product.sync();
        await User.sync();
        await PriceChange.sync();
        await RegulatoryLimit.sync();
        await Alert.sync();
        await Sale.sync();
        await Report.sync();

        console.log('✅ All models synchronized successfully');
    } catch (err) {
        console.error('❌ Failed to sync models:', err);
    }
};

module.exports = {
    db,
    User,
    Product,
    ProductCategory,
    PriceChange,
    RegulatoryLimit,
    Alert,
    Sale,
    Report,
    syncDB
};
