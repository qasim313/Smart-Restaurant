const Review = require('../models/ReviewModel');

// Get all reviews for a specific restaurant
const getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantId: req.params.restaurantId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a specific menu item
const getReviewsByMenuItem = async (req, res) => {
    try {
        const reviews = await Review.find({ menuItemId: req.params.menuItemId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new review
const addReview = async (req, res) => {
    const { userId, restaurantId, menuItemId, rating, comment } = req.body;
    try {
        const newReview = new Review({ userId, restaurantId, menuItemId, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            await review.remove();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviewsByRestaurant,
    getReviewsByMenuItem,
    addReview,
    deleteReview,
};
