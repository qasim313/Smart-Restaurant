const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get a specific restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Add a new restaurant (protected route, only owners)
router.post('/', authMiddleware, restaurantController.addRestaurant);

// Update a restaurant (protected route, only owners)
router.put('/:id', authMiddleware, restaurantController.updateRestaurant);

module.exports = router;
