const express = require('express');
const router = express.Router();
const { postStatusUpdate, getLatestStatus } = require('../controllers/eslstatus.controller');

// POST: ESL device posts status update
router.post('/', postStatusUpdate);

// GET: Get latest status of a specific ESL tag by ID
router.get('/:id', getLatestStatus);

module.exports = router;
