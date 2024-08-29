const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// Get analytics data (protected route, only admins)
router.get('/', authMiddleware, analyticsController.getAnalyticsData);

// Record an interaction event
router.post('/event', analyticsController.recordEvent);

module.exports = router;
