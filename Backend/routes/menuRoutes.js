const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all menu items for a specific restaurant
router.get('/restaurant/:restaurantId', menuController.getMenuItemsByRestaurant);

// Get a specific menu item by ID
router.get('/:id', menuController.getMenuItemById);

// Add a new menu item (protected route, only owners)
router.post('/', authMiddleware, menuController.addMenuItem);

// Update a menu item (protected route, only owners)
router.put('/:id', authMiddleware, menuController.updateMenuItem);

// Delete a menu item (protected route, only owners)
router.delete('/:id', authMiddleware, menuController.deleteMenuItem);

module.exports = router;
