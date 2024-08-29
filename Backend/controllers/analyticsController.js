const Analytics = require('../models/Analytics');
const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');

// Get analytics data
const getAnalyticsData = async (req, res) => {
    try {
        const analyticsData = await Analytics.find();
        res.json(analyticsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Record an interaction event
const recordEvent = async (req, res) => {
    const { userId, restaurantId, menuItemId, action, details } = req.body;
    try {
        // Save the event in the Analytics collection
        const newEvent = new Analytics({ userId, restaurantId, menuItemId, action, details });
        await newEvent.save();

        // Update popularity score based on the type of action
        if (action === 'view' || action === 'add_to_cart' || action === 'order' || action === 'favorite') {
            // If the action is related to a menu item, update the menu's popularity score
            if (menuItemId) {
                await Menu.findByIdAndUpdate(menuItemId, { $inc: { popularityScore: 1 } });
            }

            // If the action is related to a restaurant, update the restaurant's popularity score
            if (restaurantId) {
                await Restaurant.findByIdAndUpdate(restaurantId, { $inc: { popularityScore: 1 } });
            }
        }

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAnalyticsData,
    recordEvent,
};
