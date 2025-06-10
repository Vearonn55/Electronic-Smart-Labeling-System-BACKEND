const express = require('express');
const router = express.Router();
const {
    getPriceHistory,
    getSalesTrends,
    downloadReport
} = require('../controllers/analytics.controller');

router.get('/price-history/:productId', getPriceHistory);
router.get('/sales-trends/:productId', getSalesTrends);
router.get('/report/:productId', downloadReport);

module.exports = router;
