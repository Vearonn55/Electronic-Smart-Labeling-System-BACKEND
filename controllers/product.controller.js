const { Product, PriceChange, RegulatoryLimit, Alert } = require('../models');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product added', product });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Failed to add product' });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

// Update product price, log change, and check against regulatory limit
const updateProductPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { Price } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const oldPrice = product.Price;
        if (oldPrice === Price) {
            return res.status(400).json({ message: 'No change in price' });
        }

        product.Price = Price;
        await product.save();

        await PriceChange.create({
            ProductID: product.ProductID,
            OldPrice: oldPrice,
            NewPrice: Price,
            ChangeDateTime: new Date(),
            ChangedByUserID: req.user.UserID,
        });

        const limit = await RegulatoryLimit.findOne({
            where: { ProductCategoryID: product.CategoryID }
        });

        if (limit && Price > limit.MaxPrice) {
            await Alert.create({
                ProductID: product.ProductID,
                AlertType: 'PriceExceeded',
                AlertDateTime: new Date(),
                               Status: 'Pending'
            });
        }

        res.json({ message: 'Price updated and logged', product });
    } catch (err) {
        console.error('Error during price update:', err);
        res.status(500).json({ message: 'Price update failed' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProductPrice
};
