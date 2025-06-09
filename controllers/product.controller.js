const { Product, PriceChange, RegulatoryLimit, Alert, Sale } = require('../models');

// Create a new product and trigger an alert if the price exceeds the regulatory limit
const createProduct = async (req, res) => {
    try {
        const { Price, CategoryID } = req.body;

        // Check if the price exceeds the regulatory limit for the given category
        const regulatoryLimit = await RegulatoryLimit.findOne({ where: { ProductCategoryID: CategoryID } });
        let product;

        if (regulatoryLimit && Price > regulatoryLimit.MaxPrice) {
            // First, create the product
            product = await Product.create(req.body);

            // Create an alert for the product price exceeding the regulatory limit
            await Alert.create({
                ProductID: product.ProductID,  // Ensure the ProductID is linked here
                AlertType: 'PriceExceeded',
                AlertDateTime: new Date(),
                               Status: 'Pending'
            });
            console.log('Alert created: Price exceeds regulatory limit');
        } else {
            // If no alert is needed, just create the product
            product = await Product.create(req.body);
        }

        res.status(201).json({ message: 'Product added', product });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Failed to add product' });
    }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['ProductID', 'Name', 'Price', 'CategoryID'] // only necessary fields
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const getAllProducts2 = async (req, res) => {
  try {
    const products = await Product.findAll(); // ✅ returns all fields
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Update product price, log the price change, and check against the regulatory limit
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

        // Log price change
        await PriceChange.create({
            ProductID: product.ProductID,
            OldPrice: oldPrice,
            NewPrice: Price,
            ChangeDateTime: new Date(),
                                 ChangedByUserID: req.user.UserID,
        });

        // Check regulatory limit and create alert if price exceeds the limit
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
            console.log('Alert created: Price exceeds regulatory limit');
        }

        res.json({ message: 'Price updated and logged', product });
    } catch (err) {
        console.error('Error during price update:', err);
        res.status(500).json({ message: 'Price update failed' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Log the start of the process
        console.log(`Attempting to delete product with ID: ${id}`);

        // Find the product by its ID
        const product = await Product.findByPk(id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete related sales first
        console.log(`Deleting sales for product with ID: ${id}`);
        await Sale.destroy({
            where: {
                ProductID: id
            }
        });

        // Optional: Delete related price changes (if needed)
        console.log(`Deleting price changes for product with ID: ${id}`);
        await PriceChange.destroy({
            where: {
                ProductID: id
            }
        });

        // Optional: Delete related alerts (if needed)
        console.log(`Deleting alerts for product with ID: ${id}`);
        await Alert.destroy({
            where: {
                ProductID: id
            }
        });

        // Now, delete the product
        console.log(`Deleting product with ID: ${id}`);
        await product.destroy();

        console.log(`Product and related data deleted successfully`);
        res.status(200).json({ message: 'Product and related data deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getAllProducts2,
    updateProductPrice,
    deleteProduct
};