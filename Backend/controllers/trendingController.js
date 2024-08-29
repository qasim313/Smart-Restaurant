const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');

// Get trending menu items
const getTrendingMenuItems = async (req, res) => {
    try {
        const trendingItems = await Menu.find().sort({ popularityScore: -1 }).limit(10);
        res.json(trendingItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get trending restaurants
const getTrendingRestaurants = async (req, res) => {
    try {
        const trendingRestaurants = await Restaurant.find().sort({ popularityScore: -1 }).limit(10);
        res.json(trendingRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTrendingMenuItems,
    getTrendingRestaurants
};
