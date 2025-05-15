const express = require('express');
const router = express.Router();
const { createAlert, getAllAlerts, resolveAlert } = require('../controllers/alert.controller');
const verifyToken = require('../middleware/verifyToken');

//create alerts
router.post('/', verifyToken, createAlert);

//view alerts
router.get('/', verifyToken, getAllAlerts);

// Admins can resolve alerts
router.put('/:id/resolve', verifyToken, resolveAlert);

module.exports = router;
