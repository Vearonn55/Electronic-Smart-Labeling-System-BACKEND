const express = require('express');
const router = express.Router();
const {
    registerESLTag,
    getAllESLTags,
    assignProductToESL,
    getProductByMAC,
    updateESLTagByMac
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

//PATCH updating the ESL<->PRODUCT_ID RELATION
router.patch('/mac/:mac', updateESLTagByMac);

module.exports = router;
