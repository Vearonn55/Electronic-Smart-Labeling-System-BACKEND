const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProductPrice, deleteProduct, getAllProducts2 } = require('../controllers/product.controller');
const verifyToken = require('../middleware/verifyToken');

// All roles can view products
router.get('/', verifyToken, getAllProducts);
router.get('/get', verifyToken, getAllProducts2);

// Admin can create and update products
router.post('/', verifyToken, createProduct);
router.put('/:id/price', verifyToken, updateProductPrice);


router.delete('/:id', verifyToken, (req, res) => {
    console.log('DELETE request received for product with ID:', req.params.id);
    deleteProduct(req, res);
});

module.exports = router;
