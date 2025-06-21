const db = require('../models');
const ESLTag = db.ESLTag;
const Product = db.Product;

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

// Assign a product to an ESL tag
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

// Get product by ESL MAC address (used by ESP32)
const getProductByMAC = async (req, res) => {
    try {
        const mac = req.params.macAddress.toUpperCase();
        const tags = await ESLTag.findAll({ include: Product });

        console.log("Incoming MAC:", mac);
        for (const t of tags) {
            console.log("DB MAC:", t.MACAddress.toUpperCase());
        }

        const tag = tags.find(t => t.MACAddress.toUpperCase().trim() === mac.trim());

        if (!tag) {
            return res.status(404).json({ message: 'ESL tag not found' });
        }

        if (!tag.Product) {
            return res.status(404).json({ message: 'Product not assigned to ESL tag' });
        }

        res.json(tag.Product);
    } catch (err) {
        console.error('Error fetching product by MAC:', err);
        res.status(500).json({ message: 'Failed to fetch product by MAC' });
    }
};



const updateESLTagByMac = async (req, res) => {
    try {
        const mac = req.params.mac;
        const { ProductID } = req.body;

        const eslTag = await ESLTag.findOne({ where: { MACAddress: mac } });
        if (!eslTag) return res.status(404).json({ message: 'ESLTag not found' });

        eslTag.ProductID = ProductID;
        await eslTag.save();

        res.json({ message: 'ESLTag updated successfully', eslTag });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerESLTag,
    getAllESLTags,
    assignProductToESL,
    getProductByMAC,
    updateESLTagByMac
};
