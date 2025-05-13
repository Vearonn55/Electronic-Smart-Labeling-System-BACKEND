const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProductPrice } = require('../controllers/product.controller');
const verifyToken = require('../middleware/verifyToken');

// All roles can view products
router.get('/', verifyToken, getAllProducts);

// Admins can create and update products
router.post('/', verifyToken, createProduct);
router.put('/:id/price', verifyToken, updateProductPrice);

module.exports = router;
