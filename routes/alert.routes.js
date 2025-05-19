const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');

// Get all alerts
router.get('/', alertController.getAllAlerts);

// Get alert by ID
router.get('/:id', alertController.getAlertById);

// Resolve alert by ID
router.patch('/:id/resolve', alertController.resolveAlert);

module.exports = router;