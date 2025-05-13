const express = require('express');
const router = express.Router();
const { createSale, getAllSales, logSale } = require('../controllers/sale.controller');
const verifyToken = require('../middleware/verifyToken');

// Admins can log sales and view all sales
router.post('/', verifyToken, logSale);  // Log a sale
router.get('/', verifyToken, getAllSales);  // View all sales

module.exports = router;
