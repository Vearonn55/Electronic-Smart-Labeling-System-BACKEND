const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');
const verifyToken = require('../middleware/verifyToken');

// Get all alerts
router.get('/', verifyToken, alertController.getAllAlerts);

// Create Alert
router.post('/', verifyToken, alertController.createAlert);

// Get alert by ID
router.get('/:id', verifyToken, alertController.getAlertById);

// Resolve alert by ID
router.patch('/:id/resolve', verifyToken, alertController.resolveAlert);

module.exports = router;