const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all reviews for a specific restaurant
router.get('/restaurant/:restaurantId', reviewController.getReviewsByRestaurant);

// Get all reviews for a specific menu item
router.get('/menu/:menuItemId', reviewController.getReviewsByMenuItem);

// Post a new review (protected route, only customers)
router.post('/', authMiddleware, reviewController.addReview);

// Delete a review (protected route, only users who posted the review or admins)
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
