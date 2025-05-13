const express = require('express');
const router = express.Router();
const { createAlert, getAllAlerts } = require('../controllers/alert.controller');
const verifyToken = require('../middleware/verifyToken');

//create alerts
router.post('/', verifyToken, createAlert);

//view alerts
router.get('/', verifyToken, getAllAlerts);

module.exports = router;
