const express = require('express');
const router = express.Router();
const trendingController = require('../controllers/trendingController');

// Get trending menu items
router.get('/items', trendingController.getTrendingMenuItems);

// Get trending restaurants
router.get('/restaurants', trendingController.getTrendingRestaurants);

module.exports = router;
