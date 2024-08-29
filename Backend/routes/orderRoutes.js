const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Place a new order (protected route, only customers)
router.post('/', authMiddleware, orderController.placeOrder);

// Get all orders for a user (protected route, only customers)
router.get('/user/:userId', authMiddleware, orderController.getOrdersByUser);

// Get a specific order by ID (protected route)
router.get('/:id', authMiddleware, orderController.getOrderById);

// Update order status (protected route, only owners)
router.put('/:id', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
