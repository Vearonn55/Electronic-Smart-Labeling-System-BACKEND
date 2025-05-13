const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');

// User login route
router.post('/login', login);

// User registration route
router.post('/register', register);

module.exports = router;
