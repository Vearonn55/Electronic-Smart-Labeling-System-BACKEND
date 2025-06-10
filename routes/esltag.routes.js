const express = require('express');
const router = express.Router();
const {
    registerESLTag,
    getAllESLTags,
    assignProductToESL
} = require('../controllers/esltag.controller');

const verifyToken = require('../middleware/verifyToken');

// Register a new ESL tag
router.post('/', verifyToken, registerESLTag);

// Get all ESL tags
router.get('/', verifyToken, getAllESLTags);

// Assign a product to an ESL tag
router.put('/:eslId/assign', verifyToken, assignProductToESL);

// GET: Retrieve product info for a given ESL MAC
router.get('/mac/:macAddress', getProductByMAC);


module.exports = router;
