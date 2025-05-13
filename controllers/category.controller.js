const { ProductCategory } = require('../models');

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { CategoryName } = req.body;

        // Check if category already exists
        const existingCategory = await ProductCategory.findOne({ where: { CategoryName } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await ProductCategory.create({ CategoryName });
        res.status(201).json({ message: 'Category created', category });
    } catch (err) {
        console.error('Error during category creation:', err);
        res.status(500).json({ message: 'Category creation failed' });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll();
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

module.exports = {
    createCategory,
    getAllCategories
};
