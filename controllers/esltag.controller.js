const { ESLTag, Product } = require('../models');

// Register a new ESL tag
const registerESLTag = async (req, res) => {
    try {
        const { ESLID, MACAddress, Location } = req.body;

        const existing = await ESLTag.findOne({ where: { MACAddress } });
        if (existing) {
            return res.status(400).json({ message: 'MAC address already registered' });
        }

        const tag = await ESLTag.create({ ESLID, MACAddress, Location });
        res.status(201).json({ message: 'ESL tag registered', tag });
    } catch (err) {
        console.error('Error registering ESL tag:', err);
        res.status(500).json({ message: 'Failed to register ESL tag' });
    }
};

// Get all ESL tags
const getAllESLTags = async (req, res) => {
    try {
        const tags = await ESLTag.findAll({ include: Product });
        res.json(tags);
    } catch (err) {
        console.error('Error fetching ESL tags:', err);
        res.status(500).json({ message: 'Failed to fetch ESL tags' });
    }
};

// Update product assignment for an ESL tag
const assignProductToESL = async (req, res) => {
    try {
        const { eslId } = req.params;
        const { ProductID } = req.body;

        const tag = await ESLTag.findByPk(eslId);
        if (!tag) {
            return res.status(404).json({ message: 'ESL tag not found' });
        }

        tag.ProductID = ProductID;
        await tag.save();

        res.json({ message: 'Product assigned to ESL tag', tag });
    } catch (err) {
        console.error('Error assigning product to ESL tag:', err);
        res.status(500).json({ message: 'Failed to assign product' });
    }
};


const getProductByMAC = async (req, res) => {
    try {
        const { macAddress } = req.params;

        const tag = await ESLTag.findOne({ where: { MACAddress: macAddress } });

        if (!tag) {
            return res.status(404).json({ message: 'ESL tag not found' });
        }

        if (!tag.ProductID) {
            return res.status(200).json({ message: 'No product assigned to this tag' });
        }

        const product = await Product.findByPk(tag.ProductID);

        if (!product) {
            return res.status(404).json({ message: 'Linked product not found' });
        }

        res.status(200).json({ product });
    } catch (err) {
        console.error('Error fetching product by MAC:', err);
        res.status(500).json({ message: 'Failed to retrieve product for ESL tag' });
    }
};


module.exports = {
    registerESLTag,
    getAllESLTags,
    assignProductToESL,
    getProductByMAC
};
