const { Sale, Product } = require('../models');

// Log a sale
const logSale = async (req, res) => {
    try {
        const { ProductID, Quantity } = req.body;

        const product = await Product.findByPk(ProductID);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.StockQuantity < Quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Deduct stock
        product.StockQuantity -= Quantity;
        await product.save();

        // Create sale record
        const sale = await Sale.create({
            ProductID,
            Quantity,
            SaleDateTime: new Date()
        });

        res.status(201).json({ message: 'Sale recorded', sale });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to record sale' });
    }
};

// View all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [{ model: Product }],
            order: [['SaleDateTime', 'DESC']]
        });

        res.json(sales);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve sales' });
    }
};

module.exports = {
    logSale,
    getAllSales
};
