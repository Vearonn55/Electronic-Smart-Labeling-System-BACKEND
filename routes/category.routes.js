const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories } = require('../controllers/category.controller');
const verifyToken = require('../middleware/verifyToken');

// Only Admin can create categories
router.post('/', verifyToken, createCategory);

// All roles can view categories
router.get('/', verifyToken, getAllCategories);

module.exports = router;
