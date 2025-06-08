// report.routes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { generateReport, getAllReports, generateCSVReport, generatePDFReport } = require('../controllers/report.controller');
const verifyToken = require('../middleware/verifyToken');

// Route to generate a report
router.post('/', verifyToken, reportController.generateReport);

// Route to get all reports
router.get('/', verifyToken, getAllReports);

// Generate CSV report
router.post('/csv', generateCSVReport);

// Generate PDF report
router.post('/pdf', generatePDFReport);

module.exports = router;
